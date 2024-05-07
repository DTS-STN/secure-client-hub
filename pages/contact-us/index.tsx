import Link from 'next/link'
import Heading from '../../components/Heading'
import { getAuthModalsContent } from '../../graphql/mappers/auth-modals'
import {
  GetContactUsContentReturnType,
  getContactUsContent,
} from '../../graphql/mappers/contact-us'
import {
  AuthIsDisabled,
  AuthIsValid,
  ValidateSession,
  Redirect,
  getIdToken,
} from '../../lib/auth'
import { authOptions } from '../api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import { GetServerSideProps } from 'next'
import { BreadcrumbItem } from '../../components/Breadcrumb'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '../../lib/loadIcons'

interface Data {
  title: string
  desc: string
  author: string
  keywords: string
  service: string
  creator: string
  accessRights: string
}

interface ContactLandingProps {
  locale: string
  /**
   * Intersection Types
   * @see https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#intersection-types
   */
  content: GetContactUsContentReturnType['en'] &
    GetContactUsContentReturnType['fr']
  meta: {
    data_en: Data
    data_fr: Data
  }
}

const ContactLanding = (props: ContactLandingProps) => {
  const newTabExceptions: string[] = [
    'https://www.canada.ca/en/employment-social-development/corporate/contact/sin.html',
    'https://www.canada.ca/fr/emploi-developpement-social/ministere/coordonnees/nas.html',
  ]

  return (
    <div id="contactContent" data-testid="contactContent-test">
      <Heading id="contact-us-heading" title={props.content.heading ?? ''} />
      <p className="mb-8 mt-3 text-xl text-gray-darker">
        {props.content.subHeading}
      </p>
      <ul className="list-disc" data-cy="contact-task-list">
        {props.content.links.map((link) => {
          return (
            <li className="mb-6 ml-5" key={link.linkId}>
              <Link
                className="rounded-sm font-body text-20px text-blue-primary underline visited:text-purple-50a hover:text-blue-hover focus:text-blue-hover focus:outline-1 focus:outline-blue-hover"
                id={link.linkId}
                data-testid={link.linkId}
                aria-label={link.linkTitle}
                href={`/${props.locale}/${props.content.pageName}/${(
                  link.linkDestination ?? ''
                )
                  .split('/')
                  .pop()}`}
                data-gc-analytics-customclick={`ESDC-EDSC_MSCA-MSDC-SCH:Contact Us:${link.linkTitle}`}
                target={
                  newTabExceptions.includes(link.linkDestination ?? '')
                    ? '_blank'
                    : '_self'
                }
                rel={
                  newTabExceptions.includes(link.linkDestination ?? '')
                    ? 'noopener noreferrer'
                    : undefined
                }
              >
                {link.linkTitle}
                <span>
                  {newTabExceptions.includes(link.linkDestination ?? '') ? (
                    <FontAwesomeIcon
                      className="absolute ml-1.5 pt-0.5"
                      width="14"
                      icon={icon['arrow-up-right-from-square']}
                    ></FontAwesomeIcon>
                  ) : null}
                </span>
                <span>
                  {newTabExceptions.includes(link.linkDestination ?? '') ? (
                    <span className="sr-only">
                      {props.locale === 'fr'
                        ? "S'ouvre dans un nouvel onglet"
                        : 'Opens in a new tab'}
                    </span>
                  ) : null}
                </span>
              </Link>
              <p className="text-xl text-gray-darker">{link.linkDescription}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export const getServerSideProps = (async ({ req, res, locale }) => {
  const session = await getServerSession(req, res, authOptions)

  if (!AuthIsDisabled() && !(await AuthIsValid(req, session)))
    return Redirect(locale)

  const token = await getIdToken(req)

  //If Next-Auth session is valid, check to see if ECAS session is and redirect to logout if not
  if (!AuthIsDisabled() && (await AuthIsValid(req, session))) {
    const sessionValid = await ValidateSession(
      process.env.CLIENT_ID,
      token?.sid,
    )
    if (!sessionValid) {
      return {
        redirect: {
          destination: `/${locale}/auth/logout`,
          permanent: false,
        },
      }
    }
  }

  const content = await getContactUsContent()
  const authModals = await getAuthModalsContent()

  /* istanbul ignore next */
  if (locale === 'und') {
    locale = 'en'
  }

  const langToggleLink =
    locale === 'en' ? '/fr/contactez-nous' : '/en/contact-us'

  const breadCrumbItems: BreadcrumbItem[] =
    (locale === 'en'
      ? content.en.breadcrumb?.map(({ link, text }) => {
          return { text, link: '/' + locale + '/' + link }
        })
      : content.fr.breadcrumb?.map(({ link, text }) => {
          return { text, link: '/' + locale + '/' + link }
        })) ?? []

  /* Place-holder Meta Data Props */
  const meta = {
    data_en: {
      title: 'Contact us - My Service Canada Account - Contact',
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
      service: 'ESDC-EDSC_MSCA-MSDC-SCH',
      creator: 'Employment and Social Development Canada',
      accessRights: '1',
    },
    data_fr: {
      title: 'Contactez-nous - Mon dossier Service Canada',
      desc: 'Français',
      author: 'Service Canada',
      keywords: '',
      service: 'ESDC-EDSC_MSCA-MSDC-SCH',
      creator: 'Emploi et Développement social Canada',
      accessRights: '1',
    },
  }

  return {
    props: {
      locale: locale === 'en' ? 'en' : 'fr',
      langToggleLink,
      content: {
        ...(locale === 'en' ? content.en : content.fr),
        breadCrumbItems,
      },
      meta,
      breadCrumbItems,
      aaPrefix: `ESDC-EDSC_MSCA-MSDC-SCH:${content.en.heading}`,
      aaMenuPrefix: `ESDC-EDSC_MSCA-MSDC-SCH:Nav Menu`,
      popupStaySignedIn:
        locale === 'en'
          ? authModals.mappedPopupStaySignedIn.en
          : authModals.mappedPopupStaySignedIn.fr,
      popupYouHaveBeenSignedout:
        locale === 'en'
          ? authModals.mappedPopupSignedOut.en
          : authModals.mappedPopupSignedOut.fr,
    },
  }
}) satisfies GetServerSideProps<ContactLandingProps>
// https://nextjs.org/docs/pages/building-your-application/configuring/typescript#static-generation-and-server-side-rendering

export default ContactLanding
