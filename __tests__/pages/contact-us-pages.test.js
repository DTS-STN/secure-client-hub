import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import { useRouter } from 'next/router'
import ContactUsPage, { getServerSideProps } from '../../pages/contact-us/[id]'

expect.extend(toHaveNoViolations)

// mocks useRouter to be able to use component' router.asPath
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

jest.mock('../../graphql/mappers/beta-banner-opt-out', () => ({
  getBetaBannerContent: () => {
    return new Promise(function (resolve, reject) {
      resolve({
        en: {},
        fr: {},
      })
    })
  },
}))

jest.mock('../../graphql/mappers/beta-popup-exit', () => ({
  getBetaPopupExitContent: () => {
    return new Promise(function (resolve, reject) {
      resolve({ en: {}, fr: {} })
    })
  },
}))

jest.mock('../../graphql/mappers/beta-popup-page-not-available', () => ({
  getBetaPopupNotAvailableContent: () => {
    return new Promise(function (resolve, reject) {
      resolve({
        en: {},
        fr: {},
      })
    })
  },
}))

jest.mock('../../graphql/mappers/contact-us-pages-dynamic', () => ({
  getContactUsPage: () => {
    return new Promise(function (resolve, reject) {
      resolve({
        en: {
          title: 'Contact Us Page',
          description: 'This is a contact page',
          pageName: 'test-contact-page',
        },
        fr: {
          title: 'Contactez-nous',
          description: "C'est une page de contact",
          pageName: 'tester-la-page-contact',
        },
      })
    })
  },
}))

jest.mock('../../components/contact/ContactProvince', () => () => {
  return <mock-province data-testid="mock-province" />
})

describe('Dynamic Contact Us Page', () => {
  const content = {
    title: 'test',
    items: [
      { title: 'test', link: 'test', id: 'test', intro: 'test', details: [] },
    ],
    heading: 'heading',
    paragraph: 'paragraph',
  }
  const popupContent = { popupId: 'test' }

  const meta = {
    data_en: {
      title: 'Contact Us Page - My Service Canada Account',
      desc: 'This is a contact page',
      author: 'Service Canada',
      keywords: '',
    },
    data_fr: {
      title: 'Contactez-nous - Mon dossier Service Canada',
      desc: "C'est une page de contact",
      author: 'Service Canada',
      keywords: '',
    },
  }

  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      pathname: '/',
      asPath: '/',
    }))
  })

  it('should render the page', () => {
    render(
      <ContactUsPage
        locale="en"
        pageContent={content}
        popupContent={popupContent}
        meta={meta}
      />
    )
    const contactUsDiv = screen.getByTestId('contactUsPage-test')
    expect(contactUsDiv).toBeInTheDocument
  })

  it('should contain a table of contents', () => {
    render(
      <ContactUsPage
        locale="en"
        pageContent={content}
        popupContent={popupContent}
        meta={meta}
      />
    )
    const tocTable = screen.getByTestId('tableOfContents-test')
    expect(tocTable).toBeInTheDocument()
  })

  it('should contain a contact section listing', () => {
    render(
      <ContactUsPage
        locale="en"
        pageContent={content}
        popupContent={popupContent}
        meta={meta}
      />
    )
    const contactSection = screen.getByTestId('contactSection-test')
    expect(contactSection).toBeInTheDocument()
  })

  it('Test getServerSideProps', async () => {
    const props = await getServerSideProps({
      locale: 'en',
      params: { id: 'test-contact-page' },
    })

    expect(props).toEqual({
      props: {
        pageContent: {
          description: 'This is a contact page',
          title: 'Contact Us Page',
          pageName: 'test-contact-page',
        },
        bannerContent: {},
        langToggleLink: '/fr/contactez-nous/tester-la-page-contact',
        locale: 'en',
        aaPrefix: 'ESDC-EDSC:Contact Us Page',
        meta: {
          data_en: {
            title: 'Contact Us Page - My Service Canada Account',
            desc: 'This is a contact page',
            author: 'Service Canada',
            keywords: '',
            service: 'ESDC-EDSC_MSCA-MSDC',
            creator: 'Service Canada',
            accessRights: '1',
          },
          data_fr: {
            title: 'Contactez-nous - Mon dossier Service Canada',
            desc: "C'est une page de contact",
            author: 'Service Canada',
            keywords: '',
            service: 'ESDC-EDSC_MSCA-MSDC',
            creator: 'Service Canada',
            accessRights: '1',
          },
        },
        breadCrumbItems: undefined,
        popupContent: {},
      },
    })
  })
})
