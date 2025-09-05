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

export interface GetSchPageFragment {
  _path: string
  scId: string
  scTitleEn?: string
  scTitleFr?: string
  scHeadingEn?: string | null
  scHeadingFr?: string | null
  scContentEn?: GetSchTextFragmentContent
  scContentFr?: GetSchTextFragmentContent
  scIconCSS?: string | null
  scItems?: Array<{
    scId: string
    scLinkTextEn: string
    scLinkTextFr: string
    scLinkTextAssistiveEn?: string
    scLinkTextAssistiveFr?: string
    scDestinationURLEn: string
    scDestinationURLFr: string
    scURLType?: string
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
  subDivisions?: Division[]
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

export function getLinksList(
  fragment: GetSchPageFragment | null,
  language: string,
): Division[] {
  return fragment
    ? [
        {
          divisionType: 'paragraph',
          divisionPartitions: [
            {
              type: 'text',
              text:
                language === 'en'
                  ? (fragment.scTitleEn as string)
                  : (fragment.scTitleFr as string),
            },
          ],
        },
        {
          divisionType: 'list',
          subDivisions: fragment.scItems?.map((listItem) => {
            return {
              divisionType: 'list-item',
              divisionPartitions: [
                {
                  id: listItem.scId,
                  type: 'link',
                  text:
                    language === 'en'
                      ? listItem.scLinkTextEn
                      : listItem.scLinkTextFr,
                  link: buildLink(
                    listItem.scURLType ?? undefined,
                    '/' + language === 'en'
                      ? listItem.scDestinationURLEn
                      : listItem.scDestinationURLFr,
                  ),
                },
              ],
            }
          }),
        },
      ]
    : []
}
