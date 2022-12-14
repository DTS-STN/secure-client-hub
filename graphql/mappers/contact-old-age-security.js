import clientQuery from '../client'

export async function getContactOldAgeSecurityContent() {
  const query = require('../queries/contact-old-age-security.graphql')
  const response = await clientQuery(query)

  const queryData = response.data.schPagev1ByPath.item

  const mappedContactOAS = {
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
                  items: y.scItems.map((z) => {
                    if (z.scContentEn) {
                      //Return address nested in content
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
                    } else {
                      //Return address unnested
                      return {
                        city: z.scCityEn,
                        country: z.scCountryEn,
                        id: z.scId,
                        poBox: z.scPostalBoxEn,
                        postal: z.scPostalCode,
                        province: z.scProvTerrAbbrEnum,
                        recipient: z.scRecipientEn,
                        station: z.scPostalStationEn,
                      }
                    }
                  }),
                  label: y.scTitleEn,
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
              title: x.scTitleFr,
              details: x.schDetails.map((y) => {
                return {
                  id: y.scId,
                  items: y.scItems.map((z) => {
                    if (z.scContentFr) {
                      //Return address nested in content
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
                            province: a.scProvTerrAbbrEnum,
                            recipient: a.scRecipientFr,
                          }
                        })[0],
                      }
                    } else {
                      //Return address unnested
                      return {
                        city: z.scCityFr,
                        country: z.scCountryFr,
                        id: z.scId,
                        poBox: z.scPostalBoxFr,
                        postal: z.scPostalCode,
                        province: z.scProvTerrAbbrEnum,
                        recipient: z.scRecipientFr,
                        station: z.scPostalStationFr,
                      }
                    }
                  }),
                  title: y.scTitleFr,
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

  return mappedContactOAS
}
