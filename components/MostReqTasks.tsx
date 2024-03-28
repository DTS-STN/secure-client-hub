import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { icon } from '../lib/loadIcons'

interface Task {
  title: string
  areaLabel: string
  link: string
  icon?: string
  betaPopUp?: boolean
  id: string
}

interface TaskList {
  title: string
  tasks: Task[]
}

interface MostReqTasksProps {
  locale: string
  dataCy?: string
  taskListMR: TaskList
  refPageAA: string
  acronym: string
}

const MostReqTasks = ({
  locale,
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
        className="pl-3 pt-6 text-xl font-bold text-white sm:pl-8 md:pl-15 "
        data-cy={dataCy}
      >
        {taskListMR.title}
      </h3>
      <ul
        className="flex list-outside list-disc flex-col px-8 pb-5 pt-2 text-white sm:px-12 md:px-20 md:pt-4"
        data-cy="most-req-links"
      >
        {taskListMR.tasks.map((task, index) => {
          return (
            <li
              key={index}
              className="justify-center py-2 font-bold"
              data-cy="most-req-tasklink"
            >
              <Link
                aria-label={`${taskListMR.title} - ${task.title} -
                ${
                  newTabTaskExceptions.includes(task.link)
                    ? locale === 'fr'
                      ? "S'ouvre dans un nouvel onglet"
                      : 'Opens in a new tab'
                    : ''
                }`}
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
                className=" rounded-sm text-white underline hover:text-gray-50a focus:outline-1 focus:outline-white"
              >
                <span className="static text-xl font-normal">
                  {task.title}
                  <span>
                    {newTabTaskExceptions.includes(task.link) ? (
                      <FontAwesomeIcon
                        className="absolute ml-1.5 pt-0.5"
                        width="14"
                        icon={icon['arrow-up-right-from-square']}
                      ></FontAwesomeIcon>
                    ) : null}
                  </span>
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
  locale: 'en',
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
