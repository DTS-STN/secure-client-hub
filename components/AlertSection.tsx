import { ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

interface AlertSectionProps {
  sectionIcon: boolean
  onClick: () => void
  id: string
  messageHeading: string | ReactNode
  messageBody: string | ReactNode | ReactNode[]
  className?: string
}

const AlertSection = ({
  sectionIcon,
  onClick,
  id,

  messageHeading,
  messageBody,
  className,
}: AlertSectionProps) => {
  return (
    <div className={`bg-yellow-200 p-2 ${className}`} id={id}>
      <details className="my-2  border-spacing-1 border" onClick={onClick}>
        <summary className=" ml-1 flex list-none justify-between border-b font-display text-2xl font-bold leading-[26px] text-gray-darker ">
          {messageHeading}
          <span>
            {sectionIcon ? (
              <FontAwesomeIcon
                icon={faChevronUp}
                className={`px-3 text-lg`}
                // data-gc-analytics-customclick={`${refPageAA} ${acronym}:Contract`}
              />
            ) : (
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`px-3 text-lg text-gray-500`}
                // data-gc-analytics-customclick={`${refPageAA} ${acronym}:Expand`}
              />
            )}
          </span>
        </summary>

        <p className="ml-0.5 py-1 font-body text-20px text-gray-darker">
          {messageBody}
        </p>
      </details>
    </div>
  )
}

export default AlertSection
