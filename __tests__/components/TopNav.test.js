/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import { TopNav } from '../../components/TopNav'

expect.extend(toHaveNoViolations)

describe('TopNav', () => {
  it('renders the TopNav', () => {
    render(
      <TopNav
        lang="en"
        skipToMainPath="#wb-cont"
        skipToAboutPath="#wb-info"
        switchToBasicPath="/basic-en.html"
        displayAlternateLink={false}
      />,
    )
    expect(screen.getByText('Skip to main content')).toHaveTextContent(
      'Skip to main content',
    )
  })

  it('renders the TopNav with French language', () => {
    render(
      <TopNav
        lang="fr"
        skipToMainPath="#wb-cont"
        skipToAboutPath="#wb-info"
        switchToBasicPath="/basic-fr.html"
        displayAlternateLink={false}
      />,
    )
    expect(screen.getByText('Passer au contenu principal')).toHaveTextContent(
      'Passer au contenu principal',
    )
  })

  it('has no a11y violations', async () => {
    const { container } = render(
      <TopNav
        lang="fr"
        skipToMainPath="#wb-cont"
        skipToAboutPath="#wb-info"
        switchToBasicPath="/basic-fr.html"
        displayAlternateLink={false}
      />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
