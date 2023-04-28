import Modal from 'react-modal'
import { useState, useEffect, useCallback } from 'react'
import CountDown from './CountDown'
import Router from 'next/router'
import { IIdleTimerProps, useIdleTimer } from 'react-idle-timer'

const SessionTimeTracker = ({ popupStaySignedIn, aaPrefix }) => {
  const [demoModalBody, setDemoModalBody] = useState(null)

  const handleOnIdle = () => {
    Router.push('/auth/logout')
  }

  const { isPrompted, reset, getRemainingTime } = useIdleTimer({
    onIdle: handleOnIdle,
    promptBeforeIdle: 0.5 * 60 * 1000,
    timeout: 1 * 60 * 1000,
  })

  const onStay = () => {
    reset()
    setDemoModalBody(null)
  }

  const tick = useCallback(() => {
    const minutes = Math.floor(getRemainingTime() / 60000)
    const seconds = Math.floor((getRemainingTime() / 1000) % 60).toFixed(0)
    console.log(getRemainingTime(), isPrompted())
    isPrompted() &&
      setDemoModalBody(
        <CountDown
          closeModal={onStay}
          onSignOut={handleOnIdle}
          onStay={onStay}
          id="CountDown"
          seconds={seconds}
          minutes={minutes}
          {...popupStaySignedIn}
          refPageAA={aaPrefix}
        />
      )
  }, [getRemainingTime])

  useEffect(() => {
    const timer = setInterval(tick, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [tick])

  function closeModal() {
    setOpenModalWithLink({ isOpen: false, activeLink: '/' })
  }

  return (
    <Modal
      className="flex justify-center bg-black/75 h-full"
      isOpen={demoModalBody === null ? false : true}
      onRequestClose={closeModal}
      contentLabel={'Demo Modal'}
    >
      {demoModalBody}
    </Modal>
  )
}

export default SessionTimeTracker
