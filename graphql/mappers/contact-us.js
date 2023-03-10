import clientQuery from '../client'

export async function getContactUsContent() {
  const query = require('../queries/contact-us.graphql')
  const response = await clientQuery(query)

  const introFragment = findFragmentByScId(response, 'contact-us-intro')

  const eiContactFragment = findFragmentByScId(response, 'ei-contact-us')

  const oasContactFragment = findFragmentByScId(response, 'oas-contact-us')

  const cppContactFragment = findFragmentByScId(response, 'cpp-contact-us')

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
      subHeading: introFragment.scContentEn.json[0].content[0].value,
      links: [
        {
          linkId: eiContactFragment.scId,
          linkTitle: eiContactFragment.scLinkTextEn,
          linkAssistiveTitle: eiContactFragment.scLinkTextAssistiveEn,
          linkDestination: eiContactFragment.scDestinationURLEn,
          schBetaPopup: eiContactFragment.schBetaPopUp,
        },
        {
          linkId: cppContactFragment.scId,
          linkTitle: cppContactFragment.scLinkTextEn,
          linkAssistiveTitle: cppContactFragment.scLinkTextAssistiveEn,
          linkDestination: cppContactFragment.scDestinationURLEn,
          schBetaPopup: cppContactFragment.schBetaPopUp,
        },
        {
          linkId: oasContactFragment.scId,
          linkTitle: oasContactFragment.scLinkTextEn,
          linkAssistiveTitle: oasContactFragment.scLinkTextAssistiveEn,
          linkDestination: oasContactFragment.scDestinationURLEn,
          linkDescription:
            oasContactFragment.scDescriptionEn.json[0].content[0].value,
          schBetaPopup: oasContactFragment.schBetaPopUp,
        },
      ],
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
      subHeading: introFragment.scContentFr.json[0].content[0].value,
      links: [
        {
          linkId: eiContactFragment.scId,
          linkTitle: eiContactFragment.scLinkTextFr,
          linkAssistiveTitle: eiContactFragment.scLinkTextAssistiveFr,
          linkDestination: eiContactFragment.scDestinationURLFr,
          schBetaPopup: eiContactFragment.schBetaPopUp,
        },
        {
          linkId: cppContactFragment.scId,
          linkTitle: cppContactFragment.scLinkTextFr,
          linkAssistiveTitle: cppContactFragment.scLinkTextAssistiveFr,
          linkDestination: cppContactFragment.scDestinationURLFr,
          schBetaPopup: cppContactFragment.schBetaPopUp,
        },
        {
          linkId: oasContactFragment.scId,
          linkTitle: oasContactFragment.scLinkTextFr,
          linkAssistiveTitle: oasContactFragment.scLinkTextAssistiveFr,
          linkDestination: oasContactFragment.scDestinationURLFr,
          linkDescription:
            oasContactFragment.scDescriptionFr.json[0].content[0].value,
          schBetaPopup: oasContactFragment.schBetaPopUp,
        },
      ],
    },
  }
  return mappedSecurity
}

const findFragmentByScId = (res, id) => {
  return res.data.schPagev1ByPath.item.scFragments.find(
    (element) => element.scId === id
  )
}
