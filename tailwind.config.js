/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'blue':'#1fb6ff',
        'purple':'#7e5bef',
        'lightGray':'#f0f2f2',
        'white': '#ffffff',
      },
      spacing:{
        '2x':'20px',
        '3x':'30px',
      },
      borderRadius:{
      '4x1':'40px',
      }
    },
  },
  plugins: [],
}

