/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["'Montserrat',sans-serif"],
        sec: ["'Cormorant Garamond', serif"]
      },
      height: {        
        '2s': '120vh', 
        'bdy':'30rem',     
      },
      width: {        
        '2s': '200vh',      
      },
      textColor: {
        primary: "#FF4C4C",
        secondary: "#F7F6F2",
        danger: "#771011",
        textSecond:"#777777",
        
      },
      dropShadow: {
        '3xl': '0 45px 45px rgba(0, 0, 0, 0.55)',
      },
      gridRow: {        
        'span-16': 'span 7 / span 7',      
      },
      colors: {
        // 500 for gradient, 600 for hover
        primary: { DEFAULT: "#FF4C4C", HOVER: "#c91b0e" },
        sec: { DEFAULT: "#FEB803" },
        third: { DEFAULT: "#ECCFAF" },
        forth: { DEFAULT: "#F0F0F0" },
        background:{DEFAULT: '#F7F6F2'}

      },
      screens: {
        samsung: "370px",
        // => @media (min-width: 640px) { ... }
      },
    },
  },
  plugins: [],
}