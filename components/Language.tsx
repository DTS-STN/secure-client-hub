import Link from 'next/link'

interface LanguageProps {
  id?: string
  lang?: string
  path: string
  abbr?: string
  dataTestId?: string
  dataCy?: string
  ariaLabel?: string
  locale?: string
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
  locale,
  dataGcAnalyticsCustomClick,
  text,
}: LanguageProps) => {
  return (
    <>
      {abbr ? (
        <Link
          href={path}
          className="underline uppercase text-deep-blue-dark font-medium font-body leading-[33px] hover:text-blue-hover focus:text-blue-hover focus-visible:text-blue-hover"
          id={id}
          data-testid={dataTestId}
          data-cy={dataCy || id}
          lang={lang === 'en' ? 'fr' : 'en'}
          aria-label={ariaLabel || (lang === 'en' ? 'Français' : 'English')}
          locale={locale}
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
          className="underline text-deep-blue-dark font-base font-body text-[16px] leading-[33px] hover:text-blue-hover focus:text-blue-hover focus-visible:text-blue-hover"
          id={id}
          data-testid={dataTestId}
          data-cy={dataCy || id}
          lang={lang === 'en' ? 'fr' : 'en'}
          aria-label={ariaLabel || text}
          locale={locale}
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
