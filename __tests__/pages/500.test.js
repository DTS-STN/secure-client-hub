/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Custom500 from '../../pages/500'

describe('custom error', () => {
  it('renders custom statusCode 500 without crashing', () => {
    render(
      <Custom500
        lang="en"
        errType="500"
        isAuth={false}
        homePageLink={'/en/my-dashboard'}
        accountPageLink="/"
      />,
    )
    const element = screen.getByTestId('errorType')
    expect(element.textContent).toEqual('Error 500')
  })

  it('renders custom error page in french without crashing', () => {
    render(
      <Custom500
        lang="fr"
        errType="500"
        isAuth={false}
        homePageLink={'/fr/my-dashboard'}
        accountPageLink="/"
      />,
    )
    const element = screen.getByTestId('errorType')
    expect(element.textContent).toEqual('Erreur 500')
  })
})
