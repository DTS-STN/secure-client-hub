import clientQuery from '../client'

export async function getContactCanadaPensionPlan() {
  const query = require('../queries/contact-canada-pension-plan.graphql')
  const response = await clientQuery(query)

  const queryData = response.data.schPagev1ByPath.item

  const mappedContactCPP = {
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
                  color: y.scBackgroundColour,
                  items: y.scItems.map((z) => {
                    if (z.scContentEn) {
                      //Return address nested in content
                      return {
                        content: z.scContentEn.markdown,
                        icon: z.scIconCSS,
                        ...z.scFragments.map((a) => {
                          if (!a.scButtonType) {
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
                          } else {
                            return {
                              id: a.scId,
                              content: a.scLinkTextEn,
                              link: a.scDestinationURLEn,
                              button: a.scButtonType,
                            }
                          }
                        })[0],
                      }
                    } else {
                      //Return address unnested
                      return {
                        city: z.scCityEn,
                        country: z.scCountryEn
                          ? z.scCountryEn.toUpperCase()
                          : null,
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
              details: x.schDetails.map((y) => {
                return {
                  id: y.scId,
                  title: y.scTitleFr,
                  label: y.scTitleFr,
                  color: y.scBackgroundColour,
                  items: y.scItems.map((z) => {
                    if (z.scContentFr) {
                      //Return address nested in content
                      return {
                        content: z.scContentFr.markdown,
                        icon: z.scIconCSS,
                        ...z.scFragments.map((a) => {
                          if (!a.scButtonType) {
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
                          } else {
                            return {
                              id: a.scId,
                              content: a.scLinkTextFr,
                              link: a.scDestinationURLFr,
                              button: a.scButtonType,
                            }
                          }
                        })[0],
                      }
                    } else {
                      //Return address unnested
                      return {
                        city: z.scCityFr,
                        country: z.scCountryFr
                          ? z.scCountryFr.toUpperCase()
                          : null,
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

  return mappedContactCPP
}
