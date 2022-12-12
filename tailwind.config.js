/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-blue-dm": "hsl(209, 23%, 22%)", // (Dark Mode Elements)
        "very-dark-blue-dm": "hsl(207, 26%, 17%)", //  (Dark Mode Background)
        "very-dark-blue": "hsl(200, 15%, 8%)", // (Light Mode Text)
        "dark-gray": "hsl(0, 0%, 52%)", // (Light Mode Input)
        "very-light-gray": "hsl(0, 0%, 98%)", // (Light Mode Background)
      },
      fontFamily: {
        nunito: ["Nunito Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
