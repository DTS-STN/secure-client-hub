import '../styles/globals.css'
import Layout from '../components/Layout'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Modal from 'react-modal'
config.autoAddCss = false

export default function MyApp({ Component, pageProps }) {
  /* istanbul ignore next */
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />)
  }

  //Test env var
  console.log(process.env.AUTH_ECAS_GLOBAL_LOGOUT_URL)

  Modal.setAppElement('#__next')
  const display = { hideBanner: pageProps.hideBanner }
  /* istanbul ignore next */
  return (
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
  )
}
