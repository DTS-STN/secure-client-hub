import { Partition, Division } from '../lib/graphql-utils'
import TextPartition from './TextPartition'

export interface TextDivisionProps {
  divisionType: string
  divisionPartitions?: Partition[]
  subDivisions?: Division[]
  aaPrefix: string
}

const TextDivision = ({
  divisionType,
  divisionPartitions = [],
  subDivisions = [],
  aaPrefix,
}: TextDivisionProps) => {
  const divisionContentJsx =
    divisionType === 'list'
      ? subDivisions.map((listItem: Division, index) => {
          return (
            <TextDivision
              key={index}
              divisionType={listItem.divisionType}
              divisionPartitions={listItem.divisionPartitions}
              aaPrefix={aaPrefix}
            />
          )
        })
      : divisionPartitions.map((partition: Partition, index) => {
          return (
            <TextPartition
              key={index}
              id={partition.id}
              type={partition.type}
              text={partition.text}
              css={partition.css}
              link={partition.link}
              assistiveText={partition.assistiveText}
              aaPrefix={aaPrefix}
            />
          )
        })

  const divisionJsx =
    divisionType === 'paragraph' ? (
      <p className="pb-4 text-xl text-gray-darker">{divisionContentJsx}</p>
    ) : divisionType === 'div' ? (
      <div className="pb-4 text-xl text-gray-darker">{divisionContentJsx}</div>
    ) : divisionType === 'list' ? (
      <ul className="list-disc pb-4 pl-4">{divisionContentJsx}</ul>
    ) : divisionType === 'list-item' ? (
      <li>{divisionContentJsx}</li>
    ) : (
      <></>
    )

  return <>{divisionJsx}</>
}
export default TextDivision
