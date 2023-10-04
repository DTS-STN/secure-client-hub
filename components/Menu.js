import { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

/**
 * Menu component
 */
export function Menu(props) {
  const {
    menuList,
    lang,
    onSignOut,
    dataGcAnalyticsCustomClickInstitutionVariable,
  } = props

  const [showDropdown, setShowDropdown] = useState(false)
  const dropdown = useRef(null)

  useEffect(() => {
    // Hide dropdown when click outside
    if (!showDropdown) return
    function handleClick(event) {
      if (dropdown.current && !dropdown.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [showDropdown])

  return (
    <div className="relative w-full bg-blue-primary">
      <nav className="sm:sch-container sm:flex items-center justify-between sm:h-[60px]">
        <div className="h-[60px] flex sm:h-full items-center">
          <p
            id="mainSiteNav"
            className="text-white font-display font-bold md:text-[24px] text-[19px] sm:p-0 sch-container mb-0 pr-0 sm:ml-4 md:ml-0"
          >
            {lang === 'fr'
              ? 'Mon dossier Service Canada'
              : 'My Service Canada Account'}
          </p>
        </div>
        <div
          className="w-full sm:w-[260px] h-full bg-bright-blue-pale hover:bg-gray-50a focus:bg-gray-50a"
          ref={dropdown}
        >
          <button
            id="dropdownNavbarLink"
            onClick={() => setShowDropdown((e) => !e)}
            data-gc-analytics-customclick={`${dataGcAnalyticsCustomClickInstitutionVariable}:${
              showDropdown ? 'Menu Contract' : 'Expand Menu'
            }`}
            aria-haspopup="true"
            data-testid="menuButton"
            aria-expanded={showDropdown}
            className="flex h-[60px] justify-between w-full h-full font-bold font-body items-center sm:py-2px pl-4 text-blue-primary ring-offset-2 focus:ring-2 ring-blue-hover rounded-sm focus:outline-none focus:mb-1"
          >
            <span className="flex items-center">
              <svg
                className="mr-4"
                width="35"
                height="35"
                viewBox="0 0 35 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 0.499756C7.84 0.499756 0 8.33976 0 17.9998C0 27.6598 7.84 35.4998 17.5 35.4998C27.16 35.4998 35 27.6598 35 17.9998C35 8.33976 27.16 0.499756 17.5 0.499756ZM17.5 7.49976C20.8775 7.49976 23.625 10.2473 23.625 13.6248C23.625 17.0023 20.8775 19.7498 17.5 19.7498C14.1225 19.7498 11.375 17.0023 11.375 13.6248C11.375 10.2473 14.1225 7.49976 17.5 7.49976ZM17.5 31.9998C13.9475 31.9998 9.7475 30.5648 6.755 26.9598C9.7125 24.6498 13.44 23.2498 17.5 23.2498C21.56 23.2498 25.2875 24.6498 28.245 26.9598C25.2525 30.5648 21.0525 31.9998 17.5 31.9998Z"
                  fill="#26374A"
                />
              </svg>
              {lang === 'fr' ? 'Compte' : 'Account'}
            </span>
            <svg
              className="w-4 h-4 mx-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              {!showDropdown ? (
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              ) : (
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z z-10"
                  clipRule="evenodd"
                />
              )}
            </svg>
          </button>
          {showDropdown && (
            <div
              id="dropdownNavbar"
              className="sm:absolute sm:w-[260px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-b-[5px] text-deep-blue-dark bg-white z-10"
              aria-labelledby="dropdownLargeButton"
            >
              {menuList
                ? menuList.map((element, index) => {
                    return (
                      <div key={element.key}>
                        <Link
                          className={`${
                            index === 0 ? 'border-none' : 'border-t-2'
                          } font-body flex items-center h-[55px] px-4 hover:text-blue-hover focus:outline-none ring-offset-2 focus:ring-2 ring-blue-hover rounded-sm focus:border-none`}
                          onClick={
                            element.showIcon
                              ? onSignOut
                              : () => setShowDropdown((e) => !e)
                          }
                          href={element.path}
                          aria-label={element.value}
                          data-gc-analytics-customclick={`${dataGcAnalyticsCustomClickInstitutionVariable}:Menu-${element.id}`}
                        >
                          {element.showIcon && (
                            <svg
                              width="18"
                              height="15"
                              viewBox="0 0 18 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="mr-3"
                            >
                              <path
                                d="M13.1665 3.33333L11.9915 4.50833L14.1415 6.66667H5.6665V8.33333H14.1415L11.9915 10.4833L13.1665 11.6667L17.3332 7.5L13.1665 3.33333ZM2.33317 1.66667H8.99984V0H2.33317C1.4165 0 0.666504 0.75 0.666504 1.66667V13.3333C0.666504 14.25 1.4165 15 2.33317 15H8.99984V13.3333H2.33317V1.66667Z"
                                fill="#284162"
                              />
                            </svg>
                          )}
                          {element.value}
                        </Link>
                      </div>
                    )
                  })
                : null}
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}

Menu.defaultProps = {
  lang: 'en',
  onClick: () => {},
  menuList: [
    { key: 'dashKey', value: 'My dashboard', path: '/', showIcon: false },
    {
      key: 'securityKey',
      value: 'Security Settings',
      path: '/',
      showIcon: false,
    },
    { key: 'profileKey', value: 'Profile', path: '/', showIcon: false },
    {
      key: 'craAccountKey',
      value: 'Switch to CRA My Account',
      path: '/',
      showIcon: false,
    },
    { key: 'outKey', value: 'Sign out', path: '/', showIcon: true },
  ],
}

Menu.propTypes = {
  /**
   * Language code.
   */
  lang: PropTypes.string.isRequired,

  /**
   * Adobe Analytics Prefix
   */
  dataGcAnalyticsCustomClickInstitutionVariable: PropTypes.string,

  /**
   * set to true for Storybook demos only
   */
  demoBuffer: PropTypes.bool,

  /**
   * List of menu items to display in dropdown with links
   */
  menuList: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
      path: PropTypes.string,
      component: PropTypes.elementType,
    })
  ),
}
