import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import { useRouter } from 'next/router'
import ContactCanadaPensionPlan, {
  getServerSideProps,
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

jest.mock('../../graphql/mappers/auth-modals', () => ({
  getAuthModalsContent: () => {
    return new Promise(function (resolve, reject) {
      resolve({
        mappedPopupStaySignedIn: { en: {}, fr: {} },
        mappedPopupSignedOut: { en: {}, fr: {} },
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

  it('Test getServerSideProps', async () => {
    const props = await getServerSideProps({ locale: 'en' })

    expect(props).toEqual({
      props: {
        pageContent: {},
        bannerContent: {},
        langToggleLink: '/fr/contactez-nous/communiquer-regime-pensions-canada',
        locale: 'en',
        aaPrefix: 'ESDC-EDSC:undefined',
        meta: {
          data_en: {
            title: 'Contact Canada Pension Plan - My Service Canada Account',
            desc: 'English',
            author: 'Service Canada',
            keywords: '',
            service: 'ESDC-EDSC_MSCA-MSDC',
            creator: 'Employment and Social Development Canada',
            accessRights: '1',
          },
          data_fr: {
            title: 'Régime de Pensions du Canada - Mon dossier Service Canada',
            desc: 'Français',
            author: 'Service Canada',
            keywords: '',
            service: 'ESDC-EDSC_MSCA-MSDC',
            creator: 'Emploi et Développement social Canada',
            accessRights: '1',
          },
        },
        breadCrumbItems: undefined,
        popupContent: {},
        popupContentNA: {},
        popupYouHaveBeenSignedout: {},
        popupStaySignedIn: {},
        aaPrefix: 'ESDC-EDSC:undefined',
      },
    })
  })
})
