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

// const tmpPage = {
//   scTitleEn: 'Contact Employment Insurance',
//   scPageNameEn: 'contact-employment-insurance',
//   scPageNameFr: 'communiquer-assurance-emploi',
//   scTitleEn: 'Contact Employment Insurance',
//   scTitleFr: "Communiquer avec l'assurance-emploi",
//   scBreadcrumbParentPages: [
//     '/content/dam/decd-endc/content-fragments/sch/pages/my-dashboard',
//     '/content/dam/decd-endc/content-fragments/sch/pages/contact-us-pages/contact-us',
//   ],
// }

const tmpContactMethods = {
  en: {
    scTitle: 'Contact Employment Insurance',
    scTitle2: 'On this page',
    contactMethods: [
      {
        scTitle: 'Telephone',
        Path: '/content/dam/decd-endc/content-fragments/sch/contact-methods/ei-contact-telephone',
        schIntro:
          '<p><b>Sed ut perspiciatis unde omnis iste</b> natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p><p>Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur <b>aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione</b> voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>',
        rows: [
          {
            schBeforeLabel: 'Before you call us',
            schBeforeDetails:
              'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
            schPhoneLabel: 'Telephone Number',
            schPhoneDetails:
              'Toll-Free: <b>1-800-206-7218<br>TTY: 1-800-529-3742',
            schHoursLabel: 'Hours of Operations',
            schHoursDetails:
              '8:30 am to 4:30 pm local time, Monday to Friday, except statutory holidays',
            schWaitLabel: 'Wait times',
            schWaitDetails:
              '11 minutes was the average wait time for the week of September 19, 2022',
            schHoursAutoLabel: 'Hours for automated service',
            schHoursAutoDetailsl: '24 hours a day, 7 days a week',
          },
        ],
      },
    ],
  },
  fr: {
    scTitle: "Communiquer avec l'assurance-emploi",
    scTitle2: 'Sur cette page',
    contactMethods: [
      {
        scTitle: 'Téléphone',
        Path: '/content/dam/decd-endc/content-fragments/sch/contact-methods/ei-contact-telephone',
        schIntro:
          '<p><b>Sed ut perspiciatis unde omnis iste</b> natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p><p>Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur <b>aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione</b> voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>',
        rows: [
          {
            schBeforeLabel: 'Avant de nous appeler',
            schBeforeDetails:
              'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
            schPhoneLabel: 'Numero De Telephone',
            schPhoneDetails:
              'Toll-Free: <b>1-800-206-7218<br>TTY: 1-800-529-3742',
            schHoursLabel: "Heures D'ouverture",
            schHoursDetails:
              '8:30 am a 4:30 pm, Lundi a Vendredi, sauf aux journees pedagogiques',
            schWaitLabel: "Temps d'attente",
            schWaitDetails:
              "11 minutes etais la moyenne d'attente pour la semaine de September 19, 2022",
            schHoursAutoLabel: 'Heures de service automatizee',
            schHoursAutoDetailsl: '24 heures par jour, 7 jours par semaine',
          },
        ],
      },
    ],
  },
}

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
      <Heading id="my-dashboard-heading" title={props.contactMethods.scTitle} />
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
      contactMethods:
        locale === 'en' ? tmpContactMethods.en : tmpContactMethods.fr,
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
