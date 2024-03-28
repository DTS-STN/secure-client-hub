import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import ContextualAlert from '../../components/ContextualAlert'

expect.extend(toHaveNoViolations)

describe('ContextualAlert', () => {
  const { container } = render(
    <ContextualAlert
      data-testid="alert-icon"
      alt="alert_icon_alt_text"
      id="alert_icon_id"
      alert_icon_id="icon-id"
      alert_icon_alt_text="alt"
      type="information"
      alertHeading="Information"
      alertBody="You may wish to print this page..."
    />,
  )
  it('renders this Contectual Alert component', () => {
    const message_heading = screen.getByText('Information')
    const message_body = screen.getByText('You may wish to print this page...')
    const icon = screen.getByTestId('alert-icon')

    expect(message_heading).toBeInTheDocument()
    expect(message_body).toBeInTheDocument()
    expect(icon).toBeInTheDocument()
  })

  it('has no a11y violations', async () => {
    render(
      <ContextualAlert
        data-testid="alert-icon"
        alt="alert_icon_alt_text"
        id="alert_icon_id"
        alert_icon_id="icon-id"
        alert_icon_alt_text="alt"
        type="information"
        alertHeading="Information"
        alertBody="You may wish to print this page..."
      />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
