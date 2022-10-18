/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '../../pages/home'
import { getServerSideProps } from '../../pages/home'

import { useRouter } from 'next/router'

// mocks useRouter to be able to use component' router.asPath
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

// mocks home mapper
jest.mock('../../graphql/mappers/home', () => ({
  getHomeContent: () => {
    return new Promise(function (resolve, reject) {
      resolve({ en: {}, fr: {} })
    })
  },
}))

jest.mock('../../components/Card', () => () => {
  return <mock-card data-testid="mock-card" />
})

describe('Home page', () => {
  const content = {
    heading: 'heading',
    paragraph: 'paragraph',
    cards: [{ id: 'test', title: 'title', lists: 'lists' }],
  }

  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      pathname: '/',
      asPath: '/',
    }))
  })

  it('should render the page', () => {
    render(<Home locale="en" content={content} />)
    const homeDiv = screen.getByTestId('homeContent-test')
    expect(homeDiv).toBeInTheDocument()
  })

  it('should contain a card', () => {
    render(<Home locale="en" content={content} />)
    const testCard = screen.getByTestId('mock-card')
    expect(testCard).toBeInTheDocument()
  })

  it('Test getServerSideProps', async () => {
    const props = await getServerSideProps({ locale: 'en' })

    expect(props).toEqual({
      props: {
        content: {},
        langToggleLink: '/fr/home',
        locale: 'en',
        meta: {
          data_en: {
            desc: 'English',
            author: 'Service Canada',
            keywords: '',
            title: 'My Service Canada Account - Home',
          },
          data_fr: {
            author: 'Service Canada',
            desc: 'Français',
            keywords: '',
            title: 'Mon dossier Service Canada - Accueil',
          },
        },
      },
    })
  })
})
