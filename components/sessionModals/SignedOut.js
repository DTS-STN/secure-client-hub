import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '../../lib/loadIcons'
import { Button } from '@dts-stn/service-canada-design-system'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

const SignedOut = (props) => {
  return (
    <div
      className="m-8 sm:mx-24 sm:mt-24 p-4 md:p-16 bg-white rounded h-fit"
      data-cy="signedOutModal"
      id={props.id}
    >
      <div className="flex justify-between pb-5">
        <div
          className="text-3xl font-display font-bold"
          role="heading"
          aria-level="1"
        >
          You have been signed out
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
            You have not been active for a while, so we signed you out to keep
            your information secure. You are now back on the sign in page.
          </p>
        </div>
      </div>

      <div className="flex pt-10">
        <Button
          text="Continue"
          styling="primary"
          onClick={props.onContinue}
          className="mr-3"
        />
      </div>
    </div>
  )
}

export default SignedOut
