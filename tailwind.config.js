/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        
        'signin': "url('/src/bg_signin.png')",
        'reset_password':"url('/src/bg_reset_pass.png')",
        'setup':"url('/src/setup.png')"
      },
      colors: {
        'databoard-blue': '#4283E4',
        'dark-text':'#121212',
        'inactive-text': '#838282',

      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};