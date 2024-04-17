import '../styles/globals.css'
import '../styles/loadingspinner.css'
import Layout from '../components/Layout'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Modal from 'react-modal'
import ErrorBoundary from '../components/ErrorBoundary'
import { useEffect } from 'react'
config.autoAddCss = false

// To help prevent double firing of adobe analytics pageLoad event
let appPreviousLocationPathname = ''

export default function MyApp({ Component, pageProps, router }) {
  /* istanbul ignore next */
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />)
  }

  Modal.setAppElement('#__next')
  const display = { hideBanner: pageProps.hideBanner }

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

    handleRouteChange()
    router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('hashChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('hashChangeComplete', handleRouteChange)
    }
  }, [router.events])

  /* istanbul ignore next */
  return (
    <ErrorBoundary>
      <Layout
        locale={pageProps.locale}
        meta={pageProps.meta}
        langToggleLink={pageProps.langToggleLink}
        breadCrumbItems={pageProps.breadCrumbItems}
        bannerContent={pageProps.bannerContent}
        popupContentNA={pageProps.popupContentNA}
        content={pageProps.content}
        popupContent={pageProps.popupContent}
        display={display}
        popupStaySignedIn={pageProps.popupStaySignedIn}
        refPageAA={pageProps.aaPrefix}
        dataGcAnalyticsCustomClickMenuVariable={pageProps.aaMenuPrefix}
      >
        <Component {...pageProps} />
      </Layout>
    </ErrorBoundary>
  )
}
