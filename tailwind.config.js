const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "smoke-darkest": "var(--smoke-darkest)",
        "smoke-darker": "var(--smoke-darker)",
        "smoke-dark": "var(--smoke-dark)",
        "smoke": "var(--smoke)",
        "smoke-light": "var(--smoke-light)",
        "smoke-lighter": "var(--smoke-lighter)",
        "smoke-lightest": "var(--smoke-lightest)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
