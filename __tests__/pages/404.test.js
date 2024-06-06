/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Custom404 from '../../pages/404'

describe('custom error', () => {
  it('renders custom statusCode 404 without crashing', () => {
    render(
      <Custom404
        lang="en"
        errType="404"
        isAuth={false}
        homePageLink={'/en/my-dashboard'}
        accountPageLink="/"
      />,
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
      />,
    )
    const element = screen.getByTestId('errorType')
    expect(element.textContent).toEqual('Erreur 404')
  })
})
