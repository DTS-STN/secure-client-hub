import { buildAemUri, buildLink } from '../../lib/links'
import { cachified } from 'cachified'
import { lruCache as cache, defaultTtl as ttl } from '../../lib/cache-utils'

interface GetSchProfilePrefV1 {
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
            scIconCSS?: string
            schURLType?: string
            scDestinationURLEn: string
            scDestinationURLFr: string
            scDescriptionEn: {
              json: Array<{
                nodeType?: string
                content: Array<{
                  nodeType?: string
                  value: string
                }>
              }>
            }
            scDescriptionFr: {
              json: Array<{
                nodeType?: string
                content: Array<{
                  nodeType?: string
                  value: string
                }>
              }>
            }
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
    key: `content-profile-and-preferences`,
    cache,
    getFreshValue: async (): Promise<GetSchProfilePrefV1 | null> => {
      const targetUri = buildAemUri('TESTgetSchProfilePreferencesV1')
      const response = await fetch(targetUri)
      if (!response.ok) return null
      return await response.json()
    },
    ttl,
  })
}

export async function getProfilePrefContent(): Promise<ProfilePrefContent> {
  const response = await getCachedContent()

  const introFragment = findFragmentByScId(
    response,
    'content-profile-preferences-intro',
  )
  const profileAccountFragment = findFragmentByScId(
    response,
    'list-profile-account-information',
  )
  const profilePersonalFragment = findFragmentByScId(
    response,
    'list-profile-personal-information',
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
      introText: introFragment?.scContentEn?.json[0].content[0].value,
      profileAccountInfo: {
        sectionName: profileAccountFragment?.scTitleEn,
        elements: profileAccountFragment?.scItems?.map((element) => {
          return {
            cardId: element.scId,
            cardName: element.scLinkTextEn,
            cardHref: buildLink(element.schURLType, element.scDestinationURLEn),
            description: element.scDescriptionEn.json[0].content[0].value,
            prefixIcon: element.scIconCSS,
          }
        }),
      },
      profilePersonalInfo: {
        sectionName: profilePersonalFragment?.scTitleEn,
        elements: profilePersonalFragment?.scItems?.map((element) => {
          return {
            cardId: element.scId,
            cardName: element.scLinkTextEn,
            cardHref: buildLink(element.schURLType, element.scDestinationURLEn),
            description: element.scDescriptionEn.json[0].content[0].value,
            prefixIcon: element.scIconCSS,
          }
        }),
      },
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
      profileAccountInfo: {
        sectionName: profileAccountFragment?.scTitleFr,
        elements: profileAccountFragment?.scItems?.map((element) => {
          return {
            cardId: element.scId,
            cardName: element.scLinkTextFr,
            cardHref: buildLink(element.schURLType, element.scDestinationURLFr),
            description: element.scDescriptionFr.json[0].content[0].value,
            prefixIcon: element.scIconCSS,
          }
        }),
      },
      profilePersonalInfo: {
        sectionName: profilePersonalFragment?.scTitleFr,
        elements: profilePersonalFragment?.scItems?.map((element) => {
          return {
            cardId: element.scId,
            cardName: element.scLinkTextFr,
            cardHref: buildLink(element.schURLType, element.scDestinationURLFr),
            description: element.scDescriptionFr.json[0].content[0].value,
            prefixIcon: element.scIconCSS,
          }
        }),
      },
    },
  }
  return mappedProfile
}

const findFragmentByScId = (res: GetSchProfilePrefV1 | null, id: string) => {
  return (
    res?.data.schPageV1List.items[0].scFragments.find(
      ({ scId }) => scId === id,
    ) ?? null
  )
}

export interface ProfileListElementContent {
  cardId: string
  cardName: string
  cardHref: string
  description?: string
  prefixIcon?: string
}

export interface ProfileListContent {
  sectionName?: string
  elements?: ProfileListElementContent[]
}

export interface ProfilePrefContent {
  err?: string
  en?: {
    breadcrumb?: {
      link: string
      text: string
    }[]
    pageName?: string
    introText?: string
    profileAccountInfo?: ProfileListContent
    profilePersonalInfo?: ProfileListContent
  }
  fr?: {
    breadcrumb?: {
      link: string
      text: string
    }[]
    pageName?: string
    introText?: string
    profileAccountInfo?: ProfileListContent
    profilePersonalInfo?: ProfileListContent
  }
}
