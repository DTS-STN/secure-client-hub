import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { icon } from '../lib/loadIcons'

interface Task {
  title: string
  areaLabel: string
  link: string
  icon: string
  betaPopUp: boolean
  id: string
}

interface ProfileTasksProps {
  dataCy?: string
  programTitle: string
  tasks: Task[]
  refPageAA: string
  acronym: string
}

const ProfileTasks = ({
  dataCy,
  programTitle,
  tasks,
  refPageAA,
  acronym,
}: ProfileTasksProps) => {
  return (
    <div data-cy={dataCy} className="mt-10 mb-12">
      <h2
        className="text-4xl font-bold text-gray-darker"
        data-cy="program-title"
      >
        {programTitle}
      </h2>
      <ul
        className="w-full grid md:grid-cols-1 items-center pt-3"
        data-cy="task"
        aria-label={programTitle}
      >
        {tasks.map((task, index) => {
          return (
            <li key={index} className="flex font-bold py-3">
              <Link
                href={task.link}
                passHref
                className="flex px-1 items-center underline text-deep-blue-dark hover:text-blue-hover rounded-sm focus:outline-1 focus:outline-blue-hover visited:text-purple-50a"
                data-cy="task-link"
                data-gc-analytics-customclick={`${refPageAA} ${acronym}:${task.id}`}
              >
                <FontAwesomeIcon
                  icon={icon[task.icon as keyof typeof FontAwesomeIcon]}
                  className="pr-4 text-2xl w-8"
                />
                <span
                  aria-label={task.areaLabel}
                  className="font-normal text-xl"
                  data-cy="task-item"
                >
                  {task.title}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

ProfileTasks.defaultProps = {
  tasks: [
    {
      id: '',
      icon: 'question-circle', // To ensure a value is used for FontAwesome icons,
      title: '',
      areaLabel: '',
      link: '',
      betaPopUp: true,
    },
  ],
}

export default ProfileTasks
