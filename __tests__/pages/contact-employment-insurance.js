import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import Card from '../../components/Card'

expect.extend(toHaveNoViolations)

describe('Page', () => {
  it('renders title without crashing', () => {
    render(
      <h1 class="ds-heading1" id="my-dashboard-heading">
        Contact Employment Insurance
      </h1>
    )
    expect(screen.getByText('Contact Employment Insurance')).toBeInTheDocument()
  })
})
