import PropTypes from 'prop-types'
import {
  Header,
  Footer,
  LayoutContainer,
} from '@dts-stn/service-canada-design-system'
import MetaData from './MetaData'
import { signOut } from 'next-auth/react'
import PhaseBanner from './PhaseBanner'
import Modal from 'react-modal'
import { useEffect, useCallback } from 'react'
import en from '../locales/en'
import fr from '../locales/fr'
import Link from 'next/link'

export default function Layout(props) {
  const display = props.display ?? {}
  const t = props.locale === 'en' ? en : fr
  const defaultBreadcrumbs = []
  const contactLink =
    props.locale === 'en' ? '/en/contact-us' : '/fr/contactez-nous'

  useEffect(() => {
    Modal.setAppElement('#modal-root')
  }, [])

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
          bannerButtonExternalText={
            props.bannerContent.bannerButtonExternalText || ''
          }
          bannerButtonExternalLink
          icon={props.bannerContent.icon || ''}
          popupContent={props.popupContent || ''}
          refPageAA={
            props.children.props.content?.heading ||
            props.children.props.pageContent?.title
          }
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
        dataGcAnalyticsCustomClickInstitutionVariable={`ESDC-EDSC:${
          props.children.props.content?.heading ||
          props.children.props.pageContent?.title
        }`}
        menuProps={{
          onSignOut: () => {
            signOut()
          },
          menuList: [
            {
              key: 'dashKey',
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
              value: t.menuItems.profile,
              path: `${props.locale === 'en' ? '/en/profile' : '/fr/profil'}`,
              component: Link,
            },
            {
              key: 'securityKey',
              value: t.menuItems.security,
              path: `${
                props.locale === 'en'
                  ? '/en/security-settings'
                  : '/fr/parametres-securite'
              }`,
              component: Link,
            },
            {
              key: 'signOutKey',
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
          <LayoutContainer>{props.children}</LayoutContainer>
        )}
      </main>
      <div id="modal-root"></div>

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
