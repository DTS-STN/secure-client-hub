import ViewMoreLessButton from '../components/ViewMoreLessButton'
import ContextualAlert from '../components/ContextualAlert'
import { useEffect, useState } from 'react'
import { ReactNode } from 'react'
import { z } from 'zod'

interface AlertProps {
  id: string
  type: string
  alertHeading: string
  alertBody: string
}
interface CardProps {
  cardTitle: string
  viewMoreLessCaption: string
  programUniqueId?: string
  acronym: string
  refPageAA: string
  children: ReactNode
  locale: string
  cardAlert: AlertProps[]
}

const Card = ({
  cardAlert,
  locale,
  cardTitle,
  viewMoreLessCaption,
  programUniqueId,
  acronym,
  refPageAA,
  children,
}: CardProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const CardState = z
    .string()
    .toLowerCase()
    .transform((x) => x === 'true')
    .pipe(z.boolean())
  let reactDevBufferSet = false

  /**
   * init Effect
   *
   * In dev mode (npm run dev) React will prerender and render
   * useEffects on page. This renders the page twice in dev mode,
   * which erases the state.
   *
   * The reactDevBufferSet ensures it will only trigger once.
   *
   * This doesn't occur outside of dev.
   *
   * TODO: Moving the state out of the individual Cards and into
   * a unified state/context may fix this this load issue.
   */
  useEffect(() => {
    if (!reactDevBufferSet) {
      reactDevBufferSet = true // eslint-disable-line
      if (programUniqueId !== undefined) {
        const sessionItem = sessionStorage.getItem(programUniqueId)

        setIsOpen(sessionItem !== null ? CardState.parse(sessionItem) : false)
      }
    }
  }, [])

  // on change Effect
  useEffect(() => {
    if (programUniqueId !== undefined) {
      sessionStorage.setItem(programUniqueId, String(isOpen))
    }
  }, [isOpen, programUniqueId])

  return (
    <div className="my-6 rounded border border-gray-300 shadow" data-cy="cards">
      <h2
        className="px-3 py-4 font-display text-4xl font-bold text-gray-darker sm:px-8 md:mt-2 md:px-15 md:py-8"
        data-cy="cardtitle"
      >
        {cardTitle}
      </h2>
      <ViewMoreLessButton
        id={programUniqueId + 'test-card-button-'}
        dataTestid={programUniqueId?.toString() + 'dataTestId'}
        dataCy="viewMoreLessButton"
        onClick={() => {
          const newOpenState = !isOpen
          setIsOpen(newOpenState)
        }}
        ariaExpanded={isOpen}
        icon={isOpen}
        caption={viewMoreLessCaption}
        className="w-full px-3 pb-6 sm:px-8 md:px-15 md:pb-8 md:pt-4"
        acronym={acronym}
        refPageAA={refPageAA}
        ariaLabel={`${cardTitle} - ${viewMoreLessCaption}`}
      />
      {!isOpen ? null : (
        <div>
          {cardAlert.map((alert, index) => {
            const alertType = alert.type[0].split('/').pop()
            return (
              <ul className="w-full pb-3 sm:px-8 sm:pb-6 md:px-15" key={index}>
                <ContextualAlert
                  id={alert.id}
                  type={alertType}
                  alertHeading={alert.alertHeading}
                  alertBody={alert.alertBody}
                  alert_icon_alt_text={`${alert.type} ${
                    locale === 'fr' ? 'Icônes' : 'icon'
                  }`}
                  alert_icon_id="alert-icon-id"
                />
              </ul>
            )
          })}
          <div className="pb-6" data-cy="sectionList">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

Card.defaultProps = {
  cardAlert: [
    {
      id: '',
      type: '',
      alertHeading: '',
      alertBody: '',
      alert_icon_alt_text: '',
      alert_icon_id: '',
    },
  ],
}

export default Card
