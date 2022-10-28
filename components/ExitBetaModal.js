import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@dts-stn/service-canada-design-system'
import PropTypes from 'prop-types'

export default function ExitBetaModal(props) {
  return (
    <div className="m-8 sm:mx-24 sm:mt-24 p-4 md:p-16 bg-white rounded h-fit">
      <div className="flex justify-between">
        <div
          className="text-3xl font-display font-bold"
          role="heading"
          aria-level="1"
        >
          Exit beta version
        </div>
        <button
          type="button"
          aria-label={props.closeModalAria}
          onClick={props.closeModal}
        >
          <FontAwesomeIcon aria-hidden="true" icon={solid('xmark')} size="xl" />
        </button>
      </div>
      <p className="text-xl font-display py-4 mr-10">
        This page is not yet available in the beta version. You will be
        transferred to the current My Service Canada Account to view this page.
      </p>
      <div className="md:flex mt-8 md:space-x-12 space-y-4 md:space-y-0">
        <Button
          className="w-full block md:w-fit"
          id={'modal-btn-close'}
          styling="secondary"
          onClick={props.closeModal}
          text="Stay on beta version"
        />
        <Button
          className="w-full block md:w-fit"
          id={'modal-btn-continue'}
          styling="primary"
          text="Continue to page"
        />
      </div>
    </div>
  )
}

ExitBetaModal.propTypes = {
  /**
   * Function used to control closing the modal for X icon and secondary button
   */
  closeModal: PropTypes.func,

  /*
   * Area label for X icon in top right of modal
   */
  closeModalAria: PropTypes.string,
}
