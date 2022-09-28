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
  const t = props.locale === 'en' ? en : fr

  const defaultBreadcrumbs = [
    {
      link: t.url_canada_ca,
      text: t.canada_ca,
    },
    {
      link: t.url_serviceCanada,
      text: t.serviceCanada,
    },
  ]

  return (
    <>
      <MetaData language={props.locale} data={props.meta}></MetaData>

      <Header
        id="header"
        lang={props.locale}
        linkPath={props.langToggleLink}
        breadCrumbItems={
          props.breadCrumbItems
            ? defaultBreadcrumbs.concat(props.breadCrumbItems)
            : defaultBreadcrumbs
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
          dashboardPath: '/dashboard',
          onSignOut: () => {
            console.log('todo: implement logout')
          },
          profilePath: '/profile',
          securityPath: '/security-settings',
          signOutPath: '/',
        }}
        searchProps={{
          onChange: function noRefCheck() {},
          onSubmit: function noRefCheck() {},
        }}
      />

      <main>
        <div>{props.children}</div>
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
}
