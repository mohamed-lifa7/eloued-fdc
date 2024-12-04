import { siteConfig } from "@/config/site-config";
import { AppProviders } from "@/providers/app-providers";
import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  ...siteConfig,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} dark`}>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
