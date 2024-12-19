import { cachified } from 'cachified'
import { lruCache as cache, defaultTtl as ttl } from '../../lib/cache-utils'
import { buildAemUri } from '../../lib/links'

interface GetSchAuthModalsV2 {
  data: {
    staySignedIn: {
      items: Array<{
        _path: string
        scId: string
        scHeadingEn: string
        scHeadingFr: string
        scContentEn: {
          json: Array<{
            nodeType: string
            content: Array<{
              nodeType: string
              value: string
              format?: {
                variants: Array<string>
              }
            }>
          }>
        }
        scContentFr: {
          json: Array<{
            nodeType: string
            content: Array<{
              nodeType: string
              value: string
              format?: {
                variants: Array<string>
              }
            }>
          }>
        }
        scFragments: Array<{
          scId: string
          scLinkTextEn: string
          scLinkTextFr: string
        }>
      }>
    }
    youHaveBeenSignedOut: {
      items: Array<{
        _path: string
        scId: string
        scHeadingEn: string
        scHeadingFr: string
        scContentEn: {
          json: Array<{
            nodeType: string
            content: Array<{
              nodeType: string
              value: string
            }>
          }>
        }
        scContentFr: {
          json: Array<{
            nodeType: string
            content: Array<{
              nodeType: string
              value: string
            }>
          }>
        }
        scFragments: Array<{
          scId: string
          scLinkTextEn: string
          scLinkTextFr: string
          scDestinationURLEn?: string
          scDestinationURLFr?: string
        }>
      }>
    }
  }
}

const getCachedContent = () => {
  return cachified({
    key: `content-auth-modals`,
    cache,
    getFreshValue: async (): Promise<GetSchAuthModalsV2 | null> => {
      const targetUri = buildAemUri('getSchAuthModalsV2')
      const response = await fetch(targetUri)
      if (!response.ok) return null
      return await response.json()
    },
    ttl,
  })
}

export async function getAuthModalsContent(): Promise<AuthModalsContent> {
  const response = await getCachedContent()
  const resSignedOutContent = response?.data.youHaveBeenSignedOut.items[0]
  const resStaySignedIn = response?.data.staySignedIn.items[0]

  const mappedPopupSignedOut = {
    en: {
      bannerBoldText: resSignedOutContent?.scContentEn.json[0].content[0].value,
      bannerText: resSignedOutContent?.scContentEn.json[0].content[0].value,
      bannerLink: resSignedOutContent?.scFragments[0].scLinkTextEn,
      bannerLinkHref: resSignedOutContent?.scFragments[0].scLinkTextEn,
      bannerButtonText: resSignedOutContent?.scFragments[0].scLinkTextEn,
      bannerButtonLink:
        resSignedOutContent?.scFragments[0].scDestinationURLEn || '/',
      icon: resSignedOutContent?.scFragments[0].scLinkTextEn,
      bannerHeading: resSignedOutContent?.scHeadingEn,
    },
    fr: {
      bannerBoldText: resSignedOutContent?.scContentFr.json[0].content[0].value,
      bannerText: resSignedOutContent?.scContentFr.json[0].content[0].value,
      bannerLink: resSignedOutContent?.scFragments[0].scLinkTextFr,
      bannerLinkHref: resSignedOutContent?.scFragments[0].scLinkTextFr,
      bannerButtonText: resSignedOutContent?.scFragments[0].scLinkTextFr,
      bannerButtonLink:
        resSignedOutContent?.scFragments[0].scDestinationURLFr || '/',
      icon: resSignedOutContent?.scFragments[0].scLinkTextFr,
      bannerHeading: resSignedOutContent?.scHeadingFr,
    },
  }

  const mappedPopupStaySignedIn = {
    en: {
      bannerHeading: resStaySignedIn?.scHeadingEn,
      signOutLinkText: resStaySignedIn?.scFragments.filter(
        (fragment) => fragment.scId === 'sign-out',
      )[0].scLinkTextEn,
      staySignedInLinktext: resStaySignedIn?.scFragments.filter(
        (fragment) => fragment.scId === 'stay-signed-in',
      )[0].scLinkTextEn,
      bannerContent: resStaySignedIn?.scContentEn.json.map((data) =>
        data.content.map((paragraph) => paragraph.value),
      ),
      bannerMinutesAnd: 'minutes and',
      bannerSeconds: 'seconds',
    },
    fr: {
      bannerHeading: resStaySignedIn?.scHeadingFr,
      signOutLinkText: resStaySignedIn?.scFragments.filter(
        (fragment) => fragment.scId === 'sign-out',
      )[0].scLinkTextFr,
      staySignedInLinktext: resStaySignedIn?.scFragments.filter(
        (fragment) => fragment.scId === 'stay-signed-in',
      )[0].scLinkTextFr,
      bannerContent: resStaySignedIn?.scContentFr.json.map((data) =>
        data.content.map((paragraph) => paragraph.value),
      ),
      bannerMinutesAnd: 'minutes et',
      bannerSeconds: 'secondes',
    },
  }

  return { mappedPopupStaySignedIn, mappedPopupSignedOut }
}

// TODO: Check which of these properties should actually be optional and switch to using a question mark instead
export interface AuthModalsContent {
  err?: string
  mappedPopupStaySignedIn?: {
    en: {
      bannerHeading: string | undefined
      signOutLinkText: string | undefined
      staySignedInLinktext: string | undefined
      bannerContent: string[][] | undefined
      bannerMinutesAnd: string
      bannerSeconds: string
    }
    fr: {
      bannerHeading: string | undefined
      signOutLinkText: string | undefined
      staySignedInLinktext: string | undefined
      bannerContent: string[][] | undefined
      bannerMinutesAnd: string
      bannerSeconds: string
    }
  }
  mappedPopupSignedOut?: {
    en: {
      bannerBoldText: string | undefined
      bannerText: string | undefined
      bannerLink: string | undefined
      bannerLinkHref: string | undefined
      bannerButtonText: string | undefined
      bannerButtonLink: string
      icon: string | undefined
      bannerHeading: string | undefined
    }
    fr: {
      bannerBoldText: string | undefined
      bannerText: string | undefined
      bannerLink: string | undefined
      bannerLinkHref: string | undefined
      bannerButtonText: string | undefined
      bannerButtonLink: string
      icon: string | undefined
      bannerHeading: string | undefined
    }
  }
}
