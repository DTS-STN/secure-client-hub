import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import IdleTimeout from '../../components/IdleTimeout'

jest.mock('next/router', () => ({
  useRouter: () => ({}),
}))

describe('IdleTimeout', () => {
  it('renders with modal opened after 1 second timeout', async () => {
    render(
      <IdleTimeout
        promptBeforeIdle={4000}
        timeout={5000}
        locale="en"
        refPageAA="test"
      />,
    )
    await waitFor(
      () => {
        const modal = screen.getByTestId('modal')
        expect(modal).toBeInTheDocument()
      },
      { timeout: 3000 },
    )
  })
})
