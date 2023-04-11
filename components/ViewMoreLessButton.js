import propTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function ViewMoreLessButton(props) {
  return (
    <button
      className={
        'text-xl leading-8 text-deep-blue-60d hover:text-blue-hover ' +
        props.className
      }
      data-cy={props.dataCy}
      onClick={props.onClick}
      id={props.id}
      data-testid={props.dataTestid}
      aria-expanded={props.ariaExpanded ?? undefined}
    >
      <div className="flex sm:items-center">
        {props.icon ? (
          <FontAwesomeIcon
            icon={solid('circle-chevron-up')}
            className={`text-46px pr-3`}
            data-gc-analytics-customclick={`ESDC-EDSC:${props.refPageAA} ${props.acronym}:Contract-Diminuer`}
          />
        ) : (
          <FontAwesomeIcon
            icon={solid('circle-chevron-down')}
            className={`text-46px pr-3`}
            data-gc-analytics-customclick={`ESDC-EDSC:${props.refPageAA} ${props.acronym}:Expand-Etendre`}
          />
        )}
        <span className="text-left underline font-body">{props.caption}</span>
      </div>
    </button>
  )
}

ViewMoreLessButton.propTypes = {
  caption: propTypes.string.isRequired,
  icon: propTypes.bool,
  onClick: propTypes.func.isRequired,
  id: propTypes.string.isRequired,
  dataTestid: propTypes.string,
  ariaExpanded: propTypes.string,
  className: propTypes.string,
  dataCy: propTypes.string,
}
