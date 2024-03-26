import PropTypes from 'prop-types'
import { useState, useCallback, useMemo, useEffect, cloneElement } from 'react'
import Header from './Header'
import Footer from './Footer'
import MetaData from './MetaData'
import PhaseBanner from './PhaseBanner'
import en from '../locales/en'
import fr from '../locales/fr'
import MultiModal from './MultiModal'
import { lato, notoSans } from '../utils/fonts'
import { useRouter } from 'next/router'
import throttle from 'lodash.throttle'

export default function Layout(props) {
  const display = props.display ?? {}
  const t = props.locale === 'en' ? en : fr
  const [response, setResponse] = useState()
  const router = useRouter()
  const defaultBreadcrumbs = []
  const contactLink =
    props.locale === 'en' ? '/en/contact-us' : '/fr/contactez-nous'

  const [openModalWithLink, setOpenModalWithLink] = useState({
    activeLink: '/',
    context: null,
  })

  const openModal = (link, context) => {
    setOpenModalWithLink(() => {
      return {
        isOpen: true,
        activeLink: link,
        context,
      }
    })
  }

  const closeModal = () => {
    setOpenModalWithLink(() => {
      return {
        isOpen: false,
        activeLink: '/',
        context: null,
      }
    })
  }

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
      {props.display.hideBanner ? (
        ''
      ) : (
        <PhaseBanner
          bannerBoldText={props.bannerContent.bannerBoldText || ''}
          bannerText={props.bannerContent.bannerText || ''}
          bannerLink={props.bannerContent.bannerLink || ''}
          bannerLinkHref={props.bannerContent.bannerLinkHref || ''}
          bannerSummaryTitle={props.bannerContent.bannerSummaryTitle || ''}
          bannerSummaryContent={props.bannerContent.bannerSummaryContent || ''}
          bannerButtonText={props.bannerContent.bannerButtonText || ''}
          bannerButtonLink={props.bannerContent.bannerButtonLink || ''}
          id={props.bannerContent.id || ''}
          bannerButtonExternalLink
          icon={props.bannerContent.icon || ''}
          popupContent={props.popupContent || ''}
          refPageAA={props.refPageAA}
          openModal={openModal}
          closeModal={closeModal}
        ></PhaseBanner>
      )}
      <Header
        legacyBehavior
        dataTestId="topnav"
        id="header"
        linkPath={props.langToggleLink}
        lang={props.locale}
        breadCrumbItems={
          props.breadCrumbItems ? props.breadCrumbItems : defaultBreadcrumbs
        }
        topnavProps={{
          skipToMainPath: '#mainContent',
          skipToAboutPath: '#page-footer',
          switchToBasicPath: '',
          displayAlternateLink: false,
        }}
        dataGcAnalyticsCustomClickInstitutionVariable={
          props.children.props.aaPrefix
        }
        menuProps={{
          legacyBehavior: true,
          menuList: [
            {
              key: 'dashKey',
              id: 'dash',
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
        {cloneElement(props.children, { openModal, closeModal })}
      </main>
      <MultiModal
        openModalWithLink={openModalWithLink}
        openModal={openModal}
        closeModal={closeModal}
        popupContentNA={props.popupContentNA}
        t={t}
        popupStaySignedIn={props.popupStaySignedIn}
        popupContent={props.popupContent}
        refPageAA={props.refPageAA}
      />

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
      <script type="text/javascript">_satellite.pageBottom();</script>
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
  popupContent: {
    scId: '',
    scHeadingEn: '',
    scHeadingFr: '',
    scContentEn: '',
    scContentFr: '',
    scFragments: [
      {
        scId: '',
        scLinkTextEn: '',
        scLinkTextFr: '',
      },
      {
        scId: '',
        scLinkTextEn: '',
        scLinkTextFr: '',
      },
    ],
  },
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
   * bannerContent
   */
  bannerContent: PropTypes.shape({
    bannerBoldText: PropTypes.string.isRequired,
    bannerText: PropTypes.string.isRequired,

    bannerLink: PropTypes.string.isRequired,
    bannerLinkHref: PropTypes.string.isRequired,

    bannerSummaryTitle: PropTypes.string.isRequired,
    bannerSummaryContent: PropTypes.string.isRequired,
    bannerButtonText: PropTypes.string.isRequired,
    bannerButtonLink: PropTypes.string.isRequired,
  }),
  /*
   * popupContent
   */
  popupContent: PropTypes.shape({
    popupId: PropTypes.string.isRequired,
    popupTitle: PropTypes.string.isRequired,
    popupDescription: PropTypes.string.isRequired,
    popupPrimaryBtn: PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
    popupSecondaryBtn: PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  }),
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
