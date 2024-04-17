import { buildLink } from '../../lib/links'
import { cachified } from 'cachified'
import { lruCache as cache, defaultTtl as ttl } from '../../lib/cache-utils'

interface GetSchMyDashboardV2 {
  data: {
    schPageV1ByPath: {
      item: {
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
            schTasks: Array<{
              scId: string
              scLinkTextEn: string
              scLinkTextFr: string
              scLinkTextAssistiveEn: string
              scLinkTextAssistiveFr: string
            }>
            schLists: Array<{
              scTitleEn: string
              scTitleFr: string
              scItems: Array<{
                scId: string
                scLinkTextEn: string
                scLinkTextFr: string
                scLinkTextAssistiveEn: string
                scLinkTextAssistiveFr: string
                schURLType?: string
                scDestinationURLEn: string
                scDestinationURLFr: string
                scDestinationURL3En?: string | null
                scDestinationURL3Fr?: string | null
                scIconCSS: string
                schBetaPopUp: boolean
              }>
            }>
          }>
        }>
      }
    }
  }
}

const getCachedContent = () => {
  return cachified({
    key: `content-dashboard`,
    cache,
    getFreshValue: async () => {
      const response = await fetch(
        `${process.env.AEM_GRAPHQL_ENDPOINT}getSchMyDashboardV2`,
      )
      if (!response.ok) return null
      return (await response.json()) as GetSchMyDashboardV2
    },
    ttl,
  })
}

export async function getMyDashboardContent() {
  const response = await getCachedContent()
  const pageAlertContent = response?.data.schPageV1ByPath.item.schAlerts

  const mappedHome = {
    en: {
      pageName: response?.data.schPageV1ByPath.item.scPageNameEn,
      heading: response?.data.schPageV1ByPath.item.scTitleEn,
      pageAlerts: pageAlertContent?.map((pageAlert) => {
        return {
          id: pageAlert.scId,
          alertHeading: pageAlert.scHeadingEn,
          alertBody: pageAlert.scContentEn?.markdown,
          type: pageAlert.scAlertType,
        }
      }),
      cards: response?.data.schPageV1ByPath.item.scFragments
        .find(({ scId }) => scId === 'dashboard-cards')
        ?.scItems?.map((fragment) => {
          return {
            id: fragment.scId,
            title: fragment.scTitleEn,
            dropdownText: fragment.schTasks[0].scLinkTextEn,
            cardAlerts: fragment.schAlerts?.map((alert) => {
              return {
                id: alert.scId,
                alertHeading: alert.scHeadingEn,
                alertBody: alert.scContentEn?.markdown,
                type: alert.scAlertType,
              }
            }),
            lists: fragment.schLists.map((list) => {
              return {
                title: list.scTitleEn,
                tasks: list.scItems.map((item) => {
                  return {
                    id: item.scId,
                    title: item.scLinkTextEn,
                    areaLabel: item.scLinkTextAssistiveEn,
                    link: buildLink(
                      item.schURLType,
                      process.env.ENVIRONMENT === 'development' &&
                        item.scDestinationURL3En !== null
                        ? item.scDestinationURL3En
                        : item.scDestinationURLEn,
                    ),
                    icon: item.scIconCSS,
                    betaPopUp: item.schBetaPopUp,
                  }
                }),
              }
            }),
          }
        })
        .filter((e) => e),
      exitBeta: {
        title: response?.data.schPageV1ByPath.item.scFragments.find(
          ({ scId }) => scId === 'exit-beta-version',
        )?.scTitleEn,
        link: response?.data.schPageV1ByPath.item.scFragments.find(
          ({ scId }) => scId === 'exit-beta-version',
        )?.scDestinationURLEn,
      },
    },
    fr: {
      pageName: response?.data.schPageV1ByPath.item.scPageNameFr,
      heading: response?.data.schPageV1ByPath.item.scTitleFr,
      pageAlerts: pageAlertContent?.map((pageAlert) => {
        return {
          id: pageAlert.scId,
          alertHeading: pageAlert.scHeadingFr,
          alertBody: pageAlert.scContentFr?.markdown,
          type: pageAlert.scAlertType,
        }
      }),
      cards: response?.data.schPageV1ByPath.item.scFragments
        .find(({ scId }) => scId === 'dashboard-cards')
        ?.scItems?.map((fragment) => {
          if (!fragment.scId) return
          return {
            id: fragment.scId,
            title: fragment.scTitleFr,
            dropdownText: fragment.schTasks[0].scLinkTextFr,
            cardAlerts: fragment.schAlerts?.map((alert) => {
              return {
                id: alert.scId,
                alertHeading: alert.scHeadingFr,
                alertBody: alert.scContentFr?.markdown,
                type: alert.scAlertType,
              }
            }),
            lists: fragment.schLists.map((list) => {
              return {
                title: list.scTitleFr,
                tasks: list.scItems.map((item) => {
                  return {
                    id: item.scId,
                    title: item.scLinkTextFr,
                    areaLabel: item.scLinkTextAssistiveFr,
                    link: buildLink(
                      item.schURLType,
                      process.env.ENVIRONMENT === 'development' &&
                        item.scDestinationURL3Fr !== null
                        ? item.scDestinationURL3Fr
                        : item.scDestinationURLFr,
                    ),
                    icon: item.scIconCSS,
                    betaPopUp: item.schBetaPopUp,
                  }
                }),
              }
            }),
          }
        })
        .filter((e) => e),
      exitBeta: {
        title: response?.data.schPageV1ByPath.item.scFragments.find(
          ({ scId }) => scId === 'exit-beta-version',
        )?.scTitleFr,
        link: response?.data.schPageV1ByPath.item.scFragments.find(
          ({ scId }) => scId === 'exit-beta-version',
        )?.scDestinationURLFr,
      },
    },
  }
  return mappedHome
}
