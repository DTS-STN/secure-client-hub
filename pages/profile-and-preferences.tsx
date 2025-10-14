import { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth/next'
import PropTypes from 'prop-types'
import React from 'react'
import ErrorPage from '../components/ErrorPage'
import Heading from '../components/Heading'
import ProfileList from '../components/ProfileList'
import {
  AuthModalsContent,
  getAuthModalsContent,
} from '../graphql/mappers/auth-modals'
import {
  getProfilePrefContent,
  ProfileListContent,
  ProfilePrefContent,
} from '../graphql/mappers/profile-and-preferences'
import {
  AuthIsDisabled,
  AuthIsValid,
  getIdToken,
  Redirect,
  ValidateSession,
} from '../lib/auth'
import { getLogger } from '../logging/log-util'
import { authOptions } from './api/auth/[...nextauth]'

interface ProfilePageProps {
  locale: string | undefined
  content: {
    err?: '500' | '404' | '503'
    pageName: string
    introText?: string
    profileAccountInfo?: ProfileListContent
    profilePersonalInfo?: ProfileListContent
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
      <p className="mt-8 text-xl text-gray-darker">{props.content.introText}</p>
      <ProfileList
        sectionName={props.content.profileAccountInfo?.sectionName ?? ''}
        profileCards={props.content.profileAccountInfo?.elements ?? []}
        aaPrefix={props.aaPrefix}
      />
      <ProfileList
        sectionName={props.content.profilePersonalInfo?.sectionName ?? ''}
        profileCards={props.content.profilePersonalInfo?.elements ?? []}
        aaPrefix={props.aaPrefix}
      />
      <div className="mb-8" />
    </div>
  )
}

export async function getServerSideProps({
  req,
  res,
  locale,
}: {
  req: GetServerSidePropsContext['req']
  res: GetServerSidePropsContext['res']
  locale: string
}) {
  const session = await getServerSession(req, res, authOptions)

  if (!AuthIsDisabled() && !(await AuthIsValid(req, session)))
    return Redirect(locale)

  const token = await getIdToken(req)

  //If Next-Auth session is valid, check to see if ECAS session is. If not, clear session cookies and redirect to login
  if (!AuthIsDisabled() && (await AuthIsValid(req, session))) {
    const sessionValid = await ValidateSession(
      process.env.CLIENT_ID,
      token?.sid,
    )
    if (!sessionValid) {
      // Clear all session cookies
      const isSecure = req.headers['x-forwarded-proto'] === 'https'
      const cookiePrefix = `${isSecure ? '__Secure-' : ''}next-auth.session-token`
      const cookies = []
      for (const cookie of Object.keys(req.cookies)) {
        if (cookie.startsWith(cookiePrefix)) {
          cookies.push(
            `${cookie}=deleted; Max-Age=0; path=/ ${isSecure ? '; Secure ' : ''}`,
          )
        }
      }
      res.setHeader('Set-Cookie', cookies)
      return {
        redirect: {
          destination: `/${locale}/auth/login`,
          permanent: false,
        },
      }
    }
  }

  //The below sets the minimum logging level to error and surpresses everything below that
  const logger = getLogger('profile')
  logger.level = 'error'

  const content = await getProfilePrefContent().catch(
    (error): ProfilePrefContent => {
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
    locale === 'en'
      ? '/fr/profil-et-preferences'
      : '/en/profile-and-preferences'
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
          : `ESDC-EDSC_MSCA-MSDC-SCH:${content.en?.pageName}`,
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
