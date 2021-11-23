const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], //looks for react files and use css plugin.
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': ['Montserrat', ...defaultTheme.fontFamily.sans],
      'serif': [...defaultTheme.fontFamily.serif],
      'mono': [...defaultTheme.fontFamily.mono]
    }
    /*backgroundColor: theme => ({
      ...theme('colors'),
      'purple': bg-purple-800, 
    }) */ 
    
    //extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')]
}
