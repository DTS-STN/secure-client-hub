import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Date } from '../../components/Date'

expect.extend(toHaveNoViolations)

describe('Date', () => {
  it('renders Date', () => {
    render(<Date id="testID" date="20230331" />)
    const title = screen.getByTestId('testID')
    const caption = screen.getByText('2023-03-31')
    expect(title).toBeInTheDocument()
    expect(caption).toBeInTheDocument()
  })

  it('has no a11y viollations', async () => {
    const { container } = render(<Date id="testID" date="20230331" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
