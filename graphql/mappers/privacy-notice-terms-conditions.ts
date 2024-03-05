import { cachified } from 'cachified'
import { lruCache as cache, defaultTtl as ttl } from '../../lib/cache-utils'

interface GetSchPrivacyNoticeTermsConditionsV1 {
  data: {
    schPageV1ByPath: {
      item: {
        scId: string
        scPageNameEn: string
        scPageNameFr: string
        scTitleEn: string
        scTitleFr: string
        scDateModifiedOverwrite: string
        scBreadcrumbParentPages: Array<{
          scId: string
          scTitleEn: string
          scTitleFr: string
          scPageNameEn: string
          scPageNameFr: string
        }>
        scFragments: Array<{
          scId: string
          scContentEn?: {
            markdown: string
          }
          scContentFr?: {
            markdown: string
          }
          scTitleEn?: string
          scTitleFr?: string
          scDestinationURLEn?: string
          scDestinationURLFr?: string
        }>
      }
    }
  }
}

const getCachedContent = () => {
  return cachified({
    key: `content-privacy-and-toc`,
    cache,
    getFreshValue: async () => {
      const response = await fetch(
        `${process.env.AEM_GRAPHQL_ENDPOINT}getSchPrivacyNoticeTermsConditionsV1`,
      )
      if (!response.ok) return null
      return (await response.json()) as GetSchPrivacyNoticeTermsConditionsV1
    },
    ttl,
  })
}

export async function getPrivacyConditionContent() {
  const response = await getCachedContent()

  const alertFragment = findFragmentByScId(
    response,
    'privacy-terms-conditions-alert',
  )

  const privacyTermsConditionsFragment = findFragmentByScId(
    response,
    'privacy-terms-conditions-content',
  )

  const mappedPrivacyConditions = {
    en: {
      id: response?.data.schPageV1ByPath.item.scId,
      dateModified: response?.data.schPageV1ByPath.item.scDateModifiedOverwrite,
      breadcrumb:
        response?.data.schPageV1ByPath.item.scBreadcrumbParentPages.map(
          (level) => {
            return {
              link: level.scPageNameEn,
              text: level.scTitleEn,
              id: level.scId,
            }
          },
        ),
      pageName: response?.data.schPageV1ByPath.item.scPageNameEn,
      heading: response?.data.schPageV1ByPath.item.scTitleEn,
      alert: {
        type: 'info',
        text: alertFragment?.scContentEn?.markdown,
      },
      content: privacyTermsConditionsFragment?.scContentEn?.markdown,
    },
    fr: {
      id: response?.data.schPageV1ByPath.item.scId,
      dateModified: response?.data.schPageV1ByPath.item.scDateModifiedOverwrite,
      breadcrumb:
        response?.data.schPageV1ByPath.item.scBreadcrumbParentPages.map(
          (level) => {
            return {
              link: level.scPageNameFr,
              text: level.scTitleFr,
              id: level.scId,
            }
          },
        ),
      pageName: response?.data.schPageV1ByPath.item.scPageNameFr,
      heading: response?.data.schPageV1ByPath.item.scTitleFr,
      alert: {
        type: 'info',
        text: alertFragment?.scContentFr?.markdown,
      },
      content: privacyTermsConditionsFragment?.scContentFr?.markdown,
    },
  }
  return mappedPrivacyConditions
}

const findFragmentByScId = (
  res: GetSchPrivacyNoticeTermsConditionsV1 | null,
  id: string,
) => {
  return (
    res?.data.schPageV1ByPath.item.scFragments.find(
      (element) => element.scId === id,
    ) ?? null
  )
}
