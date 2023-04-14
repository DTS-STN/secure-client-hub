import PropTypes from 'prop-types'
import {
  Heading,
  ContextualAlert,
  Date,
} from '@dts-stn/service-canada-design-system'
import en from '../locales/en'
import fr from '../locales/fr'
import { getPrivacyConditionContent } from '../graphql/mappers/privacy-notice-terms-conditions'
import { getBetaBannerContent } from '../graphql/mappers/beta-banner-opt-out'
import { getBetaPopupExitContent } from '../graphql/mappers/beta-popup-exit'
import logger from '../lib/logger'
import BackToButton from '../components/BackToButton'
import Markdown from 'markdown-to-jsx'

export default function PrivacyCondition(props) {
  const t = props.locale === 'en' ? en : fr

  return (
    <div className="font-body" data-cy="terms-conditions">
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
      <Markdown
        options={{
          overrides: {
            h1: {
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
        {props.content.content}
      </Markdown>
      <BackToButton
        buttonHref={t.url_dashboard}
        buttonId="back-to-dashboard-button"
        buttonLinkText={t.backToDashboard}
        refPageAA={props.aaPrefix}
      />
      <Date id="termsConditionsDateModified" date="20230331" />
    </div>
  )
}

export async function getServerSideProps({ res, locale }) {
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
      aaPrefix: `ESDC-EDSC:${content.en.heading}`,
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
