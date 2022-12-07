import clientQuery from '../client'

export async function getContactEmploymentInsuranceContent() {
  const query = require('../queries/contact-employment-insurance.graphql')
  const response = await clientQuery(query)

  const queryData = response.data.schListv1ByPath

  const mappedContactEI = {
    en: {
      scId: queryData.item.scId,
      title: queryData.item.scTitleEn,
      items: queryData.item.scItems.map((x) => {
        return {
          scId: x.scId,
          title: x.scTitleEn,
          layout: x.schContactMethodLayout,
          details: x.schDetails.map((y) => {
            return {
              scId: y.scId,
              ...y.scItems.map((z) => {
                return {
                  content: z.scContentEn.markdown,
                  fragments:
                    z.scFragments.length > 0
                      ? z.scFragments.map((f) => {
                          return {
                            city: f.scCityEn,
                            province: f.scProvTerrAbbrEnum,
                            country: f.scCountryEn,
                            id: f.scId,
                            postal: f.scPostalBoxEn,
                            recipient: f.scRecipientEn,
                            program: f.scProgramEn,
                            station: f.scPostalStationEn,
                          }
                        })
                      : null,
                  icon: z.scIconCSS,
                  scId: z.scId,
                }
              })[0],
              title: y.scTitleEn,
            }
          }),
          intro: x.schIntroEn.markdown,
        }
      }),
    },
    fr: {
      scId: queryData.item.scId,
      title: queryData.item.scTitleFr,
      items: queryData.item.scItems.map((x) => {
        return {
          scId: x.scId,
          title: x.scTitleFr,
          layout: x.schContactMethodLayout,
          details: x.schDetails.map((y) => {
            return {
              scId: y.scId,
              ...y.scItems.map((z) => {
                return {
                  content: z.scContentFr.markdown,
                  fragments:
                    z.scFragments.length > 0
                      ? z.scFragments.map((f) => {
                          return {
                            city: f.scCityFr,
                            province: f.scProvTerrAbbrEnum,
                            country: f.scCountryFr,
                            id: f.scId,
                            postal: f.scPostalBoxFr,
                            recipient: f.scRecipientFr,
                            program: f.scProgramFr,
                            station: f.scPostalStationFr,
                          }
                        })
                      : null,
                  icon: z.scIconCSS,
                  scId: z.scId,
                }
              })[0],
              title: y.scTitleFr,
            }
          }),
          intro: x.schIntroFr.markdown,
        }
      }),
    },
  }

  return mappedContactEI
}

const showData = async () => {
  let x = await getContactEmploymentInsuranceContent()
  console.log(x)
}

showData()
