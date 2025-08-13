import PropTypes from 'prop-types'
import { getMessageService } from './api/message.service'
import type { MessageEntity } from '../entities/entities/message.entity'
import { authOptions } from './api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import Heading from './../components/Heading'
import { useSession } from 'next-auth/react'
interface InboxProps {
  locale: string | undefined
  messages: MessageEntity[]
  mscaBaseUrl: string
}

export default function Messages(props: InboxProps) {
  const messages = props.messages
  const { data: session, update } = useSession()

  update({
    user: {
      ...session?.user,
      messages: messages,
    },
  })

  return (
    <>
      <div className="mb-8">
        <Heading id="pageHead-inbox" title="Inbox" className="mb-2" />
      </div>
      {messages.length === 0 ? (
        <>
          <div className="space-y-4">
            <p></p>
          </div>
        </>
      ) : (
        <>
          <ul className="divide-y border-y">
            {messages.map((message: MessageEntity) => {
              const parts = message.messageName.split(/\s*-\s*/)

              const frenchLetterName = parts[0] ? parts[0].trim() : ''
              const englishLetterName = parts[1]
                ? parts[1].trim()
                : message.messageName
              const letterName =
                props.locale === 'en' ? englishLetterName : frenchLetterName
              const gcAnalyticsCustomClickValue = `ESDC-EDSC:CDB Letters Click:${letterName}`
              const date = new Date(message.messageDate)
              const dateLanguage = props.locale + '-CA'
              const formattedDate = date.toLocaleString(dateLanguage, {
                dateStyle: 'long',
              })

              return (
                <li key={message.messageId} className="px-4 py-4 sm:py-6">
                  <table>
                    <tbody>
                      <tr className="flex flex-col md:flex-row">
                        <td>
                          <Link
                            href={`/api/download`}
                            className="external-link"
                            target="_blank"
                            data-gc-analytics-customclick={
                              gcAnalyticsCustomClickValue
                            }
                          >
                            {message.messageName}
                          </Link>
                          <p className="mt-1 text-sm text-gray-500">
                            {message.messageType}
                          </p>
                        </td>
                        <td className="align-top md:pl-[100px]">
                          {formattedDate}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </li>
              )
            })}
          </ul>
        </>
      )}
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
  const session = await getServerSession(req, res, authOptions)

  const sin = session?.user.name ? session.user.name : ''
  console.log('hello' + sin)

  const messages = await getMessageService().findMessagesBySin({ sin })

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
      meta,
      messages: messages,
    },
  }
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
