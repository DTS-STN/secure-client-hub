/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Maintenance from '../../pages/maintenance'

describe('Maintenance page', () => {
  it('renders maintenance page without crashing', () => {
    render(<Maintenance locale="en" />)
    const element = screen.getByTestId('pageHead-maintenance')
    const text = screen.getByText('This service is currently unavailable')

    expect(element).toBeInTheDocument()
    expect(text).toBeInTheDocument()
  })

  it('renders maintenace page in french without crashing', () => {
    render(<Maintenance locale="fr" />)
    const element = screen.getByTestId('pageHead-maintenance')
    const text = screen.getByText('Le service est actuellement indisponible')

    expect(element).toBeInTheDocument()
    expect(text).toBeInTheDocument()
  })
})
