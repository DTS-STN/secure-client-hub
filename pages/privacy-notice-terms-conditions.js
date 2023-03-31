import PropTypes from 'prop-types'
import {
  Heading,
  Link,
  ContextualAlert,
} from '@dts-stn/service-canada-design-system'
import en from '../locales/en'
import fr from '../locales/fr'
import { getPrivacyConditionContent } from '../graphql/mappers/privacy-notice-terms-conditions'
import { getBetaBannerContent } from '../graphql/mappers/beta-banner-opt-out'
import { getBetaPopupExitContent } from '../graphql/mappers/beta-popup-exit'
import logger from '../lib/logger'
import BackToButton from '../components/BackToButton'

export default function PrivacyCondition(props) {
  // console.log(props.content)
  const t = props.locale === 'en' ? en : fr
  return (
    <div
      id="privacyConditionContent"
      data-testid="privacyConditionContent-test"
    >
      <Heading id="PrivacyCondition-heading" title={props.content.heading} />
      <ContextualAlert
        className="p-12 m-16 text-lg"
        id="PrivacyCondition-alert"
        type={props.content.alert.type}
        message_heading="Information"
        message_body={props.content.alert.text}
        alert_icon_alt_text="info icon"
        alert_icon_id="info-icon"
      />
      <section>
        <h2 className="text-3xl font-display font-bold">
          {props.content.privacyNoticeSection.title}
        </h2>
        <p>{props.content.privacyNoticeSection.paragraphs[0]}</p>
        <ol className="list-[lower-latin]">
          {props.content.privacyNoticeSection.lists[0].map((item, index) => {
            return (
              <li key={index}>
                <i>{item}</i>
              </li>
            )
          })}
        </ol>
        <p>{props.content.privacyNoticeSection.paragraphs[1]}</p>
        <p>{props.content.privacyNoticeSection.paragraphs[2]}</p>
        <p>
          {props.content.privacyNoticeSection.paragraphs[3]}
          <a href={props.content.privacyNoticeSection.links[0].href}>
            {props.content.privacyNoticeSection.links[0].text}
          </a>
          {props.content.privacyNoticeSection.paragraphs[4]}
        </p>
        <p>
          {props.content.privacyNoticeSection.paragraphs[5]}
          <i>{props.content.privacyNoticeSection.paragraphs[6]}</i>
          {props.content.privacyNoticeSection.paragraphs[7]}
        </p>
        <ol className="list-[lower-latin]">
          {props.content.privacyNoticeSection.lists[1].map((item, index) => {
            return (
              <li key={index}>
                <i>{item}</i>
              </li>
            )
          })}
        </ol>
        <p>
          {props.content.privacyNoticeSection.paragraphs[8]}
          <a href={props.content.privacyNoticeSection.links[1].href}>
            {props.content.privacyNoticeSection.links[1].text}
          </a>
          {props.content.privacyNoticeSection.paragraphs[9]}
        </p>
        <p>
          {props.content.privacyNoticeSection.paragraphs[10]}
          <a href={props.content.privacyNoticeSection.links[2].href}>
            {props.content.privacyNoticeSection.links[2].text}
          </a>
          {props.content.privacyNoticeSection.paragraphs[11]}
        </p>
      </section>
      <section>
        <h2 className="text-3xl font-display font-bold">
          {props.content.digitalSection.title}
        </h2>
        <p>{props.content.digitalSection.paragraphs[0]}</p>
        <ol className="lst-lwr-alph">
          {props.content.digitalSection.lists[0].map((item, index) => {
            return (
              <li key={index}>
                <i>{item}</i>
              </li>
            )
          })}
        </ol>
        <p>
          {props.content.digitalSection.paragraphs[1]}
          <a href={props.content.digitalSection.links[0].href}>
            {props.content.digitalSection.links[0].text}
          </a>
          {props.content.digitalSection.paragraphs[2]}
        </p>
      </section>
      <section>
        <h2 className="text-3xl font-display font-bold">
          {props.content.systemSection.title}
        </h2>
        <ol className="lst-lwr-alph">
          <li>{props.content.systemSection.lists[0]}</li>
          <li>{props.content.systemSection.lists[1]}</li>
          <li>
            {props.content.systemSection.lists[2]}
            <ol className="lst-lwr-rmn">
              {props.content.systemSection.sublists.map((item, index) => {
                return <li key={index}>{item}</li>
              })}
            </ol>
          </li>
          <li>{props.content.systemSection.lists[3]}</li>
          <li>{props.content.systemSection.lists[4]}</li>
        </ol>
      </section>

      <section>
        <h2 className="text-3xl font-display font-bold">
          {props.content.termsConditionsSection.title}
        </h2>
        <p>{props.content.termsConditionsSection.paragraphs[0]}</p>
        <p>{props.content.termsConditionsSection.paragraphs[1]}</p>
        <ol className="lst-lwr-alph">
          <li>{props.content.termsConditionsSection.lists[0][0]}</li>
          <li>{props.content.termsConditionsSection.lists[0][1]}</li>
        </ol>
        <ol>
          <li>
            <strong>
              {props.content.termsConditionsSection.listTitles[0]}
            </strong>
            <ol className="lst-lwr-alph">
              <li>{props.content.termsConditionsSection.lists[1][0]}</li>
              <li>{props.content.termsConditionsSection.lists[1][1]}</li>
              <li>{props.content.termsConditionsSection.lists[1][2]}</li>
              <li>{props.content.termsConditionsSection.lists[1][3]}</li>
              <li>{props.content.termsConditionsSection.lists[1][4]}</li>
              <li>
                {props.content.termsConditionsSection.lists[1][5]}
                <ol className="lst-lwr-rmn">
                  <li>{props.content.termsConditionsSection.sublists[0][0]}</li>
                  <li>{props.content.termsConditionsSection.sublists[0][1]}</li>
                </ol>
              </li>
              <li>
                {props.content.termsConditionsSection.lists[1][6]}
                <a href={props.content.termsConditionsSection.links[0].href}>
                  {props.content.termsConditionsSection.links[0].text}
                </a>
              </li>
              <li>
                {props.content.termsConditionsSection.lists[1][7]}
                <ol className="lst-lwr-rmn">
                  <li>{props.content.termsConditionsSection.sublists[1][0]}</li>
                  <li>{props.content.termsConditionsSection.sublists[1][1]}</li>
                  <li>{props.content.termsConditionsSection.sublists[1][2]}</li>
                </ol>
              </li>
            </ol>
          </li>
          <li>
            <strong>
              {props.content.termsConditionsSection.listTitles[1]}
            </strong>
            <ol className="lst-lwr-alph">
              <li>{props.content.termsConditionsSection.lists[2][0]}</li>
              <li>{props.content.termsConditionsSection.lists[2][1]}</li>
              <li>{props.content.termsConditionsSection.lists[2][2]}</li>
              <li>{props.content.termsConditionsSection.lists[2][3]}</li>
              <li>{props.content.termsConditionsSection.lists[2][4]}</li>
              <li>{props.content.termsConditionsSection.lists[2][5]}</li>
              <li>{props.content.termsConditionsSection.lists[2][6]}</li>
              <li>{props.content.termsConditionsSection.lists[2][7]}</li>
              <li>
                {props.content.termsConditionsSection.lists[2][8]}
                <a href={props.content.termsConditionsSection.links[1].href}>
                  {props.content.termsConditionsSection.links[1].text}
                </a>
              </li>
            </ol>
          </li>
          <li>
            <strong>
              {props.content.termsConditionsSection.listTitles[2]}
            </strong>
            <ol>
              <li className="lst-lwr-alph">
                {props.content.termsConditionsSection.lists[3][0]}
                <ol className="lst-lwr-rmn">
                  <li>{props.content.termsConditionsSection.sublists[2][0]}</li>
                  <li>{props.content.termsConditionsSection.sublists[2][1]}</li>
                  <li>{props.content.termsConditionsSection.sublists[2][2]}</li>
                  <li>{props.content.termsConditionsSection.sublists[2][3]}</li>
                  <li>{props.content.termsConditionsSection.sublists[2][4]}</li>
                </ol>
              </li>
            </ol>
          </li>
          <li>
            <strong>
              {props.content.termsConditionsSection.listTitles[3]}
            </strong>
            <ol className="lst-lwr-alph">
              <li>{props.content.termsConditionsSection.lists[4][0]}</li>
            </ol>
          </li>
          <li>
            <strong>
              {props.content.termsConditionsSection.listTitles[4]}
            </strong>
            <ol className="lst-lwr-alph">
              <li>{props.content.termsConditionsSection.lists[5][0]}</li>
            </ol>
          </li>
        </ol>
      </section>
      <div id="readOnlyRemove" aria-readonly={true}>
        <p>{props.content.termsConditionsSection.readOnly}</p>
      </div>
      <BackToButton
        buttonHref={t.url_dashboard}
        buttonId="back-to-dashboard-button"
        buttonLinkText={t.backToDashboard}
      />
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

  const t = locale === 'en' ? en : fr
  console.log(content.fr.privacyNoticeSection.lists)
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
      bannerContent: locale === 'en' ? bannerContent.en : bannerContent.fr,
      popupContent: locale === 'en' ? popupContent.en : popupContent.fr,
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
