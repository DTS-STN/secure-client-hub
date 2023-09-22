/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types'
import Link from 'next/link'

export default function Links(props) {
  //Styling for links based on Figma Design
  let basicStyle = ''
  switch (props.linkStyle) {
    case 'basicStyleWithEmphasis':
      basicStyle =
        'underline text-deep-blue-dark font-body text-20px font-bold hover:text-blue-hover'
      break
    case 'titleLink':
      basicStyle =
        'underline text-deep-blue-dark font-dispay text-xl leading-[23px] font-bold hover:text-blue-hover'
      break
    case 'smfooterBlue':
      basicStyle = 'text-deep-blue-dark font-body text-sm hover:underline'
      break
    case 'smfooterWhite':
      basicStyle =
        'text-white font-body text-sm hover:text-white hover:underline focus:ring-1 focus:ring-white'
      break
    case 'smBreadcrumbs':
      basicStyle =
        'text-deep-blue-dark ds-font-body ds-text-base leading-[23px] hover:text-blue-hover'
      break
    case 'cardActionLink':
      basicStyle = 'text-deep-blue-dark font-body text-xl hover:text-blue-hover'
      break
    default:
      basicStyle =
        'ds-underline ds-text-multi-blue-blue70b font-body text-20px hover:text-blue-hover'
      break
  }

  const Component = props.component || 'a'

  function onKeyDown() {
    true
  }

  return Component !== 'a' ? (
    <Link
      href={props.href}
      locale={props.locale}
      disabled={props.disabled}
      lang={props.lang}
      target={props.target}
      onClick={props.onClick ? props.onClick : undefined}
      id={props.id}
      aria-label={props.ariaLabel || props.text}
      className={`${basicStyle}`}
      data-testid={props.dataTestId}
      data-cy={props.dataCy || props.id}
      data-cy-button={props.dataCyButton}
      data-gc-analytics-customclick={props.dataGcAnalyticsCustomClick}
      onKeyDown={onKeyDown}
    >
      {/* <!-- English Text: English --> */}
      <span className={props.abbr ? 'font-body text-base font-normal' : ''}>
        {props.text}
      </span>
      {/* <!-- English Text: title="English", en --> */}

      <abbr
        className="uppercase text-gray-darker font-medium md:hidden"
        title={props.text}
      >
        {props.abbr}
      </abbr>
    </Link>
  ) : (
    <a
      href={props.href}
      className={`${basicStyle}`}
      id={props.id}
      data-testid={props.dataTestId}
      data-cy={props.dataCy || props.id}
      data-cy-button={props.dataCyButton}
      disabled={props.disabled}
      lang={props.lang}
      target={props.target}
      aria-label={props.ariaLabel || props.text}
      locale={props.locale}
      onClick={props.onClick ? props.onClick : undefined}
      data-gc-analytics-customclick={props.dataGcAnalyticsCustomClick}
    >
      {/* <!-- English Text: English --> font family Noto */}
      <span className={props.abbr ? 'font-body text-base font-normal' : ''}>
        {props.text}
      </span>
      {/* <!-- English Text: title="English", en --> Rubik */}
      <abbr
        className="uppercase text-gray-darker font-medium md:hidden"
        title={props.text}
      >
        {props.abbr}
      </abbr>
    </a>
  )
}

Links.defaultProps = {
  target: '_self',
  href: '#',
}

Links.propTypes = {
  /**
   * The text that Text Link will display
   */
  text: PropTypes.string,
  /**
   * Abbrivation for text
   */
  abbr: PropTypes.string,
  /**
   * Style link as a Text Link when there's a href
   */
  href: PropTypes.string,
  /**
   * Target attribute to tell the browser where the linked document should be loaded.
   */
  target: PropTypes.string,
  /**
   * Identify which Text Link being clicked
   */
  id: PropTypes.string.isRequired,
  /**
   * Lang attribute for links that do not match the language of the top level document
   */
  lang: PropTypes.string,
  /**
   * css overrides for Link
   */
  className: PropTypes.string,
  /**
   * Test id for unit test
   */
  dataTestId: PropTypes.string,

  /**
   * For tracking on click of forms for analytics
   */
  analyticsTracking: PropTypes.bool,

  /**
   * use ariaLabel to provide more descriptive text for a link (screen reader friendly)
   */
  ariaLabel: PropTypes.string,

  /**
   * Allow user to use configurable component, default is html anchor tag
   */
  component: PropTypes.elementType,
}
