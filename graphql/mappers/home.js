import { getFragmentQueryDocument } from '@apollo/client/utilities'
import clientQuery from '../client'

export async function getHomeContent() {
  const query = require('../queries/home.graphql')
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
            lists: fragment.schLists.map((list) => {
              return {
                title: list.scTitleEn,
                tasks: list.scItems.map((item) => {
                  return {
                    title: item.scTitleEn,
                    link: item.scDestinationURLEn,
                    icon: item.scIconCSS,
                  }
                }),
              }
            }),
          }
        })
        .filter((e) => e),
      exitBeta: {
        title: response.data.schPagev1ByPath.item.scFragments.find(
          (element) => element.scId === 'EXIT-BETA-VERSION'
        ).scTitleEn,
        link: response.data.schPagev1ByPath.item.scFragments.find(
          (element) => element.scId === 'EXIT-BETA-VERSION'
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
            lists: fragment.schLists.map((list) => {
              return {
                title: list.scTitleFr,
                tasks: list.scItems.map((item) => {
                  return {
                    title: item.scTitleFr,
                    link: item.scDestinationURLFr,
                    icon: item.scIconCSS,
                  }
                }),
              }
            }),
          }
        })
        .filter((e) => e),
      exitBeta: {
        title: response.data.schPagev1ByPath.item.scFragments.find(
          (element) => element.scId === 'EXIT-BETA-VERSION'
        ).scTitleFr,
        link: response.data.schPagev1ByPath.item.scFragments.find(
          (element) => element.scId === 'EXIT-BETA-VERSION'
        ).scDestinationURLFr,
      },
    },
  }
  return mappedHome
}
