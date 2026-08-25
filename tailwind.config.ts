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
        accent: {
          50: "#fbf1ed",
          100: "#f4dbd2",
          300: "#d99c85",
          500: "#b1503a",
          600: "#973f2c",
          700: "#7a3123",
        },
      },
      fontFamily: {
        display: ["Georgia", "Cambria", "ui-serif", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
