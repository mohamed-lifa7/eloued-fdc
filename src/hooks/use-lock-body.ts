import * as React from "react";

/**
 * A custom hook that locks the body scroll when mounted and restores it when unmounted.
 * This can be useful for modal dialogs, sidebars, or any other elements that require
 * the body scroll to be locked when they are open.
 *
 * @see https://usehooks.com/useLockBodyScroll.
 * @returns {void} This hook does not return any value.
 */
export function useLockBody(): void {
  React.useLayoutEffect((): (() => void) => {
    // Store the original overflow style of the body element
    const originalStyle: string = window.getComputedStyle(
      document.body,
    ).overflow;

    // Lock the body scroll by setting the overflow to 'hidden'
    document.body.style.overflow = "hidden";

    // Cleanup function to restore the original overflow style when the component unmounts
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);
}
