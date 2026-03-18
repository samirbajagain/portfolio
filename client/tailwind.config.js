/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "380px",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "serif"],
        body: ["Manrope", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 30px rgba(212, 212, 216, 0.16)",
      },
      colors: {
        panel: "rgba(10, 10, 10, 0.78)",
        slate: {
          50: "#020202",
          100: "#050505",
          200: "#0b0b0b",
          300: "#121212",
          400: "#1c1c1c",
          500: "#6f6a61",
          600: "#b8b0a2",
          700: "#d7d0c2",
          800: "#ece5d9",
          900: "#f9f4ea",
          950: "#fffbf2",
        },
        blue: {
          50: "#fff8ec",
          100: "#f9e7ca",
          200: "#f2d8ab",
          300: "#e9c588",
          400: "#ddb066",
          500: "#cf9842",
          600: "#d9b677",
          700: "#e6cda0",
          800: "#f0dfbf",
          900: "#f8edda",
          950: "#fff7ea",
        },
      },
    },
  },
  plugins: [],
};
