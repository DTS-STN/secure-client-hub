import { getFragmentQueryDocument } from '@apollo/client/utilities'
import clientQuery from '../client'
import { buildLink } from '../../lib/links'

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
                  link: buildLink(list.schURLType, list.scDestinationURLEn),
                  icon: list.scIconCSS,
                  betaPopUp: list.schBetaPopUp,
                }
              }),
            },
          }
        })
        .filter((e) => e),
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
                  link: buildLink(list.schURLType, list.scDestinationURLFr),
                  icon: list.scIconCSS,
                  betaPopUp: list.schBetaPopUp,
                }
              }),
            },
          }
        })
        .filter((e) => e),
    },
  }
  return mappedProfile
}
