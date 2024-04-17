/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import Breadcrumb from '../../components/Breadcrumb'

expect.extend(toHaveNoViolations)

// the code below is to avoid the following error: ... was not wrapped in act(...)"
jest.mock('next/link', () => {
  return ({ children }) => {
    return children
  }
})

describe('BreadCrumb', () => {
  it('renders primary', () => {
    const primary = render(
      <Breadcrumb
        id="breadcrumbID"
        items={[{ text: 'Canada.ca', link: '/' }]}
        refPageAA='dashboard'
      />,
    )
    expect(primary).toBeTruthy()
  })

  it('renders breadcrumb with items', () => {
    const withItems = render(
      <Breadcrumb
        id="breadcrumbID"
        items={[
          { text: 'Canada.ca', link: '/' },
          { text: 'Link1', link: '/' },
          { text: 'Link2', link: '/' },
          { text: 'Link3', link: '/' },
        ]}
        refPageAA='dashboard'
      />,
    )
    expect(withItems).toBeTruthy()
  })

  it('renders breadcrumb with items with longest text', () => {
    const withItemsWithLongText = render(
      <Breadcrumb
        id="breadcrumbID"
        items={[
          { text: 'Canada.ca', link: '/' },
          { text: 'Link1', link: '/' },
          { text: 'Link2', link: '/' },
          { text: 'Max length of breadcrumb 28', link: '/' },
          { text: 'Link3', link: '/' },
        ]}
        refPageAA='dashboard'
      />,
    )
    expect(withItemsWithLongText).toBeTruthy()
  })

  it('has no a11y violations', async () => {
    const { container } = render(
      <Breadcrumb
        id="breadcrumbID"
        items={[{ text: 'Canada.ca', link: '/' }]}
      refPageAA='dashboard'
      />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
