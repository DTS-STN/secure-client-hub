import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { icon } from '../lib/loadIcons'

interface Tasks {
  title: string
  areaLabel: string
  link: string
  icon: string
  betaPopUp: boolean
  id: string
}

interface TaskListProps {
  title: string
  dataCy: string
  tasks: Tasks[]
}

interface BenefitTasksProps {
  taskList: TaskListProps
  openModal: (link: string, modalType: string) => void
  dataCy?: string
  refPageAA?: string
  acronym?: string
}

const BenefitTasks = ({
  taskList,
  openModal,
  dataCy,
  refPageAA,
  acronym,
}: BenefitTasksProps) => {
  const newTabTaskExceptions = [
    'https://www.canada.ca/en/services/benefits/ei/employment-insurance-reporting.html',
    'https://www.canada.ca/fr/services/prestations/ae/declarations-assurance-emploi.html',
    'https://www.canada.ca/en/services/benefits/ei/ei-regular-benefit/apply.html#gc-document-nav',
    'http://www.servicecanada.gc.ca/cgi-bin/op-so/msca/redirection.asp?linkmsca=/104e.html',
    'https://srv270.hrdc-drhc.gc.ca/AW/introduction?GoCTemplateCulture=en-CA',
    'https://srv270.hrdc-drhc.gc.ca/AW/introduction?GoCTemplateCulture=fr-CA',
    'http://www.servicecanada.gc.ca/cgi-bin/op-so/msca/redirection.asp?linkmsca=/107e.html',
    'https://estimateursv-oasestimator.service.canada.ca/en',
    'https://estimateursv-oasestimator.service.canada.ca/fr',
  ]

  return (
    <div className="inline-block w-full" data-testid="benefitTasks-test">
      <h3 className="font-bold text-xl " data-cy={dataCy}>
        {taskList.title}
      </h3>
      <ul
        className="w-full pb-8 md:pb-12 pt-3 pl-2 space-y-4"
        data-cy="taskList"
      >
        {taskList.tasks.map((task, index) => {
          return (
            <li key={index} className="font-bold " data-cy="task-link">
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
                onClick={(e) => {
                  //check for exit beta popup flag and not a new tab link, else keep default anchor behavior
                  if (
                    task.betaPopUp &&
                    !newTabTaskExceptions.includes(task.link)
                  ) {
                    e.preventDefault()
                    openModal(task.link, 'betaModal')
                  }
                }}
                data-gc-analytics-customclick={`${refPageAA} ${acronym}:${task.id}`}
                className="flex items-center underline py-1 text-deep-blue-dark hover:text-blue-hover"
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

BenefitTasks.defaultprops = {
  taskList: [
    {
      title: '',
      dataCy: '',
      tasks: [
        {
          title: '',
          areaLabel: '',
          link: '',
          icon: 'question-circle', // To ensure a value is used for FontAwesome icons
          betaPopUp: '',
          id: '',
        },
      ],
    },
  ],
}
export default BenefitTasks
