import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import { useRouter } from 'next/router'
import ContactCanadaPensionPlan, {
  getStaticProps,
} from '../../pages/contact-us/contact-canada-pension-plan'

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

jest.mock('../../graphql/mappers/contact-canada-pension-plan', () => ({
  getContactCanadaPensionPlan: () => {
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

describe('CPP Contact Us Page', () => {
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
      title: 'My Service Canada Account - Contact Canada Pension Plan',
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
    },
    data_fr: {
      title: 'Mon dossier Service Canada - Régime de Pensions du Canada',
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
      <ContactCanadaPensionPlan
        locale="en"
        pageContent={content}
        popupContent={popupContent}
        meta={meta}
      />
    )
    const contactCPPDiv = screen.getByTestId('contactCPP-test')
    expect(contactCPPDiv).toBeInTheDocument
  })

  it('should contain a table of contents', () => {
    render(
      <ContactCanadaPensionPlan
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
      <ContactCanadaPensionPlan
        locale="en"
        pageContent={content}
        popupContent={popupContent}
        meta={meta}
      />
    )
    const contactSection = screen.getByTestId('contactSection-test')
    expect(contactSection).toBeInTheDocument()
  })

  it('Test getStaticProps', async () => {
    const props = await getStaticProps({ locale: 'en' })

    expect(props).toEqual({
      props: {
        pageContent: {},
        bannerContent: {},
        langToggleLink: '/fr/contactez-nous/communiquer-regime-pensions-canada',
        locale: 'en',
        meta: {
          data_en: {
            desc: 'English',
            author: 'Service Canada',
            keywords: '',
            title: 'My Service Canada Account - Contact Canada Pension Plan',
          },
          data_fr: {
            author: 'Service Canada',
            desc: 'Français',
            keywords: '',
            title: 'Mon dossier Service Canada - Régime de Pensions du Canada',
          },
        },
        breadCrumbItems: undefined,
        popupContent: {},
      },
    })
  })
})
