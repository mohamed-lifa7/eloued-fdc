import { db } from "@/server/db";

/**
 * Retrieves an account by the given user ID.
 *
 * @param {string} userId - The ID of the user whose account is to be retrieved.
 * @returns {Promise<null | object>} A promise that resolves to the account object if found, or null if an error occurs or no account is found.
 *
 * @example
 * const account = await getAccountByUserId('12345');
 * if (account) {
 *   console.log(account);
 * } else {
 *   console.log('Account not found');
 * }
 */
export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await db.account.findFirst({
      where: { userId },
    });

    return account;
  } catch {
    return null;
  }
};
