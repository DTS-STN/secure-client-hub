import PropTypes from 'prop-types'
import Heading from '../components/Heading'
import PageLink from '../components/PageLink'
import en from '../locales/en'
import fr from '../locales/fr'
import { getProfileContent, ProfileContent } from '../graphql/mappers/profile'
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
import ProfileTasks, { Task } from '../components/ProfileTasks'
import React, { ReactNode } from 'react'
import { acronym } from '../lib/acronym'
import ErrorPage from '../components/ErrorPage'
import { GetServerSidePropsContext } from 'next'
import {
  deleteAllCookiesWithPrefix,
  extendExpiryTime,
} from '../lib/cookie-utils'
interface ProfilePageProps {
  locale: string | undefined
  content: {
    err?: '500' | '404' | '503'
    pageName: string
    heading: string
    list: {
      // TODO: Figure out what this return value is
      map: (
        arg0: (
          program: {
            title: string
            tasks: Task[]
          },
          index: string,
        ) => React.JSX.Element,
      ) => ReactNode
    }
    lookingFor: {
      title: string
      subText: string[]
      link: string
    }
    backToDashboard: { btnLink: string; btnText: string }
  }
  bannerContent?: {
    err?: '500' | '404' | '503'
  }
  popupContent?: {
    err?: '500' | '404' | '503'
  }
  popupContentNA?: {
    err?: '500' | '404' | '503'
  }
  // TODO: Is this actually being used?
  authModals?: {
    err?: '500' | '404' | '503'
  }
  aaPrefix: string
}

export default function Profile(props: ProfilePageProps) {
  /* istanbul ignore next */
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
    <div id="homeContent" data-testid="profileContent-test">
      <Heading id="profile-heading" title={props.content.pageName} />
      <p className="mt-2 text-lg text-gray-darker">{props.content.heading}</p>
      <div data-cy="profile-lists">
        {props.content.list.map((program, index) => {
          return (
            <ProfileTasks
              key={index}
              acronym={acronym(program.title)}
              programTitle={program.title}
              tasks={program.tasks}
              data-testid="profile-task-group-list"
              data-cy="task"
              refPageAA={props.aaPrefix}
            />
          )
        })}
      </div>

      <PageLink
        lookingForText={props.content.lookingFor.title}
        accessText={props.content.lookingFor.subText[0]}
        linkText={props.content.lookingFor.subText[1]}
        href={props.content.lookingFor.link}
        dataCy="access-security-page-link"
        buttonHref={props.content.backToDashboard.btnLink}
        buttonId="back-to-dashboard-button"
        buttonLinkText={props.content.backToDashboard.btnText}
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

  //If id token is valid, check to see if ECAS session is. If not, clear session cookies and redirect to login
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
  const logger = getLogger('profile')
  logger.level = 'error'

  const content = await getProfileContent().catch((error): ProfileContent => {
    logger.error(error)
    return { err: '500' }
  })

  const authModals = await getAuthModalsContent().catch(
    (error): AuthModalsContent => {
      logger.error(error)
      return { err: '500' }
    },
  )

  /* istanbul ignore next */
  const langToggleLink = locale === 'en' ? '/fr/profil' : '/en/profile'
  const breadCrumbItems =
    content.err !== undefined
      ? []
      : locale === 'en'
        ? content.en?.breadcrumb?.map(
            ({ link, text }: { link: string; text: string }) => {
              return { text, link: '/' + locale + '/' + link }
            },
          )
        : content.fr?.breadcrumb?.map(
            ({ link, text }: { link: string; text: string }) => {
              return { text, link: '/' + locale + '/' + link }
            },
          )

  /* Place-holder Meta Data Props */
  const meta = {
    data_en: {
      title: 'Profile - My Service Canada Account',
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
      service: 'ESDC-EDSC_MSCA-MSDC-SCH',
      creator: 'Employment and Social Development Canada',
      accessRights: '1',
    },
    data_fr: {
      title: 'Profil - Mon dossier Service Canada',
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
          : `ESDC-EDSC_MSCA-MSDC-SCH:${content.en?.pageName || content.en?.title}`,
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

Profile.propTypes = {
  /**
   * current locale in the address
   */
  locale: PropTypes.string,

  /*
   * Meta Tags
   */
  meta: PropTypes.object,
}
