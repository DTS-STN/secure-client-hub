import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon as loadIcon } from '../lib/loadIcons'

interface InfoMessageProps {
  label: string
  messageText: string
  messageLinkText: string
  messageLinkHref: string
  locale: string
  icon?: string
  refPageAA: string
}

const InfoMessage = ({
  locale,
  label = 'mscaPlaceholder',
  messageText,
  messageLinkText,
  messageLinkHref = 'mscaPlaceholder',
  icon,
  refPageAA = 'mscaPlaceholder',
}: InfoMessageProps) => {
  return (
    <div
      className="sch-container mt-6 border border-[#E3E3E3] bg-gray-lightest py-4"
      data-cy="info-message"
      aria-label={`${label}`}
    >
      <div className="flex flex-row">
        <span
          className="hidden max-h-10 items-center border-l-[6px] border-brighter-blue-dark bg-[#d7faff] p-2 text-xl font-bold sm:flex"
          data-testid="label"
        >
          {label}
        </span>
        <div
          className="text-xl text-gray-darker sm:pl-6"
          data-cy="info-message-text"
        >
          <span
            className="mr-3 inline-flex max-h-8 items-center border-l-[6px] border-brighter-blue-dark bg-[#d7faff] p-2 font-bold sm:hidden"
            data-testid="label"
          >
            {label}
          </span>

          {messageText}
          <a
            data-cy="sclabs-page-link"
            href={messageLinkHref}
            className="inline-block text-xl text-deep-blue-60d hover:text-blue-hover focus:text-blue-hover focus:underline"
            target={'_blank'}
            rel={'noopener noreferrer'}
            data-gc-analytics-customclick={`${refPageAA}:${messageLinkText} link`}
            aria-label={` ${messageLinkText} - ${
              messageLinkText
                ? locale === 'fr'
                  ? "S'ouvre dans un nouvel onglet"
                  : 'Opens in a new tab'
                : "S'ouvre dans un nouvel onglet"
            }`}
          >
            <span className="mr-2 underline">{messageLinkText}</span>
            <FontAwesomeIcon
              width="14"
              icon={loadIcon[icon as keyof typeof FontAwesomeIcon]}
            ></FontAwesomeIcon>
          </a>
        </div>
      </div>
    </div>
  )
}

export default InfoMessage
