import { useEffect, useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import Date from '../components/Date'
import Heading from '../components/Heading'
import ContextualAlert from '../components/ContextualAlert'
import en from '../locales/en'
import fr from '../locales/fr'
import { getPrivacyConditionContent } from '../graphql/mappers/privacy-notice-terms-conditions'
import { getLogger } from '../logging/log-util'
import {
  AuthIsDisabled,
  AuthIsValid,
  ValidateSession,
  Redirect,
  getIdToken,
} from '../lib/auth'
import { authOptions } from '../pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import BackToButton from '../components/BackToButton'
import Markdown from 'markdown-to-jsx'
import { getAuthModalsContent } from '../graphql/mappers/auth-modals'
import React from 'react'
import ErrorPage from '../components/ErrorPage'

export default function PrivacyCondition(props) {
  const t = props.locale === 'en' ? en : fr

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
          props.locale === 'en'
            ? 'en/privacy-notice-terms-conditions'
            : 'fr/avis-confidentialite-modalites'
        }
        accountPageLink={
          props?.locale === 'en'
            ? 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/home-accueil?Lang=eng'
            : 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/home-accueil?Lang=fra'
        }
      />
    )
  }

  const pageContent = props.content.content

  const [privacy, ...termsAndConditions] = pageContent.split(
    props.locale === 'en'
      ? /(?=## Terms and conditions of use|1\. \*\*Your credentials\*\*)/
      : /(?=## Conditions d’utilisation|1\. \*\*Vos identifiants\*\*)/,
  )

  return (
    <div data-cy="terms-conditions" data-testid="terms-conditionsContent-test">
      <Heading
        id="PrivacyCondition-heading"
        title={props.content.heading}
        className="mb-2"
      />
      <ul>
        <ContextualAlert
          id="PrivacyCondition-alert"
          type={props.content.alert.type}
          alertBody={props.content.alert.text}
          alert_icon_alt_text={`${props.content.alert.type} ${
            props.locale === 'fr' ? 'Icônes' : 'icon'
          }`}
          alert_icon_id="alert-icon-id"
        />
      </ul>
      <section id={t.footerPrivacyAnchor}>
        <Markdown
          options={{
            overrides: {
              h2: {
                props: {
                  className:
                    'text-3xl text-gray-darker font-display font-bold mt-10 mb-3',
                },
              },
              p: {
                props: {
                  className: 'mb-3 text-gray-darker',
                },
              },
              ol: {
                props: {
                  className:
                    'list-[lower-latin] [&>li>ol]:list-[lower-latin] [&>li>ol>li]:list-[lower-roman] [&>li>ol>li>ol]:list-[lower-roman] ml-4 sm:mx-8 mb-3 text-gray-darker',
                },
              },
              a: {
                props: {
                  className: 'underline text-deep-blue-dark cursor-pointer',
                },
              },
            },
          }}
        >
          {privacy}
        </Markdown>
      </section>
      <section id={t.footerTermsAndConditionAnchor}>
        <Markdown
          options={{
            overrides: {
              h2: {
                props: {
                  className:
                    'text-3xl font-display font-bold mt-10 mb-3 text-gray-darker',
                },
              },
              p: {
                props: {
                  className: 'mb-3 text-gray-darker',
                },
              },
              ol: {
                props: {
                  className:
                    'break-all xs:break-normal list-[lower-latin] ml-2 sm:mx-8 mb-3 text-gray-darker',
                },
              },
            },
          }}
        >
          {termsAndConditions[0]}
        </Markdown>
        <Markdown
          options={{
            overrides: {
              h2: {
                props: {
                  className:
                    'text-3xl font-display font-bold mt-10 mb-3 text-gray-darker',
                },
              },
              p: {
                props: {
                  className: 'mb-3 text-gray-darker',
                },
              },
              ol: {
                props: {
                  className:
                    'break-all xs:break-normal list-[lower-decimal] [&>li>ol]:list-[lower-latin] [&>li>ol>li>ol]:list-[lower-roman] ml-2 sm:mx-8 mb-3 text-gray-darker',
                },
              },
              a: {
                props: {
                  className: 'underline text-deep-blue-dark cursor-pointer',
                },
              },
            },
          }}
        >
          {termsAndConditions[1]}
        </Markdown>
      </section>
      <BackToButton
        buttonHref={t.url_dashboard}
        buttonId="back-to-dashboard-button"
        buttonLinkText={t.backToDashboard}
        refPageAA={props.aaPrefix}
        id={t.id_dashboard}
      />
      <Date
        id="termsConditionsDateModified"
        date={props.content.dateModified}
        label={t.dateModified}
      />
    </div>
  )
}

export async function getServerSideProps({ req, res, locale }) {
  const session = await getServerSession(req, res, authOptions)

  if (!AuthIsDisabled() && !(await AuthIsValid(req, session)))
    return Redirect(locale)

  const token = await getIdToken(req)

  //If Next-Auth session is valid, check to see if ECAS session is. If not, clear session cookies and redirect to login
  if (!AuthIsDisabled() && (await AuthIsValid(req, session))) {
    const sessionValid = await ValidateSession(
      process.env.CLIENT_ID,
      token?.sid,
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

  //The below sets the minimum logging level to error and surpresses everything below that
  const logger = getLogger('privacy-notice-terms-and-conditions')
  logger.level = 'error'

  const content = await getPrivacyConditionContent().catch((error) => {
    logger.error(error)
    return { err: '500' }
  })

  const authModals = await getAuthModalsContent().catch((error) => {
    logger.error(error)
    return { err: '500' }
  })

  /* istanbul ignore next */
  const langToggleLink =
    locale === 'en'
      ? '/fr/avis-confidentialite-modalites'
      : '/en/privacy-notice-terms-conditions'

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
      title:
        'Privacy notice and terms and conditions - My Service Canada Account',
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
      service: 'ESDC-EDSC_MSCA-MSDC-SCH',
      creator: 'Employment and Social Development Canada',
      accessRights: '1',
    },
    data_fr: {
      title:
        'Avis de confidentialité et modalités - Mon dossier Service Canada',
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
      aaPrefix:
        content?.err !== undefined
          ? ''
          : `ESDC-EDSC_MSCA-MSDC-SCH:${content.en?.heading || content.en?.title}`,
      aaMenuPrefix:
        content?.err !== undefined ? '' : `ESDC-EDSC_MSCA-MSDC-SCH:Nav Menu`,
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

PrivacyCondition.propTypes = {
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
