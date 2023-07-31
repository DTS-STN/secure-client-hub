/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import SecuritySettings from '../../pages/security-settings'
import { getServerSideProps } from '../../pages/security-settings'

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

// mocks home mapper
jest.mock('../../graphql/mappers/security-settings', () => ({
  getSecuritySettingsContent: () => {
    return new Promise(function (resolve, reject) {
      resolve({ en: {}, fr: {} })
    })
  },
}))

jest.mock('../../lib/auth', () => ({
  AuthIsDisabled: () => {
    return new Promise(function (resolve, reject) {
      resolve(true)
    })
  },
}))

jest.mock('../../graphql/mappers/beta-banner-opt-out', () => ({
  getBetaBannerContent: () => {
    return new Promise(function (resolve, reject) {
      resolve({ en: {}, fr: {} })
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
      resolve({ en: {}, fr: {} })
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

describe('Privacy Notice Terms Conditions page', () => {
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
    eiAccessCode: {
      linkTitle: { link: '', title: '' },
      subTitle:
        'This secure code is needed to submit your reports and access information about your claim.',
    },
  }
  const popupContent = {}

  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      pathname: '/',
      asPath: '/',
    }))
  })

  it('should render the page', () => {
    render(
      <SecuritySettings
        locale="en"
        content={content}
        popupContent={popupContent}
        popupContentNA={popupContent}
        meta={{}}
        breadCrumbItems={content.breadcrumb}
        langToggleLink={''}
      />
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
      />
    )
    const eiAccessCodeLink = screen.getByTestId('eiAccessCodeLink')
    const securityQuestionsLink = screen.getByTestId('securityQuestionsLink')
    expect(eiAccessCodeLink).toBeInTheDocument()
    expect(securityQuestionsLink).toBeInTheDocument()
  })

  it('Test getServerSideProps', async () => {
    const props = await getServerSideProps({ locale: 'en' })

    expect(props).toEqual({
      props: {
        content: {},
        bannerContent: {},
        breadCrumbItems: undefined,
        langToggleLink: '/fr/parametres-securite',
        locale: 'en',
        meta: {
          data_en: {
            title: 'Security - My Service Canada Account',
            desc: 'English',
            author: 'Service Canada',
            keywords: '',
            service: 'ESDC-EDSC_MSCA-MSDC',
            creator: 'Employment and Social Development Canada',
            accessRights: '1',
          },
          data_fr: {
            title: 'Sécurité - Mon dossier Service Canada',
            desc: 'Français',
            author: 'Service Canada',
            keywords: '',
            service: 'ESDC-EDSC_MSCA-MSDC',
            creator: 'Emploi et Développement social Canada',
            accessRights: '1',
          },
        },
        popupContent: {},
        popupContentNA: {},
        popupYouHaveBeenSignedout: {},
        popupStaySignedIn: {},
        aaPrefix: 'ESDC-EDSC:undefined',
      },
    })
  })
})
