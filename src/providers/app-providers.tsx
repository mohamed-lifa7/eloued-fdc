"use client";

import { Suspense } from "react";
import { EdgeStoreProvider } from "./edgestore-provider";
import { ThemeProvider } from "./theme-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </ThemeProvider>
      </Suspense>
    </>
  );
}
