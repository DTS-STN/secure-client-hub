/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Custom404 from '../../pages/404'

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
  it('renders custom statusCode 404 without crashing', () => {
    render(
      <Custom404
        lang="en"
        errType="404"
        isAuth={false}
        homePageLink={'/en/my-dashboard'}
        accountPageLink="/"
      />
    )
    const element = screen.getByTestId('errorType')
    expect(element.textContent).toEqual('Error 404')
  })

  it('renders custom error page in french without crashing', () => {
    render(
      <Custom404
        lang="fr"
        errType="404"
        isAuth={false}
        homePageLink={'/fr/my-dashboard'}
        accountPageLink="/"
      />
    )
    const element = screen.getByTestId('errorType')
    expect(element.textContent).toEqual('Erreur 404')
  })
})
