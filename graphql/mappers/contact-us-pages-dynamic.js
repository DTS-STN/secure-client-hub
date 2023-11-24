export async function getContactUsPage(id) {
  const query = await fetch(
    `${process.env.AEM_GRAPHQL_ENDPOINT}getSchContactUsDynamicV1`
  )
  const response = await query.json()

  const queryData = response.data.schPageV1List.items.find(
    (page) => page.scId === id
  )

  //Fail fast if a non-existent page is queried
  if (queryData === undefined) {
    return
  }

  const mappedContactPage = {
    en: {
      breadcrumb: queryData.scBreadcrumbParentPages.map((level) => {
        return {
          link: level.scPageNameEn,
          text: level.scTitleEn,
        }
      }),
      title: queryData.scTitleEn,
      description: queryData.scDescriptionEn.plaintext,
      ...queryData.scFragments.map((body) => {
        return {
          id: body.scId,
          subHeader: body.scTitleEn,
          items: body.scItems.map((fragment) => {
            return {
              id: fragment.scId,
              title: fragment.scTitleEn,
              intro: fragment.schIntroEn.markdown,
              layout: fragment.schContactMethodLayout,
              details: fragment.schDetails.map((row) => {
                return {
                  id: row.scId,
                  color: row.scBackgroundColour,
                  label: row.scTitleEn,
                  items: row.scItems.map((contentItem) => {
                    if (contentItem.scContentEn) {
                      //Return address nested in content
                      return {
                        content: contentItem.scContentEn.markdown,
                        icon: contentItem.scIconCSS,
                        ...contentItem.scFragments.map((destination) => {
                          if (!destination.scButtonType) {
                            return {
                              city: destination.scCityEn,
                              country: destination.scCountryEn,
                              id: destination.scId,
                              poBox: destination.scPostalBoxEn,
                              postal: destination.scPostalCode,
                              station: destination.scPostalStationEn,
                              program: destination.scProgramEn,
                              province: destination.scProvTerrAbbrEnum,
                              recipient: destination.scRecipientEn,
                            }
                          } else {
                            return {
                              id: destination.scId,
                              content: destination.scLinkTextEn,
                              link: destination.scDestinationURLEn,
                              button: destination.scButtonType,
                            }
                          }
                        })[0],
                      }
                    } else {
                      //Return address unnested
                      return {
                        city: contentItem.scCityEn,
                        country: contentItem.scCountryEn
                          ? contentItem.scCountryEn.toUpperCase()
                          : null,
                        id: contentItem.scId,
                        poBox: contentItem.scPostalBoxEn,
                        postal: contentItem.scPostalCode,
                        province: contentItem.scProvTerrAbbrEnum,
                        recipient: contentItem.scRecipientEn,
                        station: contentItem.scPostalStationEn,
                      }
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
      breadcrumb: queryData.scBreadcrumbParentPages.map((level) => {
        return {
          link: level.scPageNameFr,
          text: level.scTitleFr,
        }
      }),
      title: queryData.scTitleFr,
      description: queryData.scDescriptionFr.plaintext,
      ...queryData.scFragments.map((body) => {
        return {
          id: body.scId,
          subHeader: body.scTitleFr,
          items: body.scItems.map((fragment) => {
            return {
              id: fragment.scId,
              title: fragment.scTitleFr,
              intro: fragment.schIntroFr.markdown,
              layout: fragment.schContactMethodLayout,
              details: fragment.schDetails.map((row) => {
                return {
                  id: row.scId,
                  title: row.scTitleFr,
                  label: row.scTitleFr,
                  title: row.scTitleFr,
                  color: row.scBackgroundColour,
                  items: row.scItems.map((contentItem) => {
                    if (contentItem.scContentFr) {
                      //Return address nested in content
                      return {
                        content: contentItem.scContentFr.markdown,
                        icon: contentItem.scIconCSS,
                        ...contentItem.scFragments.map((destination) => {
                          if (!destination.scButtonType) {
                            return {
                              city: destination.scCityFr,
                              country: destination.scCountryFr,
                              id: destination.scId,
                              poBox: destination.scPostalBoxFr,
                              postal: destination.scPostalCode,
                              station: destination.scPostalStationFr,
                              program: destination.scProgramFr,
                              province: destination.scProvTerrAbbrEnum,
                              recipient: destination.scRecipientFr,
                            }
                          } else {
                            return {
                              id: destination.scId,
                              content: destination.scLinkTextFr,
                              link: destination.scDestinationURLFr,
                              button: destination.scButtonType,
                            }
                          }
                        })[0],
                      }
                    } else {
                      //Return address unnested
                      return {
                        city: contentItem.scCityFr,
                        country: contentItem.scCountryFr
                          ? contentItem.scCountryFr.toUpperCase()
                          : null,
                        id: contentItem.scId,
                        poBox: contentItem.scPostalBoxFr,
                        postal: contentItem.scPostalCode,
                        province: contentItem.scProvTerrAbbrEnum,
                        recipient: contentItem.scRecipientFr,
                        station: contentItem.scPostalStationFr,
                      }
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

  return mappedContactPage
}
