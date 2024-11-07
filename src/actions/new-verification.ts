"use server";

import { db } from "@/server/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verificiation-token";

/**
 * Verifies the email address associated with a given token.
 *
 * @param token - The verification token.
 * @returns An object indicating the result of the verification process.
 *          If successful, it returns { success: "Email verified!" }.
 *          If the token does not exist, it returns { error: "Token does not exist!" }.
 *          If the token has expired, it returns { error: "Token has expired!" }.
 *          If the email associated with the token does not exist, it returns { error: "Email does not exist!" }.
 */
export const newVerification = async (token: string) => {
  try {
    // Validate token input
    if (!token) {
      return { error: "Invalid token!" };
    }

    // Retrieve the token from the database
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
      return { error: "Token does not exist!" };
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

    // Update the user's email verification status
    await db.user.update({
      where: { id: existingUser.id },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    });

    // Delete the verification token from the database
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });

    return { success: "Email verified!" };
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error during email verification:", error);
    return { error: "An error occurred during email verification." };
  }
};
