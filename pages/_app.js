import '../styles/globals.css'
import Layout from '../components/Layout'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { SessionProvider } from 'next-auth/react'
config.autoAddCss = false

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  /* istanbul ignore next */
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />)
  }
  const display = { hideBanner: pageProps.hideBanner }
  /* istanbul ignore next */
  return (
    <SessionProvider
      session={session}
      refetchInterval={5 * 60}
      refetchOnWindowFocus={true}
    >
      <Layout
        locale={pageProps.locale}
        meta={pageProps.meta}
        langToggleLink={pageProps.langToggleLink}
        breadCrumbItems={pageProps.breadCrumbItems}
        bannerContent={pageProps.bannerContent}
        popupContent={pageProps.popupContent}
        display={display}
      >
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
