import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import InfoMessage from '../../components/InfoMessage'

expect.extend(toHaveNoViolations)

describe('InfoMessage', () => {
  it('renders InfoMessage', () => {
    render(
      <InfoMessage
        data-testid={'label'}
        messageText={'messageText'}
        messageLinkText={'messageLinkText'}
        icon={'arrow-up-right-from-square'}
      ></InfoMessage>,
    )
    const label = screen.getAllByTestId('label')
    const messageText = screen.getByText('messageText')
    const messageLinkText = screen.getByText('messageLinkText')

    expect.arrayContaining(label)
    expect(messageText).toBeInTheDocument()
    expect(messageLinkText).toBeInTheDocument()
  })

  it('has no a11y viollations', async () => {
    const { container } = render(
      <InfoMessage
        label={'label'}
        messageText={'messageText'}
        messageLinkText={'messageLinkText'}
        messageLinkHref={'messageLinkHref'}
        icon={'arrow-up-right-from-square'}
      ></InfoMessage>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
