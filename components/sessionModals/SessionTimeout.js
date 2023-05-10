import { useEffect, useCallback } from 'react'
import CountDown from './CountDown'
import Router from 'next/router'
import { useIdleTimer } from 'react-idle-timer'

const SessionTimeout = ({
  popupStaySignedIn,
  aaPrefix,
  openModal,
  closeModal,
}) => {
  const handleOnIdle = () => {
    Router.push('/auth/logout')
  }

  const { isPrompted, reset, getRemainingTime } = useIdleTimer({
    onIdle: handleOnIdle,
    promptBeforeIdle: 0.5 * 60 * 1000, // 30 seconds
    timeout: 1 * 60 * 1000, // 1 minute
  })

  const onStay = () => {
    reset()
    closeModal()
  }

  const tick = useCallback(() => {
    const minutes = Math.floor(getRemainingTime() / 60000)
    const seconds = Math.floor((getRemainingTime() / 1000) % 60).toFixed(0)
    if (isPrompted()) {
      openModal(
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
    }
  }, [getRemainingTime])

  useEffect(() => {
    const timer = setInterval(tick, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [tick])

  return null
}

export default SessionTimeout
