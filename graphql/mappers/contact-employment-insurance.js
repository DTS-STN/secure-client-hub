import clientQuery from '../client'

export async function getContactEmploymentInsuranceContent() {
  const query = require('../queries/contact-employment-insurance.graphql')
  const response = await clientQuery(query)

  const queryData = response.data.schPagev1ByPath.item

  const mappedContactEI = {
    en: {
      breadcrumb: queryData.scBreadcrumbParentPages.map((w) => {
        return {
          link: w.scPageNameEn,
          text: w.scTitleEn,
        }
      }),
      title: queryData.scTitleEn,
      ...queryData.scFragments.map((w) => {
        return {
          id: w.scId,
          items: w.scItems.map((x) => {
            return {
              id: x.scId,
              title: x.scTitleEn,
              details: x.schDetails.map((y) => {
                return {
                  id: y.scId,
                  label: y.scTitleEn,
                  color: y.scBackgroundColour,
                  items: y.scItems.map((z) => {
                    return {
                      content: z.scContentEn.markdown,
                      icon: z.scIconCSS,
                      ...z.scFragments.map((a) => {
                        return {
                          city: a.scCityEn,
                          country: a.scCountryEn,
                          id: a.scId,
                          poBox: a.scPostalBoxEn,
                          postal: a.scPostalCode,
                          program: a.scProgramEn,
                          province: a.scProvTerrAbbrEnum,
                          recipient: a.scRecipientEn,
                        }
                      })[0],
                    }
                  }),
                }
              }),
              intro: x.schIntroEn.markdown,
              layout: x.schContactMethodLayout,
            }
          }),
          subHeader: w.scTitleEn,
        }
      })[0],
      id: queryData.scId,
      pageName: queryData.scPageNameEn,
    },
    fr: {
      breadcrumb: queryData.scBreadcrumbParentPages.map((w) => {
        return {
          link: w.scPageNameFr,
          text: w.scTitleFr,
        }
      }),
      title: queryData.scTitleFr,
      ...queryData.scFragments.map((w) => {
        return {
          id: w.scId,
          items: w.scItems.map((x) => {
            return {
              id: x.scId,
              title: x.scTitleFr,
              details: x.schDetails.map((y) => {
                return {
                  id: y.scId,
                  title: y.scTitleFr,
                  label: y.scTitleFr,
                  color: y.scBackgroundColour,
                  items: y.scItems.map((z) => {
                    return {
                      content: z.scContentFr.markdown,
                      icon: z.scIconCSS,
                      ...z.scFragments.map((a) => {
                        return {
                          city: a.scCityFr,
                          country: a.scCountryFr,
                          id: a.scId,
                          poBox: a.scPostalBoxFr,
                          postal: a.scPostalCode,
                          program: a.scProgramFr,
                          province: a.scProvTerrAbbrEnum,
                          recipient: a.scRecipientFr,
                        }
                      })[0],
                    }
                  }),
                  title: 'y.scTitleFr',
                }
              }),

              intro: x.schIntroFr.markdown,
              layout: x.schContactMethodLayout,
            }
          }),
          subHeader: w.scTitleFr,
        }
      })[0],
      id: queryData.scId,
      pageName: queryData.scPageNameFr,
    },
  }

  return mappedContactEI
}
