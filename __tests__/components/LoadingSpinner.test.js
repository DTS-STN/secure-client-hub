import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import LoadingSpinner from '../../components/LoadingSpinner'

expect.extend(toHaveNoViolations)

describe('LoadingSpinner', () => {
  it('renders the LoadingSpinner', () => {
    const { container } = render(
      <LoadingSpinner dataTestid="loading-spinner" text={'Loading'} />
    )
    expect(container).toBeTruthy()
    const text = screen.getByText('Loading')
    expect(text).toBeInTheDocument()
  })

  it('has no a11y viollations', async () => {
    const { container } = render(
      <LoadingSpinner dataTestid={'loading-spinner'} text={'loading'} />
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
