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
  onClick?: () => void
}

interface FooterProps {
  id: string
  lang: 'en' | 'fr' | 'und'
  btnLink: string
  error?: boolean
  contactLink: string
  brandLinks: Links[]
  target?: string
}

const Footer = ({
  id = 'mscaPlaceholder',
  lang = 'en',
  btnLink,
  error = false,
  contactLink = 'https://www.canada.ca/en/contact.html',
  brandLinks = [
    {
      href: 'mscaPlaceholderHref',
      text: 'mscaPlaceholder',
      onClick: () => {},
      id: 'mscaPlaceholder',
    },
  ],
  target,
}: FooterProps) => {
  const t = lang === 'en' ? en : fr

  return (
    <footer id={id} className="w-full" data-testid="footer">
      <div className="bg-blue-primary">
        <section
          className={`sch-container flex h-[5.75rem] flex-col items-start pb-5`}
        >
          <h2 className="pb-2 pt-[22px] font-body font-bold text-white">
            {t.mscaFooterHeading}
          </h2>
          <Link
            className="font-body text-sm text-white hover:text-white hover:underline focus:ring-1 focus:ring-white"
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
          } sch-container flex justify-between`}
        >
          {error ? (
            <div>
              <a
                id="top_btn"
                href={btnLink}
                className="float-left cursor-pointer text-sm sm:hidden"
              >
                {t.topOfPage}
                <FontAwesomeIcon
                  icon={icon['chevron-up']}
                  className="pl-2 text-sm sm:hidden"
                />
              </a>
            </div>
          ) : (
            <section className="flex items-center md:flex-row">
              <nav role="navigation" aria-labelledby="accessibleSectionHeader2">
                <h2 className="sr-only" id="accessibleSectionHeader2">
                  {t.aboutThisSite}
                </h2>
                <ul className="flex flex-col whitespace-nowrap pt-4 md:flex-row">
                  {brandLinks.map(({ href, text, onClick }, index) => {
                    return (
                      <li
                        key={index}
                        className={`${
                          index === 0 ? '' : 'md:list-disc'
                        } mb-[17px] list-inside list-none pr-4`}
                      >
                        <Link
                          className="font-body text-sm text-deep-blue-dark hover:underline"
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
                  <li className="float-left cursor-pointer text-sm sm:hidden">
                    <a id="top_btn" href={btnLink}>
                      {t.topOfPage}
                      <FontAwesomeIcon
                        icon={icon['chevron-up']}
                        className="pl-2 text-sm sm:hidden"
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
            } mr-[5px] flex min-h-[96px] shrink-0`}
          >
            <Image
              className={`${
                error
                  ? 'h-[40px] w-auto'
                  : 'h-[25px] w-[105px] md:h-[40px] md:w-[164px]'
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

export default Footer
