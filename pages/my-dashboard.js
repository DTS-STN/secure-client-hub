import PropTypes from 'prop-types'
import { Heading } from '@dts-stn/service-canada-design-system'
import en from '../locales/en'
import fr from '../locales/fr'
import Card from '../components/Card'
import { getMyDashboardContent } from '../graphql/mappers/my-dashboard'
import { getBetaBannerContent } from '../graphql/mappers/beta-banner-opt-out'
import { getBetaPopupExitContent } from '../graphql/mappers/beta-popup-exit'
import { getBetaPopupNotAvailableContent } from '../graphql/mappers/beta-popup-page-not-available'
import logger from '../lib/logger'
import BenefitTasks from './../components/BenefitTasks'
import MostReqTasks from './../components/MostReqTasks'
import Modal from 'react-modal'
import React from 'react'
import ExitBetaModal from '../components/ExitBetaModal'

export default function MyDashboard(props) {
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
    <div id="myDashboardContent" data-testid="myDashboardContent-test">
      <Heading id="my-dashboard-heading" title={props.content.heading} />
      {props.content.cards.map((card) => {
        const mostReq = card.lists[0]
        var tasks = card.lists.slice(1, card.lists.length)
        return (
          <Card
            key={card.id}
            programUniqueId={card.id}
            locale={props.locale}
            cardTitle={card.title}
            viewMoreLessCaption={t.viewMoreLessButtonCaption}
          >
            <div className="bg-deep-blue-60d" data-cy="most-requested-section">
              <MostReqTasks
                taskListMR={mostReq}
                dataCy="most-requested"
                openModal={openModal}
              />
            </div>
            <div
              className="md:columns-2 gap-x-[60px] pl-3 sm:pl-8 md:px-15 pt-8"
              data-cy="task-list"
            >
              {tasks.map((taskList, index) => {
                return (
                  <div className="" key={index} data-cy="Task">
                    <BenefitTasks
                      taskList={taskList}
                      dataCy="task-group-list"
                      openModal={openModal}
                    />
                  </div>
                )
              })}
            </div>
          </Card>
        )
      })}
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

export async function getServerSideProps({ res, locale }) {
  const content = await getMyDashboardContent().catch((error) => {
    logger.error(error)
    res.statusCode = 500
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
  const langToggleLink = locale === 'en' ? '/fr/my-dashboard' : '/my-dashboard'

  /* Place-holder Meta Data Props */
  const meta = {
    data_en: {
      title: 'My Service Canada Account - Dashboard',
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
    },
    data_fr: {
      title: 'Mon dossier Service Canada - Tableau de Bord',
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
      bannerContent: locale === 'en' ? bannerContent.en : bannerContent.fr,
      popupContent: locale === 'en' ? popupContent.en : popupContent.fr,
    },
  }
}

MyDashboard.propTypes = {
  /**
   * current locale in the address
   */
  locale: PropTypes.string,

  /*
   * Meta Tags
   */
  meta: PropTypes.object,
}
