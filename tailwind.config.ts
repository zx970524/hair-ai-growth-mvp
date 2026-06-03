import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#171717",
        line: "#E7E2DA",
        porcelain: "#F7F4EF",
        coral: "#D85A4A",
        moss: "#556B4D",
        gold: "#B9802B"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(24, 24, 24, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
