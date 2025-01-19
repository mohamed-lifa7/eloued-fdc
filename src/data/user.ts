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
 * Retrieves total points of a user.
 * @param id - The ID of the user to retrieve.
 * @returns The user object with total points, or null if not found.
 */
export const getUserRepuation = async (id: string) => {
  try {
    // Calculate the total score from all answers
    const totalPoints = await db.answer.aggregate({
      where: { userId: id },
      _sum: {
        score: true,
      },
    });

    return {
      totalPoints: totalPoints,
    };
  } catch (error) {
    console.error("Error retrieving user with points:", error);
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
