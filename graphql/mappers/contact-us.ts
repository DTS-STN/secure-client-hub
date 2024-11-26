import { cachified } from 'cachified'
import { lruCache as cache, defaultTtl as ttl } from '../../lib/cache-utils'

interface GetSchContactUsV1 {
  data: {
    schPageV1ByPath: {
      item: {
        _path: string
        scPageNameEn: string
        scPageNameFr: string
        scTitleEn: string
        scTitleFr: string
        scBreadcrumbParentPages: Array<{
          scId: string
          scTitleEn: string
          scTitleFr: string
          scPageNameEn: string
          scPageNameFr: string
        }>
        scFragments: Array<{
          scId: string
          scContentEn?: {
            json: Array<{
              nodeType: string
              content: Array<{
                nodeType: string
                value: string
              }>
            }>
          }
          scContentFr?: {
            json: Array<{
              nodeType: string
              content: Array<{
                nodeType: string
                value: string
              }>
            }>
          }
          scLinkTextEn?: string
          scLinkTextFr?: string
          scDescriptionEn?: {
            json?: Array<{
              nodeType: string
              content: Array<{
                nodeType: string
                value: string
              }>
            }>
          }
          scDescriptionFr?: {
            json?: Array<{
              nodeType: string
              content: Array<{
                nodeType: string
                value: string
              }>
            }>
          }
          scLinkTextAssistiveEn?: string
          scLinkTextAssistiveFr?: string
          scDestinationURLEn?: string
          scDestinationURLFr?: string
          schBetaPopUp?: boolean
        }>
      }
    }
  }
}

const getCachedContent = () => {
  return cachified({
    key: `content-contact-landing-page`,
    cache,
    getFreshValue: async () => {
      const response = await fetch(
        `${process.env.AEM_GRAPHQL_ENDPOINT}getSchContactUsV1`,
      )
      if (!response.ok) return null
      return (await response.json()) as GetSchContactUsV1
    },
    ttl,
  })
}

/**
 * Awaited: Recursively unwraps the "awaited type" of a type.
 * ReturnType: Obtain the return type of a function type
 */
export type GetContactUsContentReturnType = Awaited<
  ReturnType<typeof getContactUsContent>
>

export async function getContactUsContent() {
  const response = await getCachedContent()

  const introFragment = findFragmentByScId(response, 'contact-us-intro')
  const eiContactFragment = findFragmentByScId(response, 'ei-contact-us')
  const oasContactFragment = findFragmentByScId(response, 'oas-contact-us')
  const cppContactFragment = findFragmentByScId(response, 'cpp-contact-us')
  const sinContactFragment = findFragmentByScId(response, 'sin-contact-us')
  const cdcpContactFragment = findFragmentByScId(response, 'cdcp-contact-us')

  const mappedSecurity = {
    en: {
      breadcrumb:
        response?.data.schPageV1ByPath.item.scBreadcrumbParentPages.map(
          (level) => {
            return {
              link: level.scPageNameEn,
              text: level.scTitleEn,
            }
          },
        ),
      pageName: response?.data.schPageV1ByPath.item.scPageNameEn,
      heading: response?.data.schPageV1ByPath.item.scTitleEn,
      subHeading: introFragment?.scContentEn?.json[0].content[0].value,
      links: [
        {
          linkId: cdcpContactFragment?.scId,
          linkTitle: cdcpContactFragment?.scLinkTextEn,
          linkAssistiveTitle: cdcpContactFragment?.scLinkTextAssistiveEn,
          linkDestination: cdcpContactFragment?.scDestinationURLEn,
          linkDescription: cdcpContactFragment?.scDescriptionEn?.json
            ? cdcpContactFragment.scDescriptionEn.json[0].content[0].value
            : '',
          schBetaPopup: cdcpContactFragment?.schBetaPopUp,
        },
        {
          linkId: eiContactFragment?.scId,
          linkTitle: eiContactFragment?.scLinkTextEn,
          linkAssistiveTitle: eiContactFragment?.scLinkTextAssistiveEn,
          linkDestination: eiContactFragment?.scDestinationURLEn,
          linkDescription: eiContactFragment?.scDescriptionEn?.json
            ? eiContactFragment.scDescriptionEn.json[0].content[0].value
            : '',
          schBetaPopup: eiContactFragment?.schBetaPopUp,
        },
        {
          linkId: cppContactFragment?.scId,
          linkTitle: cppContactFragment?.scLinkTextEn,
          linkAssistiveTitle: cppContactFragment?.scLinkTextAssistiveEn,
          linkDestination: cppContactFragment?.scDestinationURLEn,
          linkDescription: cppContactFragment?.scDescriptionEn?.json
            ? cppContactFragment.scDescriptionEn.json[0].content[0].value
            : '',
          schBetaPopup: cppContactFragment?.schBetaPopUp,
        },
        {
          linkId: oasContactFragment?.scId,
          linkTitle: oasContactFragment?.scLinkTextEn,
          linkAssistiveTitle: oasContactFragment?.scLinkTextAssistiveEn,
          linkDestination: oasContactFragment?.scDestinationURLEn,
          linkDescription: oasContactFragment?.scDescriptionEn?.json
            ? oasContactFragment.scDescriptionEn.json[0].content[0].value
            : '',
          schBetaPopup: oasContactFragment?.schBetaPopUp,
        },
        {
          linkId: sinContactFragment?.scId,
          linkTitle: sinContactFragment?.scLinkTextEn,
          linkAssistiveTitle: sinContactFragment?.scLinkTextAssistiveEn,
          linkDestination: sinContactFragment?.scDestinationURLEn,
          linkDescription: sinContactFragment?.scDescriptionEn?.json
            ? sinContactFragment.scDescriptionEn.json[0].content[0].value
            : '',
          schBetaPopup: sinContactFragment?.schBetaPopUp,
        },
      ],
    },
    fr: {
      breadcrumb:
        response?.data.schPageV1ByPath.item.scBreadcrumbParentPages.map(
          (level) => {
            return {
              link: level.scPageNameFr,
              text: level.scTitleFr,
            }
          },
        ),
      pageName: response?.data.schPageV1ByPath.item.scPageNameFr,
      heading: response?.data.schPageV1ByPath.item.scTitleFr,
      subHeading: introFragment?.scContentFr?.json[0].content[0].value,
      links: [
        {
          linkId: cdcpContactFragment?.scId,
          linkTitle: cdcpContactFragment?.scLinkTextFr,
          linkAssistiveTitle: cdcpContactFragment?.scLinkTextAssistiveFr,
          linkDestination: cdcpContactFragment?.scDestinationURLFr,
          linkDescription: cdcpContactFragment?.scDescriptionFr?.json
            ? cdcpContactFragment.scDescriptionFr.json[0].content[0].value
            : '',
          schBetaPopup: cdcpContactFragment?.schBetaPopUp,
        },
        {
          linkId: eiContactFragment?.scId,
          linkTitle: eiContactFragment?.scLinkTextFr,
          linkAssistiveTitle: eiContactFragment?.scLinkTextAssistiveFr,
          linkDestination: eiContactFragment?.scDestinationURLFr,
          linkDescription: eiContactFragment?.scDescriptionFr?.json
            ? eiContactFragment.scDescriptionFr.json[0].content[0].value
            : '',
          schBetaPopup: eiContactFragment?.schBetaPopUp,
        },
        {
          linkId: cppContactFragment?.scId,
          linkTitle: cppContactFragment?.scLinkTextFr,
          linkAssistiveTitle: cppContactFragment?.scLinkTextAssistiveFr,
          linkDestination: cppContactFragment?.scDestinationURLFr,
          linkDescription: cppContactFragment?.scDescriptionFr?.json
            ? cppContactFragment.scDescriptionFr.json[0].content[0].value
            : '',
          schBetaPopup: cppContactFragment?.schBetaPopUp,
        },
        {
          linkId: oasContactFragment?.scId,
          linkTitle: oasContactFragment?.scLinkTextFr,
          linkAssistiveTitle: oasContactFragment?.scLinkTextAssistiveFr,
          linkDestination: oasContactFragment?.scDestinationURLFr,
          linkDescription: oasContactFragment?.scDescriptionFr?.json
            ? oasContactFragment.scDescriptionFr.json[0].content[0].value
            : '',
          schBetaPopup: oasContactFragment?.schBetaPopUp,
        },
        {
          linkId: sinContactFragment?.scId,
          linkTitle: sinContactFragment?.scLinkTextFr,
          linkAssistiveTitle: sinContactFragment?.scLinkTextAssistiveFr,
          linkDestination: sinContactFragment?.scDestinationURLFr,
          linkDescription: sinContactFragment?.scDescriptionFr?.json
            ? sinContactFragment.scDescriptionFr.json[0].content[0].value
            : '',
          schBetaPopup: sinContactFragment?.schBetaPopUp,
        },
      ],
    },
  }
  return mappedSecurity
}

const findFragmentByScId = (res: GetSchContactUsV1 | null, id: string) => {
  return (
    res?.data.schPageV1ByPath.item.scFragments.find(
      ({ scId }) => scId === id,
    ) ?? null
  )
}
