import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import type { Post } from ".velite";
import { slug } from "github-slugger";

/**
 * Combines multiple class names into a single string.
 *
 * @param inputs - The class names to be combined.
 * @returns The combined class names as a string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date into a string representation.
 * @param input - The input date to format. It can be either a string or a number.
 * @returns The formatted date as a string.
 */
export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Sorts an array of posts in descending order based on their date.
 * @param posts - The array of posts to be sorted.
 * @returns The sorted array of posts.
 */
export function sortPosts(posts: Array<Post>) {
  return posts.sort((a, b) => {
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return 0;
  });
}

/**
 * Retrieves all tags from an array of posts and returns a record of tags with their occurrence count.
 * @param posts - An array of posts.
 * @returns A record of tags with their occurrence count.
 */
export function getAllTags(posts: Array<Post>) {
  const tags: Record<string, number> = {};
  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      tags[tag] = (tags[tag] ?? 0) + 1;
    });
  });

  return tags;
}

/**
 * Sorts tags by their count in descending order.
 *
 * @param tags - An object containing tags as keys and their corresponding counts as values.
 * @returns An array of tags sorted by their count in descending order.
 */
export function sortTagsByCount(tags: Record<string, number>) {
  return Object.keys(tags ?? {}).sort(
    (a, b) => (tags?.[b] ?? 0) - (tags?.[a] ?? 0),
  );
}

/**
 * Returns an array of posts filtered by a specific tag slug.
 *
 * @param posts - The array of posts to filter.
 * @param tag - The tag slug to filter by.
 * @returns An array of posts that have the specified tag slug.
 */
export function getPostsByTagSlug(posts: Array<Post>, tag: string) {
  return posts.filter((post) => {
    if (!post.tags) return false;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    const slugifiedTags = post.tags.map((tag) => slug(tag));
    return slugifiedTags.includes(tag);
  });
}

/**
 * Generates a random color in hexadecimal format.
 * @returns A string representing a random color in the format '#RRGGBB'.
 */
export function generateRandomColor(): string {
  // Generate a random integer between 0 and 16777215 (0xFFFFFF in hex)
  const randomInt = Math.floor(Math.random() * 16777216);
  // Convert the integer to a hexadecimal string and pad with leading zeros if necessary
  const randomColor = "#" + randomInt.toString(16).padStart(6, "0");
  return randomColor;
}

/**
 * Downloads a file with the given content, filename, and type.
 *
 * @param content - The content of the file to be downloaded.
 * @param filename - The name of the file to be downloaded.
 * @param type - The MIME type of the file.
 */
export function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Converts a given string into a URL-friendly format (slugify).
 *
 * The function performs the following steps:
 * 1. Converts the string to lowercase.
 * 2. Removes special characters, leaving only alphanumeric characters, spaces, and hyphens.
 * 3. Trims leading and trailing spaces.
 * 4. Replaces spaces with hyphens to create a URL-friendly string.
 *
 * @param input - The string to be formatted.
 * @returns A URL-friendly version of the input string.
 *
 * @example
 * ```typescript
 * const result = formatToURL("Hello World! This is a test.");
 * console.log(result); // Outputs: "hello-world-this-is-a-test"
 * ```
 */
export function formatToURL(input: string): string {
  return input
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading and trailing spaces
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
}

/**
 * Determines the rank of a user based on their experience points (exp).
 *
 * Rank Categories:
 * - Beginner: Less than 50 points
 * - Intermediate: 50 to 199 points
 * - Advanced: 200 to 499 points
 * - Expert: 500 or more points
 *
 * @param exp - The experience points of the user.
 * @returns The rank of the user as a string.
 */
export const getRank = (exp: number): string => {
  if (exp < 50) {
    return "Beginner";
  } else if (exp < 200) {
    return "Intermediate";
  } else if (exp < 500) {
    return "Advanced";
  } else {
    return "Expert";
  }
};
