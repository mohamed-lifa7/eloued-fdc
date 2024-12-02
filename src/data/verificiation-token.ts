import { db } from "@/server/db";

/**
 * Retrieves a verification token by its unique token value.
 *
 * @param {string} token - The token used to identify the verification request.
 * @returns {Promise<null | object>} A promise that resolves to the verification token object if found, or null if not found or an error occurs.
 *
 * @example
 * const verificationToken = await getVerificationTokenByToken('some-token');
 * if (verificationToken) {
 *   console.log(verificationToken);
 * } else {
 *   console.log('Verification token not found');
 * }
 */
export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { token },
    });

    return verificationToken;
  } catch {
    return null;
  }
};

/**
 * Retrieves the first verification token associated with the provided email.
 *
 * @param {string} email - The email address associated with the verification request.
 * @returns {Promise<null | object>} A promise that resolves to the verification token object if found, or null if not found or an error occurs.
 *
 * @example
 * const verificationToken = await getVerificationTokenByEmail('user@example.com');
 * if (verificationToken) {
 *   console.log(verificationToken);
 * } else {
 *   console.log('Verification token not found');
 * }
 */
export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email },
    });

    return verificationToken;
  } catch {
    return null;
  }
};
