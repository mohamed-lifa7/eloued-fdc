"use client";

import { NextUIProvider } from "@nextui-org/react";
import { EdgeStoreProvider } from "./edgestore-provider";
import { ThemeProvider } from "./theme-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NextUIProvider>
        <ThemeProvider>
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </ThemeProvider>
      </NextUIProvider>
    </>
  );
}
