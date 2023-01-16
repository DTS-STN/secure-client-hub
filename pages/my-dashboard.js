import CountDown from '../components/sessionModals/CountDown'
import SignedOut from '../components/sessionModals/SignedOut'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { Heading, Button } from '@dts-stn/service-canada-design-system'
import en from '../locales/en'
import fr from '../locales/fr'
import Card from '../components/Card'
import { getMyDashboardContent } from '../graphql/mappers/my-dashboard'
import { getBetaBannerContent } from '../graphql/mappers/beta-banner-opt-out'
import { getBetaPopupExitContent } from '../graphql/mappers/beta-popup-exit'
import { getBetaPopupNotAvailableContent } from '../graphql/mappers/beta-popup-page-not-available'
import { getAuthModalsContent } from '../graphql/mappers/auth-modals'
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

  const [demoModalBody, setDemoModalBody] = useState(null)

  function demoContent(content) {
    setDemoModalBody(content)
  }

  function closeDemoModal() {
    setDemoModalBody(null)
  }

  function openModal(link) {
    setOpenModalWithLink({ isOpen: true, activeLink: link })
  }

  function closeModal() {
    setOpenModalWithLink({ isOpen: false, activeLink: '/' })
  }

  console.log(props.authModals)
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
            viewMoreLessCaption={card.dropdownText}
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

      <Button
        text="Countdown"
        styling="primary"
        className="mr-3  m-5"
        onClick={() =>
          demoContent(
            <CountDown
              closeModal={closeDemoModal}
              onSignOut={() => console.log('Sign Out Clicked')}
              onStay={() => console.log('Stay Signed In Clicked')}
              id="CountDown"
              deadline="January, 31, 2023"
              {...props.popupStaySignedIn}
            />
          )
        }
      />

      <Button
        text="Signed Out"
        styling="primary"
        className="mr-3 m-5"
        onClick={() =>
          demoContent(
            <SignedOut
              closeModal={closeDemoModal}
              onContinue={() => console.log('Continue Clicked')}
              id="SignedOut"
              {...props.popupYouHaveBeenSignedout}
            />
          )
        }
      />

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
          popupId={props.popupContentNA.popupId}
          popupTitle={props.popupContentNA.popupTitle}
          popupDescription={props.popupContentNA.popupDescription}
          popupPrimaryBtn={props.popupContentNA.popupPrimaryBtn}
          popupSecondaryBtn={props.popupContentNA.popupSecondaryBtn}
        />
      </Modal>
      <Modal
        className="flex justify-center bg-black/75 h-full"
        isOpen={demoModalBody === null ? false : true}
        onRequestClose={closeModal}
        contentLabel={'Demo Modal'}
      >
        {demoModalBody}
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
      popupContentNA: locale === 'en' ? popupContentNA.en : popupContentNA.fr,
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
