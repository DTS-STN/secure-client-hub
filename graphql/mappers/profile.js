import { getFragmentQueryDocument } from '@apollo/client/utilities'
import clientQuery from '../client'

export async function getProfileContent() {
  const query = require('../queries/profile.graphql')
  const response = await clientQuery(query)
  const mappedProfile = {
    en: {
      pageName: response.data.schPagev1ByPath.item.scTitleEn,
      heading: response.data.schPagev1ByPath.item.scTitleEn,
      cards: response.data.schPagev1ByPath.item.scFragments
        .find((element) => element.scId === 'profile-cards')
        .scItems.map((fragment) => {
          return {
            id: fragment.scId,
            title: fragment.scTitleEn,
            lists: {
              tasks: fragment.schTasks.map((list) => {
                return {
                  title: list.scLinkTextEn,
                  areaLabel: list.scLinkTextAssistiveEn,
                  link: list.scDestinationURLEn,
                  icon: list.scIconCSS,
                  betaPopUp: list.schBetaPopUp,
                }
              }),
            },
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
      pageName: response.data.schPagev1ByPath.item.scTitleFr,
      heading: response.data.schPagev1ByPath.item.scTitleFr,
      cards: response.data.schPagev1ByPath.item.scFragments
        .find((element) => element.scId === 'profile-cards')
        .scItems.map((fragment) => {
          return {
            id: fragment.scId,
            title: fragment.scTitleFr,
            lists: {
              tasks: fragment.schTasks.map((list) => {
                return {
                  title: list.scLinkTextFr,
                  areaLabel: list.scLinkTextAssistiveFr,
                  link: list.scDestinationURLFr,
                  icon: list.scIconCSS,
                }
              }),
            },
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
  return mappedProfile
}
