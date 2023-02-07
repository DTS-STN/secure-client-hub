import PropTypes from 'prop-types'
import { Heading, Link } from '@dts-stn/service-canada-design-system'
import en from '../locales/en'
import fr from '../locales/fr'
import { getContactUsContent } from '../graphql/mappers/contact-us'
import { getBetaBannerContent } from '../graphql/mappers/beta-banner-opt-out'
import { getBetaPopupExitContent } from '../graphql/mappers/beta-popup-exit'
import logger from '../lib/logger'

export default function ContactLanding(props) {
  const t = props.locale === 'en' ? en : fr

  return (
    <div id="contactContent" data-testid="contactContent-test">
      <Heading id="my-dashboard-heading" title={props.content.heading} />
      <p className="mt-3 mb-8 text-xl font-body">{props.content.subHeading}</p>

      <ul className="list-disc" data-cy="contact-task-list">
        {props.content.links.map((link) => {
          return (
            <li className="mb-6 ml-5" key={link.linkId}>
              <Link
                id={link.linkId}
                dataTestId={link.linkId}
                text={link.linkTitle}
                href={link.linkDestination.split('/').pop()}
              />
              <p className="text-xl font-body">{link.linkDescription}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export async function getServerSideProps({ res, locale }) {
  const content = await getContactUsContent().catch((error) => {
    logger.error(error)
    //res.statusCode = 500
    throw error
  })
  const bannerContent = await getBetaBannerContent().catch((error) => {
    logger.error(error)
    // res.statusCode = 500
    throw error
  })
  const popupContent = await getBetaPopupExitContent().catch((error) => {
    logger.error(error)
    // res.statusCode = 500
    throw error
  })

  /* 
   * Uncomment this block to make Banner Popup Content display "Page Not Available"
   * Comment "getBetaPopupExitContent()" block of code above.
  
    const popupContent = await getBetaPopupNotAvailableContent().catch((error) => {
      logger.error(error)
      // res.statusCode = 500
      throw error
    })
  */

  /* istanbul ignore next */
  const langToggleLink = locale === 'en' ? '/fr/contactez-nous' : '/contact-us'

  const t = locale === 'en' ? en : fr

  const breadCrumbItems =
    locale === 'en'
      ? content.en.breadcrumb?.map(({ link, text }) => {
          return { text, link: '/' + locale + '/' + link }
        })
      : content.fr.breadcrumb?.map(({ link, text }) => {
          return { text, link: '/' + locale + '/' + link }
        })

  /* Place-holder Meta Data Props */
  const meta = {
    data_en: {
      title: 'My Service Canada Account - Contact',
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
      service: 'ESDC-EDSC_MSCA-MSDC',
      creator: 'Employment and Social Development Canada',
      accessRights: '1',
    },
    data_fr: {
      title: 'Mon dossier Service Canada - Contactez-nous',
      desc: 'Français',
      author: 'Service Canada',
      keywords: '',
      service: 'ESDC-EDSC_MSCA-MSDC',
      creator: 'Emploi et Développement social Canada',
      accessRights: '1',
    },
  }

  return {
    props: {
      locale,
      langToggleLink,
      content: locale === 'en' ? content.en : content.fr,
      meta,
      breadCrumbItems,
      bannerContent: locale === 'en' ? bannerContent.en : bannerContent.fr,
      popupContent: locale === 'en' ? popupContent.en : popupContent.fr,
    },
  }
}

ContactLanding.propTypes = {
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
