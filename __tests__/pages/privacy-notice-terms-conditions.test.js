/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import PrivacyCondition from '../../pages/privacy-notice-terms-conditions'
import { getServerSideProps } from '../../pages/privacy-notice-terms-conditions'

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
jest.mock('../../graphql/mappers/privacy-notice-terms-conditions', () => ({
  getPrivacyConditionContent: () => {
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
    id: 'privacy-notice-terms-conditions',
    breadcrumb: [
      { link: 'my-dashboard', text: 'My dashboard', id: 'my-dashboard' },
    ],
    pageName: 'privacy-notice-terms-conditions',
    heading: 'Privacy notice and terms and conditions',
    alert: {
      type: 'info',
      text: 'You may wish to print this page for future reference since it contains important information.\n',
    },
    content:
      'testing ## Terms and conditions of use testing 1. **Your credentials** testing',
  }
  const contentFr = {
    id: 'privacy-notice-terms-conditions',
    breadcrumb: [
      {
        link: 'mon-tableau-de-bord',
        text: 'Mon tableau de bord',
        id: 'my-dashboard',
      },
    ],
    pageName: 'avis-confidentialite-modalites',
    heading: 'Avis de confidentialité et modalités',
    alert: {
      type: 'info',
      text:
        'Vous pouvez imprimer cette page pour vous y référer ultérieurement car elle contient des informations importantes.\n' +
        '\n' +
        ' ',
    },
    content:
      'testing ## Conditions d’utilisation testing 1. **Vos identifiants** testing',
  }
  const popupContent = {}

  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      pathname: '/',
      asPath: '/',
    }))
  })

  it('should render the page in English', () => {
    render(
      <PrivacyCondition
        locale="en"
        content={content}
        popupContent={popupContent}
        popupContentNA={popupContent}
        meta={{}}
        breadCrumbItems={content.breadcrumb}
        langToggleLink={''}
      />
    )
    const PrivacyConditionDiv = screen.getByTestId(
      'terms-conditionsContent-test'
    )
    expect(PrivacyConditionDiv).toBeInTheDocument()
  })

  it('should render the page in French', () => {
    render(
      <PrivacyCondition
        locale="fr"
        content={contentFr}
        popupContent={popupContent}
        popupContentNA={popupContent}
        meta={{}}
        breadCrumbItems={content.breadcrumb}
        langToggleLink={''}
      />
    )
    const PrivacyConditionDiv = screen.getByTestId(
      'terms-conditionsContent-test'
    )
    expect(PrivacyConditionDiv).toBeInTheDocument()
  })

  it('Test getServerSideProps', async () => {
    const props = await getServerSideProps({ locale: 'en' })

    expect(props).toEqual({
      props: {
        content: {},
        bannerContent: {},
        breadCrumbItems: undefined,
        langToggleLink: '/fr/avis-confidentialite-modalites',
        locale: 'en',
        meta: {
          data_en: {
            title: 'Privacy and Conditions - My Service Canada Account',
            desc: 'English',
            author: 'Service Canada',
            keywords: '',
            service: 'ESDC-EDSC_MSCA-MSDC',
            creator: 'Employment and Social Development Canada',
            accessRights: '1',
          },
          data_fr: {
            title: 'Confidentialité et conditions - Mon dossier Service Canada',
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
