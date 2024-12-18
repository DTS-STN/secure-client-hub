import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        {/* Dummy script that will force the page to render only after CSS is loaded - fix for FireFox only */}
        <script>0</script>
        <Main />
        <NextScript />
        {
          // AA script must be loaded before the pageLoad event fires
          process.env.ENVIRONMENT === 'production' ? (
            <Script
              strategy="beforeInteractive"
              src="//assets.adobedtm.com/be5dfd287373/9b9cb7867b5b/launch-59d77766b86a.min.js"
            />
          ) : (
            <Script
              strategy="beforeInteractive"
              src="https://assets.adobedtm.com/be5dfd287373/9b9cb7867b5b/launch-cad75bf2f0d2-staging.min.js"
            />
          )
        }
      </body>
    </Html>
  )
}
