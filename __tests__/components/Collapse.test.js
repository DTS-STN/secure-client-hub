import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import Collapse from '../../components/Collapse'

expect.extend(toHaveNoViolations)

describe('Collapse', () => {
  it('renders the Collapse component', () => {
    render(<Collapse title={`title`} />)
    const title = screen.getByText('title')
    expect(title).toBeInTheDocument()
  })

  it('has no a11y violations', async () => {
    const { container } = render(<Collapse title={`title`} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
