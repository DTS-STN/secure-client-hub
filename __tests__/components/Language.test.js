/**
 * @jest-environment jsdom
 */
import { render, screen, act } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Language } from '../../components/Language'

expect.extend(toHaveNoViolations)

describe('Language', () => {
  it("renders 'English' without problems", () => {
    const englishLong = render(<Language id="enLong" lang="fr" path="/en" />)

    expect(englishLong).toBeTruthy()
    expect(screen.getByText('English')).toBeInTheDocument
  })

  it("renders 'EN' without problems", () => {
    const englishAbbr = render(
      <Language id="enAbbr" lang="fr" path="/en" abbr="EN" />
    )

    expect(englishAbbr).toBeTruthy()
    expect(screen.getByText('EN')).toBeInTheDocument
  })

  it('has no a11y violations', async () => {
    const { container } = render(<Language id="enLong" lang="fr" path="/en" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
