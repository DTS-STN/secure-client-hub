export async function getBetaPopupNotAvailableContent() {
  const query = await fetch(
    `${process.env.AEM_GRAPHQL_ENDPOINT}getSchBetaPopUpPageNotAvailableV1`
  )
  const response = await query.json()

  const content = response.data.schContentV1ByPath.item
  const fallbackContent = {
    scId: 'beta-popup-page-not-available',
    scHeadingEn: 'Exiting beta version',
    scHeadingFr: 'Vous quittez la version bêta',
    scContentEn:
      'This page is not yet available in the beta version. You will be transferred to the current My Service Canada Account to view this page.',
    scContentFr:
      "Cette page n'est pas encore disponible dans la version bêta. Vous serez transféré à la version actuelle de Mon dossier Service Canada pour la consulter.",
    scFragments: [
      {
        scId: 'stay-on-beta-version',
        // scLinkTextAssistiveEn: "Stay on beta version",
        // scLinkTextAssistiveFr: "Rester sur la version bêta",
        scLinkTextEn: 'Stay on beta version',
        scLinkTextFr: 'Rester sur la version bêta',
      },
      {
        scId: 'continue-to-page',
        // scLinkTextAssistiveEn: 'Continue to page',
        // scLinkTextAssistiveFr: 'Continuer vers la page',
        scLinkTextEn: 'Continue to page',
        scLinkTextFr: 'Continuer vers la page',
      },
    ],
  }

  const mappedPopupNotAvailable = {
    en: {
      popupId: content.scId || fallbackContent.scId,
      popupTitle: content.scHeadingEn || fallbackContent.scHeadingEn,
      popupDescription:
        content.scContentEn.json[0].content[0].value ||
        fallbackContent.scContentEn,
      popupPrimaryBtn: {
        id:
          content.scFragments.find((item) => item.scId === 'continue-to-page')
            .scId || fallbackContent.scFragments[1].scId,
        text:
          content.scFragments.find((item) => item.scId === 'continue-to-page')
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
          content.scFragments.find((item) => item.scId === 'continue-to-page')
            .scId || fallbackContent.scFragments[1].scId,
        text:
          content.scFragments.find((item) => item.scId === 'continue-to-page')
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
  return mappedPopupNotAvailable
}
