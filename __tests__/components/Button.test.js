import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import Button from '../../components/Button'

expect.extend(toHaveNoViolations)

describe('Button', () => {
  const defaultProps = {
    id: 'btn1',
    style: 'supertask',
    text: 'default',
    href: 'no ref',
  }

  it('renders the Button component with default props', () => {
    render(<Button {...defaultProps} />)

    expect(screen.getByTestId('btn1')).toBeInTheDocument
    expect(screen.getByText('default')).toBeInTheDocument
  })
  it('has no a11y viollations', async () => {
    const { container } = render(
      <Button
        id="testid"
        text="default"
        href="no ref"
        type="button"
        onClick={() => {
          return true
        }}
      />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
