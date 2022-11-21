import '../styles/globals.css'
import Layout from '../components/Layout'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export default function MyApp({ Component, pageProps }) {
  /* istanbul ignore next */
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />)
  }
  const display = { hideBanner: pageProps.hideBanner }
  /* istanbul ignore next */
  return (
    <Layout
      locale={pageProps.locale}
      meta={pageProps.meta}
      langToggleLink={pageProps.langToggleLink}
      breadCrumbItems={pageProps.breadCrumbItems}
      bannerContent={pageProps.bannerContent}
      display={display}
    >
      <Component {...pageProps} />
    </Layout>
  )
}
