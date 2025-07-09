import ProfileCard, { ProfileCardProps } from './ProfileCard'

export interface ProfileListProps {
  sectionName: string
  profileCards: ProfileCardProps[]
  aaPrefix?: string
}

const ProfileList = ({
  sectionName,
  profileCards,
  aaPrefix,
}: ProfileListProps) => {
  return (
    <div className="max-w-3xl">
      <h2 className="mb-4 mt-8 text-3xl font-bold">{sectionName}</h2>
      {profileCards.map((card: ProfileCardProps) => {
        return (
          <ProfileCard
            key={card.cardId}
            cardId={card.cardId}
            cardName={card.cardName}
            cardHref={card.cardHref}
            description={card.description}
            prefixIcon={card.prefixIcon}
            aaPrefix={aaPrefix}
          />
        )
      })}
      <div className="border-t-2 border-y-gray-100" />
    </div>
  )
}

export default ProfileList
