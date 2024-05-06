/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,vue}"],
  theme: {
    colors: {
      transparent: 'transparent',
      richblack: "#0b0e14",
      oxfordblue: "#0b1528",
      spacecadet: "#142342",
      delftblue: "#243558",
      masblue: "#3a4b6f",
      coolgrey: "#91a0be",
      lavendar: "#dee4f1",
      aliceblue: "#e7ebf3",
      harvestgold: "#e7a60d",
      saffron: "#f4bc3a",
    },
    fontFamily: {
      sans: ["Arial", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
