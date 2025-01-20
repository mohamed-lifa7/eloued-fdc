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
    const user = await db.user.findUnique({
      where: { id },
    });

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

/**
 * Retrieves recent users from the database.
 * @returns A promise that resolves to an array of users.
 */
export const getRecentUsers = async () => {
  const users = await db.user.findMany({
    take: 5,
    orderBy: [{ createdAt: "desc" }],
  });
  return users;
};

/**
 * Retrieves leaderboard data for the top users.
 * @returns A promise that resolves to an array of users.
 */
export async function getLeaderboardData() {
  const users = await db.user.findMany({
    orderBy: [{ reputation: "desc" }, { createdAt: "asc" }],
    select: {
      id: true,
      name: true,
      image: true,
      faculty: true,
      reputation: true,
      createdAt: true,
      _count: {
        select: {
          Answer: true,
          CodeSubmission: true,
        },
      },
    },
    take: 5,
  });
  return users;
}

/**
 * Retrieves total reputation and number of submissions of all users.
 */
export async function getUserRepuation() {
  const users = await db.user.findMany({
    select: {
      name: true,
      reputation: true,
      CodeSubmission: true,
      Answer: true,
    },
  });

  // Format data to match the desired structure
  const userData = users.map((user) => ({
    name: user.name!,
    reputation: user.reputation,
    submissions: user.CodeSubmission.length + user.Answer.length,
  }));

  return userData;
}
