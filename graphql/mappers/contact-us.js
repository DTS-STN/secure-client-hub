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
        response.data.schPageV1ByPath.item.scBreadcrumbParentPages.map(
          (level) => {
            return {
              link: level.scPageNameEn,
              text: level.scTitleEn,
            }
          }
        ),
      pageName: response.data.schPageV1ByPath.item.scPageNameEn,
      heading: response.data.schPageV1ByPath.item.scTitleEn,
      subHeading: introFragment.scContentEn.json[0].content[0].value,
      links: [
        {
          linkId: eiContactFragment.scId,
          linkTitle: eiContactFragment.scLinkTextEn,
          linkAssistiveTitle: eiContactFragment.scLinkTextAssistiveEn,
          linkDestination: eiContactFragment.scDestinationURLEn,
          linkDescription: eiContactFragment.scDescriptionEn.json
            ? eiContactFragment.scDescriptionEn.json[0].content[0].value
            : '',
          schBetaPopup: eiContactFragment.schBetaPopUp,
        },
        {
          linkId: cppContactFragment.scId,
          linkTitle: cppContactFragment.scLinkTextEn,
          linkAssistiveTitle: cppContactFragment.scLinkTextAssistiveEn,
          linkDestination: cppContactFragment.scDestinationURLEn,
          linkDescription: cppContactFragment.scDescriptionEn.json
            ? cppContactFragment.scDescriptionEn.json[0].content[0].value
            : '',
          schBetaPopup: cppContactFragment.schBetaPopUp,
        },
        {
          linkId: oasContactFragment.scId,
          linkTitle: oasContactFragment.scLinkTextEn,
          linkAssistiveTitle: oasContactFragment.scLinkTextAssistiveEn,
          linkDestination: oasContactFragment.scDestinationURLEn,
          linkDescription: oasContactFragment.scDescriptionEn
            ? oasContactFragment.scDescriptionEn.json[0].content[0].value
            : '',
          schBetaPopup: oasContactFragment.schBetaPopUp,
        },
      ],
    },
    fr: {
      breadcrumb:
        response.data.schPageV1ByPath.item.scBreadcrumbParentPages.map(
          (level) => {
            return {
              link: level.scPageNameFr,
              text: level.scTitleFr,
            }
          }
        ),
      pageName: response.data.schPageV1ByPath.item.scPageNameFr,
      heading: response.data.schPageV1ByPath.item.scTitleFr,
      subHeading: introFragment.scContentFr.json[0].content[0].value,
      links: [
        {
          linkId: eiContactFragment.scId,
          linkTitle: eiContactFragment.scLinkTextFr,
          linkAssistiveTitle: eiContactFragment.scLinkTextAssistiveFr,
          linkDestination: eiContactFragment.scDestinationURLFr,
          linkDescription: eiContactFragment.scDescriptionFr.json
            ? eiContactFragment.scDescriptionFr.json[0].content[0].value
            : '',
          schBetaPopup: eiContactFragment.schBetaPopUp,
        },
        {
          linkId: cppContactFragment.scId,
          linkTitle: cppContactFragment.scLinkTextFr,
          linkAssistiveTitle: cppContactFragment.scLinkTextAssistiveFr,
          linkDestination: cppContactFragment.scDestinationURLFr,
          linkDescription: cppContactFragment.scDescriptionFr.json
            ? cppContactFragment.scDescriptionFr.json[0].content[0].value
            : '',
          schBetaPopup: cppContactFragment.schBetaPopUp,
        },
        {
          linkId: oasContactFragment.scId,
          linkTitle: oasContactFragment.scLinkTextFr,
          linkAssistiveTitle: oasContactFragment.scLinkTextAssistiveFr,
          linkDestination: oasContactFragment.scDestinationURLFr,
          linkDescription: oasContactFragment.scDescriptionFr
            ? oasContactFragment.scDescriptionFr.json[0].content[0].value
            : '',
          schBetaPopup: oasContactFragment.schBetaPopUp,
        },
      ],
    },
  }
  return mappedSecurity
}

const findFragmentByScId = (res, id) => {
  return res.data.schPageV1ByPath.item.scFragments.find(
    (element) => element.scId === id
  )
}
