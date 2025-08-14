import { buildAemUri } from '../../lib/links'
import { cachified } from 'cachified'
import { lruCache as cache, defaultTtl as ttl } from '../../lib/cache-utils'

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
      const targetUri = buildAemUri('getSchPersInfoBenefitV1')
      const response = await fetch(targetUri)
      if (!response.ok) return null
      return await response.json()
    },
    ttl,
  })
}

export async function getInboxPrefContent(): Promise<InboxPrefContent> {
  getCachedContent() // TODO: Fix
  const mappedProfile = {
    en: {
      pageName: 'Inbox notification preferences',
      introText:
        "The inbox is where you'll receive messages about your benefits and services. For now, you’ll find messages about:",
      emailQuestion:
        'Would you like to receive an email notification if there is a new debt statement in your inbox?',
      emailYes: 'Yes, email me',
      emailYesDesc:
        'By receiving email notifications you <b>will not</b> receive debt statements by paper mail. Help reduce paper waste by selecting this option.',
      emailNo: 'No, do not email me',
      emailNoDesc:
        'You’ll receive debt statements by paper mail. You can also view them in your inbox but you will not receive an email notification.',
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
    definition?: string
    emailQuestion?: string
    emailYes?: string
    emailNo?: string
  }
  fr?: {
    breadcrumb?: {
      link: string
      text: string
    }[]
    pageName: string
    introText?: string
    definition?: string
    emailQuestion?: string
    emailYes?: string
    emailNo?: string
  }
}
