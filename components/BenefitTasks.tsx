import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { icon } from '../lib/loadIcons'

interface Tasks {
  title: string
  areaLabel: string
  link: string
  icon?: string
  betaPopUp: boolean
  id: string
}

export interface TaskListProps {
  title: string
  tasks: Tasks[]
}
interface BenefitTasksProps {
  locale: string
  taskList: TaskListProps
  dataCy?: string
  refPageAA?: string
  acronym?: string
}

const BenefitTasks = ({
  locale,
  taskList,
  dataCy,
  refPageAA = 'mscaPlaceholder',
  acronym = 'mscaPlaceholder',
}: BenefitTasksProps) => {
  const newTabTaskExceptions = [
    'https://www.canada.ca/en/services/benefits/ei/employment-insurance-reporting.html',
    'https://www.canada.ca/fr/services/prestations/ae/declarations-assurance-emploi.html',
    'https://www.canada.ca/en/services/benefits/ei/ei-regular-benefit/apply.html#gc-document-nav',
    'http://www.servicecanada.gc.ca/cgi-bin/op-so/msca/redirection.asp?linkmsca=/104e.html',
    'http://www.servicecanada.gc.ca/cgi-bin/op-so/msca/redirection.asp?linkmsca=/104f.html',
    'https://srv270.hrdc-drhc.gc.ca/AW/introduction?GoCTemplateCulture=en-CA',
    'https://srv270.hrdc-drhc.gc.ca/AW/introduction?GoCTemplateCulture=fr-CA',
    'http://www.servicecanada.gc.ca/cgi-bin/op-so/msca/redirection.asp?linkmsca=/107e.html',
    'http://www.servicecanada.gc.ca/cgi-bin/op-so/msca/redirection.asp?linkmsca=/107f.html',
    'https://estimateursv-oasestimator.service.canada.ca/en',
    'https://estimateursv-oasestimator.service.canada.ca/fr',
  ]

  return (
    <div className="inline-block w-full" data-testid="benefitTasks-test">
      <h3 className="text-xl font-bold" data-cy={dataCy}>
        {taskList.title}
      </h3>
      <ul
        className="w-full space-y-4 px-6 pb-8 pt-3 md:pb-12 md:pl-8 lg:pl-10"
        data-cy="taskList"
      >
        {taskList.tasks.map((task, index) => {
          return (
            <li
              key={index}
              className="list-disc font-bold text-deep-blue-dark"
              data-cy="task-link"
            >
              <Link
                aria-label={`${taskList.title} - ${task.title} - 
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
                data-gc-analytics-customclick={`${refPageAA} ${acronym} ${taskList.title}:${task.id}`}
                className="flex items-center rounded-sm py-1 text-deep-blue-dark underline hover:text-blue-hover focus:outline-1 focus:outline-blue-hover"
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
export default BenefitTasks
