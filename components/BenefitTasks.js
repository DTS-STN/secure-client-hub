import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { icon } from '../lib/loadIcons'

export default function BenefitTasks(props) {
  const newTabTaskExceptions = [
    'https://www.canada.ca/en/services/benefits/ei/ei-regular-benefit/apply.html#gc-document-nav',
    'https://www.canada.ca/en/services/benefits/ei/employment-insurance-reporting.html',
  ]

  return (
    <div className="inline-block w-full">
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
                  target={
                    newTabTaskExceptions.includes(task.link)
                      ? '_blank'
                      : '_self'
                  }
                  onClick={(e) => {
                    //check for exit beta popup flag and not a new tab link, else keep default anchor behavior
                    if (
                      task.betaPopUp &&
                      !newTabTaskExceptions.includes(task.link)
                    ) {
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
