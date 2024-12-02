import * as React from "react";

/**
 * Custom hook to determine if a component has been mounted.
 *
 * @returns {boolean} `true` if the component has mounted; otherwise, `false`.
 *
 * @example
 * // Usage in a component
 * const isMounted = useMounted();
 * if (isMounted) {
 *   // Perform client-only operations
 * }
 */
export function useMounted() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
