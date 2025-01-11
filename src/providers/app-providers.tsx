"use client";

import { Suspense } from "react";
import { EdgeStoreProvider } from "./edgestore-provider";
import { ThemeProvider } from "./theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <EdgeStoreProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </EdgeStoreProvider>
        </ThemeProvider>
      </Suspense>
    </>
  );
}
