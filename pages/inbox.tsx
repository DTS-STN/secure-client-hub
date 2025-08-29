import PropTypes from 'prop-types'
import { getMessageService } from './api/message.service'
import type { MessageEntity } from '../entities/entities/message.entity'
import { authOptions } from './api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import { GetServerSidePropsContext } from 'next'
import PaginatedMessages from '../components/PaginatedMessages'
import Heading from './../components/Heading'
import NotificationBox from './../components/NotificationBox'
import { cachified } from 'cachified'
import {
  lruCache as cache,
  defaultTtl as ttl,
} from '../lib/message-cache-utils'

import {
  AuthModalsContent,
  getAuthModalsContent,
} from '../graphql/mappers/auth-modals'
import { Section } from '../lib/graphql-utils'
import TextSection from '../components/TextSection'
import { getInboxContent, InboxContent } from '../graphql/mappers/inbox'
import { getLogger } from '../logging/log-util'
import {
  AuthIsDisabled,
  AuthIsValid,
  Redirect,
  getIdToken,
  ValidateSession,
} from '../lib/auth'

interface InboxProps {
  locale: string | undefined
  content: {
    err?: '500' | '404' | '503'
    pageName: string
    intro?: Section
    debtStatements?: Section
    doNotMissMessage?: Section
  }
  messages: MessageEntity[]
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
  paginationMessagesPerPage: number
  paginationPageRangeDisplayed: number
}

export default function Messages(props: InboxProps) {
  const messages = props.messages

  const debtStatementsJsx = (
    <TextSection
      sectionName={props.content.debtStatements?.fragmentHeading ?? ''}
      divisions={props.content.debtStatements?.divisions ?? []}
      icon={props.content.debtStatements?.icon ?? ''}
      aaPrefix={props.aaPrefix}
    />
  )

  return (
    <>
      <div className="mb-8">
        <Heading
          id="pageHead-inbox"
          title={props.content.pageName}
          className="mb-2"
        />
      </div>

      <TextSection
        sectionName={props.content.intro?.fragmentHeading ?? ''}
        divisions={props.content.intro?.divisions ?? []}
        icon={props.content.intro?.icon ?? ''}
        aaPrefix={props.aaPrefix}
      />
      <NotificationBox>{debtStatementsJsx}</NotificationBox>

      <PaginatedMessages
        messageEntities={messages}
        locale={props.locale as string}
        messagesPerPage={props.paginationMessagesPerPage}
        pageRangeDisplayed={props.paginationPageRangeDisplayed}
      />

      <div className="py-8">
        <TextSection
          sectionName={props.content.doNotMissMessage?.fragmentHeading ?? ''}
          divisions={props.content.doNotMissMessage?.divisions ?? []}
          icon={props.content.doNotMissMessage?.icon ?? ''}
          aaPrefix={props.aaPrefix}
        />
      </div>
    </>
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
  const logger = getLogger('inbox-page')
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

  const sin: string = session?.user?.name ? session.user.name.split('|')[0] : ''
  const userId: string = session?.user?.name
    ? session.user.name.split('|')[2]
    : ''
  const messages: MessageEntity[] = await getCachedContent(sin, userId)

  const content = await getInboxContent().catch((error): InboxContent => {
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
  const langToggleLink = locale === 'en' ? '/fr/boite-reception' : '/en/inbox'
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
      title: 'Inbox - My Service Canada Account',
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
      service: 'ESDC-EDSC_MSCA-MSDC-SCH',
      creator: 'Employment and Social Development Canada',
      accessRights: '1',
    },
    data_fr: {
      title: 'Boite reception - Mon dossier Service Canada',
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
      messages: messages,
      paginationMessagesPerPage: parseInt(
        `${process.env.PAGINATION_MESSAGES_PER_PAGE}`,
      ),
      paginationPageRangeDisplayed: parseInt(
        `${process.env.PAGINATION_PAGE_RANGE_DISPLAYED}`,
      ),
    },
  }
}

const getCachedContent = (sin: string, userId: string) => {
  return cachified({
    key: `messages-entities-${sin}`,
    cache,
    getFreshValue: async (): Promise<MessageEntity[]> => {
      return await getMessageService().findMessagesBySin({
        sin: sin,
        userId: userId,
      })
    },
    ttl,
  })
}
Messages.propTypes = {
  /**
   * current locale in the address
   */
  locale: PropTypes.string,

  /*
   * Meta Tags
   */
  meta: PropTypes.object,
}
