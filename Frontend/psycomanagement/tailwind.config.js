/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00D5FF",
          dark: "#0088CC",
          light: "#E0F7FA",
        },
        secondary: "#0088CC",
        tertiary: "#b6dcfd",
        cuarter: "#466d90",
        quinary: "#0a083b",
        navy: {
          900: "#0a083b",
          800: "#0f0d4a",
          700: "#1a1766",
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  darkMode: "class",
  plugins: [],
};
