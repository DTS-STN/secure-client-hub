import en from '../../locales/en'
import clientQuery from '../client'
import { buildLink } from '../../lib/links'

export async function getSecuritySettingsContent() {
  const query = require('../queries/security-settings.graphql')
  const response = await clientQuery(query)

  const enLookingForFragment = findFragmentByScId(
    response,
    'looking-for-profile-settings'
  ).scContentEn
  const enContentFragment = findFragmentByScId(
    response,
    'security-settings-main-content'
  ).scContentEn
  const frLookingForFragment = findFragmentByScId(
    response,
    'looking-for-profile-settings'
  ).scContentFr
  const frContentFragment = findFragmentByScId(
    response,
    'security-settings-main-content'
  ).scContentFr

  const securityQuestions = findFragmentByScId(
    response,
    'security-settings-main-content'
  ).scFragments.find((element) => element.scId === 'security-questions')

  const eiAccessCode = findFragmentByScId(
    response,
    'security-settings-main-content'
  ).scFragments.find((element) => element.scId === 'ei-access-code')

  const mappedSecurity = {
    en: {
      breadcrumb:
        response.data.schPagev1ByPath.item.scBreadcrumbParentPages.map((w) => {
          return {
            link: w.scPageNameEn,
            text: w.scTitleEn,
          }
        }),
      pageName: response.data.schPagev1ByPath.item.scPageNameEn,
      heading: response.data.schPagev1ByPath.item.scTitleEn,
      subHeading: enContentFragment.json[0].content[0].value,
      lookingFor: {
        title: enLookingForFragment.json[0].content[0].value,
        subText: enLookingForFragment.json[1].content.map((element) => {
          return element.value || null
        }),
        link: '/profile',
      },
      securityQuestions: {
        linkTitle: {
          text: securityQuestions.scLinkTextEn,
          link: buildLink(
            securityQuestions.schURLType,
            securityQuestions.scDestinationURLEn
          ),
        },
        subTitle: securityQuestions.scDescriptionEn.json[0].content[0].value,
      },
      eiAccessCode: {
        linkTitle: {
          text: eiAccessCode.scLinkTextEn,
          link: buildLink(
            eiAccessCode.schURLType,
            eiAccessCode.scDestinationURLEn
          ),
        },
        subTitle: eiAccessCode.scDescriptionEn.json[0].content[0].value,
      },
    },
    fr: {
      breadcrumb:
        response.data.schPagev1ByPath.item.scBreadcrumbParentPages.map((w) => {
          return {
            link: w.scPageNameFr,
            text: w.scTitleFr,
          }
        }),
      pageName: response.data.schPagev1ByPath.item.scPageNameFr,
      heading: response.data.schPagev1ByPath.item.scTitleFr,
      subHeading: frContentFragment.json[0].content[0].value,
      lookingFor: {
        title: frLookingForFragment.json[0].content[0].value,
        subText: frLookingForFragment.json[1].content.map((element) => {
          return element.value || null
        }),
        link: '/fr/profil',
      },
      securityQuestions: {
        linkTitle: {
          text: securityQuestions.scLinkTextFr,
          link: buildLink(
            eiAccessCode.schURLType,
            securityQuestions.scDestinationURLFr
          ),
        },
        subTitle: securityQuestions.scDescriptionFr.json[0].content[0].value,
      },
      eiAccessCode: {
        linkTitle: {
          text: eiAccessCode.scLinkTextFr,
          link: buildLink(
            eiAccessCode.schURLType,
            eiAccessCode.scDestinationURLFr
          ),
        },
        subTitle: eiAccessCode.scDescriptionFr.json[0].content[0].value,
      },
    },
  }
  return mappedSecurity
}

const findFragmentByScId = (res, id) => {
  return res.data.schPagev1ByPath.item.scFragments.find(
    (element) => element.scId === id
  )
}
