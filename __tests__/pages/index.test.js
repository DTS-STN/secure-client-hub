/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Index, { getServerSideProps } from '../../pages/index'

import { useRouter } from 'next/router'

// mocks useRouter to be able to use component' router.asPath
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

jest.mock('../../graphql/mappers/beta-banner-opt-out', () => ({
  getBetaBannerContent: () => {
    return new Promise(function (resolve, reject) {
      resolve({
        en: {},
        fr: {},
      })
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

const fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: 'mocked data' }),
  })
)

// 'Mock' call to fetchContent
jest.mock('../../lib/cms', () => ({
  fetchContent: () => {
    return {}
  },
}))

jest.mock('../../graphql/mappers/beta-banner-opt-out', () => ({
  getBetaBannerContent: () => {
    return new Promise(function (resolve, reject) {
      resolve({
        en: {},
        fr: {},
      })
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

describe('index page', () => {
  /* Place-holder Meta Data Props */
  const meta = {
    data_en: {
      title: 'My Service Canada Account - Canada.ca',
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
    },
    data_fr: {
      title: 'Mon dossier Service Canada - Canada.ca',
      desc: 'Français',
      author: 'Service Canada',
      keywords: '',
    },
  }

  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      pathname: '/',
      asPath: '/',
    }))
  })

  it('should render the page', () => {
    render(<Index locale="en" meta={meta} />)
    const heading = screen.getByRole('heading')
    expect(heading).toBeInTheDocument()
  })

  it('Test getServerSideProps', async () => {
    const props = await getServerSideProps({
      locale: 'en',
    })

    expect(props).toEqual({
      props: {
        locale: 'en',
        meta: {
          data_en: {
            desc: 'English',
            author: 'Service Canada',
            keywords: '',
            title: 'My Service Canada Account - Canada.ca',
          },
          data_fr: {
            author: 'Service Canada',
            desc: 'Français',
            keywords: '',
            title: 'Mon dossier Service Canada - Canada.ca',
          },
        },
        bannerContent: {},
        popupContent: {},
      },
    })
  })
})
