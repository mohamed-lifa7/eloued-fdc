import { useEffect, useState } from "react";

/**
 * Custom React hook to check if a media query matches the current viewport.
 *
 * @param {string} query - A media query string, e.g., "(max-width: 768px)".
 * @returns {boolean} - `true` if the media query matches, otherwise `false`.
 */
export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    /**
     * Updates the `matches` state based on the media query evaluation.
     */
    const mediaQuery = window.matchMedia(query);

    const handleResize = () => {
      setMatches(mediaQuery.matches);
    };

    handleResize(); // Initial check

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [query]);

  return matches;
};
