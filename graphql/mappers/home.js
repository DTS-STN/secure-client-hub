import { getFragmentQueryDocument } from '@apollo/client/utilities'
import clientQuery from '../client'

export default async function () {
  const query = require('../queries/home.graphql')
  const response = await clientQuery(query)
  const mappedHome = {
    en: {
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
                  item.scTitleEn, item.scDestinationURLEn, item.scIconCSS
                }),
              }
            }),
          }
        })
        .filter((e) => e),
    },
    fr: {
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
                  item.scTitleFr, item.scDestinationURLFr, item.scIconCSS
                }),
              }
            }),
          }
        })
        .filter((e) => e),
    },
  }
  console.log(mappedHome.en.cards)
  return { test: 'Test' }
}
