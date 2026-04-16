import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#1e3a5f",
          orange: "#f97316",
        },
      },
      fontSize: {
        base: ["18px", "1.6"],
      },
    },
  },
  plugins: [],
};

export default config;
