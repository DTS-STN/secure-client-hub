import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body style={{ visibility: 'hidden' }}>
        {/* Dummy script that will force the page to render only after CSS is loaded - fix for FireFox only */}
        <script>0</script>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
