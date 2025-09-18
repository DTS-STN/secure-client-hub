import { buildAemUri, buildLink } from '../../lib/links'
import { cachified } from 'cachified'
import { lruCache as cache, defaultTtl as ttl } from '../../lib/cache-utils'
// import defaultResponse from './sample-responses/my-dashboard5.json'

interface TestGetSchMyDashboardV5 {
  data: {
    schPageV1List: {
      items: Array<{
        _path: string
        scPageNameEn: string
        scPageNameFr: string
        scTitleEn: string
        scTitleFr: string
        scShortTitleEn: null
        scShortTitleFr: null
        scContentType: Array<string>
        scOwner: Array<string>
        scDateModifiedOverwrite: string
        scAudience: null
        schAlerts?: Array<{
          scId?: string
          scHeadingEn?: string
          scHeadingFr?: string
          scContentEn?: {
            markdown: string
          }
          scContentFr?: {
            markdown: string
          }
          scAlertType?: Array<string>
        }>
        scFragments: Array<{
          scId: string
          scTitleEn: null
          scTitleFr: null
          scDestinationURLEn?: string
          scDestinationURLFr?: string
          scItems?: Array<{
            scId: string
            scTitleEn: string
            scTitleFr: string
            schAlerts?: Array<{
              scId: string
              scHeadingEn: string
              scHeadingFr: string
              scContentEn?: {
                markdown: string
              }
              scContentFr?: {
                markdown: string
              }
              scAlertType?: Array<string>
            }>
            schLists: Array<{
              //useless structure
              scId: string
              scTitleEn: null
              scTitleFr: null
              scItems: Array<{
                //each dropdown
                scId: string
                scTitleEn: string
                scTitleFr: string
                schAlerts?: Array<{
                  scId: string
                  scHeadingEn: string
                  scHeadingFr: string
                  scContentEn?: {
                    markdown: string
                  }
                  scContentFr?: {
                    markdown: string
                  }
                  scAlertType?: Array<string>
                }>
                schLists: Array<{
                  //each section
                  scTitleEn: string
                  scTitleFr: string
                  scItems: Array<{
                    //each link in the section
                    scId: string
                    scLinkTextEn: string
                    scLinkTextFr: string
                    scLinkTextAssistiveEn: string
                    scLinkTextAssistiveFr: string
                    schURLType?: string
                    scDestinationURLEn: string
                    scDestinationURLFr: string
                    scIconCSS: string
                    schBetaPopUp: boolean
                  }>
                }>
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
    key: `content-dashboard`,
    cache,
    getFreshValue: async (): Promise<TestGetSchMyDashboardV5 | null> => {
      const targetUri = buildAemUri('TESTgetSchMyDashboardV5')
      const response = await fetch(targetUri)
      if (!response.ok) return null
      return await response.json()
    },
    ttl,
  })
}

export async function getMyDashboardContent(): Promise<MyDashboardContent> {
  const response = await getCachedContent()
  // const response = defaultResponse
  const pageAlertContent = response?.data.schPageV1List.items[0].schAlerts

  const mappedHome = {
    en: {
      pageName: response?.data.schPageV1List.items[0].scPageNameEn,
      heading: response?.data.schPageV1List.items[0].scTitleEn,
      pageAlerts: pageAlertContent?.map((pageAlert) => {
        return {
          id: pageAlert.scId,
          alertHeading: pageAlert.scHeadingEn,
          alertBody: pageAlert.scContentEn?.markdown,
          type: pageAlert.scAlertType,
        }
      }),
      cards: response?.data.schPageV1List.items[0].scFragments
        .find(({ scId }) => scId === 'dashboard-cards')
        ?.scItems?.map((fragment) => {
          return {
            id: fragment.scId,
            title: fragment.scTitleEn,
            cardAlerts: fragment.schAlerts?.map((alert) => {
              return {
                id: alert.scId,
                alertHeading: alert.scHeadingEn,
                alertBody: alert.scContentEn?.markdown,
                type: alert.scAlertType,
              }
            }),
            // map useless structure
            items: fragment.schLists[0].scItems.map((item) => {
              // accordions
              return {
                id: item.scId,
                title: item.scTitleEn,
                accordionAlerts: item.schAlerts?.map((alert) => {
                  return {
                    id: alert.scId,
                    alertHeading: alert.scHeadingEn,
                    alertBody: alert.scContentEn?.markdown,
                    type: alert.scAlertType,
                  }
                }),
                lists: item.schLists.map((list) => {
                  // sections
                  return {
                    title: list.scTitleEn,
                    aaTitle: list.scTitleEn,
                    tasks: list.scItems.map((item) => {
                      // links
                      return {
                        id: item.scId,
                        title: item.scLinkTextEn,
                        areaLabel: item.scLinkTextAssistiveEn,
                        link: buildLink(
                          item.schURLType,
                          item.scDestinationURLEn,
                        ),
                        icon: item.scIconCSS,
                        betaPopUp: item.schBetaPopUp,
                      }
                    }),
                  }
                }),
              }
            }),
          }
        }),
      exitBeta: {
        title: response?.data.schPageV1List.items[0].scFragments.find(
          ({ scId }) => scId === 'exit-beta-version',
        )?.scTitleEn,
        link: response?.data.schPageV1List.items[0].scFragments.find(
          ({ scId }) => scId === 'exit-beta-version',
        )?.scDestinationURLEn,
      },
    },
    fr: {
      pageName: response?.data.schPageV1List.items[0].scPageNameFr,
      heading: response?.data.schPageV1List.items[0].scTitleFr,
      pageAlerts: pageAlertContent?.map((pageAlert) => {
        return {
          id: pageAlert.scId,
          alertHeading: pageAlert.scHeadingFr,
          alertBody: pageAlert.scContentFr?.markdown,
          type: pageAlert.scAlertType,
        }
      }),
      cards: response?.data.schPageV1List.items[0].scFragments
        .find(({ scId }) => scId === 'dashboard-cards')
        ?.scItems?.map((fragment) => {
          if (!fragment.scId) return
          return {
            id: fragment.scId,
            title: fragment.scTitleFr,
            cardAlerts: fragment.schAlerts?.map((alert) => {
              return {
                id: alert.scId,
                alertHeading: alert.scHeadingFr,
                alertBody: alert.scContentFr?.markdown,
                type: alert.scAlertType,
              }
            }),
            items: fragment.schLists[0].scItems.map((item) => {
              return {
                id: item.scId,
                title: item.scTitleFr,
                accordionAlerts: item.schAlerts?.map((alert) => {
                  return {
                    id: alert.scId,
                    alertHeading: alert.scHeadingFr,
                    alertBody: alert.scContentFr?.markdown,
                    type: alert.scAlertType,
                  }
                }),
                lists: item.schLists.map((list) => {
                  return {
                    title: list.scTitleFr,
                    aaTitle: list.scTitleFr,
                    tasks: list.scItems.map((item) => {
                      return {
                        id: item.scId,
                        title: item.scLinkTextFr,
                        areaLabel: item.scLinkTextAssistiveFr,
                        link: buildLink(
                          item.schURLType,
                          item.scDestinationURLFr,
                        ),
                        icon: item.scIconCSS,
                        betaPopUp: item.schBetaPopUp,
                      }
                    }),
                  }
                }),
              }
            }),
          }
        }),
      exitBeta: {
        title: response?.data.schPageV1List.items[0].scFragments.find(
          ({ scId }) => scId === 'exit-beta-version',
        )?.scTitleFr,
        link: response?.data.schPageV1List.items[0].scFragments.find(
          ({ scId }) => scId === 'exit-beta-version',
        )?.scDestinationURLFr,
      },
    },
  }
  return mappedHome
}

export interface MyDashboardContent {
  err?: string
  en?: {
    pageName: string | undefined
    heading: string | undefined
    pageAlerts:
      | {
          id: string | undefined
          alertHeading: string | undefined
          alertBody: string | undefined
          type: string[] | undefined
        }[]
      | undefined
    cards:
      | {
          id: string
          title: string
          cardAlerts:
            | {
                id: string
                alertHeading: string
                alertBody: string | undefined
                type: string[] | undefined
              }[]
            | undefined
          items: {
            id: string
            title: string
            accordionAlerts:
              | {
                  id: string
                  alertHeading: string
                  alertBody: string | undefined
                  type: string[] | undefined
                }[]
              | undefined
            lists: {
              title: string
              aaTitle: string
              tasks: {
                id: string
                title: string
                areaLabel: string
                link: string
                icon: string
                betaPopUp: boolean
              }[]
            }[]
          }[]
        }[]
      | undefined
    exitBeta: { title: null | undefined; link: string | undefined }
  }
  fr?: {
    pageName: string | undefined
    heading: string | undefined
    pageAlerts:
      | {
          id: string | undefined
          alertHeading: string | undefined
          alertBody: string | undefined
          type: string[] | undefined
        }[]
      | undefined
    cards:
      | (
          | {
              id: string
              title: string
              cardAlerts:
                | {
                    id: string
                    alertHeading: string
                    alertBody: string | undefined
                    type: string[] | undefined
                  }[]
                | undefined
              items: {
                id: string
                title: string
                accordionAlerts:
                  | {
                      id: string
                      alertHeading: string
                      alertBody: string | undefined
                      type: string[] | undefined
                    }[]
                  | undefined
                lists: {
                  title: string
                  aaTitle: string
                  tasks: {
                    id: string
                    title: string
                    areaLabel: string
                    link: string
                    icon: string
                    betaPopUp: boolean
                  }[]
                }[]
              }[]
            }
          | undefined
        )[]
      | undefined
    exitBeta: { title: null | undefined; link: string | undefined }
  }
}
