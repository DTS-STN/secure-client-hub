import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { icon } from '../lib/loadIcons'

export interface ProfileCardProps {
  dataCy?: string
  cardId: string
  cardName: string
  cardHref: string
  description?: string
  aaPrefix?: string
}

const ProfileCard = ({
  cardId,
  cardName,
  cardHref,
  description,
  aaPrefix,
}: ProfileCardProps) => {
  return (
    <div className="border-t-2 border-y-gray-100 text-base">
      <div className="m-4 grid grid-flow-col grid-cols-[36px_1fr_36px] grid-rows-2 items-center justify-items-center gap-2">
        <div className="col-start-1 row-start-1 justify-self-center text-3xl">
          {getIconFromId(cardId)}
        </div>
        <div className="col-start-2 row-start-1 justify-self-start text-2xl">
          <Link
            href={cardHref}
            data-gc-analytics-customclick={`${aaPrefix}:${cardId}`}
          >
            {cardName}
          </Link>
        </div>
        <div className="col-start-3 row-start-1 text-2xl">
          <FontAwesomeIcon icon={icon['chevron-right']} />
        </div>
        <div className="col-start-2 row-start-2 justify-self-start text-base text-[#43474e]">
          {description}
        </div>
      </div>
    </div>
  )
}

function getIconFromId(cardId: string) {
  // TODO: Actual logic
  if (!cardId) {
    return <></>
  }
  return <FontAwesomeIcon icon={icon['lock']} />
}

export default ProfileCard
