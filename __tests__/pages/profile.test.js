/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Profile from '../../pages/profile'
import Heading from '../../components/Heading'

import { useRouter } from 'next/router'

// mock for icons
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: () => {
    return <svg />
  },
}))

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

jest.mock('../../components/Heading')
// return props.title from Heading mock
Heading.mockImplementation((props) => props.title)

describe('My Profile page', () => {
  const content = {
    list: [
      {
        title: 'title',
        tasks: [
          {
            id: 'id',
            title: 'title',
            areaLabel: 'areaLabel',
            link: '/',
            icon: '',
            betaPopUp: false,
          },
        ],
      },
    ],
    lookingFor: {
      title: 'title',
      subText: ['text', 'text'],
      link: '/',
    },
    backToDashboard: {
      id: 'id',
      btnText: 'btnText',
      btnLink: '/',
    },
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
      <Profile
        heading={{
          id: 'my-dashboard-heading',
          title: 'pageName',
        }}
        locale="en"
        content={content}
        meta={{}}
        popupContent={popupContent}
        popupContentNA={popupContent}
        breadCrumbItems={[]}
        langToggleLink={''}
      />,
    )
    const profileDiv = screen.getByTestId('profileContent-test')
    expect(profileDiv).toBeInTheDocument()
  })

  it('should render the page in French', () => {
    render(
      <Profile
        heading={{
          id: 'my-dashboard-headingFR',
          title: 'headingFR',
        }}
        locale="fr"
        content={content}
        meta={{}}
        popupContent={popupContent}
        popupContentNA={popupContent}
        breadCrumbItems={[]}
        langToggleLink={''}
      />,
    )
    const profileDiv = screen.getByTestId('profileContent-test')
    expect(profileDiv).toBeInTheDocument()
  })
})
