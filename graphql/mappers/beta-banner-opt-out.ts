import { buildLink } from '../../lib/links'
import { cachified } from 'cachified'
import { lruCache as cache, defaultTtl as ttl } from '../../lib/cache-utils'

interface GetSchBetaBannerOptOutV1 {
  data: {
    schContentV1ByPath: {
      item: {
        _path: string
        scId: string
        scContentEn: {
          json: Array<{
            nodeType: string
            content: Array<{
              nodeType: string
              value: string
              format?: {
                variants: Array<string>
              }
            }>
          }>
        }
        scContentFr: {
          json: Array<{
            nodeType: string
            content: Array<{
              nodeType: string
              value: string
              format?: {
                variants: Array<string>
              }
            }>
          }>
        }
        scFragments: Array<{
          scId: string
          scDestinationURLEn?: string
          scDestinationURLFr?: string
          schURLType?: string
          scIconCSS?: string
          scLinkTextEn?: string
          scLinkTextFr?: string
          scLinkTextAssistiveEn?: string
          scLinkTextAssistiveFr?: string
          scHeadingEn?: string
          scHeadingFr?: string
          scContentEn?: {
            markdown: string
          }
          scContentFr?: {
            markdown: string
          }
        }>
      }
    }
  }
}

const getCachedBannerContent = () => {
  return cachified({
    key: `content-opt-out-banner`,
    cache,
    getFreshValue: async () => {
      const response = await fetch(
        `${process.env.AEM_GRAPHQL_ENDPOINT}getSchBetaBannerOptOutV1`
      )

      if (!response.ok) {
        return null
      }

      return (await response.json()) as GetSchBetaBannerOptOutV1
    },
    ttl,
  })
}

interface GetSchDictionaryV1 {
  data: {
    dictionaryV1List: {
      items: Array<{
        _path: string
        scId: string
        scTermEn: string
        scTermFr: string
      }>
    }
  }
}

const getCachedDictionaryContent = () => {
  return cachified({
    key: `content-aem-dictionary`,
    cache,
    getFreshValue: async () => {
      const response = await fetch(
        `${process.env.AEM_GRAPHQL_ENDPOINT}getSchDictionaryV1`
      )
      if (!response.ok) return null
      return (await response.json()) as GetSchDictionaryV1
    },
    ttl,
  })
}

export async function getBetaBannerContent() {
  const resOptOut = await getCachedBannerContent()
  const resDictionary = await getCachedDictionaryContent()
  const resOptOutContent = resOptOut?.data.schContentV1ByPath.item
  const resDictionaryContent = resDictionary?.data.dictionaryV1List.items

  const mappedBanner = {
    en: {
      bannerBoldText: resOptOutContent?.scContentEn.json[0].content[0].value,
      bannerText: resOptOutContent?.scContentEn.json[0].content[1].value,
      bannerLink: resOptOutContent?.scFragments[2].scLinkTextEn,
      bannerLinkHref: resOptOutContent?.scFragments[2].scDestinationURLEn,
      bannerButtonText: resOptOutContent?.scFragments[0].scLinkTextEn,
      bannerButtonExternalText: resDictionaryContent?.find(
        (entry) => entry.scId === 'opens-in-a-new-tab'
      )?.scTermEn,
      bannerButtonLink:
        buildLink(
          resOptOutContent?.scFragments[0].schURLType,
          resOptOutContent?.scFragments[0].scDestinationURLEn
        ) || '/',
      id: resOptOutContent?.scFragments[1].scId,
      feedbackId: resOptOutContent?.scFragments[1].scId,
      bannerSummaryTitle: resOptOutContent?.scFragments[1].scHeadingEn,
      bannerSummaryContent:
        resOptOutContent?.scFragments[1].scContentEn?.markdown,
      icon: resOptOutContent?.scFragments[2].scIconCSS,
    },
    fr: {
      bannerBoldText: resOptOutContent?.scContentFr.json[0].content[0].value,
      bannerText: resOptOutContent?.scContentFr.json[0].content[1].value,
      bannerLink: resOptOutContent?.scFragments[2].scLinkTextFr,
      bannerLinkHref: resOptOutContent?.scFragments[2].scDestinationURLFr,
      bannerButtonText: resOptOutContent?.scFragments[0].scLinkTextFr,
      bannerButtonExternalText: resDictionaryContent?.find(
        (entry) => entry.scId === 'opens-in-a-new-tab'
      )?.scTermFr,
      bannerButtonLink:
        buildLink(
          resOptOutContent?.scFragments[0].schURLType,
          resOptOutContent?.scFragments[0].scDestinationURLFr
        ) || '/',
      id: resOptOutContent?.scFragments[1].scId,
      bannerSummaryTitle: resOptOutContent?.scFragments[1].scHeadingFr,
      bannerSummaryContent:
        resOptOutContent?.scFragments[1].scContentFr?.markdown,
      icon: resOptOutContent?.scFragments[2].scIconCSS,
    },
  }

  return mappedBanner
}
