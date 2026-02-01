/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        gold: "#D4AF37",
        glass: "rgba(255,255,255,0.08)"
      },
      backdropBlur: {
        xl: "20px"
      }
    },
  },
  plugins: [],
};
