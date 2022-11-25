import PropTypes from 'prop-types'
import { Heading } from '@dts-stn/service-canada-design-system'
import PageLink from '../../components/PageLink'
import en from '../../locales/en'
import fr from '../../locales/fr'
import Card from '../../components/Card'
import { getProfileContent } from '../../graphql/mappers/profile'
import { getBetaBannerContent } from '../../graphql/mappers/beta-banner-opt-out'
import { getBetaPopupExitContent } from '../../graphql/mappers/beta-popup-exit'
import { getBetaPopupNotAvailableContent } from '../../graphql/mappers/beta-popup-page-not-available'
import logger from '../../lib/logger'
import ProfileTasks from '../../components/ProfileTasks'
import Modal from 'react-modal'
import React from 'react'
import ExitBetaModal from '../../components/ExitBetaModal'

const tmpPage = {
  scTitleEn: 'Contact Employment Insurance',
  scPageNameEn: 'contact-employment-insurance',
  scPageNameFr: 'communiquer-assurance-emploi',
  scTitleEn: 'Contact Employment Insurance',
  scTitleFr: "Communiquer avec l'assurance-emploi",
  scBreadcrumbParentPages: [
    '/content/dam/decd-endc/content-fragments/sch/pages/my-dashboard',
    '/content/dam/decd-endc/content-fragments/sch/pages/contact-us-pages/contact-us',
  ],
}

const tmpContactMethods = {
  scTitleEn: 'On this page',
  scTitleFr: 'Sur cette page',
  contactMethods: [
    {
      scTitleEn: 'Telephone',
      scTitleFr: 'Téléphone',
      PathEn:
        '/content/dam/decd-endc/content-fragments/sch/contact-methods/ei-contact-telephone',
      PathFr:
        '/content/dam/decd-endc/content-fragments/sch/contact-methods/ei-contact-telephone',
      schIntroEn:
        '<p><b>Sed ut perspiciatis unde omnis iste</b> natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p><p>Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur <b>aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione</b> voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>',
      schIntroFr:
        '<p><b>Sed ut perspiciatis unde omnis iste</b> natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p><p>Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur <b>aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione</b> voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>',
      rows: [
        {
          schBeforeLabelEn: 'Before you call us',
          schBeforeLabelFr: 'Avant de nous appeler',
          schBeforeDetailsEn:
            'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
          schBeforeDetailsFr:
            'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
          schPhoneLabelEn: 'Telephone Number',
          schPhoneLabelFr: 'Numero De Telephone',
          schPhoneDetailsEn:
            'Toll-Free: <b>1-800-206-7218<br>TTY: 1-800-529-3742',
          schPhoneDetailsFr:
            'Toll-Free: <b>1-800-206-7218<br>TTY: 1-800-529-3742',
          schHoursLabelEn:
            '8:30 am to 4:30 pm local time, Monday to Friday, except statutory holidays',
          schHoursLabelFr:
            '8:30 am a 4:30 pm, Lundi a Vendredi, sauf aux journees pedagogiques',
          schWaitLabelEn: 'Wait times',
          schWaitLabelFr: "Temps d'attente",
          schWaitDetailsEn:
            '11 minutes was the average wait time for the week of September 19, 2022',
          schWaitDetailsFr:
            "11 minutes etais la moyenne d'attente pour la semaine de September 19, 2022",
          schHoursAutoLabelEn: 'Hours for automated service',
          schHoursAutoLabelFr: 'Heures de service automatizee',
          schHoursAutoDetailslEn: '24 hours a day, 7 days a week',
          schHoursAutoDetailslFr: '24 heures par jour, 7 jours par semaine',
        },
      ],
    },
  ],
}

// Model: SCH-Contact-Method-v1
// Path: /content/dam/decd-endc/content-fragments/sch/contact-methods/ei-contact-telephone
// scId: ei-contact-telephone
// scTitleEn: Telephone
// scTitleFr: Téléphone
// schIntroEn:
// "html": ".....",
// "markdown": "....",
// "json": ..... },
// schIntroFr": {
// "html": ".....",
// "markdown": "....",
// "json": ..... },
// schBeforeLabelEn": {
// "html": ".....",
// "markdown": "....",
// "json": ..... },
// schBeforeLabelFr": {
// "html": ".....",
// "markdown": "....",
// "json": ..... },
// schBeforeDetailsEn": {
// "html": ".....",
// "markdown": "....",
// "json": ..... },
// schBeforeDetailsFr": {
// "html": ".....",
// "markdown": "....",
// "json": ..... },
// schHoursLabelEn": {
// "html": ".....",
// "markdown": "....",
// "json": ..... },
// schHoursLabelFr": {
// "html": ".....",
// "markdown": "....",
// "json": ..... },
// schHoursDetailsEn": {
// "html": ".....",
// "markdown": "....",
// "json": ..... },
// schHoursDetailsFr": {
// "html": ".....",
// "markdown": "....",
// "json": ..... },
// schHoursIconCSS: clock
// schHoursAutoLabelEn": {
// "html": ".....",
// "markdown": "....",
// "json": ..... },
// schHoursAutoLabelFr": {
// "html": ".....",
// "markdown": "....",
// "json": ..... },
// schHoursAutoDetailsEn": {
// "html": ".....",
// "markdown": "....",
// "json": ..... },
// schHoursAutoDetailsFr": {
// "html": ".....",
// "markdown": "....",
// "json": ..... },
// schHoursAutoIconCSS: clock
// schWaitLabelEn": {
// "html": ".....",
// "markdown": "....",
// "json": ..... },
// schWaitLabelFr": {
// "html": ".....",
// "markdown": "....",
// "json": ..... },
// schWaitDetailsEn": {
// "html": ".....",
// "markdown": "....",
// "json": ..... },
// schWaitDetailsFr": {
// "html": ".....",
// "markdown": "....",
// "json": ..... },
// schPhoneLabelEn": {
// "html": ".....",
// "markdown": "....",
// "json": ..... },
// schPhoneLabelFr": {
// "html": ".....",
// "markdown": "....",
// "json": ..... },
// schPhoneDetailsEn": {
// "html": ".....",
// "markdown": "....",
// "json": ..... },
// schPhoneDetailsFr": {
// "html": ".....",
// "markdown": "....",
// "json": ..... },

export default function Profile(props) {
  /* istanbul ignore next */
  const t = props.locale === 'en' ? en : fr

  const [openModalWithLink, setOpenModalWithLink] = React.useState({
    isOpen: false,
    activeLink: '/',
  })

  function openModal(link) {
    setOpenModalWithLink({ isOpen: true, activeLink: link })
  }

  function closeModal() {
    setOpenModalWithLink({ isOpen: false, activeLink: '/' })
  }

  return (
    <div id="homeContent" data-testid="homeContent-test">
      <Heading id="my-dashboard-heading" title={t.pageHeading.profile} />
      {props.content.cards.map((card) => {
        const moreLessButtonText = card.lists.tasks[0].title
        const tasks = card.lists.tasks.slice(1, card.lists.tasks.length)
        return (
          <Card
            key={card.id}
            programUniqueId={card.id}
            locale={props.locale}
            cardTitle={card.title}
            viewMoreLessCaption={moreLessButtonText}
          >
            <div
              className="px-3 sm:px-8 md:px-15 border-t-2"
              data-cy="task-list"
            >
              <ProfileTasks
                tasks={tasks}
                data-testID="profile-task-group-list"
                openModal={openModal}
                data-cy="task"
              />
            </div>
          </Card>
        )
      })}
      <PageLink
        lookingForText={t.pageLinkSecurity}
        accessText={t.accessYourSecurityText}
        linkText={t.securityLinkText}
        href="/security-settings"
        linkID="link-id"
        dataCy="access-security-page-link"
        buttonHref={t.url_dashboard}
        buttonId="back-to-dashboard-button"
        buttonLinkText={t.backToDashboard}
      ></PageLink>
      <Modal
        className="flex justify-center bg-black/75 h-full"
        isOpen={openModalWithLink.isOpen}
        onRequestClose={closeModal}
        contentLabel={t.aria_exit_beta_modal}
      >
        <ExitBetaModal
          closeModal={closeModal}
          closeModalAria={t.close_modal}
          continueLink={openModalWithLink.activeLink}
          popupId={props.popupContent.popupId}
          popupTitle={props.popupContent.popupTitle}
          popupDescription={props.popupContent.popupDescription}
          popupPrimaryBtn={props.popupContent.popupPrimaryBtn}
          popupSecondaryBtn={props.popupContent.popupSecondaryBtn}
        />
      </Modal>
    </div>
  )
}

export async function getStaticProps({ res, locale }) {
  const content = await getProfileContent().catch((error) => {
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
  const langToggleLink = locale === 'en' ? '/fr/profile' : '/profile'

  const t = locale === 'en' ? en : fr

  const breadCrumbItems = [
    {
      link: t.url_dashboard,
      text: t.pageHeading.title,
    },
  ]

  /* Place-holder Meta Data Props */
  const meta = {
    data_en: {
      title: 'My Service Canada Account - Profile',
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
    },
    data_fr: {
      title: 'Mon dossier Service Canada - Profil',
      desc: 'Français',
      author: 'Service Canada',
      keywords: '',
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
    },
  }
}

Profile.propTypes = {
  /**
   * current locale in the address
   */
  locale: PropTypes.string,

  /*
   * Meta Tags
   */
  meta: PropTypes.object,
}
