import PropTypes from 'prop-types'
import { Date } from '../components/Date'
import Heading from '../components/Heading'
import ContextualAlert from '../components/ContextualAlert'
import en from '../locales/en'
import fr from '../locales/fr'
import { getPrivacyConditionContent } from '../graphql/mappers/privacy-notice-terms-conditions'
import { getBetaBannerContent } from '../graphql/mappers/beta-banner-opt-out'
import { getBetaPopupExitContent } from '../graphql/mappers/beta-popup-exit'
import { getLogger } from '../logging/log-util'
import BackToButton from '../components/BackToButton'
import Markdown from 'markdown-to-jsx'
import { getBetaPopupNotAvailableContent } from '../graphql/mappers/beta-popup-page-not-available'
import { getAuthModalsContent } from '../graphql/mappers/auth-modals'

export default function PrivacyCondition(props) {
  const t = props.locale === 'en' ? en : fr

  const pageContent = props.content.content
  const [privacy, ...termsAndConditions] = pageContent.split(
    props.locale === 'en'
      ? /(?=## Terms and conditions of use)/
      : /(?=## Conditions d’utilisation)/
  )

  return (
    <div data-cy="terms-conditions" data-testid="terms-conditionsContent-test">
      <Heading
        id="PrivacyCondition-heading"
        title={props.content.heading}
        className="mb-2"
      />
      <ContextualAlert
        id="PrivacyCondition-alert"
        type={props.content.alert.type}
        message_heading="Information"
        message_body={props.content.alert.text}
        alert_icon_alt_text="info icon"
        alert_icon_id="info-icon"
      />
      <section id={t.footerPrivacyAnchor}>
        <Markdown
          options={{
            overrides: {
              h2: {
                props: {
                  className: 'text-3xl font-display font-bold mt-10 mb-3',
                },
              },
              p: {
                props: {
                  className: 'mb-3',
                },
              },
              ol: {
                props: {
                  className:
                    'list-[lower-decimal] [&>li>ol]:list-[lower-latin] [&>li>ol>li>ol]:list-[lower-roman] mx-8 mb-3',
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
                  className: 'text-3xl font-display font-bold mt-10 mb-3',
                },
              },
              p: {
                props: {
                  className: 'mb-3',
                },
              },
              ol: {
                props: {
                  className:
                    'list-[lower-decimal] [&>li>ol]:list-[lower-latin] [&>li>ol>li>ol]:list-[lower-roman] mx-8 mb-3',
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
          {termsAndConditions[0]}
        </Markdown>
      </section>
      <BackToButton
        buttonHref={t.url_dashboard}
        buttonId="back-to-dashboard-button"
        buttonLinkText={t.backToDashboard}
        refPageAA={props.aaPrefix}
        id={t.id_dashboard}
      />
      <Date id="termsConditionsDateModified" date="20230331" />
    </div>
  )
}

export async function getServerSideProps({ res, locale }) {
  //The below sets the minimum logging level to error and surpresses everything below that
  const logger = getLogger('privacy-notice-terms-and-conditions')
  logger.level = 'error'

  const content = await getPrivacyConditionContent().catch((error) => {
    logger.error(error)
    //res.statusCode = 500
    throw error
  })
  const bannerContent = await getBetaBannerContent().catch((error) => {
    logger.error(error)
    // res.statusCode = 500
    throw error
  })
  const popupContent = await getBetaPopupExitContent().catch((error) => {
    logger.error(error)
    // res.statusCode = 500
    throw error
  })

  /*
   * Uncomment this block to make Banner Popup Content display "Page Not Available"
   * Comment "getBetaPopupExitContent()" block of code above.
   */
  const popupContentNA = await getBetaPopupNotAvailableContent().catch(
    (error) => {
      logger.error(error)
      // res.statusCode = 500
      throw error
    }
  )

  const authModals = await getAuthModalsContent().catch((error) => {
    logger.error(error)
    // res.statusCode = 500
    throw error
  })

  /* 
   * Uncomment this block to make Banner Popup Content display "Page Not Available"
   * Comment "getBetaPopupExitContent()" block of code above.
  
    const popupContent = await getBetaPopupNotAvailableContent().catch((error) => {
      logger.error(error)
      // res.statusCode = 500
      throw error
    })
  */

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
      title: 'Privacy and Conditions - My Service Canada Account',
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
      service: 'ESDC-EDSC_MSCA-MSDC',
      creator: 'Employment and Social Development Canada',
      accessRights: '1',
    },
    data_fr: {
      title: 'Confidentialité et conditions - Mon dossier Service Canada',
      desc: 'Français',
      author: 'Service Canada',
      keywords: '',
      service: 'ESDC-EDSC_MSCA-MSDC',
      creator: 'Emploi et Développement social Canada',
      accessRights: '1',
    },
  }

  return {
    props: {
      locale,
      langToggleLink,
      content: locale === 'en' ? content.en : content.fr,
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
