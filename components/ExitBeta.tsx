import { icon } from '../lib/loadIcons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '../components/Button'

interface PopupButton {
  id: string
  text: string
}

interface ExitBetaProps {
  closeModal: () => void
  closeModalAria: string
  continueLink: string
  popupId: string
  popupTitle: string
  popupDescription: string
  popupPrimaryBtn: PopupButton
  popupSecondaryBtn: PopupButton
  refPageAA: string
}

const ExitBeta = ({
  closeModal,
  closeModalAria,
  continueLink,
  popupId,
  popupTitle,
  popupDescription,
  popupPrimaryBtn,
  popupSecondaryBtn,
  refPageAA,
}: ExitBetaProps) => {
  return (
    <div
      className="m-8 sm:mx-24 sm:mt-24 p-4 md:p-16 bg-white rounded h-fit"
      data-cy="exitBeta"
      id={popupId}
    >
      <div className="flex justify-between">
        <div
          className="text-3xl font-display font-bold"
          role="heading"
          aria-level={1}
        >
          {popupTitle}
        </div>
        <button
          data-cy="x-button"
          type="button"
          aria-label={closeModalAria}
          onClick={closeModal}
          data-gc-analytics-customclick={`ESDC-EDSC:${refPageAA}:Close`}
        >
          <FontAwesomeIcon aria-hidden="true" icon={icon['xmark']} size="xl" />
        </button>
      </div>
      <p className="text-xl font-display py-4 mr-10">{popupDescription}</p>
      <div className="md:flex mt-8 md:space-x-12">
        <Button
          className="whitespace-nowrap my-auto w-full justify-center md:w-fit py-2 px-4"
          id={popupSecondaryBtn.id}
          style="secondary"
          onClick={closeModal}
          text={popupSecondaryBtn.text}
        />
        {/* Using anchor tag due to ref errors
        continueLink is always external so NextJS routing can be ignored */}
        <a
          href={continueLink}
          id={popupPrimaryBtn.id}
          className="flex justify-center text-xl py-2 px-4 mt-6 bg-deep-blue-medium text-white rounded focus:ring-offset-4 focus:ring-4 focus:ring-deep-blue-focus focus:bg-deep-blue-focus hover:bg-deep-blue-light md:mt-auto"
        >
          {popupPrimaryBtn.text}
        </a>
      </div>
    </div>
  )
}

export default ExitBeta
