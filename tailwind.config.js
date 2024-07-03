/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      boxShadow:{
        'dual-yellow':'0 0 5px rgba(250,204,21,0.9), 0 0 25px rgba(113,63,18,1)'
      }
    },
  },
  plugins: [],
}

