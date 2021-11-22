// craco: create react app configuration override
//needed because create react app doesn't support postcss8, in order to configure tailwind
module.exports = {
    style: {
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
        ],
      },
    },
  }