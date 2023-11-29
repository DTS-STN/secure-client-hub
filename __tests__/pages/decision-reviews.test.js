/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import DecisionReviews from '../../pages/decision-reviews'

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
    content: [
      {
        content: 'testing ## Decision Reviews testing testing',
        button: {
          id: 'test-id',
          text: 'test-text',
        },
      },
      {
        content: 'testing ## Decision Reviews testing testing',
        button: {
          id: 'test-id',
          text: 'test-text',
        },
      },
    ],
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
    content: [
      {
        content: 'testing ## Demande Revision testing testing',
        button: {
          id: 'test-id',
          text: 'test-text',
        },
      },
      {
        content: 'testing ## Demande Revision testing testing',
        button: {
          id: 'test-id',
          text: 'test-text',
        },
      },
    ],
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
})
