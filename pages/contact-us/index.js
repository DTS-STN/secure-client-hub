import PropTypes from 'prop-types'
import Link from 'next/link'
import Heading from '../../components/Heading'
import { getBetaPopupNotAvailableContent } from '../../graphql/mappers/beta-popup-page-not-available'
import { getAuthModalsContent } from '../../graphql/mappers/auth-modals'
import en from '../../locales/en'
import fr from '../../locales/fr'
import { getContactUsContent } from '../../graphql/mappers/contact-us'
import { getBetaBannerContent } from '../../graphql/mappers/beta-banner-opt-out'
import { getBetaPopupExitContent } from '../../graphql/mappers/beta-popup-exit'
import { AuthIsDisabled, AuthIsValid, Redirect } from '../../lib/auth'
import { authOptions } from '../../pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import { ErrorPage } from '../../components/ErrorPage'
import { useEffect, useCallback, useMemo } from 'react'
import throttle from 'lodash.throttle'
import { getLogger } from '../../logging/log-util'

export default function ContactLanding(props) {
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

  const errorCode =
    props.content?.err ||
    props.bannerContent?.err ||
    props.popupContent?.err ||
    props.popupContentNA?.err ||
    props.authModals?.err
  if (errorCode !== undefined) {
    return (
      <ErrorPage
        lang={props.locale !== undefined ? props.locale : 'en'}
        errType={errorCode}
        isAuth={false}
        homePageLink={
          props.locale === 'en'
            ? 'en/privacy-notice-terms-conditions'
            : 'fr/avis-confidentialite-modalites'
        }
        accountPageLink={
          props?.locale === 'en'
            ? 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/home-accueil?Lang=eng'
            : 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/home-accueil?Lang=fra'
        }
      />
    )
  }

  return (
    <div id="contactContent" data-testid="contactContent-test">
      <Heading id="my-dashboard-heading" title={props.content.heading} />
      <p className="mt-3 mb-8 text-xl text-gray-darker">
        {props.content.subHeading}
      </p>
      <ul className="list-disc" data-cy="contact-task-list">
        {props.content.links.map((link) => {
          return (
            <li className="mb-6 ml-5" key={link.linkId}>
              <Link
                className="underline text-blue-primary font-body text-20px hover:text-blue-hover focus:text-blue-hover"
                id={link.linkId}
                data-testid={link.linkId}
                aria-label={link.linkTitle}
                href={`/${props.locale}/${
                  props.content.pageName
                }/${link.linkDestination.split('/').pop()}`}
                data-gc-analytics-customclick={`ESDC-EDSC:Contact Us:${link.linkTitle}`}
              >
                {link.linkTitle}
              </Link>
              <p className="text-xl text-gray-darker">{link.linkDescription}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export async function getServerSideProps({ req, res, locale }) {
  const session = await getServerSession(req, res, authOptions)

  if (!AuthIsDisabled() && !(await AuthIsValid(req, session)))
    return Redirect(locale)

  //The below sets the minimum logging level to error and surpresses everything below that
  const logger = getLogger('contact-us')
  logger.level = 'error'

  const content = await getContactUsContent().catch((error) => {
    logger.error(error)
    return { err: '500' }
  })
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
  const langToggleLink =
    locale === 'en' ? '/fr/contactez-nous' : '/en/contact-us'

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
      title: 'Contact - My Service Canada Account - Contact',
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
      service: 'ESDC-EDSC_MSCA-MSDC-SCH',
      creator: 'Employment and Social Development Canada',
      accessRights: '1',
    },
    data_fr: {
      title: 'Contactez-nous - Mon dossier Service Canada',
      desc: 'Français',
      author: 'Service Canada',
      keywords: '',
      service: 'ESDC-EDSC_MSCA-MSDC-SCH',
      creator: 'Emploi et Développement social Canada',
      accessRights: '1',
    },
  }

  return {
    props: {
      locale,
      langToggleLink,
      content:
        content?.err !== undefined
          ? content
          : locale === 'en'
          ? content.en
          : content.fr,
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
        content?.err !== undefined
          ? ''
          : `ESDC-EDSC:${content.en?.heading || content.en?.title}`,
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
