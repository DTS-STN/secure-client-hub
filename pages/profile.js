import PropTypes from 'prop-types'
import { Heading } from '@dts-stn/service-canada-design-system'
import PageLink from '../components/PageLink'
import en from '../locales/en'
import fr from '../locales/fr'
import Card from '../components/Card'
import { getProfileContent } from '../graphql/mappers/profile'
import logger from '../lib/logger'
import ProfileTasks from './../components/ProfileTasks'
import Modal from 'react-modal'
import React from 'react'
import ExitBeta from '../components/ExitBetaModal'

Modal.setAppElement('#modal-root')

export default function Profile(props) {
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
    <div id="homeContent" data-testid="homeContent-test">
      <Heading id="my-dashboard-heading" title={t.pageHeading.profile} />
      {props.content.cards.map((card) => {
        const tasks = [card.lists]
        return (
          <Card
            key={card.id}
            programUniqueId={card.id}
            locale={props.locale}
            cardTitle={card.title}
            viewMoreLessCaption={t.viewMoreLessButtonCaption}
            taskGroups={[card.lists]}
            mostReq={false}
          >
            <div
              className="pl-3 sm:pl-8 lg:pl-15 border-t-2"
              data-cy="task-list"
            >
              {tasks.map((taskList, index) => {
                return (
                  <ProfileTasks
                    key={index}
                    taskList={taskList}
                    dataCy="profile-task-group-list"
                    openModal={openModal}
                    data-cy="Task"
                  />
                  // <div className="mb-4 md:mb-6" key={index} data-cy="Task">
                  //   <BenefitTasks
                  //     taskList={taskList}
                  //     dataCy="task-group-list"
                  //     openModal={openModal}
                  //   />
                  // </div>
                )
              })}
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
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel={t.aria_exit_beta_modal}
      >
        <ExitBeta closeModal={closeModal} closeModalAria={t.close_modal} />
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
