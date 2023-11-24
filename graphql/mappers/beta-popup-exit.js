export async function getBetaPopupExitContent() {
  const query = await fetch(
    `${process.env.AEM_GRAPHQL_ENDPOINT}getSchBetaPopUpExitV1`,
    { next: { revalidate: 1200 } }
  )
  const response = await query.json()

  const content = response.data.schContentV1ByPath.item || {}
  const fallbackContent = {
    scId: 'beta-popup-exit',
    scHeadingEn: 'Exiting beta version',
    scHeadingFr: 'Vous quittez la version bêta',
    scContentEn:
      'Thank you for trying the beta version. You are now returning to My Service Canada Account home page.',
    scContentFr:
      "Merci d'avoir essayé la version bêta. Nous vous redirigeons vers la page d’accueil de Mon dossier Service Canada.",
    scFragments: [
      {
        scId: 'stay-on-beta-version',
        // scLinkTextAssistiveEn: "Stay on beta version",
        // scLinkTextAssistiveFr: "Rester sur la version bêta",
        scLinkTextEn: 'Stay on beta version',
        scLinkTextFr: 'Rester sur la version bêta',
      },
      {
        scId: 'exit-beta-version',
        // scLinkTextAssistiveEn: 'Continue to page',
        // scLinkTextAssistiveFr: 'Continuer vers la page',
        scLinkTextEn: 'Exit Beta version',
        scLinkTextFr: 'Quitter la version beta',
      },
    ],
  }

  const mappedPopupExit = {
    en: {
      popupId: content.scId || fallbackContent.scId,
      popupTitle: content.scHeadingEn || fallbackContent.scHeadingEn,
      popupDescription:
        content.scContentEn.json[0].content[0].value ||
        fallbackContent.scContentEn,
      popupPrimaryBtn: {
        id:
          content.scFragments.find((item) => item.scId === 'exit-beta-version')
            .scId || fallbackContent.scFragments[1].scId,
        text:
          content.scFragments.find((item) => item.scId === 'exit-beta-version')
            .scLinkTextEn || fallbackContent.scFragments[1].scLinkTextEn,
      },
      popupSecondaryBtn: {
        id:
          content.scFragments.find(
            (item) => item.scId === 'stay-on-beta-version'
          ).scId || fallbackContent.scFragments[0].scId,
        text:
          content.scFragments.find(
            (item) => item.scId === 'stay-on-beta-version'
          ).scLinkTextEn || fallbackContent.scFragments[0].scLinkTextEn,
      },
    },
    fr: {
      popupId: content.scId || fallbackContent.scId,
      popupTitle: content.scHeadingFr || fallbackContent.scHeadingFr,
      popupDescription:
        content.scContentFr.json[0].content[0].value ||
        fallbackContent.scContentFr,
      popupPrimaryBtn: {
        id:
          content.scFragments.find((item) => item.scId === 'exit-beta-version')
            .scId || fallbackContent.scFragments[1].scId,
        text:
          content.scFragments.find((item) => item.scId === 'exit-beta-version')
            .scLinkTextFr || fallbackContent.scFragments[1].scLinkTextFr,
      },
      popupSecondaryBtn: {
        id:
          content.scFragments.find(
            (item) => item.scId === 'stay-on-beta-version'
          ).scId || fallbackContent.scFragments[0].scId,
        text:
          content.scFragments.find(
            (item) => item.scId === 'stay-on-beta-version'
          ).scLinkTextFr || fallbackContent.scFragments[0].scLinkTextFr,
      },
    },
  }
  return mappedPopupExit
}
