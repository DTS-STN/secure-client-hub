/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import SecuritySettings from '../../pages/security-settings'

import { useRouter } from 'next/router'

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

describe('Security Settings page', () => {
  const content = {
    id: 'security-settings',
    breadcrumb: [
      { link: 'my-dashboard', text: 'My dashboard', id: 'my-dashboard' },
    ],
    pageName: 'parametres-securite',
    heading: 'Paramètres de sécurité',
    subHeading:
      'Les paramètres sont utilisés pour valider votre identité et assurer la sécurité de votre compte.',
    lookingFor: {
      title: 'Vous recherchez les paramètres de votre profil?',
      subText: ['', ''],
      link: '/fr/profil',
      id: 'profile',
    },
    securityQuestions: {
      linkTitle: { link: '', title: '' },
      subTitle: 'Change your security questions and answers.',
    },
  }
  const popupContent = {}

  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      pathname: '/',
      asPath: '/',
    }))
  })

  it('should render the page English', () => {
    render(
      <SecuritySettings
        locale="en"
        content={content}
        popupContent={popupContent}
        popupContentNA={popupContent}
        meta={{}}
        breadCrumbItems={content.breadcrumb}
        langToggleLink={''}
      />,
    )
    const SecuritySettingsDiv = screen.getByTestId('securityContent-test')
    expect(SecuritySettingsDiv).toBeInTheDocument()
  })

  it('should render the page French', () => {
    render(
      <SecuritySettings
        locale="fr"
        content={content}
        popupContent={popupContent}
        popupContentNA={popupContent}
        meta={{}}
        breadCrumbItems={content.breadcrumb}
        langToggleLink={''}
      />,
    )
    const SecuritySettingsDiv = screen.getByTestId('securityContent-test')
    expect(SecuritySettingsDiv).toBeInTheDocument()
  })

  it('should render the links on the page', () => {
    render(
      <SecuritySettings
        locale="en"
        content={content}
        popupContent={popupContent}
        popupContentNA={popupContent}
        meta={{}}
        breadCrumbItems={content.breadcrumb}
        langToggleLink={''}
      />,
    )
    const securityQuestionsLink = screen.getByTestId('securityQuestionsLink')
    expect(securityQuestionsLink).toBeInTheDocument()
  })
})
