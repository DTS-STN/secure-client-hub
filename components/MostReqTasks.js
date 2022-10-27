import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { icon } from '../lib/loadIcons'

export default function MostReqTasks(props) {
  return (
    <div className=" px-3 h-full">
      <h3
        className="font-display font-bold text-xl text-white pt-6 "
        data-cy={props.dataCy}
      >
        {props.taskListMR.title}
      </h3>
      <ul className="w-full gap-x-14 grid md:grid-cols-2">
        {props.taskListMR.tasks.map((task, index) => {
          return (
            <li
              key={index}
              className="font-display font-bold justify-center py-4 md:pt-5 md:pb-6 pl-2"
            >
              {/* 
              Ignore link for now to open modal
              <Link href={task.link} passHref> */}
              <a
                onClick={props.openModal}
                className="flex items-center underline text-white hover:text-gray-50"
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

MostReqTasks.propTypes = {
  dataCy: PropTypes.string,
  taskListMR: PropTypes.shape({
    title: PropTypes.string.isRequired,

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
