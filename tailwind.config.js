const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      display: ['Lato', 'sans-serif'],
      body: ['Noto sans', 'sans-serif'],
      extra: ['Patua One', 'cursive'],
    },
    screens: {
      'xs': '376px',
      ...defaultTheme.screens,
      '2xl': '1920px',
    },
    extend: {
      colors: {
        'gray': {
          lighter: '#F3F3F3',
          light: '#DBDBDB',
          medium: '#C4C4C4',
          dark: '#7F8C8D',
          darker: '#333333',
        },
        'bright-blue': {
          light: '#78B9E4',
          lighter: '#93D0FF',
          medium: '#0069AD',
          dark: '#245C81',
        },
        'brighter-blue': {
          light: '#BDE9EF27',
          medium: '#269ABC66',
          dark: '#269ABC',
        },
        'blue': {
          hover: '#0535D2',
          default: '#2B4380',
          pressed: '#16446C',
          primary: '#26374A',
        },
        'deep-blue': {
          light: '#5E8EBD',
          medium: '#173451',
          dark: '#21303F',
          button: '#295376',
        },
        'red': {
          light: '#B76565',
          medium: '#D94141',
          dark: '#881515',
        },
        'yellow': {
          light: '#F9F4DA',
        },
        'orange': {
          light: '#EE710027',
          medium: '#EE710080',
          dark: '#EE7100',
        },
        'green': {
          light: '#A3D88180',
          medium: '#A3D881',
          dark: '#65B234',
        },
      },
      backgroundImage: () => ({
        'footer-parliament-image': 'url(../public/landscape.png)',
        // 'splash-page': 'url(../public/sp-bg-1.jpg)',
      }),
      boxShadow: {
        card: '0px 2px 8px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
