import PropTypes from 'prop-types'
import { useState, useCallback, useMemo, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import MetaData from './MetaData'
import en from '../locales/en'
import fr from '../locales/fr'
import { lato, notoSans } from '../utils/fonts'
import { useRouter } from 'next/router'
import throttle from 'lodash.throttle'
import IdleTimeout from './IdleTimeout'

export default function Layout(props) {
  const t = props.locale === 'en' ? en : fr
  const [response, setResponse] = useState()
  const router = useRouter()
  const defaultBreadcrumbs = []
  const contactLink =
    props.locale === 'en' ? '/en/contact-us' : '/fr/contactez-nous'

  const validationResponse = useCallback(
    async () => setResponse(await fetch('/api/refresh-msca')),
    [],
  )
  //Event listener for click events that revalidates MSCA session, throttled using lodash to only trigger every 1 minute
  const throttledOnClickEvent = useMemo(
    () => throttle(validationResponse, 60000, { trailing: false }),
    [validationResponse],
  )
  //Event listener for visibility change events that revalidates MSCA session, throttled using lodash to only trigger every 15 seconds
  const throttledVisiblityChangeEvent = useMemo(
    () => throttle(validationResponse, 15000, { trailing: false }),
    [validationResponse],
  )

  //If session is valid, add event listeners to check for valid sessions on click and visibility change events
  useEffect(() => {
    window.addEventListener('visibilitychange', throttledVisiblityChangeEvent)
    window.addEventListener('click', throttledOnClickEvent)
    //If validateSession call indicates an invalid MSCA session, redirect to logout
    if (response?.status === 401) {
      router.push(`/${props.locale}/auth/logout`)
    }
    //Remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener('click', throttledOnClickEvent)
      window.removeEventListener(
        'visiblitychange',
        throttledVisiblityChangeEvent,
      )
    }
  }, [
    throttledOnClickEvent,
    throttledVisiblityChangeEvent,
    response,
    router,
    props.locale,
  ])

  return (
    <>
      <style jsx global>{`
        :root {
          --lato-font: ${lato.style.fontFamily};
          --noto-sans-font: ${notoSans.style.fontFamily};
        }
      `}</style>
      <MetaData language={props.locale} data={props.meta}></MetaData>
      <Header
        legacyBehavior
        dataTestId="topnav"
        id="header"
        linkPath={props.langToggleLink}
        lang={props.locale}
        breadCrumbItems={
          props.breadCrumbItems ? props.breadCrumbItems : defaultBreadcrumbs
        }
        refPageAA={props.refPageAA}
        topnavProps={{
          skipToMainPath: '#mainContent',
          skipToAboutPath: '#page-footer',
          switchToBasicPath: '',
          displayAlternateLink: false,
        }}
        dataGcAnalyticsCustomClickInstitutionVariable={
          props.children.props.aaPrefix
        }
        dataGcAnalyticsCustomClickMenuVariable={
          props.dataGcAnalyticsCustomClickMenuVariable
        }
        menuProps={{
          legacyBehavior: true,
          menuList: [
            {
              key: 'dashKey',
              id: 'my-dashboard',
              value: t.menuItems.dashboard,
              path: `${
                props.locale === 'en'
                  ? '/en/my-dashboard'
                  : '/fr/mon-tableau-de-bord'
              }`,
            },
            {
              key: 'profileKey',
              id: 'profile',
              value: t.menuItems.profile,
              path: `${props.locale === 'en' ? '/en/profile' : '/fr/profil'}`,
            },
            {
              key: 'securityKey',
              id: 'security',
              value: t.menuItems.security,
              path: `${
                props.locale === 'en'
                  ? '/en/security-settings'
                  : '/fr/parametres-securite'
              }`,
            },
            {
              key: 'contactKey',
              id: 'contact',
              value: t.menuItems.contactUs,
              path: `${
                props.locale === 'en' ? '/en/contact-us' : '/fr/contactez-nous'
              }`,
            },
            {
              key: 'signOutKey',
              id: 'signOut',
              value: t.menuItems.signOut,
              path: '/auth/logout',
              showIcon: true,
            },
          ],
        }}
        searchProps={{
          onChange: function noRefCheck() {},
          onSubmit: function noRefCheck() {},
        }}
      />
      <main id="mainContent" className="sch-container grid gap-[30px]">
        {props.children}
      </main>

      <IdleTimeout locale={props.locale} refPageAA={props.refPageAA} />

      {process.env.ENVIRONMENT === 'production' ? (
        <Footer
          lang={!props.locale ? 'en' : props.locale}
          brandLinks={[
            {
              href: t.footerTermsAndConditionURL,
              id: 'linkTC',
              text: t.footerTermsAndCondition,
            },
            {
              href: t.footerPrivacyURL,
              id: 'linkPR',
              text: t.footerPrivacy,
            },
          ]}
          contactLink={contactLink}
          btnLink="#top"
          id="page-footer"
        />
      ) : (
        <Footer
          lang={!props.locale ? 'en' : props.locale}
          brandLinks={[
            {
              href: t.footerTermsAndConditionURLtest,
              id: 'linkTC',
              text: t.footerTermsAndCondition,
            },
            {
              href: t.footerPrivacyURLtest,
              id: 'linkPR',
              text: t.footerPrivacy,
            },
          ]}
          contactLink={contactLink}
          btnLink="#top"
          id="page-footer"
        />
      )}
    </>
  )
}

/**
 * Setup default props
 */

Layout.defaultProps = {
  title: 'Service.Canada.ca',
  bannerContent: {
    bannerBoldText: '',
    bannerText: '',

    bannerLink: '',
    bannerLinkHref: '',

    bannerSummaryTitle: '',
    bannerSummaryContent: '',
    bannerButtonText: '',
    bannerButtonLink: '',
    icon: '',
  },
  breadCrumbItems: [],
  display: { hideBanner: true },
  langToggleLink: '',
  locale: 'en',
  meta: '',
}

Layout.propTypes = {
  /*
   * Locale current language
   */
  locale: PropTypes.string,
  /*
   * Meta Tags
   */
  meta: PropTypes.object,
  /*
   * Title of the page
   */
  title: PropTypes.string,
  /*
   * Link of the page in opposite language
   */
  langToggleLink: PropTypes.string,
  display: PropTypes.shape({
    /*
     * Toggle use of Phase (default false)
     */
    hideBanner: PropTypes.bool,
    /*
     * Toggle use of DS header (default false)
     */
    hideHeader: PropTypes.bool,
    /*
     * Toggle use of DS footer (default false)
     */
    hideFooter: PropTypes.bool,
  }),
  breadCrumbItems: PropTypes.array,
}
