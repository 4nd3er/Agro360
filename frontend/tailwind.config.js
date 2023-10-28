/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      fontFamily: {
        'work-sans': ['Work Sans', 'sans'],
      },
      boxShadow: {
        'shadow-button': '0px 5px 5px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}

