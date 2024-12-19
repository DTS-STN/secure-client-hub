import { buildAemUri, buildLink } from '../../lib/links'
import { cachified } from 'cachified'
import { lruCache as cache, defaultTtl as ttl } from '../../lib/cache-utils'

interface GetSchSecuritySettingsV2 {
  data: {
    schPageV1List: {
      items: Array<{
        _path: string
        scPageNameEn: string
        scPageNameFr: string
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
          scContentEn?: {
            json: Array<{
              nodeType: string
              content: Array<{
                nodeType: string
                value: string
                data?: {
                  href: string
                }
                content?: Array<null>
              }>
              style?: string
            }>
          }
          scFragments?: Array<{
            scId: string
            scLinkTextEn: string
            scLinkTextFr: string
            scLinkTextAssistiveEn: string
            scLinkTextAssistiveFr: string
            schURLType: string
            scDestinationURLEn: string
            scDestinationURLFr: string
            scDescriptionEn: {
              json: Array<{
                nodeType: string
                content: Array<{
                  nodeType: string
                  value: string
                }>
              }>
            }
            scDescriptionFr: {
              json: Array<{
                nodeType: string
                content: Array<{
                  nodeType: string
                  value: string
                }>
              }>
            }
            scButtonType: null
            scIconCSS: null
            scShortTitleEn: null
            scShortTitleFr: null
          }>
          scDestinationURLEn?: string
          scDestinationURLFr?: string
          scButtonType?: Array<string>
          scTitleEn?: string
          scTitleFr?: string
        }>
      }>
    }
  }
}

const getCachedContent = () => {
  return cachified({
    key: `content-security-settings`,
    cache,
    getFreshValue: async (): Promise<GetSchSecuritySettingsV2 | null> => {
      const targetUri = buildAemUri('getSchSecuritySettingsV2')
      const response = await fetch(targetUri)
      if (!response.ok) return null
      return await response.json()
    },
    ttl,
  })
}

export async function getSecuritySettingsContent(): Promise<SecuritySettingsContent> {
  const response = await getCachedContent()

  const enLookingForFragment =
    findFragmentByScId(response, 'looking-for-profile-settings')?.scContentEn ??
    null
  const enContentFragment =
    findFragmentByScId(response, 'security-settings-main-content')
      ?.scContentEn ?? null
  const frLookingForFragment =
    findFragmentByScId(response, 'looking-for-profile-settings')?.scContentFr ??
    null
  const frContentFragment =
    findFragmentByScId(response, 'security-settings-main-content')
      ?.scContentFr ?? null

  const securityQuestions =
    findFragmentByScId(
      response,
      'security-settings-main-content',
    )?.scFragments?.find(
      ({ scId }: { scId: string }) => scId === 'security-questions',
    ) ?? null

  const mappedSecurity = {
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
      pageName: response?.data.schPageV1List.items[0].scPageNameEn,
      heading: response?.data.schPageV1List.items[0].scTitleEn,
      subHeading: enContentFragment?.json[0].content[0].value,
      lookingFor: {
        title: enLookingForFragment?.json[0].content[0].value,
        subText: enLookingForFragment?.json[1].content.map(
          ({ value }: { value: string }) => {
            return value || null
          },
        ),
        link: '/profile',
        id: 'profile',
      },
      securityQuestions: {
        linkTitle: {
          text: securityQuestions?.scLinkTextEn,
          link: buildLink(
            securityQuestions?.schURLType,
            securityQuestions?.scDestinationURLEn ?? '',
          ),
        },
        subTitle: securityQuestions?.scDescriptionEn.json[0].content[0].value,
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
      pageName: response?.data.schPageV1List.items[0].scPageNameFr,
      heading: response?.data.schPageV1List.items[0].scTitleFr,
      subHeading: frContentFragment?.json[0].content[0].value,
      lookingFor: {
        title: frLookingForFragment?.json[0].content[0].value,
        subText: frLookingForFragment?.json[1].content.map(
          ({ value }: { value: string }) => {
            return value || null
          },
        ),
        link: '/fr/profil',
        id: 'profile',
      },
      securityQuestions: {
        linkTitle: {
          text: securityQuestions?.scLinkTextFr,
          link: buildLink(
            securityQuestions?.schURLType,
            securityQuestions?.scDestinationURLFr ?? '',
          ),
        },
        subTitle: securityQuestions?.scDescriptionFr.json[0].content[0].value,
      },
    },
  }
  return mappedSecurity
}

const findFragmentByScId = (
  res: GetSchSecuritySettingsV2 | null,
  id: string,
) => {
  return (
    res?.data.schPageV1List.items[0].scFragments.find(
      ({ scId }) => scId === id,
    ) ?? null
  )
}

// TODO: Figure out which of these actually need to be optional
export interface SecuritySettingsContent {
  err?: string
  en?: {
    breadcrumb: { link: string; text: string }[] | undefined
    pageName: string | undefined
    heading: string | undefined
    subHeading: string | undefined
    lookingFor: {
      title: string | undefined
      subText: (string | null)[] | undefined
      link: string
      id: string
    }
    securityQuestions: {
      linkTitle: { text: string | undefined; link: string }
      subTitle: string | undefined
    }
  }
  fr?: {
    breadcrumb: { link: string; text: string }[] | undefined
    pageName: string | undefined
    heading: string | undefined
    subHeading: string | undefined
    lookingFor: {
      title: string | undefined
      subText: (string | null)[] | undefined
      link: string
      id: string
    }
    securityQuestions: {
      linkTitle: { text: string | undefined; link: string }
      subTitle: string | undefined
    }
  }
}
