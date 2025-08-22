import { buildAemUri } from '../../lib/links'
import { cachified } from 'cachified'
import { lruCache as cache, defaultTtl as ttl } from '../../lib/cache-utils'
//import resp from './sample-responses/inbox-notif-available.json'

// TODO: Standardize these across the mappers
interface ContentElement {
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

interface FragmentElement {
  scId: string
  scContentEn?: ContentElement
  scContentFr?: ContentElement
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
  scLegendEn?: string
  scLegendFr?: string
  scHeadingEn?: string
  scHeadingFr?: string
  scLinkTextEn?: string
  scLinkTextFr?: string
  scFragments: Array<FragmentElement>
}

interface GetSchInboxNotifAvailableV1 {
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
    key: `content-inbox-pref-now-available`,
    cache,
    getFreshValue: async (): Promise<GetSchInboxNotifAvailableV1 | null> => {
      const targetUri = buildAemUri('getSchInboxNotifAvailableV1')
      const response = await fetch(targetUri)
      if (!response.ok) return null
      return await response.json()
    },
    ttl,
  })
}

export async function getInboxNowAvailContent(): Promise<InboxNotifAvailContent> {
  const response = await getCachedContent()
  //const response = JSON.parse(JSON.stringify(resp))
  const mappedProfile = {
    en: {
      // TODO: Don't use indexes and search by ID instead
      breadcrumb:
        response?.data.schPageV1List.items[0].scBreadcrumbParentPages.map(
          (level: { scPageNameEn: string; scTitleEn: string }) => {
            return {
              link: level.scPageNameEn,
              text: level.scTitleEn,
            }
          },
        ),
      pageName: response?.data.schPageV1List.items[0].scTitleEn ?? '',
      // TODO: Make this an array and read it as an array
      paragraph1:
        response?.data.schPageV1List.items[0].scFragments[0].scContentEn
          ?.json[0].content[0].value,
      paragraph2:
        response?.data.schPageV1List.items[0].scFragments[0].scContentEn
          ?.json[1].content[0].value,
      buttonText:
        response?.data.schPageV1List.items[0].scFragments[1].scLinkTextEn,
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
      pageName: response?.data.schPageV1List.items[0].scTitleFr ?? '',
      paragraph1:
        response?.data.schPageV1List.items[0].scFragments[0].scContentFr
          ?.json[0].content[0].value,
      paragraph2:
        response?.data.schPageV1List.items[0].scFragments[0].scContentFr
          ?.json[1].content[0].value,
      buttonText:
        response?.data.schPageV1List.items[0].scFragments[1].scLinkTextFr,
    },
  }
  return mappedProfile
}

export interface InboxNotifAvailContent {
  err?: string
  en?: {
    breadcrumb?: {
      link: string
      text: string
    }[]
    pageName: string
    paragraph1?: string
    paragraph2?: string
    buttonText?: string
  }
  fr?: {
    breadcrumb?: {
      link: string
      text: string
    }[]
    pageName: string
    paragraph1?: string
    paragraph2?: string
    buttonText?: string
  }
}
