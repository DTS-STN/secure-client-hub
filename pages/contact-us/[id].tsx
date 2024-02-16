import React, {
  Fragment,
  useEffect,
  useCallback,
  useMemo,
  useState,
} from 'react'
import TableContents from '../../components/TableContents'
import Heading from '../../components/Heading'

import { ContactSection } from '../../components/contact/ContactSection'
import { ContactProvince } from '../../components/contact/ContactProvince'
import { getBetaBannerContent } from '../../graphql/mappers/beta-banner-opt-out'
import { getBetaPopupExitContent } from '../../graphql/mappers/beta-popup-exit'
import { getBetaPopupNotAvailableContent } from '../../graphql/mappers/beta-popup-page-not-available'
import { getAuthModalsContent } from '../../graphql/mappers/auth-modals'
import {
  GetContactUsPageReturnType,
  getContactUsPage,
} from '../../graphql/mappers/contact-us-pages-dynamic'
import { AuthIsDisabled, AuthIsValid, Redirect } from '../../lib/auth'
import { authOptions } from '../api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import throttle from 'lodash.throttle'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'

interface Data {
  title: string
  desc: string
  author: string
  keywords: string
  service: string
  creator: string
  accessRights: string
}

interface ContactUsPageProps {
  locale: string
  pageContent: NonNullable<GetContactUsPageReturnType>['en'] &
    NonNullable<GetContactUsPageReturnType>['fr']
  meta: {
    data_en: Data
    data_fr: Data
  }
}

const ContactUsPage = (props: ContactUsPageProps) => {
  /* istanbul ignore next */

  const [response, setResponse] = useState<Response | undefined>()
  const router = useRouter()

  //Event listener for click events that revalidates MSCA session, throttled using lodash to only trigger every 1 minute
  const onClickEvent = useCallback(
    async () => setResponse(await fetch('/api/refresh-msca')),
    []
  )
  const throttledOnClickEvent = useMemo(() => {
    return throttle(onClickEvent, 60000, { trailing: false })
  }, [onClickEvent])

  useEffect(() => {
    window.addEventListener('click', throttledOnClickEvent)
    //If validateSession call indicates an invalid MSCA session, redirect to logout
    if (response?.status === 401) {
      router.push(`/${props.locale}/auth/logout`)
    }
    //Remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener('click', throttledOnClickEvent)
    }
  }, [throttledOnClickEvent, response, router, props.locale])

  return (
    <div
      id="homeContent"
      data-testid="contactUsPage-test"
      data-cy="ContactUsContent"
    >
      <Heading id={'contact-us-heading'} title={props.pageContent.title} />
      <div
        className="py-5"
        data-testid={`${
          props.pageContent.items.length > 0 && 'tableOfContents-test'
        }`}
      />
      <TableContents
        id="onthispage"
        sectionList={props.pageContent.items.map((item) => {
          return { name: item.title, link: `#${item.id}` }
        })}
        lang={props.locale}
      />

      {props.pageContent.items.map((item) => (
        <Fragment key={item.id}>
          {item.layout === 'provinces' ? (
            <ContactProvince
              id={item.id}
              details={item.details}
              intro={item.intro}
              title={item.title}
            />
          ) : (
            <ContactSection
              id={item.id}
              details={item.details}
              intro={item.intro}
              title={item.title}
            />
          )}
        </Fragment>
      ))}
    </div>
  )
}

export const getServerSideProps = (async ({ req, res, locale, params }) => {
  const session = await getServerSession(req, res, authOptions)

  if (!AuthIsDisabled() && !(await AuthIsValid(req, session))) {
    return Redirect(locale)
  }

  const id = params?.id
  if (typeof id !== 'string' || id.trim().length === 0) {
    return { notFound: true }
  }
  const pageContent = await getContactUsPage(id)

  //Redirect to 404 page if user navigates to non-existent page
  if (!pageContent) {
    return { notFound: true }
  }

  const bannerContent = await getBetaBannerContent()

  const popupContent = await getBetaPopupExitContent()

  const popupContentNA = await getBetaPopupNotAvailableContent()

  const authModals = await getAuthModalsContent()

  /* istanbul ignore next */
  /*
    For some reason when using dynamic routes, the locale gets set to the default (und) after trying to switch back to English from French.
    The below fixes this issue by setting the locale to English if it is undefined, which is what the middleware is doing on all
    other pages and what it should also be doing for the contact pages.
  */
  if (locale === 'und') {
    locale = 'en'
  }

  const langToggleLink =
    locale === 'en'
      ? `/fr/contactez-nous/${pageContent.fr.pageName}`
      : `/en/contact-us/${pageContent.en.pageName}`

  const breadCrumbItems =
    locale === 'en'
      ? pageContent.en.breadcrumb.map(({ link, text }) => {
          return { text, link: '/' + locale + '/' + link }
        })
      : pageContent.fr.breadcrumb.map(({ link, text }) => {
          return { text, link: '/' + locale + '/' + link }
        })

  /* Place-holder Meta Data Props */
  const meta = {
    data_en: {
      title: `${pageContent.en.title} - My Service Canada Account`,
      desc: pageContent.en.description,
      author: 'Service Canada',
      keywords: '',
      service: 'ESDC-EDSC_MSCA-MSDC-SCH',
      creator: 'Service Canada',
      accessRights: '1',
    },
    data_fr: {
      title: `${pageContent.fr.title} - Mon dossier Service Canada`,
      desc: pageContent.fr.description,
      author: 'Service Canada',
      keywords: '',
      service: 'ESDC-EDSC_MSCA-MSDC-SCH',
      creator: 'Service Canada',
      accessRights: '1',
    },
  }

  return {
    props: {
      locale: locale === 'en' ? 'en' : 'fr',
      langToggleLink,
      pageContent: {
        ...(locale === 'en' ? pageContent.en : pageContent.fr),
        breadCrumbItems,
      },
      meta,
      breadCrumbItems,
      bannerContent: locale === 'en' ? bannerContent.en : bannerContent.fr,
      popupContent: locale === 'en' ? popupContent.en : popupContent.fr,
      popupContentNA: locale === 'en' ? popupContentNA.en : popupContentNA.fr,
      aaPrefix: `ESDC-EDSC:${pageContent.en.id || pageContent.en.title}`,
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
}) satisfies GetServerSideProps<ContactUsPageProps>
// https://nextjs.org/docs/pages/building-your-application/configuring/typescript#static-generation-and-server-side-rendering

export default ContactUsPage
