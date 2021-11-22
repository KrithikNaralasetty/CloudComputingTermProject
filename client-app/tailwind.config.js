module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], //looks for react files and use css plugin.
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')]
}
