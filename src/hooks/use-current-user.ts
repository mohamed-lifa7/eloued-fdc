import { useSession } from "next-auth/react";

/**
 * Custom hook to retrieve the current user object from the session data.
 *
 * @returns {(object | undefined)} The current user object if available; otherwise, `undefined`.
 */
export const useCurrentUser = () => {
  const session = useSession();

  return session.data?.user;
};
