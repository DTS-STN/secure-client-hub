import PropTypes from 'prop-types'
import Heading from '../components/Heading'
import PageLink from '../components/PageLink'
import en from '../locales/en'
import fr from '../locales/fr'
import { getSecuritySettingsContent } from '../graphql/mappers/security-settings'
import { getBetaBannerContent } from '../graphql/mappers/beta-banner-opt-out'
import { getBetaPopupExitContent } from '../graphql/mappers/beta-popup-exit'
import { getBetaPopupNotAvailableContent } from '../graphql/mappers/beta-popup-page-not-available'
import { getAuthModalsContent } from '../graphql/mappers/auth-modals'
import { getLogger } from '../logging/log-util'
import { AuthIsDisabled, AuthIsValid, Redirect } from '../lib/auth'
import { authOptions } from '../pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import { useEffect, useCallback, useMemo, useState } from 'react'
import throttle from 'lodash.throttle'
import ErrorPage from '../components/ErrorPage'
import { useRouter } from 'next/router'
import Button from '../components/Button'

export default function SecuritySettings(props) {
  const t = props.locale === 'en' ? en : fr
  const [response, setResponse] = useState()
  const router = useRouter()

  //Event listener for click events that revalidates MSCA session, throttled using lodash to only trigger every 1 minute
  const onClickEvent = useCallback(
    async () => setResponse(await fetch('/api/refresh-msca')),
    []
  )
  const throttledOnClickEvent = useMemo(
    () => throttle(onClickEvent, 60000, { trailing: false }),
    [onClickEvent]
  )

  useEffect(() => {
    window.addEventListener('click', throttledOnClickEvent)
    //If validateSession call indicates an invalid MSCA session, redirect to logout
    if (response?.status === 401) {
      router.push(`/${props.locale}/auth/logout`)
    }
    //Remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener('click', throttledOnClickEvent)
    }
  }, [throttledOnClickEvent, response, router, props.locale])

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
    <div id="securityContent" data-testid="securityContent-test">
      <Heading id="security-settings-heading" title={props.content.heading} />
      <p className="mt-3 mb-8 text-xl text-gray-darker">
        {props.content.subHeading}
      </p>
      <Button
        id="securityQuestionsLink"
        style="link"
        text={props.content.securityQuestions.linkTitle.text}
        className="font-body text-20px pr-0 pl-0 focus:ring-0 focus:ring-offset-0"
        data-gc-analytics-customclick={`ESDC-EDSC:${props.aaPrefix}:securityQuestions`}
        onClick={(e) => {
          if (props.content.securityQuestions.schBetaPopUp) {
            e.preventDefault()
            props.openModal(
              props.content.securityQuestions.linkTitle.link,
              'betaModal'
            )
          }
        }}
      ></Button>

      <p className="mb-8 text-xl text-gray-darker">
        {props.content.securityQuestions.subTitle}
      </p>
      <PageLink
        lookingForText={props.content.lookingFor.title}
        accessText={props.content.lookingFor.subText[0]}
        linkText={props.content.lookingFor.subText[1]}
        href={props.content.lookingFor.link}
        dataCy="access-profile-page-link"
        buttonHref={t.url_dashboard}
        buttonId="back-to-dashboard-button"
        buttonLinkText={t.backToDashboard}
        refPageAA={props.aaPrefix}
        dashId={t.id_dashboard}
      ></PageLink>
    </div>
  )
}

export async function getServerSideProps({ req, res, locale }) {
  const session = await getServerSession(req, res, authOptions)

  if (!AuthIsDisabled() && !(await AuthIsValid(req, session)))
    return Redirect(locale)

  //The below sets the minimum logging level to error and surpresses everything below that
  const logger = getLogger('security-settings')
  logger.level = 'error'

  const content = await getSecuritySettingsContent().catch((error) => {
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
    locale === 'en' ? '/fr/parametres-securite' : '/en/security-settings'

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
      title: 'Security - My Service Canada Account',
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
      service: 'ESDC-EDSC_MSCA-MSDC-SCH',
      creator: 'Employment and Social Development Canada',
      accessRights: '1',
    },
    data_fr: {
      title: 'Sécurité - Mon dossier Service Canada',
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

SecuritySettings.propTypes = {
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
