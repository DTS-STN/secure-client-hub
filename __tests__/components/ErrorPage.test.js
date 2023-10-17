/**
 * @jest-environment jsdom
 */

import { render, act, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { ErrorPage } from '../../components/ErrorPage.js'
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('Error Pages', () => {
  it('has no a11y violations 404', async () => {
    const { container } = render(<ErrorPage lang="en" errType="404" isAuth />)
    await act(async () => {
      const results = await axe(container)
      await waitFor(() => {
        expect(results).toHaveNoViolations()
      })
    })
  })

  it('has no a11y violations 500', async () => {
    const { container } = render(<ErrorPage lang="en" errType="500" isAuth />)
    await act(async () => {
      const results = await axe(container)
      await waitFor(() => {
        expect(results).toHaveNoViolations()
      })
    })
  })

  it('has no a11y violations 503', async () => {
    const { container } = render(<ErrorPage lang="en" errType="503" isAuth />)
    await act(async () => {
      const results = await axe(container)
      await waitFor(() => {
        expect(results).toHaveNoViolations()
      })
    })
  })
})
