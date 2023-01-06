import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '../../lib/loadIcons'
import { Button } from '@dts-stn/service-canada-design-system'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

const Countdown = (props) => {
  const [clock, setClock] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const { days, hours, minutes, seconds } = clock

  const getTime = () => {
    const time = Date.parse(props.deadline) - Date.now()

    setClock((prev) => {
      return {
        ...prev,
        days: Math.floor(time / (1000 * 60 * 60 * 24)),
        hours: Math.floor((time / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((time / 1000 / 60) % 60),
        seconds: Math.floor((time / 1000) % 60),
      }
    })
  }

  useEffect(() => {
    const interval = setInterval(() => getTime(props.deadline), 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="m-8 sm:mx-24 sm:mt-24 p-4 md:p-16 bg-white rounded h-fit"
      data-cy="exitBetaModal"
      id={props.id}
    >
      <div className="flex justify-between pb-5">
        <div
          className="text-3xl font-display font-bold"
          role="heading"
          aria-level="1"
        >
          Stay signed in?
        </div>
        <button
          data-cy="x-button"
          type="button"
          aria-label={'Close Modal'}
          onClick={props.closeModal}
        >
          <FontAwesomeIcon aria-hidden="true" icon={solid('xmark')} size="xl" />
        </button>
      </div>

      <div className="flex">
        <div className="flex-none flex items-top justify-center pr-3">
          <FontAwesomeIcon
            icon={icon['triangle-exclamation']}
            size="lg"
            color="orange"
          />
        </div>
        <div className="flex-auto">
          <p className="mr-6">
            You have been active for a while so we will sign you out to keep
            your information secure.
          </p>
          <p className="font-bold mr-6">
            You will be signed out in {minutes} minutes and {seconds}
            seconds.
          </p>
        </div>
      </div>

      <div className="flex pt-10">
        <Button
          text="Sign Out"
          onClick={props.onSignOut}
          styling="secondary"
          className="mr-3"
        />
        <Button
          text="Stay Signed In"
          onClick={props.onStay}
          styling="primary"
          className="mr-3"
        />
      </div>
    </div>
  )
}

export default Countdown
