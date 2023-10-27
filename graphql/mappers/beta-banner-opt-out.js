import clientQuery from '../client'
import { buildLink } from '../../lib/links'

export async function getBetaBannerContent() {
  const queryOptOut = require('../queries/beta-banner-opt-out.graphql')
  const queryDictionary = require('../queries/dictionary.graphql')
  const resOptOut = await clientQuery(queryOptOut)
  const resDictionary = await clientQuery(queryDictionary)

  const resOptOutContent = resOptOut.data.schContentV1ByPath.item || {}
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
        buildLink(
          resOptOutContent.scFragments[1].schURLType,
          resOptOutContent.scFragments[1].scDestinationURLEn
        ) || '/',
      icon: resOptOutContent.scFragments[0].scIconCSS,
      id: resOptOutContent.scFragments[0].scId,
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
        buildLink(
          resOptOutContent.scFragments[1].schURLType,
          resOptOutContent.scFragments[1].scDestinationURLFr
        ) || '/',
      icon: resOptOutContent.scFragments[0].scIconCSS,
      id: resOptOutContent.scFragments[0].scId,
    },
  }

  return mappedBanner
}
