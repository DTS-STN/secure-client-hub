import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '../../lib/loadIcons'
import { Button } from '@dts-stn/service-canada-design-system'

const SignedOut = () => {
  return (
    <div>
      <div className="p-9">
        <div className="flex ">
          <div className="flex-auto">
            <h1 className="text-3xl font-medium pb-4">
              You have been signed out
            </h1>
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
              You have not been active for a while, so we signed you out to keep
              your information secure. You are now back on the sign in page.
            </p>
          </div>
        </div>
      </div>

      <div className="flex py-5">
        <Button text="Continue" styling="primary" className="mr-3" />
      </div>
    </div>
  )
}

export default SignedOut
