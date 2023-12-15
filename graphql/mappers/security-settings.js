import { buildLink } from '../../lib/links'
import { cachified } from 'cachified'
import { lruCache as cache, defaultTtl as ttl } from '../../lib/cache-utils'

function getCachedContent() {
  return cachified({
    key: `content-security-settings`,
    cache,
    async getFreshValue() {
      const response = await fetch(
        `${process.env.AEM_GRAPHQL_ENDPOINT}getSchSecuritySettingsV1`
      )

      if (!response.ok) {
        return null
      }

      return response.json()
    },
    ttl,
  })
}

export async function getSecuritySettingsContent() {
  const response = await getCachedContent()

  const enLookingForFragment = findFragmentByScId(
    response,
    'looking-for-profile-settings'
  ).scContentEn
  const enContentFragment = findFragmentByScId(
    response,
    'security-settings-main-content'
  ).scContentEn
  const frLookingForFragment = findFragmentByScId(
    response,
    'looking-for-profile-settings'
  ).scContentFr
  const frContentFragment = findFragmentByScId(
    response,
    'security-settings-main-content'
  ).scContentFr

  const securityQuestions = findFragmentByScId(
    response,
    'security-settings-main-content'
  ).scFragments.find((element) => element.scId === 'security-questions')
  console.log(securityQuestions)

  const mappedSecurity = {
    en: {
      breadcrumb:
        response.data.schPageV1ByPath.item.scBreadcrumbParentPages.map(
          (level) => {
            return {
              link: level.scPageNameEn,
              text: level.scTitleEn,
            }
          }
        ),
      pageName: response.data.schPageV1ByPath.item.scPageNameEn,
      heading: response.data.schPageV1ByPath.item.scTitleEn,
      subHeading: enContentFragment.json[0].content[0].value,
      lookingFor: {
        title: enLookingForFragment.json[0].content[0].value,
        subText: enLookingForFragment.json[1].content.map((element) => {
          return element.value || null
        }),
        link: '/profile',
        id: 'profile',
      },
      securityQuestions: {
        linkTitle: {
          text: securityQuestions.scLinkTextEn,
          link: buildLink(
            securityQuestions.schURLType,
            securityQuestions.scDestinationURLEn
          ),
        },
        schBetaPopUp: securityQuestions.schBetaPopUp,
        subTitle: securityQuestions.scDescriptionEn.json[0].content[0].value,
      },
    },
    fr: {
      breadcrumb:
        response.data.schPageV1ByPath.item.scBreadcrumbParentPages.map(
          (level) => {
            return {
              link: level.scPageNameFr,
              text: level.scTitleFr,
            }
          }
        ),
      pageName: response.data.schPageV1ByPath.item.scPageNameFr,
      heading: response.data.schPageV1ByPath.item.scTitleFr,
      subHeading: frContentFragment.json[0].content[0].value,
      lookingFor: {
        title: frLookingForFragment.json[0].content[0].value,
        subText: frLookingForFragment.json[1].content.map((element) => {
          return element.value || null
        }),
        link: '/fr/profil',
        id: 'profile',
      },
      securityQuestions: {
        linkTitle: {
          text: securityQuestions.scLinkTextFr,
          link: buildLink(
            securityQuestions.schURLType,
            securityQuestions.scDestinationURLFr
          ),
        },
        popUpBeta: securityQuestions.schBetaPopUp,
        subTitle: securityQuestions.scDescriptionFr.json[0].content[0].value,
      },
    },
  }
  return mappedSecurity
}

const findFragmentByScId = (res, id) => {
  return res.data.schPageV1ByPath.item.scFragments.find(
    (element) => element.scId === id
  )
}
