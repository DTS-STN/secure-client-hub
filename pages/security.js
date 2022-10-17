import PropTypes from 'prop-types'
import { Heading } from '@dts-stn/service-canada-design-system'
import PageLink from '../components/PageLink'
import en from '../locales/en'
import fr from '../locales/fr'

export default function Home(props) {
  const t = props.locale === 'en' ? en : fr

  return (
    <div id="securityContent" data-testid="securityContent-test">
      <Heading id="my-dashboard-heading" title={t.pageHeading.security} />

      <PageLink
        lookingForText={t.pageLinkProfile}
        accessText={t.accessYourProfileText}
        linkText={t.profileLinkText}
        href="/profile"
        linkID="link-id"
        buttonHref="/home"
        buttonId="back-to-dashboard-button"
        buttonLinkText={t.backToDashboard}
      ></PageLink>
    </div>
  )
}

export async function getStaticProps({ locale }) {
  /* istanbul ignore next */
  const langToggleLink = locale === 'en' ? '/fr/security' : '/security'

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
      title: 'My Service Canada Account - Security',
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
    },
    data_fr: {
      title: 'Mon dossier Service Canada - Sécurité',
      desc: 'Français',
      author: 'Service Canada',
      keywords: '',
    },
  }

  return {
    props: { locale, langToggleLink, meta, breadCrumbItems },
  }
}

Home.propTypes = {
  /**
   * current locale in the address
   */
  locale: PropTypes.string,

  /*
   * Language link toggle text
   */
  langToggleLink: PropTypes.string,

  /*
   * Meta Tags
   */

  meta: PropTypes.object,

  /*
   * BreadCrumb Items
   */
  breadCrumbItems: PropTypes.object,
}
