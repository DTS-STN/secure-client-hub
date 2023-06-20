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
      <ul className="w-full gap-x-0 grid md:grid-cols-2 pl-3 sm:pl-8 md:pl-15 pt-4  md:pt-5 pb-6 ">
        {props.taskListMR.tasks.map((task, index) => {
          return (
            <li key={index} className="font-body font-bold justify-center py-2">
              <Link href={task.link} passHref>
                <a
                  onClick={(e) => {
                    if (task.betaPopUp) {
                      e.preventDefault()
                      props.openModal(task.link, 'betaModal')
                    }
                  }}
                  data-gc-analytics-customclick={`${props.refPageAA} ${props.acronym}:${task.id}`}
                  className="flex items-center underline pl-2 text-white hover:text-gray-50a"
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
        betaPopUp: PropTypes.bool,
      })
    ),
  }),
  openModal: PropTypes.func,
}
