"use server";
import { currentUser } from "@/server/auth";
import { db } from "@/server/db";
import { UserRole } from "@prisma/client";

/**
 * Deletes a user from the database.
 *
 * @param userId - The ID of the user to delete.
 * @returns An object with either a success message or an error message.
 */
export const deleteUser = async (userId: string) => {
  try {
    const crntUser = await currentUser();

    if (!crntUser) {
      return { error: "No current user found." };
    }

    if (crntUser.role !== UserRole.ADMIN && crntUser.role !== UserRole.OWNER) {
      return { error: "You do not have permission to delete user!" };
    }

    await db.user.delete({
      where: { id: userId },
    });

    return { success: "User has been deleted!" };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { error: "An error occurred while deleting the user." };
  }
};
