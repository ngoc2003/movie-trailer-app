/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "500px",
      sm: "620px",
      // => @media (min-width: 620px) { ... }

      md: "950px",
      // => @media (min-width: 920px) { ... }
      desktop: "1440px",
      // => @media (min-width: 1440px) { ... }
    },
    extend: {
      fontFamily: {
        body: ["DM Sans", "sans-serif"],
      },
      colors: {
        primary: "#F62682",
      },
    },
  },
  plugins: [],
};
