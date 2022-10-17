import PropTypes from 'prop-types'
import { Heading } from '@dts-stn/service-canada-design-system'
import PageLink from '../components/PageLink'
import en from '../locales/en'
import fr from '../locales/fr'

import { fetchContent } from '../lib/cms'

export default function Home(props) {
  /* istanbul ignore next */
  const t = props.locale === 'en' ? en : fr
  return (
    <div id="homeContent" data-testid="homeContent-test">
      <Heading id="my-dashboard-heading" title={t.pageHeading.profile} />

      <PageLink
        lookingForText={t.pageLinkSecurity}
        accessText={t.accessYourSecurityText}
        linkText={t.securityLinkText}
        href="/security"
        linkID="link-id"
        buttonHref="/home"
        buttonId="back-to-dashboard-button"
        buttonLinkText={t.backToDashboard}
      ></PageLink>
    </div>
  )
}

export async function getStaticProps({ locale }) {
  const content = await fetchContent()

  /* istanbul ignore next */
  const langToggleLink = locale === 'en' ? '/fr/profile' : '/profile'

  const t = locale === 'en' ? en : fr

  const breadCrumbItems = [
    {
      link: t.url_dashboard,
      text: t.pageHeading.title,
    },
  ]

  /* Place-holder Meta Data Props */
  const meta = {
    data_en: {
      title: 'My Service Canada Account - Profile',
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
    },
    data_fr: {
      title: 'Mon dossier Service Canada - Profil',
      desc: 'Français',
      author: 'Service Canada',
      keywords: '',
    },
  }

  return {
    props: { locale, langToggleLink, content, meta, breadCrumbItems },
  }
}

Home.propTypes = {
  /**
   * current locale in the address
   */
  locale: PropTypes.string,

  /*
   * Meta Tags
   */
  meta: PropTypes.object,
}
