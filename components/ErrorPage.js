import PropTypes from 'prop-types'
import Heading from './Heading'
import EN from '../locales/en'
import FR from '../locales/fr'
import Link from 'next/link'

export function ErrorPage(props) {
  const { isAuth, errType, lang, homePageLink, accountPageLink } = props
  let biClassName = ''
  let language = lang === 'en' ? [EN] : lang === 'fr' ? [FR] : [EN, FR]
  if (lang === 'bi') {
    biClassName = 'grid gap-10 grid-cols-1 sm:grid-cols-2 sm:gap-6'
  }
  let errorHeadingEN =
    errType === '404'
      ? EN.errorPageHeadingTitle404
      : errType === '500'
      ? EN.errorPageHeadingTitle500
      : EN.errorPageHeadingTitle503
  let errorHeadingFR =
    errType === '404'
      ? FR.errorPageHeadingTitle404
      : errType === '500'
      ? FR.errorPageHeadingTitle500
      : FR.errorPageHeadingTitle503

  let errorTextEN =
    errType === '404'
      ? EN.errorPageErrorText404
      : errType === '500'
      ? EN.errorPageErrorText500
      : EN.errorPageErrorText503
  let errorTextFR =
    errType === '404'
      ? FR.errorPageErrorText404
      : errType === '500'
      ? FR.errorPageErrorText500
      : FR.errorPageErrorText503
  return (
    <div className={`${biClassName} container`}>
      {language.map((val, index) => {
        return (
          <div key={(val + index).toString()}>
            <Heading
              id={'pageHead' + index + errType}
              title={val === EN ? errorHeadingEN : errorHeadingFR}
            />
            <p className="text-20px text-gray-darker mt-2">
              {val === EN ? errorTextEN : errorTextFR}
            </p>
            <br />
            <p className="font-bold text-gray-darker sm:text-black text-[20px]">
              {val.errorPageNextText}
            </p>
            <h2 className="sr-only">{`What's Next Links`}</h2>
            <ul id={'errorTypes' + index + errType}>
              <li
                key={'errorLink1' + index.toString()}
                className={
                  errType === '404'
                    ? 'hidden'
                    : 'text-20px text-gray-darker pl-3'
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
                className="text-20px text-gray-darker pl-3"
              >
                {!isAuth
                  ? val.errorTextLinkCommon
                  : val.errorAuthTextLinkCommon}
                <Link
                  className="underline text-deep-blue-dark font-body text-20px hover:text-blue-hover focus:text-blue-hover"
                  id={
                    !isAuth
                      ? 'homePage' + errType + lang + index
                      : 'accountPage' + errType + lang + index
                  }
                  href={!isAuth ? homePageLink : accountPageLink}
                >
                  {!isAuth
                    ? val.errorTextLinkCommon_2
                    : val.errorAuthTextLinkCommon_2}
                </Link>
              </li>
            </ul>
            <br />
            <br />
            <p
              data-testid="errorType"
              className="font-bold text-gray-darker text-[14px] pb-2"
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

ErrorPage.propTypes = {
  /**
   * Select the language for the page. If bi is selected
   * bilingual version of error pages will be used
   */
  lang: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf(['en', 'fr', 'bi']),
  ]).isRequired,

  /**
   * Select the type of error page you want to use
   */
  errType: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf(['404', '500', '503']),
  ]).isRequired,

  /**
   * To indicate if the user is authenticated or not
   * Will display authenticated version of pages if user is authenticated
   */
  isAuth: PropTypes.bool.isRequired,

  /**
   * Add your path to the Service Canada Home Page (not authenticated user)
   */
  homePageLink: PropTypes.string,

  /**
   * Add your path Logged in users account dashboard (authenticated user)
   */
  accountPageLink: PropTypes.string,
}
