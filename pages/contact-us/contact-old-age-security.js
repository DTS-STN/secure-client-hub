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
import { getAuthModalsContent } from '../../graphql/mappers/auth-modals'
import logger from '../../lib/logger'
import React from 'react'
import Markdown from 'markdown-to-jsx'
import { useEffect, useCallback, useMemo } from 'react'
import throttle from 'lodash.throttle'

export default function ContactOldAgeSecurity(props) {
  /* istanbul ignore next */
  const t = props.locale === 'en' ? en : fr

  //Event listener for click events that revalidates MSCA session, throttled using lodash to only trigger every 15 seconds
  const onClickEvent = useCallback(() => fetch('/api/refresh-msca'), [])
  const throttledOnClickEvent = useMemo(
    () => throttle(onClickEvent, 15000, { trailing: false }),
    [onClickEvent]
  )

  useEffect(() => {
    window.addEventListener('click', throttledOnClickEvent)
    //Remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener('click', throttledOnClickEvent)
    }
  }, [throttledOnClickEvent])

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
      <div className="pb-4 prose max-w-none prose-p:text-xl prose-p:mb-2 prose-p:font-body prose-ul:my-0 prose-ul:ml-2 prose-li:font-body prose-li:text-xl prose-li:marker:text-black">
        {' '}
        <Markdown>{props.pageContent.intro}</Markdown>
      </div>

      <TableContent
        id="oasContent"
        sectionList={props.pageContent.items.map((item, i) => {
          return { name: item.title, link: `#${item.id}` }
        })}
        lang={props.locale}
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

export async function getServerSideProps({ res, locale }) {
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
      ? '/fr/contactez-nous/communiquer-securite-vieillesse'
      : '/contact-us/contact-old-age-security'

  const t = locale === 'en' ? en : fr

  const pageContent = await getContactOldAgeSecurityContent().catch((error) => {
    logger.error(error)
    // res.statusCode = 500
    throw error
  })

  /*
   * Uncomment this block to make Banner Popup Content display "Page Not Available"
   * Comment "getBetaPopupExitContent()" block of code above.
   */
  const popupContentNA = await getBetaPopupNotAvailableContent().catch(
    (error) => {
      logger.error(error)
      // res.statusCode = 500
      throw error
    }
  )

  const authModals = await getAuthModalsContent().catch((error) => {
    logger.error(error)
    // res.statusCode = 500
    throw error
  })

  const breadCrumbItems =
    locale === 'en'
      ? pageContent.en.breadcrumb?.map(({ link, text }) => {
          return { text, link: '/' + locale + '/' + link }
        })
      : pageContent.fr.breadcrumb?.map(({ link, text }) => {
          return { text, link: '/' + locale + '/' + link }
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
      title: 'Contact Old Age Security - My Service Canada Account',
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
      service: 'ESDC-EDSC_MSCA-MSDC',
      creator: 'Employment and Social Development Canada',
      accessRights: '1',
    },
    data_fr: {
      title:
        'Communiquer avec la Sécurité de la vieillesse - Mon dossier Service Canada',
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
      meta,
      breadCrumbItems,
      bannerContent: locale === 'en' ? bannerContent.en : bannerContent.fr,
      popupContent: locale === 'en' ? popupContent.en : popupContent.fr,
      pageContent: locale === 'en' ? pageContent.en : pageContent.fr,
      popupContentNA: locale === 'en' ? popupContentNA.en : popupContentNA.fr,
      aaPrefix: `ESDC-EDSC:${pageContent.en?.heading || pageContent.en?.title}`,
      popupStaySignedIn:
        locale === 'en'
          ? authModals.mappedPopupStaySignedIn.en
          : authModals.mappedPopupStaySignedIn.fr,
      popupYouHaveBeenSignedout:
        locale === 'en'
          ? authModals.mappedPopupSignedOut.en
          : authModals.mappedPopupSignedOut.fr,
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
