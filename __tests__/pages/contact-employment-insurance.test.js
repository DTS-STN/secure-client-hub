import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import { useRouter } from 'next/router'
import ContactEmploymentInsurance, {
  getServerSideProps,
} from '../../pages/contact-us/contact-employment-insurance'

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

jest.mock('../../graphql/mappers/contact-employment-insurance', () => ({
  getContactEmploymentInsuranceContent: () => {
    return new Promise(function (resolve, reject) {
      resolve({
        en: {},
        fr: {},
      })
    })
  },
}))

jest.mock('../../components/contact/ContactProvince', () => () => {
  return <mock-province data-testid="mock-province" />
})

describe('EI Contact Us Page', () => {
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
      title: 'My Service Canada Account - Contact Employment Ensurance',
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
    },
    data_fr: {
      title: 'Mon dossier Service Canada - Contactez Assurance Emploi',
      desc: 'Français',
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
      <ContactEmploymentInsurance
        locale="en"
        pageContent={content}
        popupContent={popupContent}
        meta={meta}
      />
    )
    const contactEIDiv = screen.getByTestId('contactEI-test')
    expect(contactEIDiv).toBeInTheDocument()
  })

  it('should contain a table of contents', () => {
    render(
      <ContactEmploymentInsurance
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
      <ContactEmploymentInsurance
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
    const props = await getServerSideProps({ locale: 'en' })

    expect(props).toEqual({
      props: {
        pageContent: {},
        bannerContent: {},
        langToggleLink: '/fr/contactez-nous/communiquer-assurance-emploi',
        locale: 'en',
        meta: {
          data_en: {
            desc: 'English',
            author: 'Service Canada',
            keywords: '',
            title: 'My Service Canada Account - Contact Employment Ensurance',
          },
          data_fr: {
            author: 'Service Canada',
            desc: 'Français',
            keywords: '',
            title: 'Mon dossier Service Canada - Contactez Assurance Emploi',
          },
        },
        breadCrumbItems: undefined,
        popupContent: {},
      },
    })
  })
})
