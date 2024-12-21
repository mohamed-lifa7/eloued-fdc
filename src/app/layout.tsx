import { siteConfig } from "@/config/site-config";
import { AppProviders } from "@/providers/app-providers";
import { Cairo } from "next/font/google";
import "@/styles/globals.css";

import type { Viewport, Metadata } from "next";
import { auth } from "@/server/auth";
import { SessionProvider } from "next-auth/react";
import { cn } from "@/lib/utils";
import Siteheader from "@/components/layout/siteheader";

export const metadata: Metadata = {
  ...siteConfig,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const cairo = Cairo({ subsets: ["latin", "arabic"], weight: ["400", "700"] });

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="ar" className={cn("min-h-screen", cairo.className)} dir="rtl">
        <body>
          <AppProviders>
            <Siteheader />
            {children}
          </AppProviders>
        </body>
      </html>
    </SessionProvider>
  );
}
