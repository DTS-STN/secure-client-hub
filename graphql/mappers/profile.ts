import { buildLink } from '../../lib/links'
import { cachified } from 'cachified'
import { lruCache as cache, defaultTtl as ttl } from '../../lib/cache-utils'

interface GetSchProfileV1 {
  data: {
    schPageV1ByPath: {
      item: {
        _path: string
        scTitleEn: string
        scTitleFr: string
        scBreadcrumbParentPages: Array<{
          scId: string
          scTitleEn: string
          scTitleFr: string
          scPageNameEn: string
          scPageNameFr: string
        }>
        scFragments: Array<{
          scId: string
          scContentEn?: {
            json: Array<{
              nodeType: string
              content: Array<{
                nodeType: string
                value: string
                data?: {
                  href: string
                }
              }>
              style?: string
            }>
          }
          scContentFr?: {
            json: Array<{
              nodeType: string
              content: Array<{
                nodeType: string
                value: string
                data?: {
                  href: string
                }
              }>
              style?: string
            }>
          }
          scTitleEn?: string
          scTitleFr?: string
          scItems?: Array<{
            scId: string
            scLinkTextEn: string
            scLinkTextFr: string
            scLinkTextAssistiveEn: string
            scLinkTextAssistiveFr: string
            scIconCSS: string
            schURLType: string
            scDestinationURLEn: string
            scDestinationURLFr: string
            schBetaPopUp: boolean
          }>
          scDestinationURLEn?: string
          scDestinationURLFr?: string
        }>
      }
    }
  }
}

const getCachedContent = () => {
  return cachified({
    key: `content-profile`,
    cache,
    getFreshValue: async () => {
      const response = await fetch(
        `${process.env.AEM_GRAPHQL_ENDPOINT}getSchProfileV1`
      )
      if (!response.ok) return null
      return (await response.json()) as GetSchProfileV1
    },
    ttl,
  })
}

export async function getProfileContent() {
  const response = await getCachedContent()

  // LookingFor Fragment
  const enLookingForFragment =
    findFragmentByScId(response, 'looking-for-security-settings')
      ?.scContentEn ?? null
  const frLookingForFragment =
    findFragmentByScId(response, 'looking-for-security-settings')
      ?.scContentFr ?? null

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
        response?.data.schPageV1ByPath.item.scBreadcrumbParentPages.map(
          (level) => {
            return {
              link: level.scPageNameEn,
              text: level.scTitleEn,
            }
          }
        ),
      pageName: response?.data.schPageV1ByPath.item.scTitleEn,
      heading: profileIntroFragment?.scContentEn?.json[0].content[0].value,
      list: response?.data.schPageV1ByPath.item.scFragments
        .map((element) => {
          if (
            element.scId === 'ei-profile-list' ||
            element.scId === 'cpp-profile-list' ||
            element.scId === 'oas-profile-list' ||
            element.scId === 'sin-profile-list'
          ) {
            return {
              id: element.scId,
              title: element.scTitleEn,
              tasks: element.scItems?.map((item) => {
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
        title: enLookingForFragment?.json[0].content[0].value,
        subText: [
          enLookingForFragment?.json[1].content[0].value,
          enLookingForFragment?.json[1].content[1].value,
        ],
        link: 'security-settings',
        id: 'security-settings',
      },
      backToDashboard: {
        id: backToDashboardFragment?.scId,
        btnText: backToDashboardFragment?.scTitleEn,
        btnLink: backToDashboardFragment?.scDestinationURLEn,
      },
    },
    fr: {
      breadcrumb:
        response?.data.schPageV1ByPath.item.scBreadcrumbParentPages.map(
          (level) => {
            return {
              link: level.scPageNameFr,
              text: level.scTitleFr,
            }
          }
        ),
      pageName: response?.data.schPageV1ByPath.item.scTitleFr,
      heading: profileIntroFragment?.scContentFr?.json[0].content[0].value,
      list: response?.data.schPageV1ByPath.item.scFragments
        .map((element) => {
          if (
            element.scId === 'ei-profile-list' ||
            element.scId === 'cpp-profile-list' ||
            element.scId === 'oas-profile-list' ||
            element.scId === 'sin-profile-list'
          ) {
            return {
              id: element.scId,
              title: element.scTitleFr,
              tasks: element.scItems?.map((item) => {
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
        title: frLookingForFragment?.json[0].content[0].value,
        subText: [
          frLookingForFragment?.json[1].content[0].value,
          frLookingForFragment?.json[1].content[1].value,
        ],
        link: 'parametres-securite',
        id: 'security-settings',
      },
      backToDashboard: {
        id: backToDashboardFragment?.scId,
        btnText: backToDashboardFragment?.scTitleFr,
        btnLink: backToDashboardFragment?.scDestinationURLFr,
      },
    },
  }
  return mappedProfile
}

const findFragmentByScId = (res: GetSchProfileV1 | null, id: string) => {
  return (
    res?.data.schPageV1ByPath.item.scFragments.find(
      ({ scId }) => scId === id
    ) ?? null
  )
}
