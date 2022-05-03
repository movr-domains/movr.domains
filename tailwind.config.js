module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        yellow: '#F2B705',
        green: '#53CBC8',
        darkgray: '#838383',
      },
      backgroundImage: {
        background: "url('/dark.png);",
      },
      fontFamily: {
        display: ['Inconsolata', 'monospace'],
        cabin: ['Cabin', 'sans-serif'],
      },
      height: {
        18: '4.5rem',
      },
    },
  },
  plugins: [],
};
