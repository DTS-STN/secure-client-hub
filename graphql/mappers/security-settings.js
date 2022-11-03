import clientQuery from '../client'

export async function getSecuritySettingsContent() {
  const query = require('../queries/security-settings.graphql')
  const response = await clientQuery(query)

  const enLookingForFragment = findFragmentByScId(
    response,
    'looking-for-profile-settings',
    'en'
  )
  const enContentFragment = findFragmentByScId(
    response,
    'security-settings-main-content',
    'en'
  )
  const frLookingForFragment = findFragmentByScId(
    response,
    'looking-for-profile-settings',
    'fr'
  )
  const frContentFragment = findFragmentByScId(
    response,
    'security-settings-main-content',
    'fr'
  )
  const mappedSecurity = {
    en: {
      pageName: response.data.schPagev1ByPath.item.scPageNameEn,
      heading: response.data.schPagev1ByPath.item.scTitleEn,
      subHeading: enContentFragment.json[0].content[0].value,
      lookingFor: {
        title: enLookingForFragment.json[0].content[0].value,
        subText: enLookingForFragment.json[1].content.map((element) => {
          if (element.value) {
            return element.value
          }
          return null
        }),
        link: '/profile',
      },
      securityQuestions: {
        linkTitle: {
          text: enContentFragment.json[1].content[0].value,
          link: enContentFragment.json[1].content[0].data.href,
        },
        subTitle: enContentFragment.json[1].content[2].value,
      },
      eiAccessCode: {
        linkTitle: {
          text: enContentFragment.json[2].content[0].value,
          link: enContentFragment.json[2].content[0].data.href,
        },
        subTitle: enContentFragment.json[2].content[2].value,
      },
    },
    fr: {
      pageName: response.data.schPagev1ByPath.item.scPageNameFr,
      heading: response.data.schPagev1ByPath.item.scTitleFr,
      subHeading: frContentFragment.json[0].content[0].value,
      lookingFor: {
        title: frLookingForFragment.json[0].content[0].value,
        subText: frLookingForFragment.json[1].content.map((element) => {
          if (element.value) {
            return element.value
          }
          return null
        }),
        link: '/fr/profile',
      },
      securityQuestions: {
        linkTitle: {
          text: frContentFragment.json[1].content[0].value,
          link: frContentFragment.json[1].content[0].data.href,
        },
        subTitle: frContentFragment.json[1].content[2].value,
      },
      eiAccessCode: {
        linkTitle: {
          text: frContentFragment.json[2].content[0].value,
          link: frContentFragment.json[2].content[0].data.href,
        },
        subTitle: frContentFragment.json[2].content[2].value,
      },
    },
  }
  return mappedSecurity
}

const findFragmentByScId = (res, id, lang) => {
  if (lang === 'fr') {
    return res.data.schPagev1ByPath.item.scFragments.find(
      (element) => element.scId === id
    ).scContentFr
  } else if (lang === 'en') {
    return res.data.schPagev1ByPath.item.scFragments.find(
      (element) => element.scId === id
    ).scContentEn
  }
}
