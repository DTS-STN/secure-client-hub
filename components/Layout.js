import PropTypes from 'prop-types'
import {
  Header,
  Footer,
  LayoutContainer,
} from '@dts-stn/service-canada-design-system'
import MetaData from './MetaData'

import en from '../locales/en'
import fr from '../locales/fr'

export default function Layout(props) {
  const display = props.display ?? {}
  const t = props.locale === 'en' ? en : fr

  const defaultBreadcrumbs = []

  return (
    <>
      <MetaData language={props.locale} data={props.meta}></MetaData>

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
          craPath:
            '/https://www.canada.ca/fr/agence-revenu/services/services-electroniques/services-electroniques-particuliers/dossier-particuliers.html',
          dashboardPath: `${props.locale === 'en' ? '' : '/fr'}/my-dashboard`,
          onSignOut: () => {
            console.log('todo: implement logout')
          },
          profilePath: `${props.locale === 'en' ? '' : '/fr'}/profile`,
          securityPath: `${
            props.locale === 'en' ? '' : '/fr'
          }/security-settings`,
          signOutPath: '/',
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
   * Link of the page in opposite language
   */
  langToggleLink: PropTypes.string,
  display: PropTypes.shape({
    /*
     * Toggle use of Phase (default false)
     */
    showPhase: PropTypes.bool,
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
