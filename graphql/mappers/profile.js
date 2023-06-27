import clientQuery from '../client'
import { buildLink } from '../../lib/links'

export async function getProfileContent() {
  const query = require('../queries/profile.graphql')
  const response = await clientQuery(query)

  // LookingFor Fragment
  const enLookingForFragment = findFragmentByScId(
    response,
    'looking-for-security-settings'
  ).scContentEn
  const frLookingForFragment = findFragmentByScId(
    response,
    'looking-for-security-settings'
  ).scContentFr

  // BackToDashboard Fragment
  const backToDashboardFragment = findFragmentByScId(
    response,
    'back-to-my-dashboard'
  )

  // ProfileIntro Fragment
  const profileIntroFragment = findFragmentByScId(response, 'profile-intro')
  const mappedProfile = {
    en: {
      breadcrumb:
        response.data.schPagev1ByPath.item.scBreadcrumbParentPages.map(
          (level) => {
            return {
              link: level.scPageNameEn,
              text: level.scTitleEn,
            }
          }
        ),
      pageName: response.data.schPagev1ByPath.item.scTitleEn,
      heading: profileIntroFragment.scContentEn.json[0].content[0].value,
      list: response.data.schPagev1ByPath.item.scFragments
        .map((element) => {
          if (
            element.scId === 'ei-profile-list' ||
            element.scId === 'cpp-profile-list' ||
            element.scId === 'oas-profile-list'
          ) {
            return {
              id: element.scId,
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
        title: enLookingForFragment.json[0].content[0].value,
        subText: [
          enLookingForFragment.json[1].content[0].value,
          enLookingForFragment.json[1].content[1].value,
        ],
        link: 'security-settings',
        id: 'security-settings',
      },
      backToDashboard: {
        id: backToDashboardFragment.scId,
        btnText: backToDashboardFragment.scTitleEn,
        btnLink: backToDashboardFragment.scDestinationURLEn,
      },
    },
    fr: {
      breadcrumb:
        response.data.schPagev1ByPath.item.scBreadcrumbParentPages.map(
          (level) => {
            return {
              link: level.scPageNameFr,
              text: level.scTitleFr,
            }
          }
        ),
      pageName: response.data.schPagev1ByPath.item.scTitleFr,
      heading: profileIntroFragment.scContentFr.json[0].content[0].value,
      list: response.data.schPagev1ByPath.item.scFragments
        .map((element) => {
          if (
            element.scId === 'ei-profile-list' ||
            element.scId === 'cpp-profile-list' ||
            element.scId === 'oas-profile-list'
          ) {
            return {
              id: element.scId,
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
        title: frLookingForFragment.json[0].content[0].value,
        subText: [
          frLookingForFragment.json[1].content[0].value,
          frLookingForFragment.json[1].content[1].value,
        ],
        link: 'parametres-securite',
        id: 'security-settings',
      },
      backToDashboard: {
        id: backToDashboardFragment.scId,
        btnText: backToDashboardFragment.scTitleFr,
        btnLink: backToDashboardFragment.scDestinationURLFr,
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
