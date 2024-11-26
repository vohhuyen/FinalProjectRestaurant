// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx}",
//     "./components/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         'open-sans-condensed': ['Open Sans Condensed', 'sans-serif'],
//       },
//       colors: {
//         'custom-brown': '#715b3e',
//         'custom-dark': '#0f1d22',
//         'custom-yellow': '#c9ab81',
//       },
//       transitionDuration: {
//         '500': '500ms',
//       },
//     },
//   },
//   plugins: [],
// }


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'open-sans-condensed': ['Open Sans Condensed', 'sans-serif'],
        'dancing-script': ['"Dancing Script"', 'cursive'], 
        'miniver': ['Miniver', 'sans-serif'],
      },
      colors: {
        'custom-brown': '#715b3e',
        'custom-dark': '#0f1d22',
        'custom-dark1': '#0b1315',
        'custom-yellow': '#c9ab81',
      },
      letterSpacing: {
        'extra-wide': '1rem',
      },
      transitionDuration: {
        '500': '500ms',
      },
      borderColor: {  
        'custom-yellow': '#c9ab81',
      },
      keyframes: {
        draw: {
          '0%': { strokeDashoffset: 1000 },
          '100%': { strokeDashoffset: 0 },
        },
      },
      animation: {
        draw: 'draw 4s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}
