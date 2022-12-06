import clientQuery from '../client'

export async function getContactEmploymentInsuranceContent() {
  const query = require('../queries/contact-employment-insurance.graphql')
  const response = await clientQuery(query)

  const queryData = response.data.schListv1ByPath

  const mappedContactEI = {
    en: {
      scId: queryData.item.scId,

      items: queryData.item.scItems.map((x) => {
        return {
          scId: x.scId,
          title: x.scTitleEn,
          details: x.schDetails.map((y) => {
            return {
              scId: y.scId,
              items: y.scItems.map((z) => {
                return {
                  content: z.scContentEn.markdown,
                  fragments: z.scFragments,
                  icon: z.scIconCSS,
                  scId: z.scId,
                  title: z.scContentEn.markdown,
                }
              }),
              title: y.scTitleEn,
            }
          }),
          intro: x.schIntroEn,
        }
      }),
    },
  }

  // const eiContactFragment = findFragmentByScId(response, 'ei-contact-us')

  // const oasContactFragment = findFragmentByScId(response, 'oas-contact-us')

  // const cppContactFragment = findFragmentByScId(response, 'cpp-contact-us')

  // const mappedSecurity = {
  //   en: {
  //     pageName: response.data.schPagev1ByPath.item.scPageNameEn,
  //     heading: response.data.schPagev1ByPath.item.scTitleEn,
  //     subHeading: introFragment.scContentEn.json[0].content[0].value,
  //     links: [
  //       {
  //         linkId: eiContactFragment.scId,
  //         linkTitle: eiContactFragment.scLinkTextEn,
  //         linkAssistiveTitle: eiContactFragment.scLinkTextAssistiveEn,
  //         linkDestination: eiContactFragment.scDestinationURLEn,
  //         schBetaPopup: eiContactFragment.schBetaPopUp,
  //       },
  //       {
  //         linkId: oasContactFragment.scId,
  //         linkTitle: oasContactFragment.scLinkTextEn,
  //         linkAssistiveTitle: oasContactFragment.scLinkTextAssistiveEn,
  //         linkDestination: oasContactFragment.scDestinationURLEn,
  //         linkDescription:
  //           oasContactFragment.scDescriptionEn.json[0].content[0].value,
  //         schBetaPopup: oasContactFragment.schBetaPopUp,
  //       },
  //       {
  //         linkId: cppContactFragment.scId,
  //         linkTitle: cppContactFragment.scLinkTextEn,
  //         linkAssistiveTitle: cppContactFragment.scLinkTextAssistiveEn,
  //         linkDestination: cppContactFragment.scDestinationURLEn,
  //         schBetaPopup: cppContactFragment.schBetaPopUp,
  //       },
  //     ],
  //   },
  //   fr: {
  //     pageName: response.data.schPagev1ByPath.item.scPageNameFr,
  //     heading: response.data.schPagev1ByPath.item.scTitleFr,
  //     subHeading: introFragment.scContentFr.json[0].content[0].value,
  //     links: [
  //       {
  //         linkId: eiContactFragment.scId,
  //         linkTitle: eiContactFragment.scLinkTextFr,
  //         linkAssistiveTitle: eiContactFragment.scLinkTextAssistiveFr,
  //         linkDestination: eiContactFragment.scDestinationURLFr,
  //         schBetaPopup: eiContactFragment.schBetaPopUp,
  //       },
  //       {
  //         linkId: oasContactFragment.scId,
  //         linkTitle: oasContactFragment.scLinkTextFr,
  //         linkAssistiveTitle: oasContactFragment.scLinkTextAssistiveFr,
  //         linkDestination: oasContactFragment.scDestinationURLFr,
  //         linkDescription:
  //           oasContactFragment.scDescriptionFr.json[0].content[0].value,
  //         schBetaPopup: oasContactFragment.schBetaPopUp,
  //       },
  //       {
  //         linkId: cppContactFragment.scId,
  //         linkTitle: cppContactFragment.scLinkTextFr,
  //         linkAssistiveTitle: cppContactFragment.scLinkTextAssistiveFr,
  //         linkDestination: cppContactFragment.scDestinationURLFr,
  //         schBetaPopup: cppContactFragment.schBetaPopUp,
  //       },
  //     ],
  //   },
  // }
  return { queryData, mappedContactEI }
}

const findFragmentByScId = (res, id) => {
  return res.data.schPagev1ByPath.item.scFragments.find(
    (element) => element.scId === id
  )
}

const showData = async () => {
  let x = await getContactEmploymentInsuranceContent()
  console.log(x)
}

showData()
