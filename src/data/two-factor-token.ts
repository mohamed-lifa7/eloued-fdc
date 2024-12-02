import { db } from "@/server/db";

/**
 * Retrieves a two-factor authentication token by its unique token value.
 *
 * @param {string} token - The token used to identify the two-factor authentication request.
 * @returns {Promise<null | object>} A promise that resolves to the two-factor token object if found, or null if not found or an error occurs.
 *
 * @example
 * const twoFactorToken = await getTwoFactorTokenByToken('some-token');
 * if (twoFactorToken) {
 *   console.log(twoFactorToken);
 * } else {
 *   console.log('Two-factor token not found');
 * }
 */
export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findUnique({
      where: { token },
    });

    return twoFactorToken;
  } catch {
    return null;
  }
};

/**
 * Retrieves the first two-factor authentication token associated with the provided email.
 *
 * @param {string} email - The email address associated with the two-factor authentication request.
 * @returns {Promise<null | object>} A promise that resolves to the two-factor token object if found, or null if not found or an error occurs.
 *
 * @example
 * const twoFactorToken = await getTwoFactorTokenByEmail('user@example.com');
 * if (twoFactorToken) {
 *   console.log(twoFactorToken);
 * } else {
 *   console.log('Two-factor token not found');
 * }
 */
export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findFirst({
      where: { email },
    });

    return twoFactorToken;
  } catch {
    return null;
  }
};
