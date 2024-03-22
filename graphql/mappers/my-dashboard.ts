import { buildLink } from '../../lib/links'
import { cachified } from 'cachified'
import { lruCache as cache, defaultTtl as ttl } from '../../lib/cache-utils'

interface GetSchMyDashboardV1 {
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
        `${process.env.AEM_GRAPHQL_ENDPOINT}getSchMyDashboardV1`,
      )
      if (!response.ok) return null
      return (await response.json()) as GetSchMyDashboardV1
    },
    ttl,
  })
}

export async function getMyDashboardContent() {
  const response = await getCachedContent()
  // const pageAlertContent = response?.data.schPageV1ByPath.item.schAlerts
  // const cardAlertContent = response?.data.schPageV1ByPath.item.scFragments

  // const fallbackContent = {
  //   scId: 'dental-plan',
  //   scHeadingEn: 'Exiting beta version',
  //   scHeadingFr: 'Vous quittez la version bêta',
  //   scContentEn:
  //     'Alert Content EN... You are now returning to My Service Canada Account home page.',
  //   scContentFr:
  //     "Alert content FR...Nous vous redirigeons vers la page d’accueil de Mon dossier Service Canada.",
  //   scAlertType: "warning",
  // }

  const mappedHome = {
    en: {
      pageName: response?.data.schPageV1ByPath.item.scPageNameEn,
      heading: response?.data.schPageV1ByPath.item.scTitleEn,
      // pageAlerts: pageAlertContent?.map((pageAlert) => {
      //   console.log(pageAlert)
      //   return {
      //     id: pageAlert.scId ?? fallbackContent.scId,
      //     alertHeading: pageAlert.scHeadingEn ?? fallbackContent.scHeadingEn,
      //     alertBody: pageAlert.scContentEn?.markdown ?? fallbackContent.scContentEn,
      //     type: pageAlert.scAlertType ?? fallbackContent.scAlertType,
      //   }
      // }),
      cards: response?.data.schPageV1ByPath.item.scFragments
        .find(({ scId }) => scId === 'dashboard-cards')
        ?.scItems?.map((fragment) => {
          // console.log(fragment.schAlerts)
          return {
            id: fragment.scId,
            title: fragment.scTitleEn,
            dropdownText: fragment.schTasks[0].scLinkTextEn,
            // cardAlerts: fragment.schAlerts?.map((alert) => {
            //   return {
            //     id: alert.scId,
            //     alertHeading: alert.scHeadingEn,
            //     alertBody: alert.scContentEn?.markdown,
            //     type: alert.scAlertType,
            //   }
            // }),

            lists: fragment.schLists.map((list) => {
              return {
                title: list.scTitleEn,
                tasks: list.scItems.map((item) => {
                  return {
                    id: item.scId,
                    title: item.scLinkTextEn,
                    areaLabel: item.scLinkTextAssistiveEn,
                    link: buildLink(item.schURLType, item.scDestinationURLEn),
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
      // pageAlerts: pageAlertContent?.map((pageAlert) => {
      //   return {
      //     id: pageAlert.scId ?? fallbackContent.scId,
      //     alertHeading: pageAlert.scHeadingFr ?? fallbackContent.scHeadingFr,
      //     alertBody: pageAlert.scContentFr?.markdown ?? fallbackContent.scContentFr,
      //     type: pageAlert.scAlertType ?? fallbackContent.scAlertType,
      //   }
      // }),
      cards: response?.data.schPageV1ByPath.item.scFragments
        .find(({ scId }) => scId === 'dashboard-cards')
        ?.scItems?.map((fragment) => {
          if (!fragment.scId) return
          return {
            id: fragment.scId,
            title: fragment.scTitleFr,
            // cardAlerts: fragment.schAlerts.map((alert) => {
            //   return {
            //     id: alert.scId,
            //     alertHeading: alert.scHeadingFr,
            //     alertBody: alert.scContentFr?.markdown,
            //     type: alert.scAlertType,
            //   }
            // }),
            dropdownText: fragment.schTasks[0].scLinkTextFr,
            lists: fragment.schLists.map((list) => {
              return {
                title: list.scTitleFr,
                tasks: list.scItems.map((item) => {
                  return {
                    id: item.scId,
                    title: item.scLinkTextFr,
                    areaLabel: item.scLinkTextAssistiveFr,
                    link: buildLink(item.schURLType, item.scDestinationURLFr),
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
