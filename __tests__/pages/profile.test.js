/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Profile from '../../pages/profile'
import { getServerSideProps } from '../../pages/profile'

import { useRouter } from 'next/router'

// mocks useRouter to be able to use component' router.asPath
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

// mocks profile mapper
jest.mock('../../graphql/mappers/profile', () => ({
  getMyDashboardContent: () => {
    return new Promise(function (resolve, reject) {
      resolve({ en: {}, fr: {} })
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

jest.mock('../../components/Card', () => () => {
  return <mock-card data-testid="mock-card" />
})

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
            betaPopUp: 'betaPopUp',
          },
        ],
      },
    ],
    lookingFor: {
      title: 'title',
      subText: ['text', 'text'],
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

  it('should render the page', () => {
    render(
      <Profile
        locale="en"
        content={content}
        meta={{}}
        popupContent={popupContent}
        popupContentNA={popupContent}
        breadCrumbItems={[]}
        langToggleLink={''}
      />
    )
    const profileDiv = screen.getByTestId('profileContent-test')
    expect(profileDiv).toBeInTheDocument()
  })
})
