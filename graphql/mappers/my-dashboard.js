import { getFragmentQueryDocument } from '@apollo/client/utilities'
import clientQuery from '../client'

export async function getMyDashboardContent() {
  const query = require('../queries/my-dashboard.graphql')
  const response = await clientQuery(query)

  const mappedHome = {
    en: {
      pageName: response.data.schPagev1ByPath.item.scPageNameEn,
      heading: response.data.schPagev1ByPath.item.scTitleEn,
      cards: response.data.schPagev1ByPath.item.scFragments
        .find((element) => element.scId === 'dashboard-cards')
        .scItems.map((fragment) => {
          return {
            id: fragment.scId,
            title: fragment.scTitleEn,
            dropdownText: fragment.schTasks[0].scLinkTextEn,
            lists: fragment.schLists.map((list) => {
              return {
                title: list.scTitleEn,
                tasks: list.scItems.map((item) => {
                  return {
                    title: item.scLinkTextEn,
                    areaLabel: item.scLinkTextAssistiveEn,
                    link: item.scDestinationURLEn,
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
        title: response.data.schPagev1ByPath.item.scFragments.find(
          (element) => element.scId === 'exit-beta-version'
        ).scTitleEn,
        link: response.data.schPagev1ByPath.item.scFragments.find(
          (element) => element.scId === 'exit-beta-version'
        ).scDestinationURLEn,
      },
    },
    fr: {
      pageName: response.data.schPagev1ByPath.item.scPageNameFr,
      heading: response.data.schPagev1ByPath.item.scTitleFr,
      cards: response.data.schPagev1ByPath.item.scFragments
        .find((element) => element.scId === 'dashboard-cards')
        .scItems.map((fragment) => {
          if (!fragment.scId) return
          return {
            id: fragment.scId,
            title: fragment.scTitleFr,
            dropdownText: fragment.schTasks[0].scLinkTextFr,
            lists: fragment.schLists.map((list) => {
              return {
                title: list.scTitleFr,
                tasks: list.scItems.map((item) => {
                  return {
                    title: item.scLinkTextFr,
                    areaLabel: item.scLinkTextAssistiveFr,
                    link: item.scDestinationURLFr,
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
        title: response.data.schPagev1ByPath.item.scFragments.find(
          (element) => element.scId === 'exit-beta-version'
        ).scTitleFr,
        link: response.data.schPagev1ByPath.item.scFragments.find(
          (element) => element.scId === 'exit-beta-version'
        ).scDestinationURLFr,
      },
    },
  }
  return mappedHome
}
