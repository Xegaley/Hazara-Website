import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#faf6f1",
          100: "#f1e6d9",
          200: "#e0c7ab",
          300: "#cda87c",
          400: "#b98752",
          500: "#9c6b38",
          600: "#7d532c",
          700: "#603f22",
          800: "#452d18",
          900: "#2c1c0f",
        },
      },
    },
  },
  plugins: [],
};

export default config;
