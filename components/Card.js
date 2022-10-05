import propTypes from 'prop-types'
import ViewMoreLessButton from '../components/ViewMoreLessButton'
import BenefitTasks from '../Contents/BenefitTasks'
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
      {!isOpen ? null : (
        <div className="pb-12">
          <div className="bg-gray-lighter grid grid-rows-1 md:grid-cols-2">
            {props.taskGroups.map((taskList, index) => {
              return (
                <div
                  className="border-b-2 last:border-b-0 md:border-b-0 md:odd:border-r-2  my-4 pl-2 sm:pl-8"
                  key={index}
                >
                  <BenefitTasks taskList={taskList} />
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

Card.propTypes = {
  cardTitle: propTypes.string.isRequired,
  viewMoreLessCaption: propTypes.string.isRequired,
  taskHeading: propTypes.string,
  taskGroups: propTypes.array,
}
