import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import PageLink from '../../components/PageLink'

expect.extend(toHaveNoViolations)

jest.mock('next/link', () => {
  return ({ children }) => {
    return children
  }
})

describe('PageLink', () => {
  const { container } = render(
    <PageLink
      lookingForText="title"
      linkText="Link text"
      accessText="accessText"
      href=""
      dataCy=""
      buttonHref=""
      buttonId=""
      buttonLinkText="buttonLinkText"
      refPageAA=""
      dashId=""
    />,
  )
  it('renders PageLink', () => {
    const lookingForText = screen.getByText('title')
    const accessText = screen.getByText('accessText')
    const linkText = screen.getByText('Link text')
    const buttonLinkText = screen.getByText('buttonLinkText')
    expect(lookingForText).toBeInTheDocument()
    expect(accessText).toBeInTheDocument()
    expect(linkText).toBeInTheDocument()
    expect(buttonLinkText).toBeInTheDocument()
  })

  it('has no a11y violations', async () => {
    render(
      <PageLink
        lookingForText="title"
        linkText="Link text"
        accessText="accessText"
        href=""
        dataCy=""
        buttonHref=""
        buttonId=""
        buttonLinkText="buttonLinkText"
        refPageAA=""
        dashId=""
      />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
