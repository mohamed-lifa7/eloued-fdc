import { useSession } from "next-auth/react";

/**
 * Custom hook to retrieve the current user's role from the session data.
 *
 * @returns {(string | undefined)} The role of the current user if available; otherwise, `undefined`.
 *
 * @example
 * // Usage in a component
 * const role = useCurrentRole();
 * if (role === $Enums.UserRole.ADMIN) {
 *   // Show admin-specific content
 * }
 */
export const useCurrentRole = () => {
  const session = useSession();
  return session.data?.user?.role;
};
