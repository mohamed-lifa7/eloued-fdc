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
      return { error: "لم يتم العثور على مستخدم حالي." };
    }

    if (crntUser.role !== UserRole.ADMIN) {
      return { error: "ليس لديك صلاحية لحذف المستخدم!" };
    }

    await db.user.delete({
      where: { id: userId },
    });

    return { success: "تم حذف المستخدم!" };
  } catch (error) {
    console.error("خطأ أثناء حذف المستخدم:", error);
    return { error: "حدث خطأ أثناء حذف المستخدم." };
  }
};
