import { buildAemUri } from '../../lib/links'
import { cachified } from 'cachified'
import { lruCache as cache, defaultTtl as ttl } from '../../lib/cache-utils'
//import resp from './sample-responses/inbox-notif-pref-new.json'
import { getTextFragmentContent, Section } from '../../lib/graphql-utils'

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
  scFragments?: Array<FragmentElement>
  scIconCSS?: string
  scRequired?: boolean
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

// TODO: Handle getting a list of fragments instead
const findFragmentByScId = (res: GetSchInboxPrefV1 | null, id: string) => {
  return (
    res?.data.schPageV1List.items[0].scFragments.find(
      ({ scId }) => scId === id,
    ) ?? null
  )
}

export async function getInboxPrefContent(): Promise<InboxPrefContent> {
  const response = await getCachedContent()
  //const response = JSON.parse(JSON.stringify(resp))

  const introFragment = findFragmentByScId(
    response,
    'content-inbox-notification-preferences-intro',
  )

  const debtStatementsFragment = findFragmentByScId(
    response,
    'content-debt-statements',
  )

  const emailNotifSettingFragment = findFragmentByScId(
    response,
    'fieldset-email-notifications-debt-statements',
  )

  // TODO: Don't use indexes and search by ID instead
  const emailYesFragment = emailNotifSettingFragment?.scFragments?.[0]
  const emailNoFragment = emailNotifSettingFragment?.scFragments?.[1]

  const confirmButtonFragment = findFragmentByScId(
    response,
    'task-save-preferences',
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
      pageName: response?.data.schPageV1List.items[0].scTitleEn ?? '',
      introText: {
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
      emailQuestion: emailNotifSettingFragment?.scLegendEn,
      emailQuestionRequired: emailNotifSettingFragment?.scRequired,
      emailYes: emailYesFragment?.scHeadingEn,
      emailYesDesc: {
        fragmentHeading: null, // the heading needs to be handled separately
        divisions:
          (await getTextFragmentContent(emailYesFragment?.scContentEn)) ?? [],
        icon: emailYesFragment?.scIconCSS ?? null,
      },
      emailNo: emailNoFragment?.scHeadingEn,
      emailNoDesc: {
        fragmentHeading: null, // the heading needs to be handled separately
        divisions:
          (await getTextFragmentContent(emailNoFragment?.scContentEn)) ?? [],
        icon: emailNoFragment?.scIconCSS ?? null,
      },
      buttonText: confirmButtonFragment?.scLinkTextEn,
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
      introText: {
        fragmentHeading: introFragment?.scHeadingFr ?? null,
        divisions:
          (await getTextFragmentContent(introFragment?.scContentFr)) ?? [],
        icon: introFragment?.scIconCSS ?? null,
      },
      debtStatements: {
        fragmentHeading: debtStatementsFragment?.scHeadingFr ?? null,
        divisions:
          (await getTextFragmentContent(debtStatementsFragment?.scContentFr)) ??
          [],
        icon: debtStatementsFragment?.scIconCSS ?? null,
      },
      emailQuestion: emailNotifSettingFragment?.scLegendFr,
      emailQuestionRequired: emailNotifSettingFragment?.scRequired,
      emailYes: emailYesFragment?.scHeadingFr,
      emailYesDesc: {
        fragmentHeading: null, // the heading needs to be handled separately
        divisions:
          (await getTextFragmentContent(emailYesFragment?.scContentFr)) ?? [],
        icon: emailYesFragment?.scIconCSS ?? null,
      },
      emailNo: emailNoFragment?.scHeadingFr,
      emailNoDesc: {
        fragmentHeading: null, // the heading needs to be handled separately
        divisions:
          (await getTextFragmentContent(emailNoFragment?.scContentFr)) ?? [],
        icon: emailNoFragment?.scIconCSS ?? null,
      },
      buttonText: confirmButtonFragment?.scLinkTextFr,
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
    introText?: Section
    debtStatement?: Section
    emailQuestion?: string
    emailYes?: string
    emailNo?: string
    emailYesDesc?: Section
    emailNoDesc?: Section
    buttonText?: string
  }
  fr?: {
    breadcrumb?: {
      link: string
      text: string
    }[]
    pageName: string
    introText?: Section
    debtStatement?: Section
    emailQuestion?: string
    emailYes?: string
    emailNo?: string
    emailYesDesc?: Section
    emailNoDesc?: Section
    buttonText?: string
  }
}
