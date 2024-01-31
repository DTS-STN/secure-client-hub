import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import Date from '../../components/Date'

expect.extend(toHaveNoViolations)

describe('Date', () => {
  it('renders Date', () => {
    render(<Date id="testID" date="20230331T00001" label="label" />)
    const title = screen.getByTestId('testID')
    const caption = screen.getByText('20230331')
    const label = screen.getByText('label')
    expect(title).toBeInTheDocument()
    expect(caption).toBeInTheDocument()
    expect(label).toBeInTheDocument()
  })

  it('has no a11y viollations', async () => {
    const { container } = render(<Date id="testID" date="20230331" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
