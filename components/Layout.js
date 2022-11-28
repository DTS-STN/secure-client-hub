import PropTypes from 'prop-types'
import {
  Header,
  Footer,
  LayoutContainer,
} from '@dts-stn/service-canada-design-system'
import MetaData from './MetaData'
import PhaseBanner from './PhaseBanner'
import Modal from 'react-modal'
import { useEffect } from 'react'

import en from '../locales/en'
import fr from '../locales/fr'

export default function Layout(props) {
  const display = props.display ?? {}
  const t = props.locale === 'en' ? en : fr

  const defaultBreadcrumbs = []

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
          bannerBoldText={props.bannerContent.bannerBoldText}
          bannerText={props.bannerContent.bannerText}
          bannerLink={props.bannerContent.bannerLink}
          bannerLinkHref={props.bannerContent.bannerLinkHref}
          bannerButtonText={props.bannerContent.bannerButtonText}
          bannerButtonLink={props.bannerContent.bannerButtonLink}
          icon={props.bannerContent.icon}
          popupContent={props.popupContent}
        ></PhaseBanner>
      )}
      <Header
        id="header"
        lang={props.locale}
        linkPath={props.langToggleLink}
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
        menuProps={{
          //   craPath:
          //     '/https://www.canada.ca/fr/agence-revenu/services/services-electroniques/services-electroniques-particuliers/dossier-particuliers.html',
          //   dashboardPath: `${props.locale === 'en' ? '' : '/fr'}/my-dashboard`,
          onSignOut: () => {
            console.log('todo: implement logout')
          },
          menuList: [
            {
              key: 'dashKey',
              value: `${
                props.locale === 'en' ? 'My Dashboard' : '(FR)My DashBoard'
              }`,
              path: `${props.locale === 'en' ? '' : '/fr'}/my-dashboard`,
            },
            {
              key: 'securityKey',
              value: `${
                props.locale === 'en'
                  ? 'Security Settings'
                  : '(FR)Security Settings'
              }`,
              path: `${props.locale === 'en' ? '' : '/fr'}/security-settings`,
            },
            {
              key: 'profileKey',
              value: `${props.locale === 'en' ? 'Profile' : '(FR)Profile'}`,
              path: `${props.locale === 'en' ? '' : '/fr'}/profile`,
            },
            {
              key: 'signOutKey',
              value: `${props.locale === 'en' ? 'Sign Out' : '(FR)Sign Out'}`,
              path: `/`,
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
        id="page-footer"
        lang={props.locale}
        btnLink="/"
        isAuthenticated={true}
      />
    </>
  )
}

/**
 * Setup default props
 */

Layout.defaultProps = {
  title: 'Service.Canada.ca',
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
