import { getFragmentQueryDocument } from '@apollo/client/utilities'
import clientQuery from '../client'

export default async function () {
  const query = require('../queries/home.graphql')
  const response = await clientQuery(query)
  const mappedHome = {
    en: {
      pageName: response.data.schPagev1ByPath.item.scPageNameEn,
      heading: response.data.schPagev1ByPath.item.scTitleEn,
      cards: response.data.schPagev1ByPath.item.scFragments
        .map((fragment) => {
          if (!fragment.scId) return
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
      exitBeta: response.data.schPagev1ByPath.item.scFragments
        .map((fragment) => {
          if (fragment.scId) return
          return {
            title: fragment.scTitleEn,
            link: fragment.scDestinationURLEn,
          }
        })
        .filter((e) => e),
    },
    fr: {
      pageName: response.data.schPagev1ByPath.item.scPageNameFr,
      heading: response.data.schPagev1ByPath.item.scTitleFr,
      cards: response.data.schPagev1ByPath.item.scFragments
        .map((fragment) => {
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
      exitBeta: response.data.schPagev1ByPath.item.scFragments
        .map((fragment) => {
          if (fragment.scId) return
          return {
            title: fragment.scTitleFr,
            link: fragment.scDestinationURLFr,
          }
        })
        .filter((e) => e),
    },
  }
  return mappedHome
}
