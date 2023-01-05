import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '../../lib/loadIcons'
import { Button } from '@dts-stn/service-canada-design-system'

const Countdown = () => {
  const [clock, setClock] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const { days, hours, minutes, seconds } = clock

  const deadline = 'January, 31, 2023'

  const getTime = () => {
    const time = Date.parse(deadline) - Date.now()

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
    const interval = setInterval(() => getTime(deadline), 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <div className="p-9">
        <div className="flex ">
          <div className="flex-auto">
            <h1 className="text-3xl font-medium pb-4">Stay signed in?</h1>
          </div>
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
            <p>
              You have been active for a while so we will sign you out to keep
              your information secure.
            </p>
            <p className="font-bold">
              You will be signed out in {minutes} minutes and {seconds}
              seconds.
            </p>
          </div>
        </div>
      </div>

      <div className="flex py-5">
        <Button text="Sign Out" styling="secondary" className="mr-3" />{' '}
        <Button text="Stay Signed In" styling="primary" className="mr-3" />
      </div>
    </div>
  )
}

export default Countdown
