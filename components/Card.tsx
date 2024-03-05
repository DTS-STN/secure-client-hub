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
        <div className="pb-6" data-cy="sectionList">
          {children}
        </div>
      )}
    </div>
  )
}

export default Card
