import propTypes from 'prop-types'
import ViewMoreLessButton from '../components/ViewMoreLessButton'
import { useState } from 'react'

export default function Card(props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border rounded border-gray-300 shadow my-6" data-cy="cards">
      <h2 className="py-5 px-3 text-4xl font-display font-bold sm:pl-10">
        {props.cardTitle}
      </h2>
      <ViewMoreLessButton
        id={props.programUniqueId + 'test-card-button-'}
        dataTestId={props.programUniqueId + 'dataTestId'}
        dataCy="viewMoreLessButton"
        onClick={() => {
          const newOpenState = !isOpen
          setIsOpen(newOpenState)
        }}
        ariaExpanded={isOpen.toString()}
        icon={isOpen}
        caption={props.viewMoreLessCaption}
        className="py-5 px-2 sm:px-10"
      />
      {!isOpen ? null : <div className="pb-6">{props.children}</div>}
    </div>
  )
}

Card.propTypes = {
  locale: propTypes.string.isRequired,
  cardTitle: propTypes.string.isRequired,
  viewMoreLessCaption: propTypes.string.isRequired,
  programUniqueId: propTypes.string,
  openModal: propTypes.func,
  children: propTypes.oneOfType([
    propTypes.element,
    propTypes.arrayOf(propTypes.element),
  ]),
}
