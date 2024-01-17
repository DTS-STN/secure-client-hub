interface TopNavProps {
  lang: string
  skipToMainPath: string
  skipToAboutPath: string
  switchToBasicPath: string
  displayAlternateLink: boolean
}

export const TopNav = ({
  lang,
  skipToMainPath,
  skipToAboutPath,
  switchToBasicPath,
  displayAlternateLink,
}: TopNavProps) => {
  return (
    <>
      {/* Top navigation accessible only when using a keyboard to navigate the page */}
      <nav role="navigation" aria-label="topNavigation">
        <ul id="TopNavLinks" className="z-10">
          <li className="left-0 top-2 absolute text-center box-border w-full -z-50 focus-within:z-50 ">
            <a
              className="focus:bg-blue-primary font-bold p-1 text-white"
              href={skipToMainPath}
            >
              {lang === 'fr'
                ? 'Passer au contenu principal'
                : 'Skip to main content'}
            </a>
          </li>
          <li className="left-0 top-2 absolute text-center box-border w-full -z-50 focus-within:z-50 ">
            <a
              className="focus:bg-blue-primary font-bold p-1 text-white"
              href={skipToAboutPath}
            >
              {lang === 'fr'
                ? 'Passer à « Au sujet du gouvernement »'
                : "Skip to 'About government'"}
            </a>
          </li>

          {displayAlternateLink ? (
            <li className="left-0 top-2 absolute text-center box-border w-full -z-50 focus-within:z-50 ">
              <a
                className="focus:bg-blue-primary font-bold p-1 text-white"
                href={switchToBasicPath}
                rel="alternate"
              >
                {lang === 'fr'
                  ? 'Passer à la version HTML simplifiée'
                  : 'Switch to basic HTML version'}
              </a>
            </li>
          ) : (
            ''
          )}
        </ul>
      </nav>
    </>
  )
}

TopNav.defaultProps = {
  lang: 'en',
  displayAlternateLink: false,
  skipToMainPath: '/',
  skipToAboutPath: '/',
  switchToBasicPath: '/',
}
