import { buildAemUri, buildLink } from '../../lib/links'
import { cachified } from 'cachified'
import { lruCache as cache, defaultTtl as ttl } from '../../lib/cache-utils'
//import resp from './sample-responses/pers-info-benefit.json'

interface FragmentElement {
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
  }>
  scDestinationURLEn?: string
  scDestinationURLFr?: string
}

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
        scFragments: Array<FragmentElement>
      }>
    }
  }
}

const getCachedContent = () => {
  return cachified({
    key: `content-profile`,
    cache,
    getFreshValue: async (): Promise<GetSchProfileV2 | null> => {
      const targetUri = buildAemUri('TESTgetSchPersInfoBenefitV1')
      const response = await fetch(targetUri)
      if (!response.ok) return null
      return await response.json()
    },
    ttl,
  })
}

export async function getProfileContent(): Promise<ProfileContent> {
  const response = await getCachedContent()
  //const response = JSON.parse(JSON.stringify(resp))

  // ProfileIntro Fragment
  const profileIntroFragment = findFragmentByScId(
    response,
    'content-personal-information-by-benefit-intro',
  )

  const mappedProfile = {
    en: {
      breadcrumb:
        response?.data.schPageV1List.items[0].scBreadcrumbParentPages.map(
          (level: { scPageNameEn: string; scTitleEn: string }) => {
            return {
              link: level.scPageNameEn,
              text: level.scTitleEn,
            }
          },
        ),
      pageName: response?.data.schPageV1List.items[0].scTitleEn,
      heading: profileIntroFragment?.scContentEn?.json[0].content[0].value,
      list: response?.data.schPageV1List.items[0].scFragments
        .filter((element: FragmentElement) => {
          return (
            element.scId === 'ei-profile-list' ||
            element.scId === 'cpp-profile-list' ||
            element.scId === 'sin-profile-list'
          )
        })
        .map((element: FragmentElement) => {
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
              }
            }),
          }
        }),
    },
    fr: {
      breadcrumb:
        response?.data.schPageV1List.items[0].scBreadcrumbParentPages.map(
          (level: { scPageNameFr: string; scTitleFr: string }) => {
            return {
              link: level.scPageNameFr,
              text: level.scTitleFr,
            }
          },
        ),
      pageName: response?.data.schPageV1List.items[0].scTitleFr,
      heading: profileIntroFragment?.scContentFr?.json[0].content[0].value,
      list: response?.data.schPageV1List.items[0].scFragments
        .filter((element: FragmentElement) => {
          return (
            element.scId === 'ei-profile-list' ||
            element.scId === 'cpp-profile-list' ||
            element.scId === 'sin-profile-list'
          )
        })
        .map((element: FragmentElement) => {
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
              }
            }),
          }
        }),
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
                        // betaPopUp: boolean
                      }[]
                    | undefined
                }
              | undefined
            )[]
          | undefined
        // lookingFor: {
        //   title: string | undefined
        //   subText: (string | undefined)[]
        //   link: string
        //   id: string
        // }
        // backToDashboard: {
        //   id: string | undefined
        //   btnText: string | undefined
        //   btnLink: string | undefined
        // }
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
                    // betaPopUp: boolean
                  }[]
                | undefined
            }
          | undefined
        )[]
      | undefined
    // lookingFor: {
    //   title: string | undefined
    //   subText: (string | undefined)[]
    //   link: string
    //   id: string
    // }
    // backToDashboard:
    //   | {
    //       id: string | undefined
    //       btnText: string | undefined
    //       btnLink: string | undefined
    //     }
    //   | undefined
  }
}
