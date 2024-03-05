import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import Heading from '../../components/Heading'

expect.extend(toHaveNoViolations)

describe('Heading', () => {
  it('renders the Heading', () => {
    render(
      <Heading
        title={`title`}
        fromLink={`from Link`}
        fromText={`from Text`}
        className={`classname`}
        locale="en"
        id={'id'}
        dataTestId={'data test ID'}
      />,
    )
    const title = screen.getByText('title')
    const fromText = screen.getByText('from Text')
    expect(title).toBeInTheDocument()
    expect(fromText).toBeInTheDocument()
  })

  it('has no a11y viollations', async () => {
    const { container } = render(
      <Heading
        title={`title`}
        fromLink={`from Link`}
        fromText={`from Text`}
        className={`classname`}
        locale="en"
        id={'id'}
        dataTestId={'data test ID'}
      />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
