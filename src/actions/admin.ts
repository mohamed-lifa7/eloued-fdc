"use server";

import { currentRole } from "@/server/auth";
import { UserRole } from "@prisma/client";

/**
 * Executes the admin action on the server.
 * Checks the current user's role and returns a success message if the role is ADMIN,
 * otherwise returns an error message.
 * @returns An object with a success or error message.
 */
export const admin = async () => {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    return { success: "تم السماح بإجراء الخادم!" };
  }

  return { error: "إجراء الخادم ممنوع!" };
};
