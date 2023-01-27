import clientQuery from '../client'
import { buildLink } from '../../lib/links'

export async function getProfileContent() {
  const query = require('../queries/profile.graphql')
  const response = await clientQuery(query)
  const mappedProfile = {
    en: {
      pageName: response.data.schPagev1ByPath.item.scTitleEn,
      heading: response.data.schPagev1ByPath.item.scFragments.find(
        (element) => element.scId === 'profile-intro'
      ).scContentEn.json[0].content[0].value,
      list: response.data.schPagev1ByPath.item.scFragments
        .map((element) => {
          if (
            element.scId !== 'profile-cards' &&
            element.scId !== 'profile-intro' &&
            element.scId !== 'looking-for-security-settings' &&
            element.scId !== 'back-to-my-dashboard' &&
            element.scId !== 'exit-beta-version'
          ) {
            return {
              title: element.scTitleEn,
              tasks: element.scItems.map((item) => {
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
          }
        })
        .filter((e) => e),
      lookingFor: {
        title: response.data.schPagev1ByPath.item.scFragments.find(
          (element) => element.scId === 'looking-for-security-settings'
        ).scContentEn.json[0].content[0].value,
        subText: [
          response.data.schPagev1ByPath.item.scFragments.find(
            (element) => element.scId === 'looking-for-security-settings'
          ).scContentEn.json[1].content[0].value,
          response.data.schPagev1ByPath.item.scFragments.find(
            (element) => element.scId === 'looking-for-security-settings'
          ).scContentEn.json[1].content[1].value,
        ],
      },
      backToDashboard: {
        id: response.data.schPagev1ByPath.item.scFragments.find(
          (element) => element.scId === 'back-to-my-dashboard'
        ).scId,
        btnText: response.data.schPagev1ByPath.item.scFragments.find(
          (element) => element.scId === 'back-to-my-dashboard'
        ).scTitleEn,
        btnLink: response.data.schPagev1ByPath.item.scFragments.find(
          (element) => element.scId === 'back-to-my-dashboard'
        ).scDestinationURLEn,
      },
    },
    fr: {
      pageName: response.data.schPagev1ByPath.item.scTitleFr,
      heading: response.data.schPagev1ByPath.item.scFragments.find(
        (element) => element.scId === 'profile-intro'
      ).scContentFr.json[0].content[0].value,
      list: response.data.schPagev1ByPath.item.scFragments
        .map((element) => {
          if (
            element.scId !== 'profile-cards' &&
            element.scId !== 'profile-intro' &&
            element.scId !== 'looking-for-security-settings' &&
            element.scId !== 'back-to-my-dashboard' &&
            element.scId !== 'exit-beta-version'
          ) {
            return {
              title: element.scTitleFr,
              tasks: element.scItems.map((item) => {
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
          }
        })
        .filter((e) => e),
      lookingFor: {
        title: response.data.schPagev1ByPath.item.scFragments.find(
          (element) => element.scId === 'looking-for-security-settings'
        ).scContentFr.json[0].content[0].value,
        subText: [
          response.data.schPagev1ByPath.item.scFragments.find(
            (element) => element.scId === 'looking-for-security-settings'
          ).scContentFr.json[1].content[0].value,
          response.data.schPagev1ByPath.item.scFragments.find(
            (element) => element.scId === 'looking-for-security-settings'
          ).scContentFr.json[1].content[1].value,
        ],
      },
      backToDashboard: {
        id: response.data.schPagev1ByPath.item.scFragments.find(
          (element) => element.scId === 'back-to-my-dashboard'
        ).scId,
        btnText: response.data.schPagev1ByPath.item.scFragments.find(
          (element) => element.scId === 'back-to-my-dashboard'
        ).scTitleFr,
        btnLink: response.data.schPagev1ByPath.item.scFragments.find(
          (element) => element.scId === 'back-to-my-dashboard'
        ).scDestinationURLFr,
      },
    },
  }
  return mappedProfile
}
