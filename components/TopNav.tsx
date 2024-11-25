interface TopNavProps {
  lang: string
  skipToMainPath: string
  skipToAboutPath: string
  switchToBasicPath: string
  displayAlternateLink: boolean
}

export const TopNav = ({
  lang = 'en',
  skipToMainPath = '/',
  skipToAboutPath = '/',
  switchToBasicPath = 'mscaPlaceholderHref',
  displayAlternateLink = false,
}: TopNavProps) => {
  return (
    <>
      {/* Top navigation accessible only when using a keyboard to navigate the page */}
      <nav role="navigation" aria-label="topNavigation">
        <ul id="TopNavLinks" className="z-10">
          <li className="absolute left-0 top-2 -z-50 box-border w-full text-center focus-within:z-50">
            <a
              className="p-1 font-bold text-white focus:bg-blue-primary"
              href={skipToMainPath}
            >
              {lang === 'fr'
                ? 'Passer au contenu principal'
                : 'Skip to main content'}
            </a>
          </li>
          <li className="absolute left-0 top-2 -z-50 box-border w-full text-center focus-within:z-50">
            <a
              className="p-1 font-bold text-white focus:bg-blue-primary"
              href={skipToAboutPath}
            >
              {lang === 'fr'
                ? 'Passer à « Au sujet du gouvernement »'
                : "Skip to 'About government'"}
            </a>
          </li>

          {displayAlternateLink ? (
            <li className="absolute left-0 top-2 -z-50 box-border w-full text-center focus-within:z-50">
              <a
                className="p-1 font-bold text-white focus:bg-blue-primary"
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
