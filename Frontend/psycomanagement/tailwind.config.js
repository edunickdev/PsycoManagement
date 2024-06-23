/* eslint-disable no-undef */
const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00D5FF",
        secondary: "#0088CC",
        tertiary: "#b6dcfd",
        cuarter: "#466d90",
        quinary: "#0a083b"
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
