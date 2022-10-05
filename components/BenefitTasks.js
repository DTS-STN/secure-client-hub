import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

export default function BenefitTasks(props) {
  return (
    <div className="bg-gray-lighter px-4 py-2 sm:px-8 md:py-0 h-full  ">
      <h4 className="font-display font-bold text-xl ">
        {/* {props.taskList.header} */}
        task header
      </h4>
      <ul className="w-full py-6 space-y-8">
        {props.taskList.tasks.map((task, index) => {
          return (
            <li key={index} className="font-display font-bold">
              <Link href={task.link} passHref>
                <a className="flex items-center underline text-blue-default hover:text-blue-hover">
                  <FontAwesomeIcon
                    icon={task.icon}
                    className="pr-4 text-2xl w-8"
                  />
                  <span className="font-normal text-xl">{task.task}</span>
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
    header: PropTypes.string.isRequired,
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        task: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        icon: PropTypes.object.isRequired,
      })
    ),
  }),
}
