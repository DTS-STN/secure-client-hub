import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '../../lib/loadIcons'
import Button from '../../components/Button'

const CountDown = (props) => {
  return (
    <div
      className="m-8 h-fit rounded bg-white p-4 sm:mx-24 sm:mt-24 md:p-16"
      data-cy="countDownModal"
      id={props.id}
    >
      <div className="flex justify-between pb-5">
        <div
          className="font-display text-3xl font-bold"
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
          data-gc-analytics-customclick={`ESDC-EDSC_MSCA-MSDC-SCH:${props.refPageAA}:Close-Fermer`}
        >
          <FontAwesomeIcon aria-hidden="true" icon={icon['xmark']} size="xl" />
        </button>
      </div>

      <div className="flex">
        <div className="items-top flex flex-none justify-center pr-3">
          <FontAwesomeIcon
            icon={icon['triangle-exclamation']}
            size="lg"
            color="orange"
          />
        </div>
        <div className="flex-auto">
          <p className="mr-6">{props.bannerContent[0]}</p>
          <p className="mr-6 font-bold">
            {props.minutes || props.seconds
              ? `${props.bannerContent[1]} ${props.minutes} ${props.bannerMinutesAnd} ${props.seconds} ${props.bannerSeconds}.`
              : ''}
          </p>
        </div>
      </div>

      <div className="flex pt-10 md:space-x-12">
        <Button
          dataTestid="sign-out"
          text={props.signOutLinkText}
          onClick={props.onSignOut}
          style="secondary"
          className="mr-3"
        />
        <Button
          dataTestid="stay-signed-in"
          text={props.staySignedInLinktext}
          onClick={props.onStay}
          style="primary"
          className="mr-3"
        />
      </div>
    </div>
  )
}

export default CountDown
