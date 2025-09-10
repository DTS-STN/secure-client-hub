import { Key } from 'react'
import MostReqTasks from './MostReqTasks'
import BenefitTasks, { TaskListProps } from './BenefitTasks'
import Accordion from './Accordion'

interface AlertProps {
  id: string
  type: string
  alertHeading: string
  alertBody: string
}
interface AccordionProps {
  id: string
  title: string
  items: {
    title: string
    aaTitle: string
    tasks: {
      id: string
      title: string
      areaLabel: string
      link: string
      icon: string
      betaPopUp: boolean
    }[]
  }[]
}
interface CardProps {
  cardTitle: string
  accordions: AccordionProps[]
  programUniqueId?: string
  acronym: string
  refPageAA: string
  locale: string
  cardAlert?: AlertProps[]
  hasAlert?: boolean
}

const Card = ({
  cardAlert = [
    {
      id: '',
      type: '',
      alertHeading: '',
      alertBody: '',
    },
  ],
  locale,
  cardTitle,
  accordions = [
    {
      id: '',
      title: '',
      items: [
        {
          title: '',
          aaTitle: '',
          tasks: [
            {
              id: '',
              title: '',
              areaLabel: '',
              link: '',
              icon: '',
              betaPopUp: false,
            },
          ],
        },
      ],
    },
  ],
  // programUniqueId,
  acronym,
  refPageAA,
  // children,
}: CardProps) => {
  return (
    <div className="my-6 rounded border border-gray-300 shadow" data-cy="cards">
      <h2
        className="px-3 py-4 font-display text-4xl font-bold text-gray-darker sm:px-8 md:mt-2 md:px-15 md:py-8"
        data-cy="cardtitle"
      >
        {cardTitle}
      </h2>
      <div>
        {/* loop through each accordion */}
        {accordions.map((accordion) => {
          const mostReq = accordion.items[0]
          const tasks = accordion.items.slice(1, accordion.items.length)
          return (
            <>
              <Accordion
                key={accordion.id}
                programUniqueId={accordion.id}
                locale={locale}
                cardTitle={cardTitle}
                viewMoreLessCaption={accordion.title}
                acronym={acronym}
                refPageAA={refPageAA}
                cardAlert={cardAlert}
              >
                {/* code for each section taken from my-dashboard.tsx */}
                {/* {children} */}
                <div
                  className="bg-deep-blue-60d"
                  data-cy="most-requested-section"
                >
                  <MostReqTasks
                    locale={locale}
                    taskListMR={mostReq}
                    dataCy="most-requested"
                    acronym={acronym}
                    refPageAA={refPageAA}
                  />
                </div>
                <div
                  className="gap-x-[60px] pl-3 pt-8 sm:pl-8 md:columns-2 md:px-15"
                  data-cy="task-list"
                >
                  {tasks.map((taskList: TaskListProps, index: Key) => {
                    return (
                      <div key={index} data-cy="Task">
                        <BenefitTasks
                          locale={locale}
                          acronym={acronym}
                          taskList={taskList}
                          dataCy="task-group-list"
                          refPageAA={refPageAA}
                        />
                      </div>
                    )
                  })}
                </div>
              </Accordion>
            </>
          )
        })}
      </div>
    </div>
  )
}

export default Card
