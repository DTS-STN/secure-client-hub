import propTypes from 'prop-types'
import ViewMoreLessButton from '../components/ViewMoreLessButton'
import { useState } from 'react'

export default function Card(props) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="border rounded border-gray-300 shadow">
      <h2 className="py-5 px-3 text-3xl font-medium sm:pl-12 ">
        {props.cardTitle}
      </h2>
      <ViewMoreLessButton
        id={'test-card-button'}
        dataTestid={`test-data-id`}
        onClick={() => {
          const newOpenState = !isOpen
          setIsOpen(newOpenState)
        }}
        ariaExpanded={isOpen.toString()}
        icon={isOpen}
        caption={props.viewMoreLessCaption}
        className="py-5 px-2 sm:pl-12"
      />
      {!isOpen ? null : <p>Task list here</p>}
    </div>
  )
}

Card.propTypes = {
  cardTitle: propTypes.string.isRequired,
  viewMoreLessCaption: propTypes.string.isRequired,
}
