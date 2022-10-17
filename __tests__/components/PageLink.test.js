import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import PageLink from '../../components/PageLink'

expect.extend(toHaveNoViolations)

jest.mock('next/link', () => {
  return ({ children }) => {
    return children
  }
})

describe('PageLink', () => {
  // let linkID = linkText.replace(/\s+/g, '')
  // it('renders PageLink with href', () => {
  //     render(<PageLink id="testID" data-cy="testId" href="#" />)
  //     const btn = screen.getByTestId('testId')
  //     expect(btn).toBeInTheDocument()
  //   })

  it('renders PageLink with links for security page', () => {
    render(<PageLink items={[{ text: 'Security', link: '/security' }]} />)
    const pageLink = screen.getByText('newPage')
    expect(pageLink).toBeInTheDocument()
  })

  //   it('renders PageLink', () => {
  //     render(
  //       <PageLink
  //       lookingForText="pageLinkSecurity"
  //       accessText="accessYourSecurityText"
  //       linkText="securityLinkText"
  //       href="/security"

  //       buttonHref="/security"
  //       buttonId="back-to-dashboard-button"
  //       buttonLinkText="backToDashboard"
  //       />
  //     )
  //     const btn = screen.getByTestId('testID')
  //     expect(btn).toBeInTheDocument()
  //     const link = screen.getByTestId('testID')
  //     expect(link).toBeInTheDocument()
  //   })

  //   it('renders the page linker', () => {
  //     const primary = render(<PageLink {...PageLink.args} />)
  //     expect(primary).toBeTruthy()
  //   })

  //   it('has no a11y viollations', async () => {
  //     const { container } = render(
  //       <PageLink
  //         id="testid"

  //         caption="test button"
  //         onClick={() => {
  //           return true
  //         }}
  //       />
  //     )
  //     const results = await axe(container)
  //     expect(results).toHaveNoViolations()
  //   })
})
