import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { icon } from '../lib/loadIcons'

interface Task {
  title: string
  areaLabel: string
  link: string
  icon: string
  betaPopUp?: boolean
  id: string
}

interface TaskList {
  title: string
  tasks: Task[]
}

interface MostReqTasksProps {
  dataCy?: string
  taskListMR: TaskList

  refPageAA: string
  acronym: string
}

const MostReqTasks = ({
  dataCy,
  taskListMR,
  refPageAA,
  acronym,
}: MostReqTasksProps) => {
  const newTabTaskExceptions: string[] = [
    'https://protege-secure.pca-cal.ca/en/Account/Authorize',
    'https://protege-secure.pca-cal.ca/fr/Compte/Autoriser',
  ]

  return (
    <div className="h-full">
      <h3
        className="font-bold text-xl text-white pt-6 pl-3 sm:pl-8 md:pl-15 "
        data-cy={dataCy}
      >
        {taskListMR.title}
      </h3>
      <ul
        className="w-full gap-x-0 grid md:grid-cols-2 pl-3 sm:pl-8 md:pl-15 pt-4  md:pt-5 pb-6 "
        data-cy="most-req-links"
      >
        {taskListMR.tasks.map((task, index) => {
          return (
            <li
              key={index}
              className="font-bold justify-center py-2"
              data-cy="most-req-tasklink"
            >
              <Link
                href={task.link}
                passHref
                target={
                  newTabTaskExceptions.includes(task.link) ? '_blank' : '_self'
                }
                rel={
                  newTabTaskExceptions.includes(task.link)
                    ? 'noopener noreferrer'
                    : undefined
                }
                data-gc-analytics-customclick={`${refPageAA} ${acronym}:${task.id}`}
                className="flex items-center underline pl-2 text-white hover:text-gray-50a rounded-sm focus:outline-1 focus:outline-white"
              >
                <FontAwesomeIcon
                  icon={icon[task.icon as keyof typeof FontAwesomeIcon]}
                  className="pr-4 text-2xl w-8"
                />
                <span
                  aria-label={task.areaLabel}
                  className="font-normal text-xl"
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

MostReqTasks.defaultProps = {
  taskListMR: [
    {
      tasks: [
        {
          icon: 'question-circle', // To ensure a value is used for FontAwesome icons
        },
      ],
    },
  ],
}

export default MostReqTasks
