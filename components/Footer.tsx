import Link from 'next/link'
import en from '../locales/en'
import fr from '../locales/fr'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '../lib/loadIcons'
import logo from '../public/wmms-blk.svg'

interface Links {
  id: string
  text: string
  href: string
  onClick: () => void
}

interface FooterProps {
  id: string
  lang: 'en' | 'fr' | 'und'
  btnLink: string
  error: boolean
  contactLink: string
  brandLinks: Links[]
  target: string
}

const Footer = ({
  id,
  lang,
  btnLink,
  error,
  contactLink,
  brandLinks,
  target,
}: FooterProps) => {
  const t = lang === 'en' ? en : fr

  return (
    <footer id={id} className="w-full" data-testid="footer">
      <div className="bg-blue-primary">
        <section
          className={`sch-container h-[5.75rem] pb-5 flex flex-col items-start`}
        >
          <h2 className="pt-[22px] pb-2 text-white font-body font-bold">
            {t.mscaFooterHeading}
          </h2>
          <Link
            className="text-white font-body text-sm hover:text-white hover:underline focus:ring-1 focus:ring-white"
            data-cy="footerContactUsLink"
            id="footerContactUsLink"
            href={contactLink}
            target={target}
            locale={lang}
            aria-label={t.mscaFooterContactUsText}
          >
            {t.mscaFooterContactUsText}
          </Link>
        </section>
      </div>
      {/* Subfooter */}
      <div className="bg-gray-lightest">
        <div
          className={`'min-h-[86px] ' ${
            error ? 'items-center' : ''
          } flex justify-between sch-container`}
        >
          {error ? (
            <div>
              <a
                id="top_btn"
                href={btnLink}
                className="sm:hidden float-left cursor-pointer text-sm"
              >
                {t.topOfPage}
                <FontAwesomeIcon
                  icon={icon['chevron-up']}
                  className="text-sm sm:hidden pl-2"
                />
              </a>
            </div>
          ) : (
            <section className="md:flex-row flex items-center">
              <nav role="navigation" aria-labelledby="accessibleSectionHeader2">
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
                        } pr-4 mb-[17px] list-inside list-none`}
                      >
                        <Link
                          className="text-deep-blue-dark font-body text-sm hover:underline"
                          onClick={onClick}
                          id={'footerLink' + index}
                          href={href}
                          target={target}
                          aria-label={text}
                        >
                          {text}
                        </Link>
                      </li>
                    )
                  })}
                  <li className="sm:hidden float-left cursor-pointer text-sm">
                    <a id="top_btn" href={btnLink}>
                      {t.topOfPage}
                      <FontAwesomeIcon
                        icon={icon['chevron-up']}
                        className="text-sm sm:hidden pl-2"
                      />
                    </a>
                  </li>
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
              alt={t.footerCanadaCaAltText}
              width={143}
              height={34}
            />
          </div>
        </div>
      </div>
    </footer>
  )
}

Footer.defaultProps = {
  lang: 'en',
  contactLink: 'https://www.canada.ca/en/contact.html',
  brandLinks: [
    {
      href: 'https://example.com/link1',
      text: 'Link 1',
      onClick: () => {},
    },
  ],
}

export default Footer
