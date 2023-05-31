import PropTypes from 'prop-types'
import Modal from 'react-modal'
import { useState, useCallback, useEffect } from 'react'
import ExitBeta from './ExitBeta'
import { useIdleTimer } from 'react-idle-timer'
import CountDown from './sessionModals/CountDown'
import Router from 'next/router'

export default function MultiModal(props) {
  const {
    openModalWithLink,
    t,
    openModal,
    closeModal,
    popupContentNA,
    aaPrefix,
    popupStaySignedIn,
    popupContent,
  } = props

  const [timer, setTimer] = useState({ seconds: 0, minutes: 0 })
  let modalBody

  const handleOnIdle = () => {
    Router.push('/auth/logout')
  }

  const { isPrompted, reset, getRemainingTime } = useIdleTimer({
    onIdle: handleOnIdle,
    promptBeforeIdle: 5 * 60 * 1000, // 5 minutes
    timeout: 15 * 60 * 1000, // 15 minutes
  })

  const onStay = () => {
    reset()
    closeModal()
  }

  const tick = useCallback(() => {
    const minutes = Math.floor(getRemainingTime() / 60000)
    const seconds = Math.floor((getRemainingTime() / 1000) % 60).toFixed(0)
    setTimer({ seconds, minutes })

    if (isPrompted()) {
      openModal('', 'countDown')
    }
  }, [getRemainingTime])

  useEffect(() => {
    const timer = setInterval(tick, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [tick])

  switch (openModalWithLink.context) {
    case 'betaModal':
      // code block
      modalBody = (
        <ExitBeta
          closeModal={closeModal}
          closeModalAria={t.close_modal}
          continueLink={openModalWithLink.activeLink}
          popupId={popupContentNA.popupId}
          popupTitle={popupContentNA.popupTitle}
          popupDescription={popupContentNA.popupDescription}
          popupPrimaryBtn={popupContentNA.popupPrimaryBtn}
          popupSecondaryBtn={popupContentNA.popupSecondaryBtn}
          refPageAA={aaPrefix}
        />
      )
      break
    case 'betaBannerModal':
      modalBody = (
        <ExitBeta
          closeModal={closeModal}
          closeModalAria={t.close_modal}
          continueLink={openModalWithLink.activeLink}
          popupId={popupContent.popupId}
          popupTitle={popupContent.popupTitle}
          popupDescription={popupContent.popupDescription}
          popupPrimaryBtn={popupContent.popupPrimaryBtn}
          popupSecondaryBtn={popupContent.popupSecondaryBtn}
          refPageAA={aaPrefix}
        />
      )
      break
    case 'countDown':
      modalBody = (
        <CountDown
          closeModal={onStay}
          onSignOut={handleOnIdle}
          onStay={onStay}
          id="CountDown"
          seconds={timer.seconds}
          minutes={timer.minutes}
          {...popupStaySignedIn}
          refPageAA={aaPrefix}
        />
      )
      break
    default:
      // code block
      null
  }

  return (
    <>
      <Modal
        className="flex justify-center bg-black/75 h-full"
        isOpen={openModalWithLink.context != null}
        onRequestClose={closeModal}
        contentLabel={openModalWithLink.contentLabel}
      >
        {modalBody}
      </Modal>
    </>
  )
}

MultiModal.propTypes = {
  contentLabel: PropTypes.string,
  closeModal: PropTypes.func,
}
