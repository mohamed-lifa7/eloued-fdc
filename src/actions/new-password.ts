"use server";

import type * as z from "zod";
import bcrypt from "bcryptjs";

import { NewPasswordSchema } from "@/schemas";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/server/db";

/**
 * Resets the user's password with the provided values and token.
 *
 * @param values - The new password data.
 * @param token - The password reset token.
 * @returns An object indicating the result of the password reset process.
 *          If successful, it returns { success: "تم تحديث كلمة المرور!" }.
 *          If the token is missing, it returns { error: "الرمز مفقود!" }.
 *          If the input fields are invalid, it returns { error: "حقول غير صالحة!" }.
 *          If the token is invalid or has expired, it returns { error: "رمز غير صالح!" } or { error: "الرمز منتهي الصلاحية!" }.
 *          If the email associated with the token does not exist, it returns { error: "البريد الإلكتروني غير موجود!" }.
 *          If an unknown error occurs, it returns { error: "حدث خطأ ما أثناء إعادة تعيين كلمة المرور!" }.
 */
export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null,
) => {
  try {
    // Validate token input
    if (!token) {
      return { error: "الرمز مفقود!" };
    }

    // Validate input fields
    const validatedFields = NewPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "حقول غير صالحة!" };
    }

    const { password } = validatedFields.data;

    // Retrieve the token from the database
    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) {
      return { error: "رمز غير صالح!" };
    }

    // Check if the token has expired
    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      return { error: "الرمز منتهي الصلاحية!" };
    }

    // Retrieve the user associated with the token email
    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
      return { error: "البريد الإلكتروني غير موجود!" };
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password in the database
    await db.user.update({
      where: { id: existingUser.id },
      data: { password: hashedPassword },
    });

    // Delete the password reset token from the database
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });

    return { success: "تم تحديث كلمة المرور!" };
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error during password reset:", error);
    return { error: "حدث خطأ ما أثناء إعادة تعيين كلمة المرور!" };
  }
};
