import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { icon } from '../lib/loadIcons'

export default function ProfileTasks(props) {
  return (
    <>
      <ul
        className="w-full gap-x-4 grid md:grid-cols-2 items-center pt-3"
        data-cy="task"
      >
        {props.tasks.map((task, index) => {
          return (
            <li
              key={index}
              className="font-body font-bold justify-center py-3  pl-2"
            >
              <Link href={task.link} passHref>
                <a
                  className="flex items-center underline text-deep-blue-dark hover:text-blue-hover"
                  data-cy="task-link"
                  onClick={(e) => {
                    if (task.betaPopUp) {
                      e.preventDefault()
                      props.openModal(task.link)
                    }
                  }}
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
    </>
  )
}

ProfileTasks.propTypes = {
  dataCy: PropTypes.string,
  openModal: PropTypes.func,
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
