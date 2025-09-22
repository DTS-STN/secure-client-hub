import { buildAemUri } from '../../lib/links'
import { cachified } from 'cachified'
import { lruCache as cache, defaultTtl as ttl } from '../../lib/cache-utils'
// import defaultResponse from './sample-responses/notifPrefSuccess.json'

interface GetSchInboxNotifPrefSuccessV1 {
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
        schAlerts?: Array<{
          scId?: string
          scHeadingEn?: string
          scHeadingFr?: string
          scContentEn?: {
            json: null
          }
          scContentFr?: {
            json: null
          }
          scAlertType?: Array<string>
        }>
        scFragments: Array<{
          scId: string
          scLinkTextEn: string
          scLinkTextFr: string
          scLinkTextAssistiveEn: string
          scLinkTextAssistiveFr: string
          scDestinationURLEn: string
          scDestinationURLFr: string
          schURLType?: null
          scIconCSS?: null
          scButtonType: Array<string>
        }>
      }>
    }
  }
}

const getCachedContent = () => {
  return cachified({
    key: `content-inbox-notif-pref-success`,
    cache,
    getFreshValue: async (): Promise<GetSchInboxNotifPrefSuccessV1 | null> => {
      const targetUri = buildAemUri('getSchInboxNotifPrefSuccessV1')
      const response = await fetch(targetUri)
      if (!response.ok) return null
      return await response.json()
    },
    ttl,
  })
}

export async function getInboxNotifPrefSuccessContent(): Promise<InboxNotifPrefSuccessContent> {
  const response = await getCachedContent()
  //   const response = defaultResponse
  const pageAlertContent = response?.data.schPageV1List.items[0].schAlerts

  const backButtonFragment = findFragmentByScId(
    response,
    'task-back-inbox-notification-preferences',
  )
  const dashboardButtonFragment = findFragmentByScId(
    response,
    'tasks-go-to-my-dashboard',
  )

  const mappedInboxSuccess = {
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
      pageAlerts: pageAlertContent?.map((pageAlert) => {
        return {
          id: pageAlert.scId,
          alertHeading: pageAlert.scHeadingEn,
          alertBody: pageAlert.scContentEn?.json,
          type: pageAlert.scAlertType,
        }
      }),
      backButton: {
        id: backButtonFragment?.scId,
        linkText: backButtonFragment?.scLinkTextEn,
        linkTextAssistive: backButtonFragment?.scLinkTextAssistiveEn,
        destinationUrl: backButtonFragment?.scDestinationURLEn,
        buttonType: backButtonFragment?.scButtonType,
      },
      dashboardButton: {
        id: dashboardButtonFragment?.scId,
        linkText: dashboardButtonFragment?.scLinkTextEn,
        linkTextAssistive: dashboardButtonFragment?.scLinkTextAssistiveEn,
        destinationUrl: dashboardButtonFragment?.scDestinationURLEn,
        buttonType: dashboardButtonFragment?.scButtonType,
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
      pageAlerts: pageAlertContent?.map((pageAlert) => {
        return {
          id: pageAlert.scId,
          alertHeading: pageAlert.scHeadingFr,
          alertBody: pageAlert.scContentFr?.json,
          type: pageAlert.scAlertType,
        }
      }),
      backButton: {
        id: backButtonFragment?.scId,
        linkText: backButtonFragment?.scLinkTextFr,
        linkTextAssistive: backButtonFragment?.scLinkTextAssistiveFr,
        destinationUrl: backButtonFragment?.scDestinationURLFr,
        buttonType: backButtonFragment?.scButtonType,
      },
      dashboardButton: {
        id: dashboardButtonFragment?.scId,
        linkText: dashboardButtonFragment?.scLinkTextFr,
        linkTextAssistive: dashboardButtonFragment?.scLinkTextAssistiveFr,
        destinationUrl: dashboardButtonFragment?.scDestinationURLFr,
        buttonType: dashboardButtonFragment?.scButtonType,
      },
    },
  }
  return mappedInboxSuccess
}

const findFragmentByScId = (
  res: GetSchInboxNotifPrefSuccessV1 | null,
  id: string,
) => {
  return (
    res?.data.schPageV1List.items[0].scFragments.find(
      ({ scId }) => scId === id,
    ) ?? null
  )
}

export interface InboxNotifPrefSuccessButtonContent {
  id?: string
  linkText?: string
  linkTextAssistive?: string
  destinationUrl?: string
  icon?: null
  buttonType?: string[]
}

export interface InboxNotifPrefSuccessContent {
  err?: string
  en?: {
    breadcrumb?: {
      link: string
      text: string
    }[]
    pageAlerts:
      | {
          id: string | undefined
          alertHeading: string | undefined
          alertBody: null | undefined
          type: string[] | undefined
        }[]
      | undefined
    pageName?: string
    backButton?: InboxNotifPrefSuccessButtonContent
    dashboardButton?: InboxNotifPrefSuccessButtonContent
  }
  fr?: {
    breadcrumb?: {
      link: string
      text: string
    }[]
    pageAlerts:
      | {
          id: string | undefined
          alertHeading: string | undefined
          alertBody: null | undefined
          type: string[] | undefined
        }[]
      | undefined
    pageName?: string
    backButton?: InboxNotifPrefSuccessButtonContent
    dashboardButton?: InboxNotifPrefSuccessButtonContent
  }
}
