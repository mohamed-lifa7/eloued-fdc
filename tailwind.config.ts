import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { nextui } from "@nextui-org/react";

export default {
  content: [
    "./src/**/*.tsx",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            // primary: "#FFD34E",
            // secondary: "#EE457E",
            // background: "#F4E8D1",
            primary: "#f3541c",
            secondary: "#042454",
          },
        },
        dark: {
          colors: {
            // primary: "#FFD34E",
            // secondary: "#EE457E",
            // background: "#E1CA9E",
            primary: "#f3541c",
            secondary: "#042454",
          },
        },
      },
    }),
  ],
} satisfies Config;
