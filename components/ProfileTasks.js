import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { icon } from '../lib/loadIcons'

export default function ProfileTasks(props) {
  return (
    <div data-cy="task-list" className="mt-10 mb-12">
      <h2 className="text-4xl font-bold font-body">{props.programTitle}</h2>
      <ul
        className="w-full grid md:grid-cols-1 items-center pt-3"
        data-cy="task"
      >
        {props.tasks.map((task, index) => {
          return (
            <li key={index} className="font-body font-bold justify-center py-3">
              <Link href={task.link} passHref>
                <a
                  className="flex items-center underline text-deep-blue-dark hover:text-blue-hover"
                  data-cy="task-link"
                  onClick={(e) => {
                    if (task.betaPopUp) {
                      e.preventDefault()
                      props.openModal(task.link, 'betaModal')
                    }
                  }}
                  data-gc-analytics-customclick={`${props.refPageAA} ${props.acronym}:${task.title}`}
                >
                  <FontAwesomeIcon
                    icon={
                      icon[task.icon]
                        ? icon[task.icon]
                        : icon['question-circle']
                    }
                    className="pr-4 text-2xl w-8"
                  />
                  <span
                    aria-label={task.areaLabel}
                    className="font-normal text-xl"
                    data-cy="task-item"
                  >
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

ProfileTasks.propTypes = {
  dataCy: PropTypes.string,
  openModal: PropTypes.func,
  programTitle: PropTypes.string,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      areaLabel: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      betaPopUp: PropTypes.bool.isRequired,
    })
  ),
}
