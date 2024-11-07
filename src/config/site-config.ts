import type { Metadata } from "next";
export const siteConfig: Metadata = {
  metadataBase: new URL("https://nexa-starter.vercel.app"),
  title: {
    default: "Nexa-Starter",
    template: "%s | Nexa-Starter",
  },

  manifest: "/site.webmanifest",

  applicationName: "Nexa-Starter",

  creator: "Mohamed Lifa",

  authors: [
    {
      name: "Mohamed Lifa",
      url: "https://mohamed-lifa7.vercel.app",
    },
  ],

  icons: [{ rel: "icon", url: "/favicon.ico" }],

  description:
    "Nexa-Starter enables developers to quickly launch and scale their SaaS products with a powerful Next.js boilerplate.",

  openGraph: {
    title: "Nexa-Starter",
    description:
      "Nexa-Starter enables developers to quickly launch and scale their SaaS products with a powerful Next.js boilerplate.",
    siteName: "Nexa-Starter",
    locale: "en_US",
    url: new URL("https://nexa-starter.vercel.app"),
    images: ["https://nexa-starter.vercel.app/og-image.png"],
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  twitter: {
    title: "Nexa-Starter",
    creator: "@LifaSeddik",
    card: "summary_large_image",
    images: ["https://nexa-starter.vercel.app/twitter-og-image.png"],
  },
};

export const links = {
  github: "https://github.com/mohamed-lifa7/nexa-starter",
  twitter: "https://twitter.com/LifaSeddik",
  portfolio: "https://mohamed-lifa7.vercel.app",
};
