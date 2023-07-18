import PropTypes from 'prop-types'
import Modal from 'react-modal'
import { useState, useCallback, useEffect, useRef } from 'react'
import ExitBeta from './ExitBeta'
import { useIdleTimer } from 'react-idle-timer'
import CountDown from './sessionModals/CountDown'
import Router from 'next/router'
import { FocusOn } from 'react-focus-on'

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
  const clicker = useRef(null)
  let modalBody, contentLabel

  const handleOnIdle = () => {
    Router.push('/auth/logout')
  }

  const click = () => {
    clicker.current.click()
  }

  const { reset, getRemainingTime } = useIdleTimer({
    onIdle: handleOnIdle,
    onPrompt: () => {
      click()
      openModal('', 'countDown')
    },
    promptBeforeIdle: props.promptBeforeIdle ?? 5 * 60 * 1000, // 5 minutes
    timeout: props.timeout ?? 15 * 60 * 1000, // 15 minutes
  })

  const onStay = () => {
    reset()
    closeModal()
  }

  const tick = useCallback(() => {
    const minutes = Math.floor(getRemainingTime() / 60000)
    const seconds = Math.floor((getRemainingTime() / 1000) % 60).toFixed(0)
    setTimer({ seconds, minutes })
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
      contentLabel = popupContentNA.popupTitle
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
      contentLabel = popupContent.popupTitle
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
      contentLabel = popupStaySignedIn.bannerHeading
      break
    default:
      // code block
      null
  }

  return (
    <>
      <div ref={clicker} />
      <Modal
        className="flex justify-center bg-black/75 h-full"
        isOpen={openModalWithLink.context != null}
        onRequestClose={closeModal}
        contentLabel={contentLabel}
      >
        <FocusOn enabled={openModalWithLink.context != null}>
          {modalBody}
        </FocusOn>
      </Modal>
    </>
  )
}

MultiModal.propTypes = {
  contentLabel: PropTypes.string,
  closeModal: PropTypes.func,
  timeout: PropTypes.number,
  promptBeforeIdle: PropTypes.number,
}
