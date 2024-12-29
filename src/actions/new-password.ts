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
 * @returns An object with the result of the login operation.
 */
export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null,
) => {
  try {
    // Validate token input
    if (!token) {
      return { error: "Missing token!" };
    }

    // Validate input fields
    const validatedFields = NewPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const { password } = validatedFields.data;

    // Retrieve the token from the database
    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) {
      return { error: "Invalid token!" };
    }

    // Check if the token has expired
    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      return { error: "Token has expired!" };
    }

    // Retrieve the user associated with the token email
    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
      return { error: "Email does not exist!" };
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

    return { success: "Password updated!" };
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error during password reset:", error);
    return { error: "An error occurred during password reset." };
  }
};
