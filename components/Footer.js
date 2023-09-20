/* eslint-disable no-prototype-builtins */
import PropTypes from 'prop-types'
import Link from 'next/link'
import en from '../locales/en'
import fr from '../locales/fr'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '../lib/loadIcons'
import logo from '../public/wmms-blk.svg'

export function Footer(props) {
  const {
    error,
    lang,
    id,
    containerClass,
    contactLink,
    brandLinks,
    target,
    btnLink,
  } = props

  const t = lang === 'en' ? en : fr
  const container = containerClass || 'ds-container'

  return (
    <footer id={id} className="w-full" data-testid="ds-footer">
      <>
        <div className="bg-blue-primary">
          <section
            className={`${container} h-[5.75rem] pb-5 flex flex-col items-start`}
          >
            <h2 className="pt-[22px] pb-2 text-white font-body font-bold">
              {t.mscaFooterHeading}
            </h2>
            <Link
              className="text-white font-body text-sm hover:text-white hover:underline focus:ring-1 focus:ring-white"
              id="footerContactUsLink"
              href={contactLink}
              target={target}
              locale={lang}
            >
              {t.mscaFooterContactUsText}
            </Link>
          </section>
        </div>
        {/* Subfooter */}
        <div className="bg-gray-subFooter">
          <div
            className={`'min-h-[86px] ' ${
              error ? 'items-center' : ''
            } flex justify-between ${container}`}
          >
            {error ? (
              <div>
                <a
                  id="top_btn"
                  href={btnLink}
                  className="sm:hidden float-left cursor-pointer"
                >
                  Top of page / Haut de la page
                  <FontAwesomeIcon
                    icon={icon['chevron-up']}
                    className="text-sm sm:hidden pl-2"
                  />
                </a>
              </div>
            ) : (
              <section className="md:flex-row md:flex-row flex items-center">
                <nav
                  role="navigation"
                  aria-labelledby="accessibleSectionHeader2"
                >
                  <h2 className="sr-only" id="accessibleSectionHeader2">
                    {t.aboutThisSite}
                  </h2>
                  <ul className="flex flex-col md:flex-row whitespace-nowrap pt-4">
                    {brandLinks.map(({ href, text, onClick }, index) => {
                      return (
                        <li
                          key={index}
                          className={`${
                            index === 0 ? '' : 'md:list-disc'
                          } pr-4 mb-[17px] list-inside list-none text-xxs`}
                        >
                          <Link
                            className="text-deep-blue-dark font-body text-sm hover:underline"
                            onClick={onClick ? onClick : undefined}
                            id={'footerLink' + index}
                            href={href}
                            target={target}
                          >
                            {text}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </nav>
              </section>
            )}
            <div
              className={`${
                error ? 'items-center' : 'items-end md:items-center'
              } min-h-[96px] flex shrink-0 mr-[5px]`}
            >
              <Image
                className={`${
                  error
                    ? 'h-[40px] w-auto'
                    : 'h-[25px] md:h-[40px] w-[105px] md:w-[164px]'
                } my-[15px]`}
                src={logo}
                alt="Symbol of the Government of Canada"
              />
            </div>
          </div>
        </div>
      </>
    </footer>
  )
}

Footer.defaultProps = {
  lang: 'en',
  contactLink: 'https://www.canada.ca/en/contact.html',
}

Footer.propTypes = {
  /**
   * id of this component
   */
  id: PropTypes.string.isRequired,
  /**
   * Switch between english and french footer. Pass in "en" or "fr"
   */
  lang: PropTypes.oneOf(['en', 'fr', 'und']),
  /**
   * Add the path Link to the top of your page for the "to the Top" button in mobile
   */
  btnLink: PropTypes.string.isRequired,

  /**
   * containerClass: Customized container class name. If pass a existing class name, then 'ds-container' will be
   * replaced by the passed in class name.
   **/
  containerClass: PropTypes.string,

  /**
   * If true will display the error page version of the footer component
   */
  error: PropTypes.bool,

  /**
   * Allow user to pass in their own contact link
   */
  contactLink: PropTypes.string,

  /**
   * List of links to display on the footer
   */
  brandLinks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
      href: PropTypes.string,
    })
  ),

  /**
   * Specifies where to open the linked document
   */
  target: PropTypes.string,

  /**
   * Handle onclick on the footer media link
   */
  onClick: PropTypes.func,
}
