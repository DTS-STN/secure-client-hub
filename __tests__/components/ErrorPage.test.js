/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import ErrorPage from '../../components/ErrorPage'
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

// the code below is to avoid the following error: ... was not wrapped in act(...)"
jest.mock('next/link', () => {
  return ({ children }) => {
    return children
  }
})

describe('Error Pages', () => {
  it('has no a11y violations 404', async () => {
    const { container } = render(<ErrorPage lang="en" errType="404" isAuth />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has no a11y violations 500', async () => {
    const { container } = render(<ErrorPage lang="en" errType="500" isAuth />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has no a11y violations 503', async () => {
    const { container } = render(<ErrorPage lang="en" errType="503" isAuth />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
