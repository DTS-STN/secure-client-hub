import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { icon } from '../lib/loadIcons'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function BenefitTasks(props) {
  return (
    <div className="px-4 sm:pl-8 inline-block w-full">
      <h3 className="font-display font-bold text-xl " data-cy={props.dataCy}>
        {props.taskList.title}
      </h3>
      <ul className="w-full py-6 pl-2 space-y-8">
        {props.taskList.tasks.map((task, index) => {
          return (
            <li key={index} className="font-display font-bold">
              {/* 
              Ignore link for now to open modal
              <Link href={task.link} passHref> */}
              <a
                onClick={props.openModal}
                href={'/'}
                className="flex items-center underline text-deep-blue-dark hover:text-blue-hover"
              >
                <FontAwesomeIcon
                  icon={
                    icon[task.icon] ? icon[task.icon] : icon['question-circle']
                  }
                  className="pr-4 text-2xl w-8"
                />
                <span className="font-normal text-xl">{task.title}</span>
              </a>
              {/* </Link> */}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

BenefitTasks.propTypes = {
  taskList: PropTypes.shape({
    title: PropTypes.string.isRequired,
    dataCy: PropTypes.string,
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
      })
    ),
  }),
  openModal: PropTypes.func,
}
