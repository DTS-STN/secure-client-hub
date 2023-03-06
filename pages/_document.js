import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        {/* Dummy script that will force the page to render only after CSS is loaded */}
        <script>0</script>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
