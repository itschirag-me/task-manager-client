/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins"],
        pacifico: ["Pacifico"],
      },
      colors: {
        primary: "#FFBE78",
        primaryLite: "#ffd2a2",
        secondary: "#3f3d56",
        blackTransparent: "#00000035",
      },
    },
  },
  plugins: [],
};
