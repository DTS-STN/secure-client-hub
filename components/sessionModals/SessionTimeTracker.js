import Modal from 'react-modal'
import { useState, useEffect, useCallback } from 'react'
import CountDown from './CountDown'
import Router from 'next/router'
import { IIdleTimerProps, useIdleTimer } from 'react-idle-timer'

const SessionTimeTracker = ({ popupStaySignedIn, aaPrefix }) => {
  const initialExpires = () => {
    const currentDate = new Date()
    return {
      // warning: new Date(currentDate.getTime() + 5 * 60 * 1000),
      // logout: new Date(currentDate.getTime() + 10 * 60 * 1000),
      xseconds: 0,
      xminutes: 0,
    }
  }
  const [expires, setExpires] = useState({ ...initialExpires(), active: true })
  const [demoModalBody, setDemoModalBody] = useState(null)
  const [timeRemaining, setTimeRemaining] = useState('')
  const promptTime = 0.5 * 60 * 1000

  const handleOnIdle = () => {
    Router.push('/auth/logout')
  }

  const { isPrompted, reset, getRemainingTime } = useIdleTimer({
    onIdle: handleOnIdle,
    onPrompt: () => {
      const currentDate = new Date()
      setDemoModalBody(
        <CountDown
          closeModal={onStay}
          onSignOut={() => Router.push('/auth/logout')}
          onStay={onStay}
          id="CountDown"
          xseconds={expires.xseconds}
          xminutes={expires.xminutes}
          {...popupStaySignedIn}
          refPageAA={aaPrefix}
        />
      )
    },
    promptBeforeIdle: 0.5 * 60 * 1000, //5 minutes
    timeout: 1 * 60 * 1000, //15 minutes
  })

  const onStay = () => {
    reset()
    setDemoModalBody(null)
  }

  const tick = useCallback(() => {
    const minutes = Math.floor(getRemainingTime() / 60000)
    const seconds = Math.floor((getRemainingTime() / 1000) % 60).toFixed(0)
    // setExpires((prev) => {
    //   return {
    //     ...prev,
    //     xseconds: seconds,
    //     xminutes: minutes,
    //   }
    // })
    console.log(getRemainingTime(), isPrompted())
    isPrompted() &&
      setDemoModalBody(
        <CountDown
          closeModal={onStay}
          onSignOut={() => Router.push('/auth/logout')}
          onStay={onStay}
          id="CountDown"
          xseconds={seconds}
          xminutes={minutes}
          {...popupStaySignedIn}
          refPageAA={aaPrefix}
        />
      )
  }, [getRemainingTime])

  useEffect(() => {
    setInterval(tick, 1000)
  }, [tick])

  // const eventListeners = (callback) => {
  //   window.addEventListener('mousemove', callback)
  //   window.addEventListener('keydown', callback)
  //   window.addEventListener('mousewheel', callback)
  //   window.addEventListener('mousedown', callback)
  //   window.addEventListener('touchstart', callback)
  //   window.addEventListener('touchmove', callback)
  //   window.addEventListener('visibilitychange', callback)
  //   window.addEventListener('scroll', callback)
  // }

  function demoContent(content) {
    setDemoModalBody(content)
  }

  function closeDemoModal() {
    reset()
    setDemoModalBody(null)
  }

  function closeModal() {
    setOpenModalWithLink({ isOpen: false, activeLink: '/' })
  }

  // // What does this do?
  // useEffect(() => {
  //   const updateModalTimer = () => {
  //     if (!demoModalBody) {
  //       setExpires((prev) => {
  //         return {
  //           ...prev,
  //           ...initialExpires(),
  //         }
  //       })
  //     }
  //   }
  //   eventListeners(updateModalTimer)
  //   return () => {
  //     eventListeners(updateModalTimer)
  //   }
  // }, [demoModalBody])

  // // This rewrites the numbers
  // useEffect(() => {
  //   const id = setInterval(function () {
  //     if (new Date() >= expires.logout && expires.active) {
  //       Router.push('/auth/logout')
  //     }
  //     // if (
  //     //   new Date() >= expires.warning &&
  //     //   expires.active &&
  //     //   expires.warning != expires.logout
  //     // ) {
  //     //   demoContent(
  //     //     <CountDown
  //     //       closeModal={closeDemoModal}
  //     //       onSignOut={() => Router.push('/auth/logout')}
  //     //       onStay={() => {
  //     //         setExpires((t) => {
  //     //           return { ...t, warning: t.logout }
  //     //         })
  //     //         setDemoModalBody(null)
  //     //       }}
  //     //       id="CountDown"
  //     //       deadline={expires.logout}
  //     //       {...popupStaySignedIn}
  //     //       refPageAA={aaPrefix}
  //     //     />
  //     //   )
  //     // } else return
  //   }, 1000)
  //   return () => clearInterval(id)
  // }, [expires])

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
