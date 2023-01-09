import PropTypes from 'prop-types'
import { Heading, Link } from '@dts-stn/service-canada-design-system'
import PageLink from '../components/PageLink'
import en from '../locales/en'
import fr from '../locales/fr'
import { getContactUsContent } from '../graphql/mappers/contact-us'
import { getBetaBannerContent } from '../graphql/mappers/beta-banner-opt-out'
import { getBetaPopupExitContent } from '../graphql/mappers/beta-popup-exit'
import { getBetaPopupNotAvailableContent } from '../graphql/mappers/beta-popup-page-not-available'
import logger from '../lib/logger'
import LinkList from '../components/skeletons/LinkList'
import ContactIntro from '../components/skeletons/ContactIntro'
import ContactRows from '../components/skeletons/ContactRows'
import ProvinceRows from '../components/skeletons/ProvinceRows'

export default function ContactWaitingDeleteme(props) {
  const t = props.locale === 'en' ? en : fr

  return (
    <div id="contactContent" data-testid="contactContent-test">
      <Heading id="my-dashboard-heading" title="Waiting Skeletons" />
      <LinkList />
      <ContactIntro />
      <ContactRows />
      <ContactIntro />
      <ProvinceRows />
    </div>
  )
}

export async function getStaticProps({ res, locale }) {
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
  const langToggleLink = locale === 'en' ? '/fr/contact-us' : '/contact-us'

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
      title: 'My Service Canada Account - Contact',
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
    },
    data_fr: {
      title: 'Mon dossier Service Canada - Contactez-nous',
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
      bannerContent: locale === 'en' ? bannerContent.en : bannerContent.fr,
      popupContent: locale === 'en' ? popupContent.en : popupContent.fr,
    },
  }
}

ContactWaitingDeleteme.propTypes = {
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
