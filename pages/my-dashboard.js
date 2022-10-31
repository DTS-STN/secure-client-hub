import PropTypes from 'prop-types'
import { Heading } from '@dts-stn/service-canada-design-system'
import en from '../locales/en'
import fr from '../locales/fr'
import Card from '../components/Card'
import { getMyDashboardContent } from '../graphql/mappers/my-dashboard'
import logger from '../lib/logger'
import BenefitTasks from './../components/BenefitTasks'
import MostReqTasks from './../components/MostReqTasks'
import Modal from 'react-modal'
import React from 'react'
import ExitBeta from '../components/ExitBetaModal'

export default function MyDashboard(props) {
  /* istanbul ignore next */
  const t = props.locale === 'en' ? en : fr

  const [modalIsOpen, setIsOpen] = React.useState(false)

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <div id="myDashboardContent" data-testid="myDashboardContent-test">
      <Heading id="my-dashboard-heading" title={props.content.heading} />
      {props.content.cards.map((card) => {
        var tasks = card.lists
        const mostReq = card.lists[0]
        if (props.mostReq) {
          tasks = props.taskGroups.slice(1, card.lists.length)
        }
        return (
          <Card
            key={card.id}
            programUniqueId={card.id}
            locale={props.locale}
            cardTitle={card.title}
            viewMoreLessCaption={t.viewMoreLessButtonCaption}
            taskGroups={card.lists}
            mostReq={true}
          >
            <div
              className="bg-deep-blue-60d mt-4 pl-2"
              data-cy="most-requested-section"
            >
              <MostReqTasks
                taskListMR={mostReq}
                dataCy="most-requested"
                openModal={openModal}
              />
            </div>
            <div className=" md:columns-2 gap-8 pt-8" data-cy="task-list">
              {tasks.map((taskList, index) => {
                return (
                  <div className="mb-4 md:mb-6" key={index} data-cy="Task">
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
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel={t.aria_exit_beta_modal}
      >
        <ExitBeta closeModal={closeModal} closeModalAria={t.close_modal} />
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

  /* istanbul ignore next */
  const langToggleLink = locale === 'en' ? '/fr/my-dashboard' : '/my-dashboard'

  /* Place-holder Meta Data Props */
  const meta = {
    data_en: {
      title: 'My Service Canada Account - Home',
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
    },
    data_fr: {
      title: 'Mon dossier Service Canada - Accueil',
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
