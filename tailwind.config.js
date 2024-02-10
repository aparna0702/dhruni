/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: { 800: "#bf9b42", 900: "#a67c00" },
        emerald: "#033631",
        biege: "#f5f5dc",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        luxQuote: "url('/assets/images/house.jpg')",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
        dancingScript: ["var(--font-dancing-script)", "cursive", "sans-serif"],
        ebGaramond: ["var(--font-eb-garamond)", "serif"],
        heldane: ["heldane", "sans-serif"],
      },
    },
  },
  plugins: [],
};
