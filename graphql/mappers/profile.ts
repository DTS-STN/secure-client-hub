import { buildAemUri, buildLink } from '../../lib/links'
import { cachified } from 'cachified'
import { lruCache as cache, defaultTtl as ttl } from '../../lib/cache-utils'

interface GetSchProfileV2 {
  data: {
    schPageV1List: {
      items: Array<{
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
      }>
    }
  }
}

const getCachedContent = () => {
  return cachified({
    key: `content-profile`,
    cache,
    getFreshValue: async (): Promise<GetSchProfileV2 | null> => {
      const targetUri = buildAemUri('getSchProfileV2')
      const response = await fetch(targetUri)
      if (!response.ok) return null
      return await response.json()
    },
    ttl,
  })
}

export async function getProfileContent(): Promise<ProfileContent> {
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
    'back-to-my-dashboard',
  )

  // ProfileIntro Fragment
  const profileIntroFragment = findFragmentByScId(response, 'profile-intro')

  const mappedProfile = {
    en: {
      breadcrumb:
        response?.data.schPageV1List.items[0].scBreadcrumbParentPages.map(
          (level) => {
            return {
              link: level.scPageNameEn,
              text: level.scTitleEn,
            }
          },
        ),
      pageName: response?.data.schPageV1List.items[0].scTitleEn,
      heading: profileIntroFragment?.scContentEn?.json[0].content[0].value,
      list: response?.data.schPageV1List.items[0].scFragments
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
        response?.data.schPageV1List.items[0].scBreadcrumbParentPages.map(
          (level) => {
            return {
              link: level.scPageNameFr,
              text: level.scTitleFr,
            }
          },
        ),
      pageName: response?.data.schPageV1List.items[0].scTitleFr,
      heading: profileIntroFragment?.scContentFr?.json[0].content[0].value,
      list: response?.data.schPageV1List.items[0].scFragments
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

const findFragmentByScId = (res: GetSchProfileV2 | null, id: string) => {
  return (
    res?.data.schPageV1List.items[0].scFragments.find(
      ({ scId }) => scId === id,
    ) ?? null
  )
}

// TODO: Check which of these properties should actually be optional and switch to using a question mark instead
export interface ProfileContent {
  err?: string
  en?:
    | {
        breadcrumb:
          | {
              link: string
              text: string
            }[]
          | undefined
        pageName: string | undefined
        heading: string | undefined
        list:
          | (
              | {
                  id: string
                  title: string | undefined
                  tasks:
                    | {
                        id: string
                        title: string
                        areaLabel: string
                        link: string
                        icon: string
                        betaPopUp: boolean
                      }[]
                    | undefined
                }
              | undefined
            )[]
          | undefined
        lookingFor: {
          title: string | undefined
          subText: (string | undefined)[]
          link: string
          id: string
        }
        backToDashboard: {
          id: string | undefined
          btnText: string | undefined
          btnLink: string | undefined
        }
        title?: string | undefined
      }
    | undefined
  fr?: {
    breadcrumb:
      | {
          link: string
          text: string
        }[]
      | undefined
    pageName: string | undefined
    heading: string | undefined
    list:
      | (
          | {
              id: string
              title: string | undefined
              tasks:
                | {
                    id: string
                    title: string
                    areaLabel: string
                    link: string
                    icon: string
                    betaPopUp: boolean
                  }[]
                | undefined
            }
          | undefined
        )[]
      | undefined
    lookingFor: {
      title: string | undefined
      subText: (string | undefined)[]
      link: string
      id: string
    }
    backToDashboard:
      | {
          id: string | undefined
          btnText: string | undefined
          btnLink: string | undefined
        }
      | undefined
  }
}
