import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'

interface MenuItem {
  id: string
  key: string
  value: string
  path: string
  showIcon?: boolean
  onSignOut?: () => void
}

interface MenuProps {
  lang: string
  dataGcAnalyticsCustomClick: string
  menuList: MenuItem[]
}

const Menu = ({
  lang,
  dataGcAnalyticsCustomClick = 'mscaPlaceholder',
  menuList,
}: MenuProps) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const dropdown = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Hide dropdown when click outside
    if (!showDropdown) return
    function handleClick(event: MouseEvent) {
      if (
        dropdown.current &&
        !dropdown.current.contains(event.target as Node)
      ) {
        setShowDropdown(false)
      }
    }
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [showDropdown])

  useEffect(() => {
    if (!showDropdown) return
    function handleEsc(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setShowDropdown(false)
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [showDropdown])

  return (
    <div className="w-full bg-blue-primary">
      <nav className="sch-container sch-container-menu items-center justify-between sm:flex sm:h-[60px]">
        <div className="mx-15px flex h-[60px] items-center font-display text-[19px] font-bold leading-[21px] text-white md:m-0 md:text-2xl">
          <span id="mainSiteNav">
            {lang === 'fr'
              ? 'Mon dossier Service Canada'
              : 'My Service Canada Account'}
          </span>
        </div>
        <div
          className="h-full w-full bg-bright-blue-pale hover:bg-gray-50a focus:bg-gray-50a sm:w-[260px]"
          ref={dropdown}
        >
          <button
            id="dropdownNavbarLink"
            onClick={() => setShowDropdown((e) => !e)}
            aria-haspopup="true"
            data-testid="menuButton"
            aria-expanded={showDropdown}
            className="flex h-full w-full items-center justify-between rounded-sm py-0.5 pl-4 font-body font-bold text-blue-primary ring-blue-hover ring-offset-2 focus:mb-1 focus:outline-none focus:ring-2"
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
              className="mx-4 h-4 w-4"
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
              className="z-10 rounded-b-[5px] bg-white text-deep-blue-dark drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:absolute sm:w-[260px]"
              aria-labelledby="dropdownLargeButton"
            >
              {menuList.map((element, index) => {
                return (
                  <div key={element.key}>
                    <Link
                      className={`${
                        index === 0 ? 'border-none' : 'border-t-2'
                      } flex h-[55px] items-center rounded-sm px-4 font-body ring-blue-hover ring-offset-2 hover:text-blue-hover focus:border-none focus:outline-none focus:ring-2`}
                      onClick={
                        element.showIcon
                          ? element.onSignOut
                          : () => setShowDropdown((e) => !e)
                      }
                      href={element.path}
                      aria-label={element.value}
                      data-gc-analytics-customclick={`${dataGcAnalyticsCustomClick}:${element.id}`}
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
              })}
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Menu
