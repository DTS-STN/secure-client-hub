import ViewMoreLessButton from '../components/ViewMoreLessButton'
import { useState } from 'react'
import { ReactNode } from 'react'

interface CardProps {
  cardTitle: string
  viewMoreLessCaption: string
  programUniqueId?: string
  acronym: string
  refPageAA: string
  children: ReactNode
}

const Card = ({
  cardTitle,
  viewMoreLessCaption,
  programUniqueId,
  acronym,
  refPageAA,
  children,
}: CardProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border rounded border-gray-300 shadow my-6" data-cy="cards">
      <h2
        className="py-4 md:py-8 md:mt-2 px-3 sm:px-8 md:px-15 text-4xl font-display font-bold text-gray-darker"
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
        className="pb-6 md:pb-8 md:pt-4 px-3 sm:px-8 md:px-15 w-full"
        acronym={acronym}
        refPageAA={refPageAA}
        ariaLabel={`${cardTitle} - ${viewMoreLessCaption}`}
      />
      {!isOpen ? null : (
        <div className="pb-6" data-cy="sectionList">
          {children}
        </div>
      )}
    </div>
  )
}

export default Card
