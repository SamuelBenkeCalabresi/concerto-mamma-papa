// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'ms-madi': ['var(--font-ms-madi)', 'cursive'],
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("daisyui")
  ],
  // @ts-ignore
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#2293cc",
          "secondary": "#f8fafc",
          "accent": "#0ea5e9",
          "neutral": "#1e293b",
          "base-100": "#ffffff",
          "base-200": "#f1f5f9",
          "base-300": "#e2e8f0",
          "info": "#0284c7",
          "success": "#059669",
          "warning": "#d97706",
          "error": "#dc2626",
        },
      },
      "dark"
    ],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  },
};
export default config;