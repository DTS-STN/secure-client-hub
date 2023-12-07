import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import { useRouter } from 'next/router'
import ContactUsPage from '../../pages/contact-us/[id]'

expect.extend(toHaveNoViolations)

// mocks useRouter to be able to use component' router.asPath
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

// mocks useRouter to be able to use component' router.asPath
jest.mock('../../lib/auth', () => ({
  AuthIsDisabled: () => {
    return true
  },
  AuthIsValid: () => {
    return true
  },
  Redirect: jest.fn(),
}))

jest.mock('../../components/contact/ContactProvince', () => {
  const MockProvince = () => <mock-province data-testid="mock-province" />
  return MockProvince
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
})
