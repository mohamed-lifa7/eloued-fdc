import { db } from "@/server/db";

/**
 * Retrieves a user from the database based on their email.
 * @param email - The email of the user to retrieve.
 * @returns A Promise that resolves to the user object if found, or null if not found.
 */
export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

/**
 * Retrieves a user by their ID.
 * @param id - The ID of the user to retrieve.
 * @returns The user object if found, or null if not found.
 */
export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};

/**
 * Retrieves the count of users from the database.
 * @returns {Promise<number>} The count of users.
 */
export const getUsersCount = async () => {
  const count = await db.user.count();
  return count;
};

/**
 * Retrieves all users from the database.
 * @returns A promise that resolves to an array of users.
 */
export const getAllUsers = async () => {
  const users = await db.user.findMany();
  return users;
};
