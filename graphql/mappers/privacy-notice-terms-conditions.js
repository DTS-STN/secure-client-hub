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
      breadcrumb:
        response.data.schPagev1ByPath.item.scBreadcrumbParentPages.map((w) => {
          return {
            link: w.scPageNameEn,
            text: w.scTitleEn,
          }
        }),
      pageName: response.data.schPagev1ByPath.item.scPageNameEn,
      heading: response.data.schPagev1ByPath.item.scTitleEn,
      alert: {
        type: 'info',
        text: alertFragment.scContentEn.markdown,
      },
      content: privacyTermsConditionsFragment.scContentEn.markdown,
    },
    fr: {
      breadcrumb:
        response.data.schPagev1ByPath.item.scBreadcrumbParentPages.map((w) => {
          return {
            link: w.scPageNameFr,
            text: w.scTitleFr,
          }
        }),
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
