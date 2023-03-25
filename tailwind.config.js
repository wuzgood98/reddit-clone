/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        redditLightBlue: "#e2e8f0",
        redditOrange: "#ff3c00",
        redditBlue: "#0079d3",
        redditBorder: "#e8edf3",
        redditIcon: "#878a93",
      },
      animation: {
        "spring-bounce": "spring-bounce 0.3s ease-in-out",
      },
      keyframes: {
        "spring-bounce": {
          "0%": { transform: "translateY(3px)" },
          "50%": { transform: "translateY(-3px)" },
          "100%": { transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
