import type { Metadata } from "next";

export const siteConfig: Metadata = {
  metadataBase: new URL("https://eloued-fdc.vercel.app"),
  title: {
    default: "Future Developers Club",
    template: "%s | Future Developers Club",
  },

  manifest: "/site.webmanifest",

  applicationName: "FDC",

  creator: "Mohamed and Abdul Rahman",

  authors: [
    {
      name: "Mohamed",
      url: "https://mohamed-lifa7.vercel.app",
    },
    {
      name: "Abdul Rahman",
      url: "https://abdul-rahman.vercel.app",
    },
  ],

  icons: [{ rel: "icon", url: "/favicon.ico" }],

  description:
    "Future Developers Club is a community of passionate developers who come together to share projects, ideas, and opportunities in the field of technology.",

  openGraph: {
    title: "Future Developers Club",
    description:
      "Future Developers Club is a community of passionate developers who come together to share projects, ideas, and opportunities in the field of technology.",
    siteName: "Future Developers Club",
    locale: "en_US",
    url: new URL("https://eloued-fdc.vercel.app"),
    images: ["https://eloued-fdc.vercel.app/og-image.png"],
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
    title: "Future Developers Club",
    creator: "@LifaSeddik",
    card: "summary_large_image",
    images: ["https://eloued-fdc.vercel.app/og-image.png"],
  },
};

export const links = {
  github: "https://github.com/mohamed-lifa7/eloued-fdc",
  portfolio: "https://mohamed-lifa7.vercel.app",
  instagram: "https://www.instagram.com/fdevclub",
  telegram: "https://t.me/+e2kKkyiEqCw4ZTlk",
};
