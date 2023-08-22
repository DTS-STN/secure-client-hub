import '../styles/globals.css'
import Layout from '../components/Layout'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { lato, notoSans } from '../utils/fonts'
import Modal from 'react-modal'
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
    <div>
      <style jsx global>{`
        :root {
          --lato-font: ${lato.style.fontFamily};
          --noto-sans-font: ${notoSans.style.fontFamily};
        }
      `}</style>
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
    </div>
  )
}
