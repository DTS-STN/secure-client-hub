import { cachified } from 'cachified'
import { lruCache as cache, defaultTtl as ttl } from '../../lib/cache-utils'

interface GetSchContactUsDynamicV1 {
  data: {
    schPageV1List: {
      items: Array<{
        _path: string
        scId: string
        scTitleEn: string
        scTitleFr: string
        scPageNameEn: string
        scPageNameFr: string
        scDescriptionEn: {
          plaintext: string
        }
        scDescriptionFr: {
          plaintext: string
        }
        scShortTitleEn: null
        scShortTitleFr: null
        scBreadcrumbParentPages: Array<{
          _path: string
          scId: string
          scPageNameEn: string
          scPageNameFr: string
          scTitleEn: string
          scTitleFr: string
          scShortTitleFr: null
          scShortTitleEn: null
          scOwner: Array<string>
          scDateModifiedOverwrite: string
          scAudience: null
        }>
        scContentType: Array<string>
        scAudience: null
        scOwner?: Array<string>
        scFragments: Array<{
          _path: string
          scId: string
          scTitleEn: string
          scTitleFr: string
          scItems: Array<{
            _path: string
            scId: string
            scTitleEn: string
            scTitleFr: string
            schContactMethodLayout?: string
            schIntroEn: {
              markdown: string
            }
            schIntroFr: {
              markdown: string
            }
            schDetails: Array<{
              _path: string
              scBackgroundColour?: boolean
              scTitleEn: string
              scTitleFr: string
              scId: string
              scItems: Array<{
                _path: string
                scId: string
                scContentEn?: {
                  markdown?: string
                }
                scContentFr?: {
                  markdown?: string
                }
                scIconCSS?: string
                scFragments?: Array<{
                  scId: string
                  scLinkTextEn?: string
                  scLinkTextFr?: string
                  scDestinationURLEn?: string
                  scDestinationURLFr?: string
                  scButtonType?: Array<string>
                  _path?: string
                  scRecipientEn?: string
                  scRecipientFr?: string
                  scProgramEn?: string
                  scProgramFr?: string
                  scPostalBoxEn?: string
                  scPostalBoxFr?: string
                  scPostalStationEn?: string
                  scPostalStationFr?: string
                  scCityEn?: string
                  scCityFr?: string
                  scProvTerrAbbr?: Array<string>
                  scPostalCode?: string
                  scCountry?: Array<string>
                  scProvTerrAbbrEnum?: string
                  scCountryEn?: string
                  scCountryFr?: string
                }>
                scRecipientEn?: string
                scRecipientFr?: string
                scPostalBoxEn?: string
                scPostalBoxFr?: string
                scPostalStationEn?: string
                scPostalStationFr?: string
                scCityEn?: string
                scCityFr?: string
                scProvTerrAbbr?: Array<string>
                scPostalCode?: string
                scCountry?: Array<string>
                scProvTerrAbbrEnum?: string
                scCountryEn?: string
                scCountryFr?: string
              }>
            }>
          }>
        }>
      }>
    }
  }
}

const getCachedContent = () => {
  return cachified({
    key: `content-dynamic-contact-us`,
    cache,
    getFreshValue: async () => {
      const response = await fetch(
        `${process.env.AEM_GRAPHQL_ENDPOINT}getSchContactUsDynamicV1`
      )

      if (!response.ok) return null
      return (await response.json()) as GetSchContactUsDynamicV1
    },
    ttl,
  })
}

export async function getContactUsPage(id: string) {
  const response = await getCachedContent()
  const queryData = response?.data.schPageV1List.items.find(
    ({ scId }) => scId === id
  )

  // Fail fast if a non-existent page is queried
  if (!queryData) return

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
                        ...((contentItem.scFragments ?? []).map(
                          (destination) => {
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
                          }
                        )[0] ?? {}),
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
                  color: row.scBackgroundColour,
                  items: row.scItems.map((contentItem) => {
                    if (contentItem.scContentFr) {
                      //Return address nested in content
                      return {
                        content: contentItem.scContentFr.markdown,
                        icon: contentItem.scIconCSS,
                        ...((contentItem.scFragments ?? []).map(
                          (destination) => {
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
                          }
                        )[0] ?? {}),
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
