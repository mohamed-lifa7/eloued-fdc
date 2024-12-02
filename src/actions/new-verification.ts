"use server";

import { db } from "@/server/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verificiation-token";

/**
 * Verifies the email address associated with a given token.
 *
 * @param token - The verification token.
 * @returns An object indicating the result of the verification process.
 *          If successful, it returns { success: "تم تأكيد البريد الإلكتروني!" }.
 *          If the token does not exist, it returns { error: "الرمز غير موجود!" }.
 *          If the token has expired, it returns { error: "انتهت صلاحية الرمز!" }.
 *          If the email associated with the token does not exist, it returns { error: "البريد الإلكتروني غير موجود!" }.
 */
export const newVerification = async (token: string) => {
  try {
    // Validate token input
    if (!token) {
      return { error: "رمز غير صالح!" };
    }

    // Retrieve the token from the database
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
      return { error: "الرمز غير موجود!" };
    }

    // Check if the token has expired
    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      return { error: "انتهت صلاحية الرمز!" };
    }

    // Retrieve the user associated with the token email
    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
      return { error: "البريد الإلكتروني غير موجود!" };
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

    return { success: "تم تأكيد البريد الإلكتروني!" };
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error during email verification:", error);
    return { error: "حدث خطأ أثناء تأكيد البريد الإلكتروني." };
  }
};
