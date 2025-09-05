import { MessageEntity } from '../entities/entities/message.entity'
import Link from 'next/link'
import NotificationBox from './NotificationBox'
import EN from '../locales/en'
import FR from '../locales/fr'

interface MessageListProps {
  messageEntities: MessageEntity[]
  locale: string
}

const MessageList = ({ messageEntities, locale }: MessageListProps) => {
  const language = locale === 'en' ? EN : FR

  const messageVerboseTitles = new Map()
  messageVerboseTitles.set(
    'PSCDMSA',
    language.inbox.messageVerboseTitles.accounts,
  )
  messageVerboseTitles.set('PSCDNOD', language.inbox.messageVerboseTitles.debts)

  return (
    <>
      {messageEntities.length === 0 ? (
        <>
          <div className="space-y-4">
            <NotificationBox
              value={language.inbox.noMessagesText}
              className="flex justify-center bg-[rgba(248,248,249,1)] text-2xl"
            />
          </div>
        </>
      ) : (
        <>
          <table className="w-full border-collapse">
            <tbody>
              {messageEntities.map((message: MessageEntity) => {
                const trimmedMessageName = message.messageName.trim()
                let frenchLetterName =
                  messageVerboseTitles.get(trimmedMessageName)
                frenchLetterName = frenchLetterName ?? trimmedMessageName
                let englishLetterName =
                  messageVerboseTitles.get(trimmedMessageName)
                englishLetterName = englishLetterName ?? trimmedMessageName
                const letterName: string =
                  locale === 'en' ? englishLetterName : frenchLetterName

                const gcAnalyticsCustomClickValue = `ESDC-EDSC:DARS-SMCD Letters Click:${letterName}`
                const date = new Date(message.messageDate)
                const dateLanguage = locale + '-CA'
                const formattedDate = date.toLocaleString(dateLanguage, {
                  dateStyle: 'long',
                })

                return (
                  <tr
                    key={message.messageId}
                    className="flex flex-col border-b border-gray-300 px-4 py-4 sm:py-6 md:flex-row"
                  >
                    <td className="w-full md:w-[500px]">
                      <Link
                        href={`/api/download?id=${message.messageId}`}
                        className="flex items-center rounded-sm py-1 text-deep-blue-dark underline hover:text-blue-hover focus:outline-1 focus:outline-blue-hover"
                        target="_blank"
                        data-gc-analytics-customclick={
                          gcAnalyticsCustomClickValue
                        }
                      >
                        {letterName} (PDF)
                      </Link>
                      <p className="py-1">{message.messageType}</p>
                    </td>
                    <td className="align-top md:pl-[100px]">{formattedDate}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </>
      )}
    </>
  )
}

export default MessageList
