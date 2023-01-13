import clientQuery from '../client'

export async function getBetaPopupStaySignedInContent() {
  const query = require('../queries/beta-popup-stay-signed-in.graphql')
  const res = await clientQuery(query)

  const content = res.data.schContentv1ByPath.item || null
  const fallbackContent = {
    en: {
      scHeading: '',
      signOutLinkText: '',
      staySignedInLinktext: '',
      scContent: [],
      scMinutesAnd: 'minutes and',
      scSeconds: 'seconds',
    },
    fr: {
      scHeading: '',
      signOutLinkText: '',
      staySignedInLinktext: '',
      scContent: [],
      scMinutesAnd: 'minutes et',
      scSeconds: 'secondes',
    },
  }

  const mappedPopupStaySignedIn = content
    ? {
        en: {
          scHeading: content.scHeadingEn,
          signOutLinkText: content.scFragments.filter(
            (fragment) => fragment.scId === 'sign-out'
          )[0].scLinkTextEn,
          staySignedInLinktext: content.scFragments.filter(
            (fragment) => fragment.scId === 'stay-signed-in'
          )[0].scLinkTextEn,
          scContent: content.scContentEn.json[0].content.map(
            (paragraph) => paragraph.value
          ),
          scMinutesAnd: 'minutes and',
          scSeconds: 'seconds',
        },
        fr: {
          scHeading: content.scHeadingFr,
          signOutLinkText: content.scFragments.filter(
            (fragment) => fragment.scId === 'sign-out'
          )[0].scLinkTextFr,
          staySignedInLinktext: content.scFragments.filter(
            (fragment) => fragment.scId === 'stay-signed-in'
          )[0].scLinkTextFr,
          scContent: content.scContentFr.json[0].content.map(
            (paragraph) => paragraph.value
          ),
          scMinutesAnd: 'minutes et',
          scSeconds: 'secondes',
        },
      }
    : fallbackContent
  return mappedPopupStaySignedIn
}
