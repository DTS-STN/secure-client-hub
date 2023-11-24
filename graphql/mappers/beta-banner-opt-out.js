import { buildLink } from '../../lib/links'

export async function getBetaBannerContent() {
  const queryOptOut = await fetch(
    `${process.env.AEM_GRAPHQL_ENDPOINT}getSchBetaBannerOptOutV1`,
    { next: { revalidate: 1200 } }
  )
  const queryDictionary = await fetch(
    `${process.env.AEM_GRAPHQL_ENDPOINT}getSchDictionaryV1`
  )
  const resOptOut = await queryOptOut.json()
  const resDictionary = await queryDictionary.json()
  const resOptOutContent = resOptOut.data.schContentV1ByPath.item || {}
  const resDictionaryContent = resDictionary.data.dictionaryV1List.items || {}

  const mappedBanner = {
    en: {
      bannerBoldText: resOptOutContent.scContentEn.json[0].content[0].value,
      bannerText: resOptOutContent.scContentEn.json[0].content[1].value,
      bannerLink: resOptOutContent.scFragments[2].scLinkTextEn,
      bannerLinkHref: resOptOutContent.scFragments[2].scDestinationURLEn,
      bannerButtonText: resOptOutContent.scFragments[0].scLinkTextEn,
      bannerButtonExternalText: resDictionaryContent.find(
        (entry) => entry.scId === 'opens-in-a-new-tab'
      ).scTermEn,
      bannerButtonLink:
        buildLink(
          resOptOutContent.scFragments[0].schURLType,
          resOptOutContent.scFragments[0].scDestinationURLEn
        ) || '/',
      id: resOptOutContent.scFragments[1].scId,
      feedbackId: resOptOutContent.scFragments[1].scId,
      bannerSummaryTitle: resOptOutContent.scFragments[1].scHeadingEn,
      bannerSummaryContent:
        resOptOutContent.scFragments[1].scContentEn.markdown,
      icon: resOptOutContent.scFragments[2].scIconCSS,
    },
    fr: {
      bannerBoldText: resOptOutContent.scContentFr.json[0].content[0].value,
      bannerText: resOptOutContent.scContentFr.json[0].content[1].value,
      bannerLink: resOptOutContent.scFragments[2].scLinkTextFr,
      bannerLinkHref: resOptOutContent.scFragments[2].scDestinationURLFr,
      bannerButtonText: resOptOutContent.scFragments[0].scLinkTextFr,
      bannerButtonExternalText: resDictionaryContent.find(
        (entry) => entry.scId === 'opens-in-a-new-tab'
      ).scTermFr,
      bannerButtonLink:
        buildLink(
          resOptOutContent.scFragments[0].schURLType,
          resOptOutContent.scFragments[0].scDestinationURLFr
        ) || '/',
      id: resOptOutContent.scFragments[1].scId,
      bannerSummaryTitle: resOptOutContent.scFragments[1].scHeadingFr,
      bannerSummaryContent:
        resOptOutContent.scFragments[1].scContentFr.markdown,
      icon: resOptOutContent.scFragments[2].scIconCSS,
    },
  }

  return mappedBanner
}
