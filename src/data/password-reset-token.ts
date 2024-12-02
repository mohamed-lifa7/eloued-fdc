import { db } from "@/server/db";

/**
 * Retrieves a password reset token by its unique token value.
 *
 * @param {string} token - The token used to identify the password reset request.
 * @returns {Promise<null | object>} A promise that resolves to the password reset token object if found, or null if not found or an error occurs.
 *
 * @example
 * const passwordResetToken = await getPasswordResetTokenByToken('some-token');
 * if (passwordResetToken) {
 *   console.log(passwordResetToken);
 * } else {
 *   console.log('Password reset token not found');
 * }
 */
export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: { token },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};

/**
 * Retrieves the first password reset token associated with the provided email.
 *
 * @param {string} email - The email address associated with the password reset request.
 * @returns {Promise<null | object>} A promise that resolves to the password reset token object if found, or null if not found or an error occurs.
 *
 * @example
 * const passwordResetToken = await getPasswordResetTokenByEmail('user@example.com');
 * if (passwordResetToken) {
 *   console.log(passwordResetToken);
 * } else {
 *   console.log('Password reset token not found');
 * }
 */
export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: { email },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};
