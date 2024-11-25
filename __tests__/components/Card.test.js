import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import Card from '../../components/Card'

expect.extend(toHaveNoViolations)

describe('Card', () => {
  it('renders Card', () => {
    render(
      <Card
        cardTitle={`Card Title`}
        viewMoreLessCaption={`Card Caption`}
        locale="en"
        programUniqueId={'test'}
      />,
    )
    const title = screen.getByText('Card Title')
    const caption = screen.getByText('Card Caption')
    expect(title).toBeInTheDocument()
    expect(caption).toBeInTheDocument()
  })

  it('has no a11y viollations', async () => {
    const { container } = render(
      <Card
        cardTitle={`Card Title`}
        viewMoreLessCaption={`Card Caption`}
        locale="en"
        programUniqueId={'test'}
      />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  // TODO: Add a test that if an alert is added it actually appears
})
