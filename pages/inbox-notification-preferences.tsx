import { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth/next'
import ErrorPage from '../components/ErrorPage'
import Heading from '../components/Heading'
import {
  AuthModalsContent,
  getAuthModalsContent,
} from '../graphql/mappers/auth-modals'
import {
  AuthIsDisabled,
  AuthIsValid,
  getIdToken,
  Redirect,
  ValidateSession,
} from '../lib/auth'
import { getLogger } from '../logging/log-util'
import { authOptions } from './api/auth/[...nextauth]'
import Button from '../components/Button'
import {
  getInboxPrefContent,
  InboxPrefContent,
} from '../graphql/mappers/inbox-pref'
import { getInboxPref } from '../lib/inbox-preferences'
import { useRouter } from 'next/router'
import { useState } from 'react'

interface InboxNotePrefProps {
  defaultPaperless: boolean
  locale: string | undefined
  content: {
    err?: '500' | '404' | '503'
    pageName: string
    introText?: string
    definition?: string
    emailQuestion?: string
    emailYes?: string
    emailNo?: string
    emailYesDesc: string
    emailNoDesc: string
    buttonText: string
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

//const logger = getLogger('inbox-notif-pref')

export default function InboxNotePref(props: InboxNotePrefProps) {
  const [formData, setFormData] = useState({ value: 'yes' })
  const defaultPaperless = props.defaultPaperless

  const router = useRouter()
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

  const content = props.content

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setFormData({ value: value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const redirectDestination =
      '/api/submit-inbox-pref?locale=' +
      props.locale +
      '&pref=' +
      formData.value
    router.push(redirectDestination)
  }

  return (
    <div id="homeContent" data-testid="inboxPrefContent-test">
      <Heading id="inbox-pref-heading" title={content.pageName} />
      <p className="mt-8 max-w-3xl text-gray-darker">{content.introText}</p>
      {/* debt definition here*/}

      <div className="my-4 max-w-3xl border-t-2 border-y-gray-100" />

      <p className="max-w-3xl font-bold text-gray-darker">
        {content.emailQuestion}
      </p>
      <div className="pb-2" />
      <form onSubmit={handleSubmit}>
        <div className="flex max-w-3xl flex-col">
          <div className="flex flex-row pb-3 text-gray-darker">
            <input
              type="radio"
              id="yes-email"
              name="email-radio"
              value="yes"
              className="size-[2.5em]"
              defaultChecked={defaultPaperless}
              onChange={handleChange}
            />
            <label htmlFor="yes-email" className="grow pl-2">
              <p className="pt-2 font-medium">{content.emailYes}</p>
              <p className="font-normal">{content.emailYesDesc}</p>
            </label>
          </div>
          <div className="flex flex-row pb-3 text-gray-darker">
            <input
              type="radio"
              id="no-email"
              name="email-radio"
              value="no"
              className="size-[2.5em]"
              defaultChecked={!defaultPaperless}
              onChange={handleChange}
            />
            <label htmlFor="no-email" className="grow pl-2">
              <p className="pt-2 font-medium">{content.emailNo}</p>
              <p className="font-normal">{content.emailNoDesc}</p>
            </label>
          </div>
        </div>
        <Button
          id="save-pref-button"
          text={content.buttonText}
          type="submit"
          style="smallPrimary"
          className="my-6"
        />
      </form>
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
  const logger = getLogger('inbox-notification-preferences')
  logger.level = 'error'

  const content = await getInboxPrefContent().catch(
    (error): InboxPrefContent => {
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
      ? '/fr/preferences-notification-boite-reception'
      : '/en/inbox-notification-preferences'
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
      title: 'Inbox notification preferences - My Service Canada Account',
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
      service: 'ESDC-EDSC_MSCA-MSDC-SCH',
      creator: 'Employment and Social Development Canada',
      accessRights: '1',
    },
    data_fr: {
      title:
        'Préférences de notification de votre boîte de réception - Mon dossier Service Canada',
      desc: 'Français',
      author: 'Service Canada',
      keywords: '',
      service: 'ESDC-EDSC_MSCA-MSDC-SCH',
      creator: 'Emploi et Développement social Canada',
      accessRights: '1',
    },
  }
  const name = session?.user.name
  const spid = name ? name.split('|')[1] : ''
  const defaultPaperless = await defaultToPaperless(spid)

  return {
    props: {
      defaultPaperless: defaultPaperless,
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

// TODO: Properly set this
const useStub = isDev()
function isDev() {
  return false
}

async function defaultToPaperless(spid: string) {
  if (useStub) {
    return true
  }
  console.log('inbox pref page default to paperless check ' + spid)
  const resp = await getInboxPref(spid)
  return resp.eventCodes.length === 0 || resp.eventCodes[0] === 'PAPERLESS'
}
