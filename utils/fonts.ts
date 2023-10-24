import localFont from 'next/font/local'

export const notoSans = localFont({
  display: 'swap',
  src: [
    {
      path: '../public/fonts/NotoSans.woff2',
      style: 'normal',
      weight: '400',
    },
    {
      path: '../public/fonts/NotoSans-Bold.woff2',
      style: 'normal',
      weight: '700',
    },
  ],
  variable: '--noto-sans-font',
})

export const lato = localFont({
  display: 'swap',
  src: [
    {
      path: '../public/fonts/LatoLatin-Light.woff2',
      style: 'normal',
      weight: '300',
    },
    {
      path: '../public/fonts/LatoLatin-Regular.woff2',
      style: 'normal',
      weight: '400',
    },
    {
      path: '../public/fonts/LatoLatin-Medium.woff2',
      style: 'normal',
      weight: '500',
    },
    {
      path: '../public/fonts/LatoLatin-Bold.woff2',
      style: 'normal',
      weight: '700',
    },
  ],
  variable: '--lato-font',
})
