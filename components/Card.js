import propTypes from 'prop-types'
import ViewMoreLessButton from '../components/ViewMoreLessButton'
import { useState } from 'react'

export default function Card(props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border rounded border-gray-300 shadow my-6" data-cy="cards">
      <h2 className="py-4 md:py-8 md:mt-2 px-3 sm:px-8 md:px-15 text-4xl font-display font-bold">
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
        className="pb-6 md:pb-8 md:pt-4 px-3 sm:px-8 md:px-15 w-full"
        acronym={props.acronym}
        refPageAA={props.refPageAA}
        ariaLabel={`${props.cardTitle} - ${props.viewMoreLessCaption}`}
      />
      {!isOpen ? null : (
        <div className="pb-6" data-cy="sectionList">
          {props.children}
        </div>
      )}
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
