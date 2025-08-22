import { buildAemUri } from '../../lib/links'
import { cachified } from 'cachified'
import { lruCache as cache, defaultTtl as ttl } from '../../lib/cache-utils'
//import resp from './sample-responses/inbox-notif-pref.json'

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

interface GetSchInboxPrefV1 {
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
    key: `content-inbox-pref`,
    cache,
    getFreshValue: async (): Promise<GetSchInboxPrefV1 | null> => {
      const targetUri = buildAemUri('getSchInboxNotifPrefV1')
      const response = await fetch(targetUri)
      if (!response.ok) return null
      return await response.json()
    },
    ttl,
  })
}

export async function getInboxPrefContent(): Promise<InboxPrefContent> {
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
      introText:
        response?.data.schPageV1List.items[0].scFragments[0].scContentEn
          ?.json[0].content[0].value,
      notiBlockLabel:
        response?.data.schPageV1List.items[0].scFragments[1].scContentEn
          ?.json[0].content[0].value,
      notiBlockValue:
        response?.data.schPageV1List.items[0].scFragments[1].scContentEn
          ?.json[0].content[1].value,
      emailQuestion:
        response?.data.schPageV1List.items[0].scFragments[2].scLegendEn,
      emailYes:
        response?.data.schPageV1List.items[0].scFragments[2].scFragments[0]
          .scHeadingEn,
      emailYesDesc:
        response?.data.schPageV1List.items[0].scFragments[2].scFragments[0]
          .scContentEn?.json[0].content[0].value,
      emailNo:
        response?.data.schPageV1List.items[0].scFragments[2].scFragments[1]
          .scHeadingEn,
      emailNoDesc:
        response?.data.schPageV1List.items[0].scFragments[2].scFragments[1]
          .scContentEn?.json[0].content[0].value,
      buttonText:
        response?.data.schPageV1List.items[0].scFragments[3].scLinkTextEn,
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
      introText:
        response?.data.schPageV1List.items[0].scFragments[0].scContentFr
          ?.json[0].content[0].value,
      notiBlockLabel:
        response?.data.schPageV1List.items[0].scFragments[1].scContentFr
          ?.json[0].content[0].value,
      notiBlockValue:
        response?.data.schPageV1List.items[0].scFragments[1].scContentFr
          ?.json[0].content[1].value,
      emailQuestion:
        response?.data.schPageV1List.items[0].scFragments[2].scLegendFr,
      emailYes:
        response?.data.schPageV1List.items[0].scFragments[2].scFragments[0]
          .scHeadingFr,
      emailYesDesc:
        response?.data.schPageV1List.items[0].scFragments[2].scFragments[0]
          .scContentFr?.json[0].content[0].value,
      emailNo:
        response?.data.schPageV1List.items[0].scFragments[2].scFragments[1]
          .scHeadingFr,
      emailNoDesc:
        response?.data.schPageV1List.items[0].scFragments[2].scFragments[1]
          .scContentFr?.json[0].content[0].value,
      buttonText:
        response?.data.schPageV1List.items[0].scFragments[3].scLinkTextFr,
    },
  }
  return mappedProfile
}

export interface InboxPrefContent {
  err?: string
  en?: {
    breadcrumb?: {
      link: string
      text: string
    }[]
    pageName: string
    introText?: string
    notiBlockLabel?: string
    notiBlockValue?: string
    emailQuestion?: string
    emailYes?: string
    emailNo?: string
    emailYesDesc?: string
    emailNoDesc?: string
    buttonText?: string
  }
  fr?: {
    breadcrumb?: {
      link: string
      text: string
    }[]
    pageName: string
    introText?: string
    notiBlockLabel?: string
    notiBlockValue?: string
    emailQuestion?: string
    emailYes?: string
    emailNo?: string
    emailYesDesc?: string
    emailNoDesc?: string
    buttonText?: string
  }
}
