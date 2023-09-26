/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      colors: {
        primaryDark: "#18191a",
        primarylessDark: "#242526",
        primarylessDarker: "#3a3b3c",
        textLighter: "#e4e6eb",
        textLight: "#b0b3b8",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
