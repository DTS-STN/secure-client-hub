import PropTypes from 'prop-types'
import { programs } from '../lib/programs'

export default function Collapse(props) {
  const { id, title, children } = props
  return (
    <details
      key={id}
      id={id}
      className="mb-5px text-gray-darker text-20px font-body"
      data-testid={`${id}-${props.dataTestId}`}
    >
      <summary
        key={`summary-${id}`}
        className=" text-deep-blue-60d hover:text-blue-hover hover:underline border border-gray-40 rounded px-15px py-5px cursor-pointer select-none outline-none"
        data-gc-analytics-customclick={`ESDC-EDSC:${programs(
          id.split('-')[0]
        )}:${title}`}
      >
        {title}
      </summary>
      <div className="border border-gray-40 rounded-b px-18px py-5px cursor-pointer select-none outline-none">
        {children}
      </div>
    </details>
  )
}

Collapse.defaultProps = {
  id: 'defaultAccordion',
}

Collapse.propTypes = {
  /**
   * component id
   */
  id: PropTypes.string,

  /**
   * Title of the collapsible header
   */
  title: PropTypes.string,

  /**
   * code passed in to fill the expanded area.
   */
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),

  /**
   * Test id for unit test
   */
  dataTestId: PropTypes.string,
}
