import clientQuery from '../client'

export async function getContactEmploymentInsuranceContent() {
  const query = require('../queries/contact-employment-insurance.graphql')
  const response = await clientQuery(query)

  const queryData = response.data.schPagev1ByPath.item

  const mappedContactEI = {
    en: {
      breadcrumb: queryData.scBreadcrumbParentPages.map((breadcrumb) => {
        return {
          link: breadcrumb.scPageNameEn,
          text: breadcrumb.scTitleEn,
        }
      }),
      title: queryData.scTitleEn,
      ...queryData.scFragments.map((fragment) => {
        return {
          id: fragment.scId,
          subHeader: fragment.scTitleEn,
          subHeader: fragment.scTitleFr,
          items: fragment.scItems.map((item) => {
            return {
              id: item.scId,
              title: item.scTitleEn,
              intro: item.schIntroEn.markdown,
              layout: item.schContactMethodLayout,
              details: item.schDetails.map((detail) => {
                return {
                  id: detail.scId,
                  label: detail.scTitleEn,
                  color: detail.scBackgroundColour,
                  items: detail.scItems.map((detailItem) => {
                    return {
                      content: detailItem.scContentEn.markdown,
                      icon: detailItem.scIconCSS,
                      ...detailItem.scFragments.map((detailItemFragment) => {
                        return {
                          city: detailItemFragment.scCityEn,
                          country: detailItemFragment.scCountryEn,
                          id: detailItemFragment.scId,
                          poBox: detailItemFragment.scPostalBoxEn,
                          postal: detailItemFragment.scPostalCode,
                          program: detailItemFragment.scProgramEn,
                          province: detailItemFragment.scProvTerrAbbrEnum,
                          recipient: detailItemFragment.scRecipientEn,
                        }
                      })[0],
                    }
                  }),
                }
              }),
            }
          }),
        }
      })[0],
      id: queryData.scId,
      pageName: queryData.scPageNameEn,
    },
    fr: {
      breadcrumb: queryData.scBreadcrumbParentPages.map((breadcrumb) => {
        return {
          link: breadcrumb.scPageNameFr,
          text: breadcrumb.scTitleFr,
        }
      }),
      title: queryData.scTitleFr,
      ...queryData.scFragments.map((fragment) => {
        return {
          id: fragment.scId,
          items: fragment.scItems.map((item) => {
            return {
              id: item.scId,
              title: item.scTitleFr,
              intro: item.schIntroFr.markdown,
              layout: item.schContactMethodLayout,
              details: item.schDetails.map((detail) => {
                return {
                  id: detail.scId,
                  title: detail.scTitleFr,
                  label: detail.scTitleFr,
                  color: detail.scBackgroundColour,
                  items: detail.scItems.map((detailItem) => {
                    return {
                      content: detailItem.scContentFr.markdown,
                      icon: detailItem.scIconCSS,
                      ...detailItem.scFragments.map((detailItemFragment) => {
                        return {
                          city: detailItemFragment.scCityFr,
                          country: detailItemFragment.scCountryFr,
                          id: detailItemFragment.scId,
                          poBox: detailItemFragment.scPostalBoxFr,
                          postal: detailItemFragment.scPostalCode,
                          program: detailItemFragment.scProgramFr,
                          province: detailItemFragment.scProvTerrAbbrEnum,
                          recipient: detailItemFragment.scRecipientFr,
                        }
                      })[0],
                    }
                  }),
                }
              }),
            }
          }),
        }
      })[0],
      id: queryData.scId,
      pageName: queryData.scPageNameFr,
    },
  }
  return mappedContactEI
}
