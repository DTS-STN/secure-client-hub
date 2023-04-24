import Modal from 'react-modal'
import { useState, useEffect } from 'react'
import CountDown from './CountDown'
import Router from 'next/router'

const SessionTimeTracker = ({ popupStaySignedIn, aaPrefix }) => {
  const initialExpires = () => {
    const currentDate = new Date()
    return {
      warning: new Date(currentDate.getTime() + 0.25 * 60 * 1000),
      logout: new Date(currentDate.getTime() + 1 * 60 * 1000),
    }
  }
  const [expires, setExpires] = useState({ ...initialExpires(), active: true })

  const [demoModalBody, setDemoModalBody] = useState(null)

  function demoContent(content) {
    setDemoModalBody(content)
  }

  function closeDemoModal() {
    setDemoModalBody(null)
  }

  function closeModal() {
    setOpenModalWithLink({ isOpen: false, activeLink: '/' })
  }

  useEffect(() => {
    const updateMousePosition = (ev) => {
      if (!demoModalBody) {
        setExpires((prev) => {
          return {
            ...prev,
            ...initialExpires(),
          }
        })
      }
    }
    window.addEventListener('mousemove', updateMousePosition)
    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [demoModalBody])

  useEffect(() => {
    const id = setInterval(function () {
      if (new Date() >= expires.logout && expires.active) {
        Router.push('/auth/logout')
      }
      if (
        new Date() >= expires.warning &&
        expires.active &&
        expires.warning != expires.logout
      ) {
        demoContent(
          <CountDown
            closeModal={closeDemoModal}
            onSignOut={() => Router.push('/auth/logout')}
            onStay={() => {
              setExpires((t) => {
                return { ...t, warning: t.logout }
              })
              setDemoModalBody(null)
            }}
            id="CountDown"
            deadline={expires.logout}
            {...popupStaySignedIn}
            refPageAA={aaPrefix}
          />
        )
      } else return
    }, 1000)
    return () => clearInterval(id)
  }, [expires])

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
