/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import DecisionReviews from '../../pages/decision-reviews'
import { getServerSideProps } from '../../pages/decision-reviews'

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
jest.mock('../../graphql/mappers/decision-reviews', () => ({
  getDecisionReviewsContent: () => {
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

describe('Decision Reviews page', () => {
  const content = {
    id: 'decision-reviews',
    breadcrumb: [
      { link: 'my-dashboard', text: 'My dashboard', id: 'my-dashboard' },
    ],
    pageName: 'decision-reviews',
    heading: 'Decision Reviews',
    content: 'testing ## Decision Reviews testing testing',
  }
  const contentFr = {
    id: 'demande-revision',
    breadcrumb: [
      {
        link: 'mon-tableau-de-bord',
        text: 'Mon tableau de bord',
        id: 'my-dashboard',
      },
    ],
    pageName: 'demande-revision',
    heading: 'Demande Revision',
    content: 'testing ## Demand Revision testing testing',
  }

  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      pathname: '/',
      asPath: '/',
    }))
  })

  it('should render the page in English', () => {
    render(
      <DecisionReviews
        locale="en"
        content={content}
        popupContent={{}}
        popupContentNA={{}}
        meta={{}}
        breadCrumbItems={content.breadcrumb}
        langToggleLink={''}
      />
    )
    const DecisionReviewsDiv = screen.getByTestId(
      'decision-reviewsContent-test'
    )
    expect(DecisionReviewsDiv).toBeInTheDocument()
  })

  it('should render the page in French', () => {
    render(
      <DecisionReviews
        locale="fr"
        content={contentFr}
        popupContent={{}}
        popupContentNA={{}}
        meta={{}}
        breadCrumbItems={content.breadcrumb}
        langToggleLink={''}
      />
    )
    const DecisionReviewsDiv = screen.getByTestId(
      'decision-reviewsContent-test'
    )
    expect(DecisionReviewsDiv).toBeInTheDocument()
  })

  it('Test getServerSideProps', async () => {
    const props = await getServerSideProps({ locale: 'en' })

    expect(props).toEqual({
      props: {
        content: {},
        bannerContent: {},
        breadCrumbItems: undefined,
        langToggleLink: '/fr/demande-revision',
        locale: 'en',
        meta: {
          data_en: {
            title: 'Decision Reviews - My Service Canada Account',
            desc: 'English',
            author: 'Service Canada',
            keywords: '',
            service: 'ESDC-EDSC_MSCA-MSDC',
            creator: 'Employment and Social Development Canada',
            accessRights: '1',
          },
          data_fr: {
            title: 'Demande Revisions - Mon dossier Service Canada',
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
