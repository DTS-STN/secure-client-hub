/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CustomError from '../../pages/_error'

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

describe('custom error', () => {
  it('renders custom statusCode 500 without crashing', () => {
    render(
      <CustomError
        lang="en"
        errType="500"
        isAuth={false}
        homePageLink={'/en/my-dashboard'}
        accountPageLink="/"
      />
    )
    expect(screen.getByText('Error')).toBeInTheDocument()
  })

  it('renders custom statusCode 404 without crashing', () => {
    render(
      <CustomError
        lang="en"
        errType="404"
        isAuth={false}
        homePageLink={'/en/my-dashboard'}
        accountPageLink="/"
      />
    )
    expect(screen.getByText('Error')).toBeInTheDocument()
  })

  it('renders custom error page in french without crashing', () => {
    render(
      <CustomError
        lang="fr"
        errType="404"
        isAuth={false}
        homePageLink={'/fr/my-dashboard'}
        accountPageLink="/"
      />
    )
    expect(screen.getByText('Erreur')).toBeInTheDocument()
  })
})
