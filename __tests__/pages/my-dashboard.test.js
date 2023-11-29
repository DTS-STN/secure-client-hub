/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import MyDashboard from '../../pages/my-dashboard'

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
jest.mock('../../graphql/mappers/my-dashboard', () => ({
  getMyDashboardContent: () => {
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

jest.mock('../../components/Card', () => {
  const MockCard = () => <mock-card data-testid="mock-card" />
  return MockCard
})

describe('My Dashboard page', () => {
  const content = {
    heading: 'heading',
    paragraph: 'paragraph',
    cards: [{ id: 'test', title: 'title', lists: [] }],
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
      <MyDashboard
        locale="en"
        content={content}
        popupContentNA={popupContent}
      />
    )
    const myDashboardDiv = screen.getByTestId('myDashboardContent-test')
    expect(myDashboardDiv).toBeInTheDocument()
  })

  it('should render the page in French', () => {
    render(
      <MyDashboard
        locale="fr"
        content={content}
        popupContentNA={popupContent}
      />
    )
    const myDashboardDiv = screen.getByTestId('myDashboardContent-test')
    expect(myDashboardDiv).toBeInTheDocument()
  })

  it('should contain a card', () => {
    render(
      <MyDashboard
        locale="en"
        content={content}
        popupContentNA={popupContent}
      />
    )
    const testCard = screen.getByTestId('mock-card')
    expect(testCard).toBeInTheDocument()
  })
})
