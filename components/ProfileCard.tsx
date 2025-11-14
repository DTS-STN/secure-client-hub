import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { icon } from '../lib/loadIcons'
import { getIcon } from './MaterialIcon'

export interface ProfileCardProps {
  dataCy?: string
  cardId: string
  cardName: string
  cardHref: string
  description?: string
  aaPrefix?: string
  prefixIcon?: string
}

const ProfileCard = ({
  cardId,
  cardName,
  cardHref,
  description,
  aaPrefix,
  prefixIcon,
}: ProfileCardProps) => {
  return (
    <div className="border-t-2 border-y-gray-100 text-base">
      <Link
        href={cardHref}
        data-gc-analytics-customclick={`${aaPrefix}:${cardId}`}
      >
        <div className="m-4 grid grid-flow-col grid-cols-[36px_1fr_36px] grid-rows-2 items-center justify-items-center gap-2">
          <div className="col-start-1 row-start-1 justify-self-start pt-1 text-xl">
            {getIcon(prefixIcon)}
          </div>
          <div className="col-start-2 row-start-1 justify-self-start font-display text-2xl font-bold text-gray-darker">
            {cardName}
          </div>
          <div className="col-start-3 row-start-1 text-2xl">
            <FontAwesomeIcon icon={icon['chevron-right']} />
          </div>
          <div className="col-start-2 row-start-2 justify-self-start text-base text-[#43474e]">
            {description}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProfileCard
