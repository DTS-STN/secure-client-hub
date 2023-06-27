import clientQuery from '../client'

export async function getPrivacyConditionContent() {
  const query = require('../queries/privacy-notice-terms-conditions.graphql')
  const response = await clientQuery(query)

  const alertFragment = findFragmentByScId(
    response,
    'privacy-terms-conditions-alert'
  )

  const privacyTermsConditionsFragment = findFragmentByScId(
    response,
    'privacy-terms-conditions-content'
  )

  const mappedPrivacyConditions = {
    en: {
      id: response.data.schPagev1ByPath.item.scId,
      breadcrumb:
        response.data.schPagev1ByPath.item.scBreadcrumbParentPages.map(
          (level) => {
            return {
              link: level.scPageNameEn,
              text: level.scTitleEn,
              id: level.scId,
            }
          }
        ),
      pageName: response.data.schPagev1ByPath.item.scPageNameEn,
      heading: response.data.schPagev1ByPath.item.scTitleEn,
      alert: {
        type: 'info',
        text: alertFragment.scContentEn.markdown,
      },
      content: privacyTermsConditionsFragment.scContentEn.markdown,
    },
    fr: {
      id: response.data.schPagev1ByPath.item.scId,
      breadcrumb:
        response.data.schPagev1ByPath.item.scBreadcrumbParentPages.map(
          (level) => {
            return {
              link: level.scPageNameFr,
              text: level.scTitleFr,
              id: level.scId,
            }
          }
        ),
      pageName: response.data.schPagev1ByPath.item.scPageNameFr,
      heading: response.data.schPagev1ByPath.item.scTitleFr,
      alert: {
        type: 'info',
        text: alertFragment.scContentEn.markdown,
      },
      content: privacyTermsConditionsFragment.scContentFr.markdown,
    },
  }
  return mappedPrivacyConditions
}

const findFragmentByScId = (res, id) => {
  return res.data.schPagev1ByPath.item.scFragments.find(
    (element) => element.scId === id
  )
}
