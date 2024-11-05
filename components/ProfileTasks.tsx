import Link from 'next/link'

interface Task {
  title: string
  areaLabel: string
  link: string
  betaPopUp?: boolean
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
  tasks = [
    {
      id: 'mscaPlaceholder',
      title: 'mscaPlaceholder',
      areaLabel: 'mscaPlaceholder',
      link: 'mscaPlaceholder',
      betaPopUp: true,
    },
  ],
  refPageAA = 'mscaPlaceholder',
  acronym,
}: ProfileTasksProps) => {
  return (
    <div data-cy={dataCy} className="mb-12 mt-10">
      <h2
        className="text-4xl font-bold text-gray-darker"
        data-cy="program-title"
      >
        {programTitle}
      </h2>
      <ul
        className="grid w-full items-center pl-5 pt-3 xs:pl-6 md:grid-cols-1"
        data-cy="task"
        aria-label={programTitle}
      >
        {tasks.map((task, index) => {
          return (
            <li key={index} className="flex py-3 font-bold">
              <Link
                href={task.link}
                passHref
                className="list-item list-outside list-disc items-center rounded-sm px-1 text-deep-blue-dark underline visited:text-purple-50a hover:text-blue-hover focus:outline-1 focus:outline-blue-hover"
                data-cy="task-link"
                data-gc-analytics-customclick={`${refPageAA} ${acronym}:${task.id}`}
              >
                <span
                  aria-label={task.areaLabel}
                  className="text-xl font-normal"
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

export default ProfileTasks
