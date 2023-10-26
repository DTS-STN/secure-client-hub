import '../styles/globals.css'
import '../styles/loadingspinner.css'
import Layout from '../components/Layout'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Modal from 'react-modal'
import ErrorBoundary from '../components/ErrorBoundary'
config.autoAddCss = false

export default function MyApp({ Component, pageProps }) {
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
        bannerContent={pageProps.bannerContent}
        popupContentNA={pageProps.popupContentNA}
        content={pageProps.content}
        popupContent={pageProps.popupContent}
        display={display}
        popupStaySignedIn={pageProps.popupStaySignedIn}
      >
        <Component {...pageProps} />
      </Layout>
    </ErrorBoundary>
  )
}
