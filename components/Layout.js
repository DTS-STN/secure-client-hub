import PropTypes from 'prop-types'
import {
  Header,
  Footer,
  LayoutContainer,
} from '@dts-stn/service-canada-design-system'
import { useState, cloneElement } from 'react'
import MetaData from './MetaData'
import PhaseBanner from './PhaseBanner'
import en from '../locales/en'
import fr from '../locales/fr'
import Link from 'next/link'
import MultiModal from './MultiModal'

export default function Layout(props) {
  const display = props.display ?? {}
  const t = props.locale === 'en' ? en : fr
  const defaultBreadcrumbs = []
  const contactLink =
    props.locale === 'en' ? '/en/contact-us' : '/fr/contactez-nous'

  const [openModalWithLink, setOpenModalWithLink] = useState({
    activeLink: '/',
    context: null,
  })

  const openModal = (link, context) => {
    setOpenModalWithLink((prev) => {
      return {
        isOpen: true,
        activeLink: link,
        context,
      }
    })
  }

  const closeModal = () => {
    setOpenModalWithLink((prev) => {
      return {
        isOpen: false,
        activeLink: '/',
        context: null,
      }
    })
  }

  return (
    <>
      <MetaData language={props.locale} data={props.meta}></MetaData>
      {props.display.hideBanner ? (
        ''
      ) : (
        <PhaseBanner
          bannerBoldText={props.bannerContent.bannerBoldText || ''}
          bannerText={props.bannerContent.bannerText || ''}
          bannerLink={props.bannerContent.bannerLink || ''}
          bannerLinkHref={props.bannerContent.bannerLinkHref || ''}
          bannerButtonText={props.bannerContent.bannerButtonText || ''}
          bannerButtonLink={props.bannerContent.bannerButtonLink || ''}
          id={props.bannerContent.id || ''}
          bannerButtonExternalLink
          icon={props.bannerContent.icon || ''}
          popupContent={props.popupContent || ''}
          refPageAA={
            props.children.props.content?.heading ||
            props.children.props.pageContent?.title
          }
          openModal={openModal}
          closeModal={closeModal}
        ></PhaseBanner>
      )}
      <Header
        // analyticsTracking
        dataTestId="topnav"
        id="header"
        linkPath={props.langToggleLink}
        locale={false}
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
        isAuthenticated={props.isAuth}
        customLink={Link}
        dataGcAnalyticsCustomClickInstitutionVariable={
          props.children.props.aaPrefix
        }
        menuProps={{
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
              component: Link,
            },
            {
              key: 'profileKey',
              id: 'profile',
              value: t.menuItems.profile,
              path: `${props.locale === 'en' ? '/en/profile' : '/fr/profil'}`,
              component: Link,
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
              component: Link,
            },
            {
              key: 'contactKey',
              id: 'contact',
              value: t.menuItems.contactUs,
              path: `${
                props.locale === 'en' ? '/en/contact-us' : '/fr/contactez-nous'
              }`,
              component: Link,
            },
            {
              key: 'signOutKey',
              id: 'signOut',
              value: t.menuItems.signOut,
              path: '/auth/logout',
              component: Link,
              showIcon: true,
            },
          ],
        }}
        searchProps={{
          onChange: function noRefCheck() {},
          onSubmit: function noRefCheck() {},
        }}
      />
      <main id="mainContent">
        {display.fullscreen ? (
          props.children
        ) : (
          <LayoutContainer>
            {cloneElement(props.children, { openModal, closeModal })}
          </LayoutContainer>
        )}
      </main>
      <MultiModal
        openModalWithLink={openModalWithLink}
        openModal={openModal}
        closeModal={closeModal}
        popupContentNA={props.popupContentNA}
        aaPrefix={props.aaPrefix}
        t={t}
        popupStaySignedIn={props.popupStaySignedIn}
        popupContent={props.popupContent}
      />
      {/* <div id="modal-root">

      </div> */}

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
        isAuthenticated={true}
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
    bannerButtonText: PropTypes.string.isRequired,
    bannerButtonLink: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
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
    /*
     * Toggle the LayoutContainer from Design System (default on/true)
     */
    fullscreen: PropTypes.bool,
  }),
  breadCrumbItems: PropTypes.array,
}
