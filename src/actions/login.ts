"use server";

import type * as z from "zod";
import { AuthError } from "next-auth";

import { db } from "@/server/db";
import { signIn } from "@/server/auth";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import {
  generateVerificationToken,
  generateTwoFactorToken,
} from "@/lib/tokens";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

/**
 * Logs in a user with the provided credentials.
 *
 * @param values - The login credentials.
 * @param callbackUrl - The URL to redirect the user after successful login.
 * @returns An object with the result of the login operation.
 *          - If the login is successful, it returns `{ success: "تم إرسال رسالة التأكيد!" }` if the user's email is not verified,
 *            or `{ twoFactor: true }` if two-factor authentication is enabled.
 *          - If the login fails due to invalid fields, it returns `{ error: "حقول غير صالحة!" }`.
 *          - If the login fails due to an email that does not exist, it returns `{ error: "البريد الإلكتروني غير موجود!" }`.
 *          - If the login fails due to an invalid two-factor authentication code, it returns `{ error: "رمز غير صالح!" }`.
 *          - If the login fails due to an expired two-factor authentication code, it returns `{ error: "الرمز منتهي الصلاحية!" }`.
 *          - If the login fails due to invalid credentials, it returns `{ error: "بيانات الاعتماد غير صالحة!" }`.
 *          - If an unexpected error occurs during the login process, it returns `{ error: "حدث خطأ ما!" }`.
 */
export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "حقول غير صالحة!" };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser?.email && !existingUser?.password) {
    return { error: "البريد الإلكتروني غير موجود!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email!,
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { success: "تم إرسال رسالة التأكيد!" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return { error: "رمز غير صالح!" };
      }

      if (twoFactorToken.token !== code) {
        return { error: "رمز غير صالح!" };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: "الرمز منتهي الصلاحية!" };
      }

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id,
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl ?? DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "بيانات الاعتماد غير صالحة!" };
        default:
          return { error: "حدث خطأ ما!" };
      }
    }

    throw error;
  }
};
