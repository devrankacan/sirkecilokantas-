/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          50:  "#fefcf5",
          100: "#fdf7e8",
          200: "#faedcc",
          300: "#f5dfa8",
          400: "#edcc7a",
          500: "#e2b84e",
          600: "#c99830",
          700: "#a87a24",
          800: "#8a6120",
          900: "#724f1e",
        },
        brown: {
          50:  "#f6f0eb",
          100: "#e8d8cc",
          200: "#ccb09a",
          300: "#ae8868",
          400: "#93673e",
          500: "#7a4f27",
          600: "#623d1c",
          700: "#4e2e12",
          800: "#3a210b",
          900: "#2d1a08",
          950: "#1a0e04",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
