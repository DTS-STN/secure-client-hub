import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect } from 'react'

interface Content {
  title: string
  desc: string
  author: string
  keywords: string
  creator: string
  accessRights: string
  service: string
  statusCode?: string
}

interface Data {
  data_en: Content
  data_fr: Content
}

interface MetaDataProps {
  language: string
  data: Data
}

// To help prevent double firing of adobe analytics pageLoad event
let appPreviousLocationPathname = ''

/* eslint-disable */
// make typescript happy
declare global {
  interface Window {
    adobeDataLayer: any
  }
}
/* eslint-enable */

const MetaData = ({ language, data }: MetaDataProps) => {
  const router = useRouter()
  const d = language === 'en' ? data.data_en : data.data_fr
  const isErrorPage = typeof d.statusCode !== 'undefined'
  /** Web Analytics - taken from Google Analytics example
   *  @see https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics
   * */
  useEffect(() => {
    const handleRouteChange = () => {
      // only push event if pathname is different
      if (window.location.pathname !== appPreviousLocationPathname) {
        window.adobeDataLayer?.push?.({ event: 'pageLoad' })
        appPreviousLocationPathname = window.location.pathname
      }
    }
    if (isErrorPage) {
      // Suppress the pageLoad entirely on error pages
      return
    }

    handleRouteChange()
    router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('hashChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('hashChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Head>
        <style jsx>
          {`
            html {
              animation: fouc-fix 0.001s steps(1);
            }
            @keyframes fouc-fix {
              0% {
                visibility: hidden;
              }
              100% {
                visibility: visible;
              }
            }
          `}
        </style>
        {isErrorPage ? (
          <title data-gc-analytics-error={d.statusCode}>{d.title}</title>
        ) : (
          <title>{d.title}</title>
        )}

        <meta charSet="utf-8" />
        <meta name="description" content={d.desc} />
        <meta name="author" content={d.author} />
        <meta name="keywords" content={d.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="dcterms.title" content={d.title} />
        <meta
          name="dcterms.language"
          content={language === 'en' ? 'eng' : 'fra'}
        />
        <meta name="dcterms.creator" content={d.creator} />
        <meta name="dcterms.accessRights" content={d.accessRights} />
        <meta name="dcterms.service" content={d.service} />
      </Head>

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
    </>
  )
}

/* istanbul ignore next */
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: { locale },
  }
}

export default MetaData
