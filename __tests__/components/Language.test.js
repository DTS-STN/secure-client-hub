/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import Language from '../../components/Language'

expect.extend(toHaveNoViolations)

// the code below is to avoid the following error: ... was not wrapped in act(...)"
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }) => (
    <children.type {...children.props} href={href} />
  ),
}))

describe('Language', () => {
  it("renders 'English' without problems", async () => {
    const englishLong = render(<Language id="enLong" lang="fr" path="/en" />)
    await waitFor(() => expect(englishLong).toBeTruthy())
    expect(screen.getByText('English')).toBeInTheDocument
  })

  it("renders 'EN' without problems", async () => {
    const englishAbbr = render(
      <Language id="enAbbr" lang="fr" path="/en" abbr="EN" />
    )
    await waitFor(() => expect(englishAbbr).toBeTruthy())
    expect(screen.getByText('EN')).toBeInTheDocument
  })

  it('has no a11y violations', async () => {
    const { container } = render(<Language id="enLong" lang="fr" path="/en" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
