import { buildLink } from './links'

export interface GetSchTextFragmentContent {
  json: Array<{
    nodeType: string
    content: Array<{
      nodeType: string
      value: string
      format?: {
        variants: Array<string>
      }
      data?: {
        href: string
      }
    }>
  }>
}

export interface Section {
  fragmentHeading?: string | null
  divisions?: Division[]
  icon?: string | null
}

export interface Division {
  divisionType: string
  divisionPartitions?: Partition[]
}

export interface Partition {
  type: string
  text: string
  css?: string
  link?: string
}

export async function getTextFragmentContent(
  fragmentContent: GetSchTextFragmentContent | undefined,
): Promise<Division[] | undefined> {
  return fragmentContent
    ? fragmentContent.json.map((division) => {
        return {
          divisionType: division.nodeType,
          divisionPartitions: division.content.map((partition) => {
            return {
              type: partition.nodeType,
              text: partition.value,
              css: partition.format?.variants
                ? partition.format.variants.join(' ')
                : '',
              link: buildLink(undefined, '/' + partition.data?.href),
            }
          }),
        }
      })
    : undefined
}
