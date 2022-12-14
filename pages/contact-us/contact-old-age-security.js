import PropTypes from 'prop-types'
import { Heading, TableContent } from '@dts-stn/service-canada-design-system'
import { Fragment } from 'react'
import en from '../../locales/en'
import fr from '../../locales/fr'
import ContactSection from '../../components/contact/ContactSection'
import ContactProvince from '../../components/contact/ContactProvince'
import { getBetaBannerContent } from '../../graphql/mappers/beta-banner-opt-out'
import { getBetaPopupExitContent } from '../../graphql/mappers/beta-popup-exit'
import { getBetaPopupNotAvailableContent } from '../../graphql/mappers/beta-popup-page-not-available'
import { getContactOldAgeSecurityContent } from '../../graphql/mappers/contact-old-age-security'
import logger from '../../lib/logger'
import React from 'react'

export default function ContactOldAgeSecurity(props) {
  /* istanbul ignore next */
  const t = props.locale === 'en' ? en : fr

  return (
    <div
      id="homeContent"
      data-testid="contactOAS-test"
      data-cy="oasContactUsContent"
    >
      <Heading id="my-dashboard-heading" title={props.pageContent.title} />
      <div
        className="py-5"
        data-testid={`${
          props.pageContent.items.length > 0 && 'tableOfContents-test'
        }`}
      />
      <TableContent
        sectionList={props.pageContent.items.map((item, i) => {
          return { name: item.title, link: `#${item.id}` }
        })}
      />

      {props.pageContent.items.map((item, i) => (
        <Fragment key={i}>
          {item.layout === 'provinces' ? (
            <ContactProvince {...item} i={i} />
          ) : (
            <ContactSection programUniqueId={i} {...item} />
          )}
        </Fragment>
      ))}
    </div>
  )
}

export async function getStaticProps({ res, locale }) {
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
  const langToggleLink =
    locale === 'en'
      ? '/fr/contact-us/contact-old-age-security'
      : '/contact-us/contact-old-age-security'

  const t = locale === 'en' ? en : fr

  const pageContent = await getContactOldAgeSecurityContent().catch((error) => {
    logger.error(error)
    // res.statusCode = 500
    throw error
  })

  const breadCrumbItems =
    locale === 'en'
      ? pageContent.en.breadcrumb?.map(({ link, text }) => {
          return { text, link: '/' + link }
        })
      : pageContent.fr.breadcrumb?.map(({ link, text }) => {
          return { text, link }
        })

  // const breadCrumbItems = [
  //   {
  //     link: 't.url_dashboard',
  //     text: 't.pageHeading.title',
  //   },
  //   {
  //     link: 't.pageHeading.title',
  //     text: 't.pageHeading.title',
  //   },
  // ]

  /* Place-holder Meta Data Props */
  const meta = {
    data_en: {
      title: 'My Service Canada Account - Contact Old Age Security',
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
    },
    data_fr: {
      title:
        'Mon dossier Service Canada - Communiquer avec la S??curit?? de la vieillesse',
      desc: 'Fran??ais',
      author: 'Service Canada',
      keywords: '',
    },
  }

  return {
    props: {
      locale,
      langToggleLink,
      meta,
      breadCrumbItems,
      bannerContent: locale === 'en' ? bannerContent.en : bannerContent.fr,
      popupContent: locale === 'en' ? popupContent.en : popupContent.fr,
      pageContent: locale === 'en' ? pageContent.en : pageContent.fr,
    },
  }
}

ContactOldAgeSecurity.propTypes = {
  /**
   * current locale in the address
   */
  locale: PropTypes.string,

  /*
   * Meta Tags
   */
  meta: PropTypes.object,
}
