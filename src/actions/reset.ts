"use server";

import type * as z from "zod";
import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";

/**
 * Resets the user's password by sending a password reset email.
 *
 * @param values - The values containing the user's email.
 * @returns An object with either an error message or a success message.
 */
export const reset = async (values: z.infer<typeof ResetSchema>) => {
  try {
    // Validate input fields
    const validatedFields = ResetSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "البريد الإلكتروني غير صالح!" };
    }

    const { email } = validatedFields.data;

    // Check if the user exists
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return { error: "البريد الإلكتروني غير موجود!" };
    }

    // Generate password reset token
    const passwordResetToken = await generatePasswordResetToken(email);

    // Send password reset email
    await sendPasswordResetEmail(
      passwordResetToken.email,
      passwordResetToken.token,
    );

    return { success: "تم إرسال بريد إعادة تعيين كلمة المرور!" };
  } catch (error) {
    // Log the error for debugging purposes
    console.error("خطأ أثناء إعادة تعيين كلمة المرور:", error);
    return {
      error: "حدث خطأ أثناء محاولة إعادة تعيين كلمة المرور.",
    };
  }
};
