import { buildAemUri } from '../../lib/links'
import { cachified } from 'cachified'
import { lruCache as cache, defaultTtl as ttl } from '../../lib/cache-utils'
import {
  GetSchPageFragment,
  getTextFragmentContent,
  getLinksList,
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
        scFragments: Array<GetSchPageFragment>
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

  const introFragment = findFragmentByScId(response, 'content-inbox-intro')

  const doNotMissMessageFragment = findFragmentByScId(
    response,
    'content-dont-miss-a-message',
  )

  const linksFragment = findFragmentByScId(
    response,
    'list-inbox-other-benefits-services',
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
      doNotMissMessage: {
        fragmentHeading: doNotMissMessageFragment?.scHeadingEn ?? null,
        divisions:
          (await getTextFragmentContent(
            doNotMissMessageFragment?.scContentEn,
          )) ?? [],
        icon: doNotMissMessageFragment?.scIconCSS ?? null,
      },
      linksFragment: {
        divisions: getLinksList(linksFragment, 'en'),
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
      doNotMissMessage: {
        fragmentHeading: doNotMissMessageFragment?.scHeadingEn ?? null,
        divisions:
          (await getTextFragmentContent(
            doNotMissMessageFragment?.scContentFr,
          )) ?? [],
        icon: doNotMissMessageFragment?.scIconCSS ?? null,
      },
      linksFragment: {
        divisions: getLinksList(linksFragment, 'fr'),
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
    doNotMissMessage?: Section
    linksFragment?: Section
  }
  fr?: {
    breadcrumb?: {
      link: string
      text: string
    }[]
    pageName?: string
    intro?: Section
    doNotMissMessage?: Section
    linksFragment?: Section
  }
}
