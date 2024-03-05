import Link from 'next/link'

interface LanguageProps {
  id?: string
  lang?: string
  path: string
  abbr?: string
  dataTestId?: string
  dataCy?: string
  ariaLabel?: string
  dataGcAnalyticsCustomClick?: string
  text?: string
}

const Language = ({
  id,
  lang,
  path,
  abbr,
  dataTestId,
  dataCy,
  ariaLabel,
  dataGcAnalyticsCustomClick,
  text,
}: LanguageProps) => {
  return (
    <>
      {abbr ? (
        <Link
          href={path}
          className="font-body font-medium uppercase leading-[33px] text-deep-blue-dark underline hover:text-blue-hover focus:text-blue-hover focus-visible:text-blue-hover"
          id={id}
          data-testid={dataTestId}
          data-cy={dataCy || id}
          lang={lang === 'en' ? 'fr' : 'en'}
          aria-label={ariaLabel || (lang === 'en' ? 'Français' : 'English')}
          locale={false}
          data-gc-analytics-customclick={`${dataGcAnalyticsCustomClick}:${
            lang === 'en' ? 'Français' : 'English'
          }`}
        >
          {/* <!-- English Text: title="English", en --> */}
          <abbr title={lang === 'en' ? 'Français' : 'English'}>{abbr}</abbr>
        </Link>
      ) : (
        <Link
          href={path}
          className="font-base font-body text-[16px] leading-[33px] text-deep-blue-dark underline hover:text-blue-hover focus:text-blue-hover focus-visible:text-blue-hover"
          id={id}
          data-testid={dataTestId}
          data-cy={dataCy || id}
          lang={lang === 'en' ? 'fr' : 'en'}
          aria-label={ariaLabel || text}
          locale={false}
          data-gc-analytics-customclick={`${dataGcAnalyticsCustomClick}:${
            lang === 'en' ? 'Français' : 'English'
          }`}
        >
          {/* <!-- English Text: English --> */}
          <span>{lang === 'en' ? 'Français' : 'English'}</span>
        </Link>
      )}
    </>
  )
}

Language.defaultProps = {
  path: '/',
}

export default Language
