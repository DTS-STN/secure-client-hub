import { buildAemUri, buildLink } from '../../lib/links'
import { cachified } from 'cachified'
import { lruCache as cache, defaultTtl as ttl } from '../../lib/cache-utils'

interface GetSchDecisionReviewsV2 {
  data: {
    schPageV1List: {
      items: Array<{
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
          scContentEn: {
            markdown: string
          }
          scContentFr: {
            markdown: string
          }
          scFragments: Array<{
            scId: string
            scLinkTextEn: string
            scLinkTextFr: string
            scLinkTextAssistiveEn: string
            scLinkTextAssistiveFr: string
            scDestinationURLEn: string
            scDestinationURLFr: string
            schBetaPopUp: boolean
            schURLType?: string
          }>
        }>
      }>
    }
  }
}

const getCachedContent = () => {
  return cachified({
    key: `content-decision-reviews`,
    cache,
    getFreshValue: async (): Promise<GetSchDecisionReviewsV2 | null> => {
      const targetUri = buildAemUri('getSchDecisionReviewsV2')
      const response = await fetch(targetUri)
      if (!response.ok) return null
      return await response.json()
    },
    ttl,
  })
}

export async function getDecisionReviewsContent(): Promise<DecisionReviewContent> {
  const response = await getCachedContent()

  const askFragment = findFragmentByScId(
    response,
    'decision-review-ask-service-canada',
  )

  const appealFragment = findFragmentByScId(
    response,
    'decision-review-appeal-to-sst',
  )

  const mappedDecisionReviews = {
    en: {
      id: 'request-review-decision',
      breadcrumb:
        response?.data.schPageV1List.items[0].scBreadcrumbParentPages.map(
          (level) => {
            return {
              link: level.scPageNameEn,
              text: level.scTitleEn,
              id: level.scId,
            }
          },
        ),
      pageName: response?.data.schPageV1List.items[0].scPageNameEn,
      heading: response?.data.schPageV1List.items[0].scTitleEn,
      content: [
        {
          content: askFragment?.scContentEn.markdown,
          button: {
            id: askFragment?.scFragments[0].scId,
            text: askFragment?.scFragments[0].scLinkTextEn,
            areaLabel: askFragment?.scFragments[0].scLinkTextAssistiveEn,
            link: buildLink(
              askFragment?.scFragments[0].schURLType,
              askFragment?.scFragments[0].scDestinationURLEn ?? '',
            ),
            betaPopUp: askFragment?.scFragments[0].schBetaPopUp,
          },
        },
        {
          content: appealFragment?.scContentEn.markdown,
          button: {
            id: appealFragment?.scFragments[0].scId,
            text: appealFragment?.scFragments[0].scLinkTextEn,
            areaLabel: appealFragment?.scFragments[0].scLinkTextAssistiveEn,
            link: buildLink(
              appealFragment?.scFragments[0].schURLType,
              appealFragment?.scFragments[0].scDestinationURLEn ?? '',
            ),
            betaPopUp: appealFragment?.scFragments[0].schBetaPopUp,
          },
        },
      ],
    },
    fr: {
      id: 'demande-revision',
      breadcrumb:
        response?.data.schPageV1List.items[0].scBreadcrumbParentPages.map(
          (level) => {
            return {
              link: level.scPageNameFr,
              text: level.scTitleFr,
              id: level.scId,
            }
          },
        ),
      pageName: response?.data.schPageV1List.items[0].scPageNameFr,
      heading: response?.data.schPageV1List.items[0].scTitleFr,
      content: [
        {
          content: askFragment?.scContentFr.markdown,
          button: {
            id: askFragment?.scFragments[0].scId,
            text: askFragment?.scFragments[0].scLinkTextFr,
            areaLabel: askFragment?.scFragments[0].scLinkTextAssistiveFr,
            link: buildLink(
              askFragment?.scFragments[0].schURLType,
              askFragment?.scFragments[0].scDestinationURLFr ?? '',
            ),
            betaPopUp: askFragment?.scFragments[0].schBetaPopUp,
          },
        },
        {
          content: appealFragment?.scContentFr.markdown,
          button: {
            id: appealFragment?.scFragments[0].scId,
            text: appealFragment?.scFragments[0].scLinkTextFr,
            areaLabel: appealFragment?.scFragments[0].scLinkTextAssistiveFr,
            link: buildLink(
              appealFragment?.scFragments[0].schURLType,
              appealFragment?.scFragments[0].scDestinationURLFr ?? '',
            ),
            betaPopUp: appealFragment?.scFragments[0].schBetaPopUp,
          },
        },
      ],
    },
  }
  return mappedDecisionReviews
}

const findFragmentByScId = (
  res: GetSchDecisionReviewsV2 | null,
  id: string,
) => {
  return (
    res?.data.schPageV1List.items[0].scFragments.find(
      ({ scId }) => scId === id,
    ) ?? null
  )
}

// TODO: Figure out which of these actually need to be optional
export interface DecisionReviewContent {
  err?: string
  en?: {
    id: string
    breadcrumb: { link: string; text: string; id: string }[] | undefined
    pageName: string | undefined
    heading: string | undefined
    content: {
      content: string | undefined
      button: {
        id: string | undefined
        text: string | undefined
        areaLabel: string | undefined
        link: string | undefined
        betaPopUp: boolean | undefined
      }
    }[]
  }
  fr?: {
    id: string
    breadcrumb: { link: string; text: string; id: string }[] | undefined
    pageName: string | undefined
    heading: string | undefined
    content: {
      content: string | undefined
      button: {
        id: string | undefined
        text: string | undefined
        areaLabel: string | undefined
        link: string | undefined
        betaPopUp: boolean | undefined
      }
    }[]
  }
}
