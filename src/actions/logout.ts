"use server";

import { signOut } from "@/server/auth";

/**
 * Logs out the user.
 * @returns A promise that resolves when the user is successfully logged out.
 */
export const logout = async () => {
  await signOut();
};
