import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import Dashboard from '../../../components/skeletons/Dashboard'

expect.extend(toHaveNoViolations)

describe('Dashboard', () => {
  it('renders dashboard skeleton', () => {
    render(<Dashboard sections={1} />)

    const box = screen.getByTestId('dashboard-skeleton')
    console.log(box)
    expect(box).toBeTruthy()
  })
})
