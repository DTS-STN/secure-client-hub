import Heading from './Heading'
import EN from '../locales/en'
import FR from '../locales/fr'
import Link from 'next/link'

interface ErrorPageProps {
  isAuth: boolean
  errType: '404' | '500' | '503'
  lang: string
  homePageLink: string
  accountPageLink: string
}

const ErrorPage = ({
  isAuth,
  errType,
  lang,
  homePageLink,
  accountPageLink,
}: ErrorPageProps) => {
  let biClassName = ''
  const language = lang === 'en' ? [EN] : lang === 'fr' ? [FR] : [EN, FR]
  if (lang === 'bi') {
    biClassName = 'grid gap-10 grid-cols-1 sm:grid-cols-2 sm:gap-6'
  }
  const errorHeadingEN =
    errType === '404'
      ? EN.errorPageHeadingTitle404
      : errType === '500'
        ? EN.errorPageHeadingTitle500
        : EN.errorPageHeadingTitle503
  const errorHeadingFR =
    errType === '404'
      ? FR.errorPageHeadingTitle404
      : errType === '500'
        ? FR.errorPageHeadingTitle500
        : FR.errorPageHeadingTitle503

  const errorTextEN =
    errType === '404'
      ? EN.errorPageErrorText404
      : errType === '500'
        ? EN.errorPageErrorText500
        : EN.errorPageErrorText503
  const errorTextFR =
    errType === '404'
      ? FR.errorPageErrorText404
      : errType === '500'
        ? FR.errorPageErrorText500
        : FR.errorPageErrorText503
  return (
    <div className={`${biClassName} container`}>
      {language.map((val, index) => {
        return (
          <div key={(val.languageSelection + index).toString()}>
            <Heading
              id={'pageHead' + index + errType}
              title={val === EN ? errorHeadingEN : errorHeadingFR}
            />
            <p className="mt-2 pb-6 text-20px text-gray-darker">
              {val === EN ? errorTextEN : errorTextFR}
            </p>
            <p className="text-[20px] font-bold text-gray-darker sm:text-black">
              {val.errorPageNextText}
            </p>
            <h2 className="sr-only">{`What's Next Links`}</h2>
            <ul id={'errorTypes' + index + errType}>
              <li
                key={'errorLink1' + index.toString()}
                className={
                  errType === '404'
                    ? 'hidden'
                    : 'pl-3 text-20px text-gray-darker'
                }
              >
                {errType === '500'
                  ? val.error500TextLink
                  : errType === '503'
                    ? val.error503TextLink
                    : null}
              </li>
              <li
                key={'errorLink2' + index.toString()}
                className="pl-3 text-20px text-gray-darker"
              >
                {!isAuth
                  ? val.errorTextLinkCommon
                  : val.errorAuthTextLinkCommon}
                <Link
                  className="font-body text-20px text-deep-blue-dark underline hover:text-blue-hover focus:text-blue-hover"
                  id={
                    !isAuth
                      ? 'homePage' + errType + lang + index
                      : 'accountPage' + errType + lang + index
                  }
                  href={!isAuth ? homePageLink : accountPageLink}
                >
                  {!isAuth
                    ? val.errorTextLinkCommon_2
                    : errType === '404'
                      ? val.errorAuthTextLinkCommon_2
                      : val.errorTextLinkCommon_2}
                </Link>
              </li>
            </ul>
            <p
              data-testid="errorType"
              className="mt-10 pb-2 text-[14px] font-bold text-gray-darker"
            >
              {val.errorPageType} {errType}
            </p>
          </div>
        )
      })}
    </div>
  )
}

ErrorPage.defaultProps = {
  accountPageLink: '/',
  homePageLink: '/',
  lang: 'en',
}

export default ErrorPage
