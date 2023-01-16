import { getFragmentQueryDocument } from '@apollo/client/utilities'
import clientQuery from '../client'

export async function getProfileContent() {
  const query = require('../queries/profile.graphql')
  const response = await clientQuery(query)

  const enLookingForFragment = findFragmentByScId(
    response,
    'looking-for-security-settings'
  ).scContentEn
  const frLookingForFragment = findFragmentByScId(
    response,
    'looking-for-security-settings'
  ).scContentFr

  const mappedProfile = {
    en: {
      breadcrumb:
        response.data.schPagev1ByPath.item.scBreadcrumbParentPages.map((w) => {
          return {
            link: w.scPageNameEn,
            text: w.scTitleEn,
          }
        }),
      pageName: response.data.schPagev1ByPath.item.scTitleEn,
      heading: response.data.schPagev1ByPath.item.scTitleEn,
      lookingFor: {
        title: enLookingForFragment.json[0].content[0].value,
        subText: enLookingForFragment.json[1].content.map((element) => {
          if (element.value) {
            return element.value
          }
          return null
        }),
        link: '/security-settings',
      },
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
      breadcrumb:
        response.data.schPagev1ByPath.item.scBreadcrumbParentPages.map((w) => {
          return {
            link: w.scPageNameFr,
            text: w.scTitleFr,
          }
        }),
      pageName: response.data.schPagev1ByPath.item.scTitleFr,
      heading: response.data.schPagev1ByPath.item.scTitleFr,
      lookingFor: {
        title: frLookingForFragment.json[0].content[0].value,
        subText: frLookingForFragment.json[1].content.map((element) => {
          if (element.value) {
            return element.value
          }
          return null
        }),
        link: '/fr/parametres-securite',
      },
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
        ).scTitleFr,
        link: response.data.schPagev1ByPath.item.scFragments.find(
          (element) => element.scId === 'exit-beta-version'
        ).scDestinationURLFr,
      },
    },
  }
  return mappedProfile
}

const findFragmentByScId = (res, id) => {
  return res.data.schPagev1ByPath.item.scFragments.find(
    (element) => element.scId === id
  )
}
