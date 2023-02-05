/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          primary: '#16ABF8',
          disabled: '#d0eefe',
        },
        priority: {
          'very-high': '#ED4C5C',
          high: '#F8A541',
          normal: '#00A790',
          low: '#428BC1',
          'very-low': '#8942C1',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
