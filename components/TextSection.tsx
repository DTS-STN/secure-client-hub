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
      <div className="grid gap-4 md:grid-cols-12">
        <div className="col-span-1 col-start-1 row-start-1 justify-self-center text-xl">
          {getIcon(icon)}
        </div>
        <div className="col-span-12 col-start-1 row-start-2 md:col-span-11 md:col-start-2 md:row-start-1">
          {divisionsJsx}
        </div>
      </div>
    )
  return (
    <>
      {sectionName ? <h2>{sectionName}</h2> : ''}
      {divisionsWithOrWithoutIconJsx}
    </>
  )
}

export default TextSection
