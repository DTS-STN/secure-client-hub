import PropTypes from 'prop-types'
import Heading from '../components/Heading'
import PageLink from '../components/PageLink'
import en from '../locales/en'
import fr from '../locales/fr'
import {
  getSecuritySettingsContent,
  SecuritySettingsContent,
} from '../graphql/mappers/security-settings'
import {
  AuthModalsContent,
  getAuthModalsContent,
} from '../graphql/mappers/auth-modals'
import { getLogger } from '../logging/log-util'
import {
  AuthIsDisabled,
  AuthIsValid,
  ValidateSession,
  Redirect,
  getIdToken,
} from '../lib/auth'
import {
  deleteAllCookiesWithPrefix,
  extendExpiryTime,
} from '../lib/cookie-utils'

import ErrorPage from '../components/ErrorPage'
import Button from '../components/Button'
import { GetServerSidePropsContext } from 'next'
interface SecurtitySettingsProps {
  locale: string | undefined
  content: {
    err?: '500' | '404' | '503'
    heading: string
    subHeading: string
    securityQuestions: {
      linkTitle: { link: string | undefined; text: string }
      subTitle: string
    }
    lookingFor: { title: string; subText: string[]; link: string }
  }
  bannerContent?: { err?: '500' | '404' | '503' }
  popupContent?: { err?: '500' | '404' | '503' }
  popupContentNA?: { err?: '500' | '404' | '503' }
  authModals?: { err?: '500' | '404' | '503' }
  aaPrefix: string
}

export default function SecuritySettings(props: SecurtitySettingsProps) {
  const t = props.locale === 'en' ? en : fr

  const errorCode =
    props.content.err ||
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
          props.locale === 'en' ? 'en/my-dashboard' : 'fr/mon-tableau-de-bord'
        }
        accountPageLink={
          props.locale === 'en'
            ? 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/home-accueil?Lang=eng'
            : 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/home-accueil?Lang=fra'
        }
      />
    )
  }

  return (
    <div id="securityContent" data-testid="securityContent-test">
      <Heading id="security-settings-heading" title={props.content.heading} />
      <p className="mb-8 mt-3 text-xl text-gray-darker">
        {props.content.subHeading}
      </p>
      <Button
        data-testid="securityQuestionsLink"
        href={props.content.securityQuestions.linkTitle.link}
        id="securityQuestionsLink"
        style="link"
        text={props.content.securityQuestions.linkTitle.text}
        className="w-fit pl-0 pr-0 font-body text-20px underline"
        refPageAA={props.aaPrefix}
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

export async function getServerSideProps({
  locale,
  req,
  res,
}: {
  locale: GetServerSidePropsContext['locale']
  req: GetServerSidePropsContext['req']
  res: GetServerSidePropsContext['res']
}) {
  const authDisabled = AuthIsDisabled() ? true : false
  const authValid = await AuthIsValid(req)

  if (!authValid) {
    deleteAllCookiesWithPrefix(
      req,
      res,
      process.env.AUTH_COOKIE_PREFIX as string,
    )
  }

  if (!authDisabled && !authValid) return Redirect(locale as string)

  const idToken = await getIdToken(req)
  const idTokenJson = JSON.parse(idToken as string)

  //If Next-Auth session is valid, check to see if ECAS session is. If not, clear session cookies and redirect to login
  if (!authDisabled) {
    const sessionValid = await ValidateSession(
      process.env.CLIENT_ID as string,
      idTokenJson?.sid,
    )
    if (!sessionValid) {
      deleteAllCookiesWithPrefix(
        req,
        res,
        process.env.AUTH_COOKIE_PREFIX as string,
      )

      return {
        redirect: {
          destination: `/${locale}/auth/login`,
          permanent: false,
        },
      }
    } else {
      extendExpiryTime(
        req,
        res,
        'idToken',
        Number(process.env.SESSION_MAX_AGE as string),
      )
    }
  }
  //The below sets the minimum logging level to error and surpresses everything below that
  const logger = getLogger('security-settings')
  logger.level = 'error'

  const content = await getSecuritySettingsContent().catch(
    (error): SecuritySettingsContent => {
      logger.error(error)
      return { err: '500' }
    },
  )

  const authModals = await getAuthModalsContent().catch(
    (error): AuthModalsContent => {
      logger.error(error)
      return { err: '500' }
    },
  )

  /* istanbul ignore next */
  const langToggleLink =
    locale === 'en' ? '/fr/parametres-securite' : '/en/security-settings'

  const breadCrumbItems =
    locale === 'en'
      ? content.en?.breadcrumb?.map(({ link, text }) => {
          return { text, link: '/' + locale + '/' + link }
        })
      : content.fr?.breadcrumb?.map(({ link, text }) => {
          return { text, link: '/' + locale + '/' + link }
        })

  /* Place-holder Meta Data Props */
  const meta = {
    data_en: {
      title: 'Security settings - My Service Canada Account',
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
      service: 'ESDC-EDSC_MSCA-MSDC-SCH',
      creator: 'Employment and Social Development Canada',
      accessRights: '1',
    },
    data_fr: {
      title: 'Paramètres de sécurité - Mon dossier Service Canada',
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
        content.err !== undefined
          ? content
          : locale === 'en'
            ? content.en
            : content.fr,
      meta,
      breadCrumbItems,
      aaPrefix:
        content.err !== undefined
          ? ''
          : `ESDC-EDSC_MSCA-MSDC-SCH:${content.en?.heading}`,
      aaMenuPrefix:
        content.err !== undefined ? '' : `ESDC-EDSC_MSCA-MSDC-SCH:Nav Menu`,
      popupStaySignedIn:
        authModals.err !== undefined
          ? authModals
          : locale === 'en'
            ? authModals.mappedPopupStaySignedIn?.en
            : authModals.mappedPopupStaySignedIn?.fr,
      popupYouHaveBeenSignedout:
        authModals.err !== undefined
          ? authModals
          : locale === 'en'
            ? authModals.mappedPopupSignedOut?.en
            : authModals.mappedPopupSignedOut?.fr,
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
    }),
  ),
}
