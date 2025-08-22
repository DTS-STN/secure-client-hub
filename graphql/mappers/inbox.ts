import { buildAemUri } from '../../lib/links'
import { cachified } from 'cachified'
import { lruCache as cache, defaultTtl as ttl } from '../../lib/cache-utils'
import {
  GetSchTextFragmentContent,
  getTextFragmentContent,
  Section,
} from '../../lib/graphql-utils'
// import inboxAem from './inbox-aem.json'
interface GetSchInboxPageV1 {
  data: {
    schPageV1List: {
      items: Array<{
        _path: string
        scTitleEn: string
        scTitleFr: string
        scBreadcrumbParentPages: Array<{
          _path: string
          scId: string
          scTitleEn: string
          scTitleFr: string
          scPageNameEn: string
          scPageNameFr: string
        }>
        scFragments: Array<{
          _path: string
          scId: string
          scHeadingEn?: string | null
          scHeadingFr?: string | null
          scContentEn?: GetSchTextFragmentContent
          scContentFr?: GetSchTextFragmentContent
          scIconCSS: string | null
        }>
      }>
    }
  }
}

const findFragmentByScId = (res: GetSchInboxPageV1 | null, id: string) => {
  return (
    res?.data.schPageV1List.items[0].scFragments.find(
      ({ scId }) => scId === id,
    ) ?? null
  )
}

export async function getInboxContent(): Promise<InboxContent> {
  const response = await getCachedContent()

  const introFragment = findFragmentByScId(
    response,
    'content-inbox-notification-preferences-intro',
  )
  const debtStatementsFragment = findFragmentByScId(
    response,
    'content-debt-statements',
  )
  const doNotMissMessageFragment = findFragmentByScId(
    response,
    'content-dont-miss-a-message',
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
      intro: {
        fragmentHeading: introFragment?.scHeadingEn ?? null,
        divisions:
          (await getTextFragmentContent(introFragment?.scContentEn)) ?? [],
        icon: introFragment?.scIconCSS ?? null,
      },
      debtStatements: {
        fragmentHeading: debtStatementsFragment?.scHeadingEn ?? null,
        divisions:
          (await getTextFragmentContent(debtStatementsFragment?.scContentEn)) ??
          [],
        icon: debtStatementsFragment?.scIconCSS ?? null,
      },
      doNotMissMessage: {
        fragmentHeading: doNotMissMessageFragment?.scHeadingEn ?? null,
        divisions:
          (await getTextFragmentContent(
            doNotMissMessageFragment?.scContentEn,
          )) ?? [],
        icon: doNotMissMessageFragment?.scIconCSS ?? null,
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
      intro: {
        fragmentHeading: introFragment?.scHeadingEn ?? null,
        divisions:
          (await getTextFragmentContent(introFragment?.scContentFr)) ?? [],
        icon: introFragment?.scIconCSS ?? null,
      },
      debtStatements: {
        fragmentHeading: debtStatementsFragment?.scHeadingEn ?? null,
        divisions:
          (await getTextFragmentContent(debtStatementsFragment?.scContentFr)) ??
          [],
        icon: debtStatementsFragment?.scIconCSS ?? null,
      },
      doNotMissMessage: {
        fragmentHeading: doNotMissMessageFragment?.scHeadingEn ?? null,
        divisions:
          (await getTextFragmentContent(
            doNotMissMessageFragment?.scContentFr,
          )) ?? [],
        icon: doNotMissMessageFragment?.scIconCSS ?? null,
      },
    },
  }
  return mappedProfile
}

const getCachedContent = () => {
  return cachified({
    key: `content-inbox`,
    cache,
    getFreshValue: async (): Promise<GetSchInboxPageV1 | null> => {
      // return inboxAem
      const targetUri = buildAemUri('getSchInboxV1')
      const response = await fetch(targetUri)
      if (!response.ok) return null
      return await response.json()
    },
    ttl,
  })
}

export interface InboxContent {
  err?: string
  en?: {
    breadcrumb?: {
      link: string
      text: string
    }[]
    pageName?: string
    intro?: Section
    debtStatements?: Section
    doNotMissMessage?: Section
  }
  fr?: {
    breadcrumb?: {
      link: string
      text: string
    }[]
    pageName?: string
    intro?: Section
    debtStatements?: Section
    doNotMissMessage?: Section
  }
}
