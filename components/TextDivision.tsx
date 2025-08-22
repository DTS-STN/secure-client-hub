import { Partition } from '../lib/graphql-utils'
import TextPartition from './TextPartition'

export interface TextDivisionProps {
  divisionType: string
  divisionPartitions?: Partition[]
  aaPrefix: string
}

const TextDivision = ({
  divisionType,
  divisionPartitions = [],
  aaPrefix,
}: TextDivisionProps) => {
  const divisionContentJsx = divisionPartitions.map(
    (partition: Partition, index) => {
      return (
        <TextPartition
          key={index}
          type={partition.type}
          text={partition.text}
          css={partition.css}
          link={partition.link}
          aaPrefix={aaPrefix}
        />
      )
    },
  )

  const divisionJsx =
    divisionType === 'paragraph' ? (
      <p className="pb-2">{divisionContentJsx}</p>
    ) : divisionType === 'div' ? (
      <div className="pb-2">{divisionContentJsx}</div>
    ) : (
      <></>
    )

  return <>{divisionJsx}</>
}
export default TextDivision
