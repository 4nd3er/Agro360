/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: ["index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      fontFamily: {
        'work-sans': ['Work Sans', 'sans'],
        'josefin-sans': ['Josefin Sans', 'sans']
      },
      boxShadow: {
        'shadow-button': '0px 5px 5px rgba(0, 0, 0, 0.5)',
      },
      colors: {
        'color-sena': '#39a900',
        'color-sena-hover': '#369206',
        'color-aprendiz': '#82DEF0',
        'color-instructor': '#CB7766',
        'color-directivo': '#385C57',
      },
    },
    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    },
  },
  plugins: [],
}

