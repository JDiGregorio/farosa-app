const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './storage/framework/views/*.php',
    './resources/**/*.blade.php',
    './resources/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter var', 
          ...defaultTheme.fontFamily.sans
        ],
      }
    },
    colors: {
      ...colors,
      transparent: 'transparent',
      current: 'currentColor',
    }
  },
  variants: {},
  plugins: [],
}
