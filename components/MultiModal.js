import PropTypes from 'prop-types'
import Modal from 'react-modal'
import { useState } from 'react'
import ExitBeta from './ExitBeta'
import SessionTimeout from './sessionModals/SessionTimeout'

export default function MultiModal(props) {
  const [openModalWithLink, setOpenModalWithLink] = useState({
    activeLink: '/',
    context: null,
    contentLabel: null,
  })

  function openModal(link, context) {
    setOpenModalWithLink({
      isOpen: true,
      activeLink: link,
      context,
      contentLabel: null,
    })
  }

  function closeModal() {
    setOpenModalWithLink({
      isOpen: false,
      activeLink: '/',
      context: null,
      contentLabel: null,
    })
  }

  const betaModal = (
    <ExitBeta
      closeModal={closeModal}
      closeModalAria={props.t.close_modal}
      continueLink={openModalWithLink.activeLink}
      popupId={props.popupContentNA.popupId}
      popupTitle={props.popupContentNA.popupTitle}
      popupDescription={props.popupContentNA.popupDescription}
      popupPrimaryBtn={props.popupContentNA.popupPrimaryBtn}
      popupSecondaryBtn={props.popupContentNA.popupSecondaryBtn}
      refPageAA={props.aaPrefix}
    />
  )

  return (
    <>
      <SessionTimeout
        popupStaySignedIn={props.popupStaySignedIn}
        aaPrefix={props.aaPrefix}
        openModal={(context) => openModal('/', context)}
        closeModal={closeModal}
      />
      <Modal
        className="flex justify-center bg-black/75 h-full"
        isOpen={openModalWithLink.context != null}
        onRequestClose={closeModal}
        contentLabel={openModalWithLink.contentLabel}
      >
        {openModalWithLink.context}
      </Modal>
    </>
  )
}

MultiModal.propTypes = {
  contentLabel: PropTypes.string,
  closeModal: PropTypes.func,
}
