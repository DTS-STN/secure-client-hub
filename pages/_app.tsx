import '../styles/globals.css'
import '../styles/loadingspinner.css'
import Layout from '../components/Layout'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Modal from 'react-modal'
import ErrorBoundary from '../components/ErrorBoundary'
import { ReactElement, ReactNode, useEffect } from 'react'
import { AppProps } from 'next/app'
import { NextPage } from 'next'
config.autoAddCss = false

declare const window: Window & { adobeDataLayer?: Record<string, unknown>[] }

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

// To help prevent double firing of adobe analytics pageLoad event
let appPreviousLocationPathname = ''

function aaPushEvent(errType?: string) {
  if (errType !== undefined) {
    window.adobeDataLayer?.push({
      event: 'error',
      error: {
        name: errType,
      },
    })
  } else {
    window.adobeDataLayer?.push({ event: 'pageLoad' })
  }
}

export default function MyApp({
  Component,
  pageProps,
  router,
}: AppPropsWithLayout) {
  /** Web Analytics - taken from Google Analytics example
   *  @see https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics
   * */
  useEffect(() => {
    try {
      // only push event if pathname is different
      if (window.location.pathname !== appPreviousLocationPathname) {
        aaPushEvent(pageProps.errType)
        appPreviousLocationPathname = window.location.pathname
      }
    } catch {
      // silently suppress all client side errors
    }
  }, [router.asPath, pageProps.errType])

  /* istanbul ignore next */
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />)
  }

  Modal.setAppElement('#__next')
  const display = { hideBanner: pageProps.hideBanner }

  /* istanbul ignore next */
  return (
    <ErrorBoundary>
      <Layout
        locale={pageProps.locale}
        meta={pageProps.meta}
        langToggleLink={pageProps.langToggleLink}
        breadCrumbItems={pageProps.breadCrumbItems}
        display={display}
        refPageAA={pageProps.aaPrefix}
        dataGcAnalyticsCustomClickMenuVariable={pageProps.aaMenuPrefix}
      >
        <Component {...pageProps} />
      </Layout>
    </ErrorBoundary>
  )
}
