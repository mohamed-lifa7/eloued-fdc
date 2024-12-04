import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names and merges Tailwind CSS classes.
 *
 * @param {...ClassValue[]} inputs - An array of class values to be combined.
 * @returns {string} A single merged string of class names, with duplicates removed or merged based on Tailwind CSS rules.
 *
 * @example
 * // Basic usage with conditional class names
 * cn("bg-red-500", isActive && "text-white"); // "bg-red-500 text-white" if isActive is true
 *
 * @example
 * // With multiple class utilities and merging
 * cn("p-4", "p-2"); // "p-2" (tailwind-merge resolves conflicts)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}