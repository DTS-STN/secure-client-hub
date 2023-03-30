import clientQuery from '../client'

export async function getPrivacyConditionContent() {
  const query = require('../queries/privacy-notice-terms-conditions.graphql')
  const response = await clientQuery(query)

  const alertFragment = findFragmentByScId(
    response,
    'privacy-terms-conditions-alert'
  )

  const privacyTermsConditionsFragment = findFragmentByScId(
    response,
    'privacy-terms-conditions-content'
  )

  const mappedPrivacyConditions = {
    en: {
      breadcrumb:
        response.data.schPagev1ByPath.item.scBreadcrumbParentPages.map((w) => {
          return [
            {
              link: w.scPageNameEn,
              text: w.scTitleEn,
            },
          ]
        }),
      pageName: response.data.schPagev1ByPath.item.scPageNameEn,
      heading: response.data.schPagev1ByPath.item.scTitleEn,
      alert: {
        type: 'info',
        text: alertFragment.scContentEn.json[0].content[0].value,
      },
      privacyNoticeSection: {
        title:
          privacyTermsConditionsFragment.scContentEn.json[0].content[0].value,
        paragraphs: [
          privacyTermsConditionsFragment.scContentEn.json[1].content[0].value,
          privacyTermsConditionsFragment.scContentEn.json[2].content[0].value,
          privacyTermsConditionsFragment.scContentEn.json[3].content[0].value,
          privacyTermsConditionsFragment.scContentEn.json[4].content[0].value,
          privacyTermsConditionsFragment.scContentEn.json[4].content[2].value,
          privacyTermsConditionsFragment.scContentEn.json[5].content[0].value,
          privacyTermsConditionsFragment.scContentEn.json[5].content[1].value,
          extractListFromText(
            privacyTermsConditionsFragment.scContentEn.json[5].content[2].value,
            '-'
          )[0],
          privacyTermsConditionsFragment.scContentEn.json[6].content[0].value,
          privacyTermsConditionsFragment.scContentEn.json[6].content[2].value,
          privacyTermsConditionsFragment.scContentEn.json[7].content[0].value,
          privacyTermsConditionsFragment.scContentEn.json[7].content[2].value,
        ],
        lists: [
          [
            privacyTermsConditionsFragment.scContentEn.json[1].content[1].value,
            privacyTermsConditionsFragment.scContentEn.json[1].content[3].value,
            privacyTermsConditionsFragment.scContentEn.json[1].content[5].value,
          ],
          [
            extractListFromText(
              privacyTermsConditionsFragment.scContentEn.json[5].content[2]
                .value,
              '-'
            )[1],
            extractListFromText(
              privacyTermsConditionsFragment.scContentEn.json[5].content[2]
                .value,
              '-'
            )[2],
          ],
        ],
        links: [
          {
            text: privacyTermsConditionsFragment.scContentEn.json[4].content[1]
              .value,
            href: privacyTermsConditionsFragment.scContentEn.json[4].content[1]
              .data.href,
          },
          {
            text: privacyTermsConditionsFragment.scContentEn.json[6].content[1]
              .value,
            href: privacyTermsConditionsFragment.scContentEn.json[6].content[1]
              .data.href,
          },
          {
            text: privacyTermsConditionsFragment.scContentEn.json[7].content[1]
              .value,
            href: privacyTermsConditionsFragment.scContentEn.json[7].content[1]
              .data.href,
          },
        ],
      },
      digitalSection: {
        title:
          privacyTermsConditionsFragment.scContentEn.json[8].content[0].value,
        paragraphs: [
          extractListFromText(
            privacyTermsConditionsFragment.scContentEn.json[9].content[0].value,
            '-'
          )[0],
          privacyTermsConditionsFragment.scContentEn.json[10].content[0].value,
          privacyTermsConditionsFragment.scContentEn.json[10].content[2].value,
        ],
        lists: [
          [
            extractListFromText(
              privacyTermsConditionsFragment.scContentEn.json[9].content[0]
                .value,
              '-'
            )[1],
            extractListFromText(
              privacyTermsConditionsFragment.scContentEn.json[9].content[0]
                .value,
              '-'
            )[2],
            extractListFromText(
              privacyTermsConditionsFragment.scContentEn.json[9].content[0]
                .value,
              '-'
            )[3],
          ],
        ],
        links: [
          {
            text: privacyTermsConditionsFragment.scContentEn.json[10].content[1]
              .value,
            href: privacyTermsConditionsFragment.scContentEn.json[10].content[1]
              .data.href,
          },
        ],
      },
      systemSection: {
        title:
          privacyTermsConditionsFragment.scContentEn.json[11].content[0].value,
        lists: [
          privacyTermsConditionsFragment.scContentEn.json[12].content[0]
            .content[0].value,
          privacyTermsConditionsFragment.scContentEn.json[12].content[1]
            .content[0].value,
          extractListFromText(
            privacyTermsConditionsFragment.scContentEn.json[12].content[2]
              .content[0].value,
            '--'
          )[0],
          privacyTermsConditionsFragment.scContentEn.json[12].content[3]
            .content[0].value,
          privacyTermsConditionsFragment.scContentEn.json[12].content[4]
            .content[0].value,
        ],
        sublists: [
          extractListFromText(
            privacyTermsConditionsFragment.scContentEn.json[12].content[2]
              .content[0].value,
            '--'
          )[1],
          extractListFromText(
            privacyTermsConditionsFragment.scContentEn.json[12].content[2]
              .content[0].value,
            '--'
          )[2],
          extractListFromText(
            privacyTermsConditionsFragment.scContentEn.json[12].content[2]
              .content[0].value,
            '--'
          )[3],
          extractListFromText(
            privacyTermsConditionsFragment.scContentEn.json[12].content[2]
              .content[0].value,
            '--'
          )[4],
        ],
      },
      termsConditionsSection: {
        title:
          privacyTermsConditionsFragment.scContentEn.json[13].content[0].value,
        paragraphs: [
          privacyTermsConditionsFragment.scContentEn.json[14].content[0].value,
          extractListFromText(
            privacyTermsConditionsFragment.scContentEn.json[15].content[0]
              .value,
            '-'
          )[0],
        ],
        lists: [
          [
            extractListFromText(
              privacyTermsConditionsFragment.scContentEn.json[15].content[0]
                .value,
              '-'
            )[1],
            extractListFromText(
              privacyTermsConditionsFragment.scContentEn.json[15].content[0]
                .value,
              '-'
            )[2],
          ],
          [
            privacyTermsConditionsFragment.scContentEn.json[16].content[1]
              .content[0].value,
            privacyTermsConditionsFragment.scContentEn.json[16].content[2]
              .content[0].value,
            privacyTermsConditionsFragment.scContentEn.json[16].content[3]
              .content[0].value,
            privacyTermsConditionsFragment.scContentEn.json[16].content[4]
              .content[0].value,
            privacyTermsConditionsFragment.scContentEn.json[16].content[5]
              .content[0].value,
            extractListFromText(
              privacyTermsConditionsFragment.scContentEn.json[16].content[6]
                .content[0].value,
              '--'
            )[0],
            privacyTermsConditionsFragment.scContentEn.json[16].content[7]
              .content[0].value,
            extractListFromText(
              privacyTermsConditionsFragment.scContentEn.json[16].content[8]
                .content[0].content[0].value,
              '--'
            )[0],
          ],
          [
            privacyTermsConditionsFragment.scContentEn.json[16].content[10]
              .content[0].value,
            privacyTermsConditionsFragment.scContentEn.json[16].content[11]
              .content[0].value,
            privacyTermsConditionsFragment.scContentEn.json[16].content[12]
              .content[0].value,
            privacyTermsConditionsFragment.scContentEn.json[16].content[13]
              .content[0].value,
            privacyTermsConditionsFragment.scContentEn.json[16].content[14]
              .content[0].value,
            privacyTermsConditionsFragment.scContentEn.json[16].content[15]
              .content[0].value,
            privacyTermsConditionsFragment.scContentEn.json[16].content[16]
              .content[0].value,
            privacyTermsConditionsFragment.scContentEn.json[16].content[17]
              .content[0].content[0].value,
          ],
          [
            extractListFromText(
              privacyTermsConditionsFragment.scContentEn.json[16].content[19]
                .content[0].content[0].value,
              '--'
            )[0],
          ],
          [
            privacyTermsConditionsFragment.scContentEn.json[16].content[21]
              .content[0].content[0].value,
          ],
          [
            privacyTermsConditionsFragment.scContentEn.json[16].content[23]
              .content[0].value,
          ],
        ],
        sublists: [
          [
            extractListFromText(
              privacyTermsConditionsFragment.scContentEn.json[16].content[6]
                .content[0].value,
              '--'
            )[1],
            extractListFromText(
              privacyTermsConditionsFragment.scContentEn.json[16].content[6]
                .content[0].value,
              '--'
            )[2],
          ],
          [
            extractListFromText(
              privacyTermsConditionsFragment.scContentEn.json[16].content[8]
                .content[0].content[0].value,
              '--'
            )[1],
            extractListFromText(
              privacyTermsConditionsFragment.scContentEn.json[16].content[8]
                .content[0].content[0].value,
              '--'
            )[2],
            extractListFromText(
              privacyTermsConditionsFragment.scContentEn.json[16].content[8]
                .content[0].content[0].value,
              '--'
            )[3],
          ],
          [
            extractListFromText(
              privacyTermsConditionsFragment.scContentEn.json[16].content[19]
                .content[0].content[0].value,
              '--'
            )[1],
            extractListFromText(
              privacyTermsConditionsFragment.scContentEn.json[16].content[19]
                .content[0].content[0].value,
              '--'
            )[2],
            extractListFromText(
              privacyTermsConditionsFragment.scContentEn.json[16].content[19]
                .content[0].content[0].value,
              '--'
            )[3],
            extractListFromText(
              privacyTermsConditionsFragment.scContentEn.json[16].content[19]
                .content[0].content[0].value,
              '--'
            )[4],
            extractListFromText(
              privacyTermsConditionsFragment.scContentEn.json[16].content[19]
                .content[0].content[0].value,
              '--'
            )[5],
          ],
        ],
        listTitles: [
          privacyTermsConditionsFragment.scContentEn.json[16].content[0]
            .content[0].value,
          privacyTermsConditionsFragment.scContentEn.json[16].content[9]
            .content[0].content[0].value,
          privacyTermsConditionsFragment.scContentEn.json[16].content[18]
            .content[0].content[0].value,
          privacyTermsConditionsFragment.scContentEn.json[16].content[20]
            .content[0].content[0].value,
          privacyTermsConditionsFragment.scContentEn.json[16].content[22]
            .content[0].content[0].value,
        ],
        links: [
          {
            text: privacyTermsConditionsFragment.scContentEn.json[16].content[7]
              .content[1].value,
            href: privacyTermsConditionsFragment.scContentEn.json[16].content[7]
              .content[1].data.href,
          },
          {
            text: privacyTermsConditionsFragment.scContentEn.json[16]
              .content[17].content[0].content[1].value,
            href: privacyTermsConditionsFragment.scContentEn.json[16]
              .content[17].content[0].content[1].data.href,
          },
        ],
        readOnly:
          privacyTermsConditionsFragment.scContentEn.json[17].content[0].value,
      },
    },
    fr: {
      //TODO: To be implemented in next Pull Request.
    },
  }
  return mappedPrivacyConditions
}

const findFragmentByScId = (res, id) => {
  return res.data.schPagev1ByPath.item.scFragments.find(
    (element) => element.scId === id
  )
}
const extractListFromText = (text, delimiter) => {
  return text.split(delimiter)
}
