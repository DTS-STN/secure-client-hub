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
      className="m-8 h-fit rounded bg-white p-4 sm:mx-24 sm:mt-24 md:p-16"
      data-cy="exitBeta"
      id={popupId}
    >
      <div className="flex justify-between">
        <div
          className="font-display text-3xl font-bold"
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
          data-gc-analytics-customclick={`${refPageAA}:modal-Close`}
        >
          <FontAwesomeIcon aria-hidden="true" icon={icon['xmark']} size="xl" />
        </button>
      </div>
      <p className="mr-10 py-4 font-display text-xl">{popupDescription}</p>
      <div className="mt-8 md:flex md:space-x-12">
        <Button
          className="my-auto w-full justify-center whitespace-nowrap px-4 py-2 md:w-fit"
          id={popupSecondaryBtn.id}
          style="secondary"
          onClick={closeModal}
          text={popupSecondaryBtn.text}
          refPageAA={`${refPageAA}-modal`}
        />
        {/* Using anchor tag due to ref errors
        continueLink is always external so NextJS routing can be ignored */}
        <a
          href={continueLink}
          id={popupPrimaryBtn.id}
          data-gc-analytics-customclick={`${refPageAA}:modal-${popupPrimaryBtn.id}`}
          className="mt-6 flex justify-center rounded bg-deep-blue-medium px-4 py-2 text-xl text-white hover:bg-deep-blue-light focus:bg-deep-blue-focus focus:ring-4 focus:ring-deep-blue-focus focus:ring-offset-4 md:mt-auto"
        >
          {popupPrimaryBtn.text}
        </a>
      </div>
    </div>
  )
}

export default ExitBeta
