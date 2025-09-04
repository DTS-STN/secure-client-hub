import { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth/next'
import PropTypes from 'prop-types'
import React from 'react'
import ErrorPage from '../components/ErrorPage'
import Heading from '../components/Heading'
import {
  AuthModalsContent,
  getAuthModalsContent,
} from '../graphql/mappers/auth-modals'
import {
  getInboxNotifPrefSuccessContent,
  InboxNotifPrefSuccessContent,
  InboxNotifPrefSuccessButtonContent,
} from '../graphql/mappers/inbox-notification-preferences-success'
import {
  AuthIsDisabled,
  AuthIsValid,
  getIdToken,
  Redirect,
  ValidateSession,
} from '../lib/auth'
import { getLogger } from '../logging/log-util'
import { authOptions } from './api/auth/[...nextauth]'
import ContextualAlert from '../components/ContextualAlert'
import Button from '../components/Button'

interface InboxNotifPrefSuccessPageProps {
  locale: string | undefined
  content: {
    err?: '500' | '404' | '503'
    pageName: string
    pageAlerts: {
      id: string
      alertHeading: string | undefined
      alertBody: null
      type: string[]
    }[]
    backButton?: InboxNotifPrefSuccessButtonContent
    dashboardButton?: InboxNotifPrefSuccessButtonContent
    InboxNotifPrefSuccess?: InboxNotifPrefSuccessContent
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

export default function InboxSuccess(props: InboxNotifPrefSuccessPageProps) {
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
      <Heading
        id="inbox-notification-preferences-success-heading"
        title={props.content.pageName}
      />
      {props.content.pageAlerts.map((alert, index) => {
        const alertType = alert.type[0].split('/').pop()
        return (
          <ul className="mt-6 w-full max-w-xl" key={index}>
            <ContextualAlert
              id={alert.id}
              type={alertType}
              alertHeading={alert.alertHeading}
              alertBody=""
              alert_icon_id={` alert-icon ${alert.id}`}
              alert_icon_alt_text=""
            />
          </ul>
        )
      })}
      <div className="flex items-center justify-start gap-6 py-8">
        <Button
          id={props.content.backButton?.id ?? ''}
          text={props.content.backButton?.linkText ?? ''}
          style="secondary"
          className="w-fit rounded border-[2px] border-[#2B4380] bg-white"
          href={
            props.locale === 'en'
              ? '/en/inbox-notification-preferences'
              : '/fr/preferences-notification-boite-reception'
          }
        />
        <Button
          id={props.content.dashboardButton?.id ?? ''}
          text={props.content.dashboardButton?.linkText ?? ''}
          style="primary"
          className="w-fit"
          href={
            props.locale === 'en'
              ? '/en/my-dashboard'
              : '/fr/mon-tableau-de-bord'
          }
        />
      </div>
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

  const content = await getInboxNotifPrefSuccessContent().catch(
    (error): InboxNotifPrefSuccessContent => {
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
      ? '/fr/preferences-notification-boite-reception-succes'
      : '/en/inbox-notification-preferences-success'
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
      title:
        'Inbox Notification Preferences Success - My Service Canada Account',
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
      service: 'ESDC-EDSC_MSCA-MSDC-SCH',
      creator: 'Employment and Social Development Canada',
      accessRights: '1',
    },
    data_fr: {
      title:
        'Preferences Notification Boîte Réception Succes - Mon dossier Service Canada',
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

InboxSuccess.propTypes = {
  /**
   * current locale in the address
   */
  locale: PropTypes.string,

  /*
   * Meta Tags
   */
  meta: PropTypes.object,
}
