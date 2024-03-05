/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import Header from '../../components/Header'

expect.extend(toHaveNoViolations)

// the code below is to avoid the following error: ... was not wrapped in act(...)"
jest.mock('next/link', () => {
  return ({ children }) => {
    return children
  }
})

describe('Header', () => {
  let mockFn
  beforeEach(() => {
    mockFn = jest.fn()
  })
  afterEach(() => {
    mockFn.mockRestore()
  })

  const defaultProps = {
    id: 'header',
    dataGcAnalyticsCustomClickInstitutionVariable: 'Institution',
    lang: 'en',
    locale: 'en',
    linkPath: '/fr',
    menuProps: {
      menuList: [
        { key: 'dashKey', value: 'My dashboard', path: '/', showIcon: false },
        { key: 'profileKey', value: 'Profile', path: '/', showIcon: false },
        {
          key: 'securityKey',
          value: 'Security settings',
          path: '/',
          showIcon: false,
        },
        {
          key: 'craAccountKey',
          value: 'Switch to CRA My Account',
          path: '/',
          showIcon: false,
        },
        { key: 'outKey', value: 'Sign out', path: '/', showIcon: true },
      ],
    },
    topnavProps: {
      skipToMainPath: '#wb-cont',
      skipToAboutPath: '#wb-info',
      switchToBasicPath: '/basic-en.html',
      displayAlternateLink: false,
    },
    breadCrumbItems: [
      { text: 'Canada.ca', link: '/' },
      { text: 'Link1', link: '/' },
      { text: 'Link2', link: '/' },
      { text: 'Max length of breadcrumb 28', link: '/' },
      { text: 'Link3', link: '/' },
    ],
  }
  test('renders Header component with default props', () => {
    render(<Header {...defaultProps} />)

    expect(screen.getByTestId('header')).toBeInTheDocument
    expect(screen.getByAltText('Government of Canada')).toBeInTheDocument
  })

  it('has no a11y violations', async () => {
    const { container } = render(<Header {...defaultProps} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
