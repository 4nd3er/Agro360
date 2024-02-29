/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: ["index.html", "./src/**/*.jsx", "./node_modules/flowbite/**/*.js"],
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
        'color-aprendiz': '#82def0',
        'color-aprendiz-text': '#1c566e',
        'color-instructor': '#CB7766',
        'color-directivo': '#385C57',
        'color-logo': '#0B5345 ',
        'color-span-logo': '#27AE60',
        'color-label': '#2C3E50',
        'color-white': '#FDFEFE',
        'color-black': '#000000',
        'color-border':'#212121',
        'color-gray': '#5D6D7E',
        'register-label':'#FAFAFA',
        'color-red':'#FF0000',
        'color-greend': '#C6DA02',

        //alertas
        'color-alert-red': '#FF0000',

        //botones
        'color-blue-btn':'#00324D',
        'color-btn-white': '#FDFEFE',
      },
    },
    screens: {
      'xxs': '310px',
      'xs': '475px',
      ...defaultTheme.screens,
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

