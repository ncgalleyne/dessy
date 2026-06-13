/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#101415",
        lavender: "#d0bcff",
        royal: "#381e72",
        text: "#e1e3e3",
        danger: "#ffb4ab",
      },
      fontFamily: {
        display: ["Syne", "sans-serif"],
        body: ["Epilogue", "sans-serif"],
      },
    },
  },
  plugins: [],
};
