import { Division } from '../lib/graphql-utils'
import TextDivision from './TextDivision'
import { getIcon } from '../components/MaterialIcon'

interface TextSectionProps {
  sectionName?: string
  divisions: Division[]
  aaPrefix: string
  icon?: string
}

const TextSection = ({
  sectionName,
  divisions,
  aaPrefix,
  icon,
}: TextSectionProps) => {
  const divisionsJsx = (
    <>
      {divisions.map((division: Division, index) => {
        return (
          <TextDivision
            key={index}
            divisionType={division.divisionType}
            divisionPartitions={division.divisionPartitions}
            subDivisions={division.subDivisions}
            aaPrefix={aaPrefix}
          />
        )
      })}
    </>
  )
  const divisionsWithOrWithoutIconJsx =
    icon === undefined || icon.trim() === '' ? (
      <div>{divisionsJsx}</div>
    ) : (
      <div className="grid grid-flow-col grid-cols-[44px-1fr] grid-rows-1 gap-3">
        <div className="justify-self-left col-start-1 row-start-1 text-lg">
          {getIcon(icon)}
        </div>
        <div className="col-start-2 row-start-1">{divisionsJsx}</div>
      </div>
    )
  return (
    <>
      {sectionName ? (
        <h2 className="pb-4 font-display text-32px font-bold text-gray-darker md:text-36px">
          {sectionName}
        </h2>
      ) : (
        ''
      )}
      {divisionsWithOrWithoutIconJsx}
    </>
  )
}

export default TextSection
