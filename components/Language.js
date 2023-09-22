import PropTypes from 'prop-types'
import Link from 'next/link'

export function Language(props) {
  return (
    <>
      {props.abbr ? (
        <Link
          href={props.path}
          className="underline uppercase text-deep-blue-dark font-medium font-body leading-[33px] hover:text-blue-hover focus:text-blue-hover focus-visible:text-blue-hover"
          id={props.id}
          data-testid={props.dataTestId}
          data-cy={props.dataCy || props.id}
          lang={props.lang === 'en' ? 'fr' : 'en'}
          aria-label={
            props.ariaLabel || props.lang === 'en' ? 'Français' : 'English'
          }
          locale={props.locale}
          data-gc-analytics-customclick={`${props.dataGcAnalyticsCustomClick}:${
            props.lang === 'en' ? 'Français' : 'English'
          }`}
        >
          {/* <!-- English Text: title="English", en --> */}
          <abbr title={props.lang === 'en' ? 'Français' : 'English'}>
            {props.abbr}
          </abbr>
        </Link>
      ) : (
        <Link
          href={props.path}
          className="underline text-deep-blue-dark font-base font-body text-[16px] leading-[33px] hover:text-blue-hover focus:text-blue-hover focus-visible:text-blue-hover"
          id={props.id}
          data-testid={props.dataTestId}
          data-cy={props.dataCy || props.id}
          lang={props.lang === 'en' ? 'fr' : 'en'}
          aria-label={props.ariaLabel || props.text}
          locale={props.locale}
          data-gc-analytics-customclick={`${props.dataGcAnalyticsCustomClick}:${
            props.lang === 'en' ? 'Français' : 'English'
          }`}
        >
          {/* <!-- English Text: English --> */}
          <span>{props.lang === 'en' ? 'Français' : 'English'}</span>
        </Link>
      )}
    </>
  )
}

Language.defaultProp = {
  path: '/',
}

Language.propTypes = {
  /**
   * id
   */
  id: PropTypes.string,

  /**
   * language toggle
   */
  lang: PropTypes.string,

  /**
   * path
   */
  path: PropTypes.string,
}
