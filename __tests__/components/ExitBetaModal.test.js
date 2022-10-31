import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import ExitBetaModal from '../../components/ExitBetaModal'

expect.extend(toHaveNoViolations)

describe('Exit Beta Modal', () => {
  it('renders Exit Beta Modal', () => {
    render(<ExitBetaModal closeModal={() => {}} closeModalAria={'close'} />)
    const title = screen.getByText('Exiting beta version')
    const caption = screen.getByText(
      'Thank you for trying the beta version. You are now returning to My Service Canada Account home page.'
    )
    expect(title).toBeInTheDocument()
    expect(caption).toBeInTheDocument()
  })

  it('has no a11y viollations', async () => {
    const { container } = render(
      <ExitBetaModal closeModal={() => {}} closeModalAria={'close'} />
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
