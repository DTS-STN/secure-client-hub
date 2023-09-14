import PropTypes from 'prop-types'

export default function Heading(props) {
  const { title, fromLink, fromText, id, className } = props

  return (
    <>
      <h1
        className={`font-display text-34px md:text-38px pb-2 font-bold text-gray-darker border-b border-red-red50a ${className}`}
        id={id}
      >
        {title}
      </h1>
      {fromLink && fromText && (
        <p className="">
          <strong>From: </strong>
          <a
            href={fromLink}
            className="font-body underline text-deep-blue-dark text-20px font-bold leading-33px hover:text-blue-hover"
          >
            {fromText}
          </a>
        </p>
      )}
    </>
  )
}

Heading.propTypes = {
  /**
   * The text / title that will be displayed as heading
   */
  title: PropTypes.string.isRequired,
  /**
   * Link that should be dispayed under the main heading level
   */
  fromLink: PropTypes.string,
  /**
   * Text that will be displyed as text link
   */
  fromText: PropTypes.string,
  /**
   * css overrides for button
   */
  className: PropTypes.string,
  /**
   * To identify the heading element
   */
  id: PropTypes.string.isRequired,
  /**
   * Test id for unit test
   */
  dataTestId: PropTypes.string,
}
