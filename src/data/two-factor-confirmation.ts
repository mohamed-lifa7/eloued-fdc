import { db } from "@/server/db";

/**
 * Retrieves the two-factor authentication confirmation for a given user ID.
 *
 * @param {string} userId - The ID of the user whose two-factor authentication confirmation is to be retrieved.
 * @returns {Promise<null | object>} A promise that resolves to the two-factor confirmation object if found, or null if not found or an error occurs.
 *
 * @example
 * const twoFactorConfirmation = await getTwoFactorConfirmationByUserId('user-id');
 * if (twoFactorConfirmation) {
 *   console.log(twoFactorConfirmation);
 * } else {
 *   console.log('Two-factor confirmation not found');
 * }
 */
export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
      where: { userId },
    });

    return twoFactorConfirmation;
  } catch {
    return null;
  }
};
