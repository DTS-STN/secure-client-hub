import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import Card from './Card'

expect.extend(toHaveNoViolations)

describe('Card', () => {
  it('renders Card', () => {
    render(
      <Card
        cardTitle={`Card Title`}
        viewMoreLessCaption={`Card Caption`}
        locale="en"
        taskGroups={[]}
        programUniqueId={'test'}
      />
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
        taskGroups={[]}
        programUniqueId={'test'}
      />
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
