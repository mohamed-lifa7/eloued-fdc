import NextAuth from "next-auth";
import { cache } from "react";

import { authConfig } from "./config";

const {
  auth: uncachedAuth,
  handlers,
  signIn,
  signOut,
  unstable_update,
} = NextAuth(authConfig);

const auth = cache(uncachedAuth);

/**
 * Fetches the current authenticated user.
 * @returns The current authenticated user object if available, otherwise undefined.
 */
export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};

/**
 * Fetches the role of the current authenticated user.
 * @returns  The role of the current authenticated user if available, otherwise undefined.
 */
export const currentRole = async () => {
  const session = await auth();

  return session?.user?.role;
};

export { auth, handlers, signIn, signOut, unstable_update };
