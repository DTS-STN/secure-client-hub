import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { icon } from '../lib/loadIcons'

export default function MostReqTasks(props) {
  return (
    <div className="h-full">
      <h3
        className="font-body font-bold text-xl text-white pt-6 pl-3 sm:pl-8 md:pl-15 "
        data-cy={props.dataCy}
      >
        {props.taskListMR.title}
      </h3>
      <ul className="w-full gap-x-8 grid md:grid-cols-2">
        {props.taskListMR.tasks.map((task, index) => {
          return (
            <li
              key={index}
              className="font-body font-bold justify-center py-4 pl-2 sm:pl-8 md:pt-5 md:pb-6 md:pl-15"
            >
              <Link href={task.link} passHref>
                <a
                  onClick={(e) => {
                    e.preventDefault()
                    props.openModal()
                  }}
                  className="flex items-center underline pl-2 text-white hover:text-gray-50"
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

MostReqTasks.propTypes = {
  dataCy: PropTypes.string,
  taskListMR: PropTypes.shape({
    title: PropTypes.string.isRequired,

    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        areaLabel: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
      })
    ),
  }),
  openModal: PropTypes.func,
}
