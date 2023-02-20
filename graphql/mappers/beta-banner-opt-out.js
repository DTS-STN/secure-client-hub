import clientQuery from '../client'

export async function getBetaBannerContent() {
  const queryOptOut = require('../queries/beta-banner-opt-out.graphql')
  const queryDictionary = require('../queries/dictionary.graphql')
  const resOptOut = await clientQuery(queryOptOut)
  const resDictionary = await clientQuery(queryDictionary)

  const resOptOutContent = resOptOut.data.schContentv1ByPath.item || {}
  const resDictionaryContent = resDictionary.data.dictionaryV1List.items || {}

  const mappedBanner = {
    en: {
      bannerBoldText: resOptOutContent.scContentEn.json[0].content[0].value,
      bannerText: resOptOutContent.scContentEn.json[0].content[1].value,
      bannerLink: resOptOutContent.scFragments[0].scLinkTextEn,
      bannerLinkHref: resOptOutContent.scFragments[0].scDestinationURLEn,
      bannerButtonText: resOptOutContent.scFragments[1].scLinkTextEn,
      bannerButtonExternalText: resDictionaryContent.find(
        (entry) => entry.scId === 'opens-in-a-new-tab'
      ).scTermEn,
      bannerButtonLink:
        resOptOutContent.scFragments[1].scDestinationURLEn || '/',
      icon: resOptOutContent.scFragments[0].scIconCSS,
    },
    fr: {
      bannerBoldText: resOptOutContent.scContentFr.json[0].content[0].value,
      bannerText: resOptOutContent.scContentFr.json[0].content[1].value,
      bannerLink: resOptOutContent.scFragments[0].scLinkTextFr,
      bannerLinkHref: resOptOutContent.scFragments[0].scDestinationURLFr,
      bannerButtonText: resOptOutContent.scFragments[1].scLinkTextFr,
      bannerButtonExternalText: resDictionaryContent.find(
        (entry) => entry.scId === 'opens-in-a-new-tab'
      ).scTermFr,
      bannerButtonLink:
        resOptOutContent.scFragments[1].scDestinationURLFr || '/',
      icon: resOptOutContent.scFragments[0].scIconCSS,
    },
  }

  return mappedBanner
}
