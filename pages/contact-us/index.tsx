import Link from 'next/link'
import Heading from '../../components/Heading'
import { getBetaPopupNotAvailableContent } from '../../graphql/mappers/beta-popup-page-not-available'
import { getAuthModalsContent } from '../../graphql/mappers/auth-modals'
import {
  GetContactUsContentReturnType,
  getContactUsContent,
} from '../../graphql/mappers/contact-us'
import { getBetaBannerContent } from '../../graphql/mappers/beta-banner-opt-out'
import { getBetaPopupExitContent } from '../../graphql/mappers/beta-popup-exit'
import {
  AuthIsDisabled,
  AuthIsValid,
  Redirect,
  ValidateSession,
} from '../../lib/auth'
import { authOptions } from '../api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import { GetServerSideProps } from 'next'
import { BreadcrumbItem } from '../../components/Breadcrumb'
import { getToken } from 'next-auth/jwt'

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
                data-gc-analytics-customclick={`ESDC-EDSC:Contact Us:${link.linkTitle}`}
              >
                {link.linkTitle}
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
  const token = await getToken({ req })

  if (!AuthIsDisabled() && !(await AuthIsValid(req, session)))
    return Redirect(locale)

  //If Next-Auth session is valid, check to see if ECAS session is valid and clear cookies and redirect to login if not
  if (!AuthIsDisabled() && (await AuthIsValid(req, session))) {
    const sessionValid = await ValidateSession(
      process.env.CLIENT_ID,
      token?.sub,
    )
    if (!sessionValid) {
      // Clear all session cookies
      const isSecure = req.headers['x-forwarded-proto'] === 'https'
      const cookiePrefix = `${isSecure ? '__Secure-' : ''}next-auth.session-token`
      const cookies = []
      for (const cookie of Object.keys(req.cookies)) {
        if (cookie.startsWith(cookiePrefix)) {
          cookies.push(
            `${cookie}=deleted; Max-Age=0; path=/ ${isSecure ? '; Secure ' : ''}`,
          )
        }
      }
      res.setHeader('Set-Cookie', cookies)
      return {
        redirect: {
          destination: `/${locale}/auth/login`,
          permanent: false,
        },
      }
    }
  }

  const content = await getContactUsContent()
  const bannerContent = await getBetaBannerContent()
  const popupContent = await getBetaPopupExitContent()
  const popupContentNA = await getBetaPopupNotAvailableContent()
  const authModals = await getAuthModalsContent()

  /* istanbul ignore next */
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
      bannerContent: locale === 'en' ? bannerContent.en : bannerContent.fr,
      popupContent: locale === 'en' ? popupContent.en : popupContent.fr,
      popupContentNA: locale === 'en' ? popupContentNA.en : popupContentNA.fr,
      aaPrefix: `ESDC-EDSC:${content.en.heading}`,
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
