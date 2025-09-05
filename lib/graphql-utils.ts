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
    schURLType?: string | null
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
  id?: string
  type: string
  text: string
  css?: string
  link?: string
  assistiveText?: string
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
            const destinationUrl =
              language === 'en'
                ? listItem.scDestinationURLEn
                : language === 'fr'
                  ? listItem.scDestinationURLFr
                  : ''
            const linkText =
              language == 'en'
                ? listItem.scLinkTextEn
                : language === 'fr'
                  ? listItem.scLinkTextFr
                  : ''
            const linkAssistiveText =
              language == 'en'
                ? listItem.scLinkTextAssistiveEn
                : language === 'fr'
                  ? listItem.scLinkTextAssistiveFr
                  : ''
            return {
              divisionType: 'list-item',
              divisionPartitions: [
                {
                  id: listItem.scId,
                  type: 'link',
                  text: linkText,
                  link: buildLink(
                    listItem.schURLType === null ? '' : listItem.schURLType,
                    '/' + destinationUrl,
                  ),
                  assistiveText: linkAssistiveText,
                },
              ],
            }
          }),
        },
      ]
    : []
}
