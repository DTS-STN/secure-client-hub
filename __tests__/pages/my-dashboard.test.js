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

jest.mock('../../components/Card', () => {
  const MockCard = () => <mock-card data-testid="mock-card" />
  return MockCard
})

jest.mock('../../components/ContextualAlert', () => {
  const MockAlert = () => <mock-alert data-testid="mock-alert" />
  return MockAlert
})
describe('My Dashboard page', () => {
  const content = {
    heading: 'heading',
    paragraph: 'paragraph',
    cards: [
      {
        id: 'test',
        title: 'title',
        cardAlerts: [
          {
            id: 'test',
            type: 'title',
            alertHeading: 'heading',
            alertBody: 'body',
          },
        ],
        lists: [],
      },
    ],
    pageAlerts: [
      { id: 'test', type: 'title', alertHeading: 'heading', alertBody: 'body' },
    ],
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
      />,
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
      />,
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
      />,
    )
    const testCard = screen.getByTestId('mock-card')
    expect(testCard).toBeInTheDocument()
  })

  it('should contain an alert', () => {
    render(
      <MyDashboard
        locale="en"
        content={content}
        popupContentNA={popupContent}
      />,
    )
    const testAlert = screen.getByTestId('mock-alert')
    expect(testAlert).toBeInTheDocument()
  })
})
