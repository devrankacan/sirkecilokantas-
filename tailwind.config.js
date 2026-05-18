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
        cream: {
          50: "#fefdf8",
          100: "#fdf9ed",
          200: "#f9f0d3",
          300: "#f4e4b0",
          400: "#edd485",
          500: "#e4bf5a",
          600: "#d4a43c",
          700: "#b08430",
          800: "#8d672c",
          900: "#745528",
        },
        dark: {
          50: "#f5f5f0",
          100: "#e8e8e0",
          200: "#d1d1c3",
          300: "#b0b09a",
          400: "#8a8a70",
          500: "#6b6b55",
          600: "#565644",
          700: "#464638",
          800: "#3b3b2f",
          900: "#282820",
          950: "#1a1a14",
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
