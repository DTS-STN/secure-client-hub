import PropTypes from 'prop-types'
import { Heading, Link } from '@dts-stn/service-canada-design-system'
import PageLink from '../components/PageLink'
import en from '../locales/en'
import fr from '../locales/fr'
import { getSecurityContent } from '../graphql/mappers/security'
import logger from '../lib/logger'

export default function Security(props) {
  const t = props.locale === 'en' ? en : fr

  return (
    <div id="securityContent" data-testid="securityContent-test">
      <Heading id="my-dashboard-heading" title={props.content.heading} />
      <p className="mb-10 text-lg">{props.content.subHeading}</p>
      <Link
        id="securityQuestionsLink"
        dataTestId="securityQuestionsLink"
        text={props.content.securityQuestions.linkTitle.text}
        href={props.content.securityQuestions.linkTitle.link}
      />
      <p className="mb-8 text-lg">{props.content.securityQuestions.subTitle}</p>

      <Link
        id="eiAccessCodeLink"
        dataTestId="eiAccessCodeLink"
        text={props.content.eiAccessCode.linkTitle.text}
        href={props.content.eiAccessCode.linkTitle.link}
      />
      <p className="mb-8 text-lg">{props.content.eiAccessCode.subTitle}</p>
      <PageLink
        lookingForText={props.content.lookingFor.title}
        accessText={props.content.lookingFor.subText[0]}
        linkText={props.content.lookingFor.subText[1]}
        href={props.content.lookingFor.link}
        linkID="link-id"
        dataCy="access-profile-page-link"
        buttonHref={t.url_dashboard}
        buttonId="back-to-dashboard-button"
        buttonLinkText={t.backToDashboard}
      ></PageLink>
    </div>
  )
}

export async function getStaticProps({ res, locale }) {
  const content = await getSecurityContent().catch((error) => {
    logger.error(error)
    res.statusCode = 500
    throw error
  })
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
    props: {
      locale,
      langToggleLink,
      content: locale === 'en' ? content.en : content.fr,
      meta,
      breadCrumbItems,
    },
  }
}

Security.propTypes = {
  /**
   * current locale in the address
   */
  locale: PropTypes.string,

  /*
   * Language link toggle text
   */
  langToggleLink: PropTypes.string,

  /*
   * Content Tags
   */

  content: PropTypes.object,

  /*
   * Meta Tags
   */

  meta: PropTypes.object,

  /*
   * BreadCrumb Items
   */
  breadCrumbItems: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ),
}
