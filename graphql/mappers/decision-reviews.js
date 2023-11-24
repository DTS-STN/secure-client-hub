import { buildLink } from '../../lib/links'

export async function getDecisionReviewsContent() {
  const query = await fetch(
    `${process.env.AEM_GRAPHQL_ENDPOINT}getSchDecisionReviewsV1`
  )
  const response = await query.json()

  const appealFragment = findFragmentByScId(
    response,
    'decision-review-appeal-to-sst'
  )

  const askFragment = findFragmentByScId(
    response,
    'decision-review-ask-service-canada'
  )
  const mappedDecisionReviews = {
    en: {
      id: 'request-review-decision',
      breadcrumb:
        response.data.schPageV1ByPath.item.scBreadcrumbParentPages.map(
          (level) => {
            return {
              link: level.scPageNameEn,
              text: level.scTitleEn,
              id: level.scId,
            }
          }
        ),
      pageName: response.data.schPageV1ByPath.item.scPageNameEn,
      heading: response.data.schPageV1ByPath.item.scTitleEn,
      content: [
        {
          content: askFragment.scContentEn.markdown,
          button: {
            id: askFragment.scFragments[0].scId,
            text: askFragment.scFragments[0].scLinkTextEn,
            areaLabel: askFragment.scFragments[0].scLinkTextAssistiveEn,
            link: buildLink(
              askFragment.scFragments[0].schURLType,
              askFragment.scFragments[0].scDestinationURLEn
            ),
            betaPopUp: askFragment.scFragments[0].schBetaPopUp,
          },
        },
        {
          content: appealFragment.scContentEn.markdown,
          button: {
            id: appealFragment.scFragments[0].scId,
            text: appealFragment.scFragments[0].scLinkTextEn,
            areaLabel: appealFragment.scFragments[0].scLinkTextAssistiveEn,
            link: buildLink(
              appealFragment.scFragments[0].schURLType,
              appealFragment.scFragments[0].scDestinationURLEn
            ),
            betaPopUp: askFragment.scFragments[0].schBetaPopUp,
          },
        },
      ],
    },
    fr: {
      id: 'demande-revision',
      breadcrumb:
        response.data.schPageV1ByPath.item.scBreadcrumbParentPages.map(
          (level) => {
            return {
              link: level.scPageNameFr,
              text: level.scTitleFr,
              id: level.scId,
            }
          }
        ),
      pageName: response.data.schPageV1ByPath.item.scPageNameFr,
      heading: response.data.schPageV1ByPath.item.scTitleFr,
      content: [
        {
          content: askFragment.scContentFr.markdown,
          button: {
            id: askFragment.scFragments[0].scId,
            text: askFragment.scFragments[0].scLinkTextFr,
            areaLabel: askFragment.scFragments[0].scLinkTextAssistiveFr,
            link: buildLink(
              askFragment.scFragments[0].schURLType,
              askFragment.scFragments[0].scDestinationURLFr
            ),
            betaPopUp: askFragment.scFragments[0].schBetaPopUp,
          },
        },
        {
          content: appealFragment.scContentFr.markdown,
          button: {
            id: appealFragment.scFragments[0].scId,
            text: appealFragment.scFragments[0].scLinkTextFr,
            areaLabel: appealFragment.scFragments[0].scLinkTextAssistiveFr,
            link: buildLink(
              appealFragment.scFragments[0].schURLType,
              appealFragment.scFragments[0].scDestinationURLFr
            ),
            betaPopUp: askFragment.scFragments[0].schBetaPopUp,
          },
        },
      ],
    },
  }
  return mappedDecisionReviews
}

const findFragmentByScId = (res, id) => {
  return res.data.schPageV1ByPath.item.scFragments.find(
    (element) => element.scId === id
  )
}
