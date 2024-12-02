"use client";

import * as React from "react";
import dynamic from "next/dynamic";

import { type ThemeProviderProps } from "next-themes";
import { ThemeProvider as StaticProvider } from "next-themes";
const DynProvider = dynamic(
  () => import("next-themes").then((e) => e.ThemeProvider),
  {
    ssr: false,
  },
);

/**
 * A custom ThemeProvider component that dynamically chooses between
 * a static or dynamic `ThemeProvider` from `next-themes` based on the environment.
 *
 * @param {ThemeProviderProps} props - The props passed to the `ThemeProvider`, including `children` and any other properties specific to `next-themes`.
 * @returns {JSX.Element} A wrapped `ThemeProvider` component based on the environment, either static or dynamic.
 *
 * @remarks
 * - In production, a static `ThemeProvider` is used to avoid potential issues with server-side rendering (SSR).
 * - In development, a dynamically imported `ThemeProvider` is used to enable hot reloading and development-specific behavior.
 *
 * @example
 * ```tsx
 * import { ThemeProvider } from "@/path/to/ThemeProvider";
 *
 * const App = () => (
 *   <ThemeProvider>
 *     <YourAppComponents />
 *   </ThemeProvider>
 * );
 * ```
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const NextThemeProvider =
    process.env.NODE_ENV === "production" ? StaticProvider : DynProvider;
  return <NextThemeProvider {...props}>{children}</NextThemeProvider>;
}
