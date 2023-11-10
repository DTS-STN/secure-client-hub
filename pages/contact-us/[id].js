import PropTypes from 'prop-types'
import TableContents from '../../components/TableContents'
import Heading from '../../components/Heading'
import { Fragment } from 'react'
import en from '../../locales/en'
import fr from '../../locales/fr'
import ContactSection from '../../components/contact/ContactSection'
import ContactProvince from '../../components/contact/ContactProvince'
import { getBetaBannerContent } from '../../graphql/mappers/beta-banner-opt-out'
import { getBetaPopupExitContent } from '../../graphql/mappers/beta-popup-exit'
import { getBetaPopupNotAvailableContent } from '../../graphql/mappers/beta-popup-page-not-available'
import { getAuthModalsContent } from '../../graphql/mappers/auth-modals'
import { getContactUsPage } from '../../graphql/mappers/contact-us-pages-dynamic'
import { getLogger } from '../../logging/log-util'
import React from 'react'
import { useEffect, useCallback, useMemo } from 'react'
import throttle from 'lodash.throttle'

export default function ContactUsPage(props) {
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
      data-testid="contactUsPage-test"
      data-cy="ContactUsContent"
    >
      <Heading id="my-dashboard-heading" title={props.pageContent.title} />
      <div
        className="py-5"
        data-testid={`${
          props.pageContent.items.length > 0 && 'tableOfContents-test'
        }`}
      />
      <TableContents
        id="cppContent"
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

export async function getServerSideProps({ res, locale, params }) {
  //The below sets the minimum logging level to error and surpresses everything below that
  const logger = getLogger(params.id)
  logger.level = 'error'

  const bannerContent = await getBetaBannerContent().catch((error) => {
    logger.error(error)
    return { err: '500' }
  })
  const popupContent = await getBetaPopupExitContent().catch((error) => {
    logger.error(error)
    return { err: '500' }
  })

  /*
   * Uncomment this block to make Banner Popup Content display "Page Not Available"
   * Comment "getBetaPopupExitContent()" block of code above.
   */
  const popupContentNA = await getBetaPopupNotAvailableContent().catch(
    (error) => {
      logger.error(error)
      return { err: '500' }
    }
  )

  const authModals = await getAuthModalsContent().catch((error) => {
    logger.error(error)
    return { err: '500' }
  })

  /* 
   * Uncomment this block to make Banner Popup Content display "Page Not Available"
   * Comment "getBetaPopupExitContent()" block of code above.
  
    const popupContent = await getBetaPopupNotAvailableContent().catch((error) => {
       logger.error(error)
    return { err: '500' }
    })
  */

  /* istanbul ignore next */
  const t = locale === 'en' ? en : fr

  /*
    For some reason when using dynamic routes, the locale gets set to the default (und) after trying to switch back to English from French.
    The below fixes this issue by setting the locale to English if it is undefined, which is what the middleware is doing on all
    other pages and what it should also be doing for the contact pages.
  */
  if (locale === 'und') {
    locale = 'en'
  }

  const pageContent = await getContactUsPage(params.id).catch((error) => {
    logger.error(error)
    return { err: '500' }
  })

  //Redirect to 404 page if user navigates to non-existent page
  if (!pageContent) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    }
  }

  const langToggleLink =
    locale === 'en'
      ? `/fr/contactez-nous/${pageContent.fr.pageName}`
      : `/en/contact-us/${pageContent.en.pageName}`

  const breadCrumbItems =
    locale === 'en'
      ? pageContent.en.breadcrumb?.map(({ link, text }) => {
          return { text, link: '/' + locale + '/' + link }
        })
      : pageContent.fr.breadcrumb?.map(({ link, text }) => {
          return { text, link: '/' + locale + '/' + link }
        })

  /* Place-holder Meta Data Props */
  const meta = {
    data_en: {
      title: `${pageContent.en.title} - My Service Canada Account`,
      desc: pageContent.en.description,
      author: 'Service Canada',
      keywords: '',
      service: 'ESDC-EDSC_MSCA-MSDC',
      creator: 'Service Canada',
      accessRights: '1',
    },
    data_fr: {
      title: `${pageContent.fr.title} - Mon dossier Service Canada`,
      desc: pageContent.fr.description,
      author: 'Service Canada',
      keywords: '',
      service: 'ESDC-EDSC_MSCA-MSDC',
      creator: 'Service Canada',
      accessRights: '1',
    },
  }

  return {
    props: {
      locale,
      langToggleLink,
      pageContent:
        pageContent?.err !== undefined
          ? pageContent
          : locale === 'en'
          ? pageContent.en
          : pageContent.fr,
      meta,
      breadCrumbItems,
      bannerContent:
        bannerContent?.err !== undefined
          ? bannerContent
          : locale === 'en'
          ? bannerContent.en
          : bannerContent.fr,
      popupContent:
        popupContent?.err !== undefined
          ? popupContent
          : locale === 'en'
          ? popupContent.en
          : popupContent.fr,
      popupContentNA:
        popupContentNA?.err !== undefined
          ? popupContentNA
          : locale === 'en'
          ? popupContentNA.en
          : popupContentNA.fr,
      aaPrefix:
        pageContent?.err !== undefined
          ? ''
          : `ESDC-EDSC:${pageContent.en?.heading || pageContent.en?.title}`,
      popupStaySignedIn:
        authModals?.err !== undefined
          ? authModals
          : locale === 'en'
          ? authModals.mappedPopupStaySignedIn.en
          : authModals.mappedPopupStaySignedIn.fr,
      popupYouHaveBeenSignedout:
        authModals?.err !== undefined
          ? authModals
          : locale === 'en'
          ? authModals.mappedPopupSignedOut.en
          : authModals.mappedPopupSignedOut.fr,
    },
  }
}

ContactUsPage.propTypes = {
  /**
   * current locale in the address
   */
  locale: PropTypes.string,

  /*
   * Meta Tags
   */
  meta: PropTypes.object,
}
