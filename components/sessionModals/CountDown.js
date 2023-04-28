import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '../../lib/loadIcons'
import { Button } from '@dts-stn/service-canada-design-system'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

const CountDown = (props) => {
  return (
    <div
      className="m-8 sm:mx-24 sm:mt-24 p-4 md:p-16 bg-white rounded h-fit"
      data-cy="countDownModal"
      id={props.id}
    >
      <div className="flex justify-between pb-5">
        <div
          className="text-3xl font-display font-bold"
          role="heading"
          aria-level="1"
        >
          {props.bannerHeading}
        </div>
        <button
          data-cy="x-button"
          type="button"
          aria-label={'Close Modal'}
          onClick={props.closeModal}
          data-gc-analytics-customclick={`ESDC-EDSC:${props.refPageAA}:Close-Fermer`}
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
          <p className="mr-6">{props.bannerContent[0]}</p>
          <p className="font-bold mr-6">
            {props.xminutes || props.xseconds
              ? `${props.bannerContent[1]} ${props.xminutes} ${props.bannerMinutesAnd} ${props.xseconds} ${props.bannerSeconds}.`
              : ''}
          </p>
        </div>
      </div>

      <div className="flex pt-10">
        <Button
          text={props.signOutLinkText}
          onClick={props.onSignOut}
          styling="secondary"
          className="mr-3"
        />
        <Button
          text={props.staySignedInLinktext}
          onClick={props.onStay}
          styling="primary"
          className="mr-3"
        />
      </div>
    </div>
  )
}

export default CountDown
