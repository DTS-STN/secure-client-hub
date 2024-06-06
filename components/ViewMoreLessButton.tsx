import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleChevronUp,
  faCircleChevronDown,
} from '@fortawesome/free-solid-svg-icons'

interface ViewMoreLessButtonProps {
  caption: string
  icon: boolean
  onClick: () => void
  id: string
  dataTestid: string
  ariaExpanded: boolean
  className: string
  dataCy: string
  ariaLabel: string
  refPageAA: string
  acronym: string
}

const ViewMoreLessButton = ({
  caption,
  icon,
  onClick,
  id,
  dataTestid,
  ariaExpanded,
  className,
  dataCy,
  ariaLabel,
  refPageAA,
  acronym,
}: ViewMoreLessButtonProps) => {
  return (
    <button
      className={
        'text-xl leading-8 text-deep-blue-60d hover:text-blue-hover focus:text-blue-hover ' +
        className
      }
      data-cy={dataCy}
      onClick={onClick}
      id={id}
      data-testid={dataTestid}
      aria-expanded={ariaExpanded}
      aria-label={ariaLabel}
      // this AA tag is set to the oposite of what the actual aria-label value is because when AA pulls the value, it's on the current state not the state after the click so it looks backwards.
      data-gc-analytics-customclick={`${refPageAA} - ${acronym}:ViewMoreLessButton ${ariaExpanded === false ? 'open' : 'close'}`}
    >
      <div className="flex sm:items-center">
        {icon ? (
          <FontAwesomeIcon
            icon={faCircleChevronUp}
            className={`pr-3 text-46px`}
          />
        ) : (
          <FontAwesomeIcon
            icon={faCircleChevronDown}
            className={`pr-3 text-46px`}
          />
        )}
        <span className="text-left">{caption}</span>
      </div>
    </button>
  )
}

export default ViewMoreLessButton
