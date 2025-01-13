import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { icon } from '../lib/loadIcons'

interface Task {
  title: string
  link: string
  betaPopUp?: boolean
  id: string
}

interface TaskList {
  title: string
  aaTitle: string
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
  locale = 'en',
  dataCy,
  taskListMR = {
    tasks: [
      {
        title: 'mscaPlaceholder',
        link: 'mscaPlaceholderHref',
        id: Math.random().toString(),
      },
    ],
    title: 'mscaPlaceholder',
    aaTitle: 'mscaPlaceholder',
  },
  refPageAA = 'mscaPlaceholder',
  acronym,
}: MostReqTasksProps) => {
  const newTabTaskExceptions: string[] = []

  return (
    <div className="h-full">
      <h3
        className="pl-3 pt-6 text-xl font-bold text-white sm:pl-8 md:pl-15"
        data-cy={dataCy}
      >
        {taskListMR.title}
      </h3>

      {taskListMR.tasks.length > 3 ? (
        <ul
          className="grid list-outside list-disc grid-cols-1 px-9 pb-5 pt-2 text-white xs:gap-x-5 sm:auto-cols-fr sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-3 sm:px-14 md:px-[100px] md:pt-4"
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
                    newTabTaskExceptions.includes(task.link)
                      ? '_blank'
                      : '_self'
                  }
                  rel={
                    newTabTaskExceptions.includes(task.link)
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  data-gc-analytics-customclick={`${refPageAA} ${acronym} ${taskListMR.aaTitle}:${task.id}`}
                  className="rounded-sm text-white underline hover:text-gray-50a focus:outline-1 focus:outline-white"
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
      ) : (
        <ul
          className="grid list-outside list-disc grid-cols-1 px-9 pb-5 pt-2 text-white sm:px-14 md:px-[100px] md:pt-4"
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
                    newTabTaskExceptions.includes(task.link)
                      ? '_blank'
                      : '_self'
                  }
                  rel={
                    newTabTaskExceptions.includes(task.link)
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  data-gc-analytics-customclick={`${refPageAA} ${acronym} ${taskListMR.title}:${task.id}`}
                  className="rounded-sm text-white underline hover:text-gray-50a focus:outline-1 focus:outline-white"
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
      )}
    </div>
  )
}

export default MostReqTasks
