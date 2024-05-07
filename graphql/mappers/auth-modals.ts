import { cachified } from 'cachified'
import { lruCache as cache, defaultTtl as ttl } from '../../lib/cache-utils'

interface GetSchAuthModalsV1 {
  data: {
    staySignedIn: {
      item: {
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
      }
    }
    youHaveBeenSignedOut: {
      item: {
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
      }
    }
  }
}

const getCachedContent = () => {
  return cachified({
    key: `content-auth-modals`,
    cache,
    getFreshValue: async () => {
      const response = await fetch(
        `${process.env.AEM_GRAPHQL_ENDPOINT}getSchAuthModalsV1`,
      )
      if (!response.ok) return null
      return (await response.json()) as GetSchAuthModalsV1
    },
    ttl,
  })
}

export async function getAuthModalsContent() {
  const response = await getCachedContent()
  const resSignedOutContent = response?.data.youHaveBeenSignedOut.item
  const resStaySignedIn = response?.data.staySignedIn.item

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
