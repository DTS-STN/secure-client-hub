import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { icon } from '../lib/loadIcons'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function BenefitTasks(props) {
  return (
    <div className="pl-2 sm:pl-8 md:pl-15 inline-block w-full">
      <h3 className="font-body font-bold text-xl " data-cy={props.dataCy}>
        {props.taskList.title}
      </h3>
      <ul
        className="w-full py-6 pl-2 space-y-5 md:space-y-6"
        data-cy="taskList"
      >
        {props.taskList.tasks.map((task, index) => {
          return (
            <li key={index} className="font-body font-bold" data-cy="task-link">
              <Link href={task.link} passHref>
                <a
                  onClick={(e) => {
                    if (task.betaPopUp) {
                      e.preventDefault()
                      props.openModal(task.link)
                    }
                  }}
                  className="flex items-center underline text-deep-blue-dark hover:text-blue-hover"
                >
                  <span
                    aria-label={task.areaLabel}
                    className="font-normal text-xl"
                  >
                    <FontAwesomeIcon
                      icon={
                        icon[task.icon]
                          ? icon[task.icon]
                          : icon['question-circle']
                      }
                      className="pr-4 text-2xl w-8"
                    />
                    {task.title}
                  </span>
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

BenefitTasks.propTypes = {
  taskList: PropTypes.shape({
    title: PropTypes.string,
    dataCy: PropTypes.string,
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        areaLabel: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        betaPopUp: PropTypes.bool,
      })
    ),
  }),
  openModal: PropTypes.func,
}
