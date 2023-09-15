import PropTypes from 'prop-types'

export default function Collapse(props) {
  const { id, title, children } = props
  return (
    <details
      key={id}
      id={id}
      className="bg-lime-50 mb-5px text-gray-darker leading-33px text-20-22 font-body"
      data-testid={`${id}-${props.dataTestId}`}
    >
      <summary
        key={`summary-${id}`}
        className="bg-yellow-100 text-deep-blue-60d hover:text-blue-hover hover:underline border border-grey-40 rounded px-15px py-2 cursor-pointer select-none outline-none"
      >
        {title}
      </summary>
      <div className="bg-pink-200 border border-grey-40 rounded-b px-18px py-5px cursor-pointer select-none outline-none">
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
