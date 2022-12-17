/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{html, css, js}",
    "./src/resources/views/**/*.ejs",
    './node_modules/tw-elements/dist/js/**/*.js'
  ],
  darkMode: 'class',
  important: true,
  // prefix: 'tw-',
  theme: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('tw-elements/dist/plugin')
  ],
}
