import clientQuery from '../client'

export async function getContactEmploymentInsuranceContent() {
  const query = require('../queries/contact-employment-insurance.graphql')
  const response = await clientQuery(query)

  const queryData = response.data.schPagev1ByPath.item

  const mappedContactEI = {
    en: {
      breadcrumb: queryData.scBreadcrumbParentPages.map((w) => {
        return {
          id: w.scId,
          pageName: w.scPageNameEn,
          shortTitle: w.scShortTitleEn,
        }
      }),
      title: queryData.scTitleEn,
      fragments: queryData.scFragments.map((w) => {
        return {
          id: w.scId,
          items: w.scItems.map((x) => {
            return {
              id: x.scId,
              title: x.scTitleEn,
              title: x.scTitleEn,
              details: x.schDetails.map((y) => {
                return {
                  id: y.scId,
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
                  title: y.scTitleEn,
                }
              }),

              intro: x.schIntroEn.markdown,
              layout: x.schContactMethodLayout,
            }
          }),
          title: w.scTitleEn,
        }
      }),
      id: queryData.scId,
      pageName: queryData.scPageNameEn,
    },
    fr: {
      breadcrumb: queryData.scBreadcrumbParentPages.map((w) => {
        return {
          id: w.scId,
          pageName: w.scPageNameFr,
          shortTitle: w.scShortTitleFr,
        }
      }),
      title: queryData.scTitleFr,
      fragments: queryData.scFragments.map((w) => {
        return {
          id: w.scId,
          items: w.scItems.map((x) => {
            return {
              id: x.scId,
              title: x.scTitleFr,
              title: x.scTitleFr,
              details: x.schDetails.map((y) => {
                return {
                  id: y.scId,
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
                  title: y.scTitleFr,
                }
              }),

              intro: x.schIntroFr.markdown,
              layout: x.schContactMethodLayout,
            }
          }),
          title: w.scTitleFr,
        }
      }),
      id: queryData.scId,
      pageName: queryData.scPageNameFr,
    },
  }

  return mappedContactEI
}

const showData = async () => {
  let x = await getContactEmploymentInsuranceContent()
  console.log(x)
}

showData()
