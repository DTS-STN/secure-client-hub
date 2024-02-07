import { useEffect, useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import Heading from '../components/Heading'
import en from '../locales/en'
import fr from '../locales/fr'
import { getDecisionReviewsContent } from '../graphql/mappers/decision-reviews'
import { getBetaBannerContent } from '../graphql/mappers/beta-banner-opt-out'
import { getBetaPopupExitContent } from '../graphql/mappers/beta-popup-exit'
import { getLogger } from '../logging/log-util'
import { AuthIsDisabled, AuthIsValid, Redirect } from '../lib/auth'
import { authOptions } from '../pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import { getBetaPopupNotAvailableContent } from '../graphql/mappers/beta-popup-page-not-available'
import { getAuthModalsContent } from '../graphql/mappers/auth-modals'
import throttle from 'lodash.throttle'
import Markdown from 'markdown-to-jsx'
import ErrorPage from '../components/ErrorPage'
import Button from '../components/Button'
import { useRouter } from 'next/router'

export default function DecisionReviews(props) {
  const t = props.locale === 'en' ? en : fr
  const [response, setResponse] = useState()
  const router = useRouter()

  //Event listener for click events that revalidates MSCA session, throttled using lodash to only trigger every 1 minute
  const onClickEvent = useCallback(
    async () => setResponse(await fetch('/api/refresh-msca')),
    []
  )
  const throttledOnClickEvent = useMemo(
    () => throttle(onClickEvent, 60000, { trailing: false }),
    [onClickEvent]
  )

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

  const errorCode =
    props.content?.err ||
    props.bannerContent?.err ||
    props.popupContent?.err ||
    props.popupContentNA?.err ||
    props.authModals?.err
  if (errorCode !== undefined) {
    return (
      <ErrorPage
        lang={props.locale !== undefined ? props.locale : 'en'}
        errType={errorCode}
        isAuth={false}
        homePageLink={
          props.locale === 'en' ? 'en/my-dashboard' : 'fr/mon-tableau-de-bord'
        }
        accountPageLink="/"
      />
    )
  }
  return (
    <div
      data-cy="decision-reviews"
      data-testid="decision-reviewsContent-test"
      className="mb-16"
    >
      <Heading
        id="DecisionReviews-heading"
        title={props.content.heading}
        className="mb-2"
      />
      <section id="step1">
        <Markdown
          options={{
            overrides: {
              h2: {
                props: {
                  className:
                    'text-4xl font-display font-bold mt-10 mb-3 text-gray-darker',
                },
              },
              p: {
                props: {
                  className: 'mb-10 text-gray-darker',
                },
              },
            },
          }}
        >
          {props.content.content[0].content}
        </Markdown>
        <Button
          id={props.content.content[0].button.id}
          style="primary"
          text={props.content.content[0].button.text}
          className="whitespace-normal md:max-h-11 my-auto w-fit justify-center px-auto mt-4 sm:mt-0 text-center"
          href={props.content.content[0].button.link}
          refPageAA={props.aaPrefix}
        ></Button>
      </section>

      <section id="step2">
        <Markdown
          options={{
            overrides: {
              h2: {
                props: {
                  className:
                    'text-4xl font-display font-bold mt-10 mb-3 text-gray-darker',
                },
              },
              p: {
                props: {
                  className: 'mb-10 text-gray-darker',
                },
              },
            },
          }}
        >
          {props.content.content[1].content}
        </Markdown>
        <Button
          id={props.content.content[1].button.id}
          style="primary"
          text={props.content.content[1].button.text}
          className="whitespace-normal md:max-h-11 my-auto w-fit justify-center px-auto mt-4 sm:mt-0 text-center"
          href={props.content.content[1].button.link}
          refPageAA={props.aaPrefix}
        ></Button>
      </section>
    </div>
  )
}

export async function getServerSideProps({ req, res, locale }) {
  const session = await getServerSession(req, res, authOptions)

  if (!AuthIsDisabled() && !(await AuthIsValid(req, session)))
    return Redirect(locale)

  //The below sets the minimum logging level to error and surpresses everything below that
  const logger = getLogger('decision-reviews')
  logger.level = 'error'

  const content = await getDecisionReviewsContent().catch((error) => {
    logger.error(error)
    return { err: '500' }
  })
  const bannerContent = await getBetaBannerContent().catch((error) => {
    logger.error(error)
    return { err: '500' }
  })
  const popupContent = await getBetaPopupExitContent().catch((error) => {
    logger.error(error)
    return { err: '500' }
  })

  /*
   * Uncomment this block to make Banner Popup Content display "Page Not Available"
   * Comment "getBetaPopupExitContent()" block of code above.
   */
  const popupContentNA = await getBetaPopupNotAvailableContent().catch(
    (error) => {
      logger.error(error)
      return { err: '500' }
    }
  )

  const authModals = await getAuthModalsContent().catch((error) => {
    logger.error(error)
    return { err: '500' }
  })

  /* istanbul ignore next */
  const langToggleLink =
    locale === 'en' ? '/fr/demande-revision' : '/en/decision-reviews'
  const breadCrumbItems =
    locale === 'en'
      ? content.en.breadcrumb?.map(({ link, text }) => {
          return { text, link: '/' + locale + '/' + link }
        })
      : content.fr.breadcrumb?.map(({ link, text }) => {
          return { text, link: '/' + locale + '/' + link }
        })
  /* Place-holder Meta Data Props */
  const meta = {
    data_en: {
      title: 'Request Review Decison - My Service Canada Account',
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
      service: 'ESDC-EDSC_MSCA-MSDC-SCH',
      creator: 'Employment and Social Development Canada',
      accessRights: '1',
    },
    data_fr: {
      title: 'Demande de revision - Mon dossier Service Canada',
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
      locale,
      langToggleLink,
      content:
        content?.err !== undefined
          ? content
          : locale === 'en'
          ? content.en
          : content.fr,
      meta,
      breadCrumbItems,
      bannerContent:
        bannerContent?.err !== undefined
          ? bannerContent
          : locale === 'en'
          ? bannerContent.en
          : bannerContent.fr,
      popupContent:
        popupContent?.err !== undefined
          ? popupContent
          : locale === 'en'
          ? popupContent.en
          : popupContent.fr,
      popupContentNA:
        popupContentNA?.err !== undefined
          ? popupContentNA
          : locale === 'en'
          ? popupContentNA.en
          : popupContentNA.fr,
      aaPrefix:
        content?.err !== undefined
          ? ''
          : `ESDC-EDSC:${content.en?.heading || content.en?.title}`,
      popupStaySignedIn:
        authModals?.err !== undefined
          ? authModals
          : locale === 'en'
          ? authModals.mappedPopupStaySignedIn.en
          : authModals.mappedPopupStaySignedIn.fr,
      popupYouHaveBeenSignedout:
        authModals?.err !== undefined
          ? authModals
          : locale === 'en'
          ? authModals.mappedPopupSignedOut.en
          : authModals.mappedPopupSignedOut.fr,
    },
  }
}

DecisionReviews.propTypes = {
  /**
   * current locale in the address
   */
  locale: PropTypes.string,

  /*
   * Language link toggle text
   */
  langToggleLink: PropTypes.string,

  /*
   * Content Tags
   */

  content: PropTypes.object,

  /*
   * Meta Tags
   */

  meta: PropTypes.object,
}
