import propTypes from 'prop-types'
import ViewMoreLessButton from '../components/ViewMoreLessButton'
import BenefitTasks from './BenefitTasks'
import { useState } from 'react'
import MostReqTasks from './MostReqTasks'

export default function Card(props) {
  const [isOpen, setIsOpen] = useState(false)

  var tasks = props.taskGroups
  const mostReq = props.taskGroups[0]
  if (props.mostReq) {
    tasks = props.taskGroups.slice(1, props.taskGroups.length)
  }

  return (
    <div className="border rounded border-gray-300 shadow my-6">
      <h2 className="py-5 px-3 text-3xl font-display font-bold sm:pl-10">
        {props.cardTitle}
      </h2>
      <ViewMoreLessButton
        id={props.programUniqueId + 'test-card-button-'}
        dataTestId={props.programUniqueId + 'dataTestId'}
        onClick={() => {
          const newOpenState = !isOpen
          setIsOpen(newOpenState)
        }}
        ariaExpanded={isOpen.toString()}
        icon={isOpen}
        caption={props.viewMoreLessCaption}
        className="py-5 px-2 sm:px-10"
      />

      {!isOpen ? null : (
        <div className="pb-12 ">
          {!props.mostReq ? null : (
            <div className="bg-deep-blue-60d mt-4 pl-2">
              <MostReqTasks taskListMR={mostReq} />
            </div>
          )}
          <div className="grid md:grid-cols-2">
            {tasks.map((taskList, index) => {
              return (
                <div className="my-2 pl-2 sm:pl-2" key={index}>
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
  locale: propTypes.string.isRequired,
  cardTitle: propTypes.string.isRequired,
  viewMoreLessCaption: propTypes.string.isRequired,
  taskHeading: propTypes.string,
  taskGroups: propTypes.array,
  programUniqueId: propTypes.string,
  mostReq: propTypes.bool,
}
