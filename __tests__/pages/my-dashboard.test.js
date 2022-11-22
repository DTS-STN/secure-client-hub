/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import MyDashboard from '../../pages/my-dashboard'
import { getServerSideProps } from '../../pages/my-dashboard'

import { useRouter } from 'next/router'

// mocks useRouter to be able to use component' router.asPath
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

// mocks home mapper
jest.mock('../../graphql/mappers/my-dashboard', () => ({
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

jest.mock('../../components/Card', () => () => {
  return <mock-card data-testid="mock-card" />
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

  it('should render the page', () => {
    render(
      <MyDashboard locale="en" content={content} popupContent={popupContent} />
    )
    const myDashboardDiv = screen.getByTestId('myDashboardContent-test')
    expect(myDashboardDiv).toBeInTheDocument()
  })

  it('should contain a card', () => {
    render(
      <MyDashboard locale="en" content={content} popupContent={popupContent} />
    )
    const testCard = screen.getByTestId('mock-card')
    expect(testCard).toBeInTheDocument()
  })

  it('Test getServerSideProps', async () => {
    const props = await getServerSideProps({ locale: 'en' })

    expect(props).toEqual({
      props: {
        content: {},
        bannerContent: {},
        langToggleLink: '/fr/my-dashboard',
        locale: 'en',
        meta: {
          data_en: {
            desc: 'English',
            author: 'Service Canada',
            keywords: '',
            title: 'My Service Canada Account - Dashboard',
          },
          data_fr: {
            author: 'Service Canada',
            desc: 'Français',
            keywords: '',
            title: 'Mon dossier Service Canada - Tableau de Bord',
          },
        },
        popupContent: {},
      },
    })
  })
})
