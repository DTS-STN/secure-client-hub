const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      display: ['var(--lato-font)', '"Open Sans"', 'sans-serif'],
      body: ['var(--noto-sans-font)', 'sans-serif'],
    },
    screens: {
      'xs': '376px',
      ...defaultTheme.screens,
      '2xl': '1920px',
    },
    extend: {
      fontSize: {
        '20px': ['20px', '33px'],
        '32px': ['32px', '35px'],
        '34px': ['34px', '38px'],
        '36px': ['36px', '40px'],
        '38px': ['38px', '42px'],
        '46px': ['46px'],
      },
      padding: {
        '5px': '5px',
        '15px': '15px',
        '18px': '18px',
        '10.5': '42px',
        '15': '60px',
      },
      margin: {
        '5px': '5px',
        '15px': '15px',
      },
      colors: {
        'gray': {
          'lightest': '#F5F5F5',
          'lighter': '#F3F3F3',
          'light': '#DBDBDB',
          'medium': '#C4C4C4',
          'dark': '#7F8C8D',
          'darker': '#333333',
          '30a': '#EAEBED',
          '40': '#DDDDDD',
          '50a': '#CFD1D5',
          '60': '#BBBFC5',
        },
        'bright-blue': {
          light: '#78B9E4',
          lighter: '#93D0FF',
          medium: '#0069AD',
          dark: '#245C81',
          pale: '#EBF2FC',
        },
        'brighter-blue': {
          light: '#DBE5F2',
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
          'light': '#5E8EBD',
          'medium': '#173451',
          'dark': '#284162',
          '60b': '#335075',
          '60d': '#295376',
          '60f': '#0E62C9',
          'focus': '#1c578a',
          'active': '#21303F',
        },
        'red': {
          'light': '#B76565',
          'medium': '#D94141',
          'dark': '#881515',
          '50': '#BC3331',
          'red50a': '#AF3C43',
          '50b': '#D3080C',
          '70': '#942826',
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
          'light': '#A3D88180',
          'medium': '#A3D881',
          'dark': '#65B234',
          '50': '#318000',
          '50a': '#278400',
          '70': '#1D4D00',
          '90': '#102900',
        },
        'purple': {
          '50a': '#7834BC',
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
