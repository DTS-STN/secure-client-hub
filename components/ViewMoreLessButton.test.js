import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import ViewMoreLessButton from './ViewMoreLessButton'

expect.extend(toHaveNoViolations)

describe('ViewMoreLessButton', () => {
  it('renders ViewMoreLessButton', () => {
    render(
      <ViewMoreLessButton
        id="vmlb"
        dataTestid="vmlb"
        icon={false}
        caption="test button"
        onClick={() => {
          return true
        }}
      />
    )
    const btn = screen.getByTestId('vmlb')
    expect(btn).toBeInTheDocument()
  })

  it('responds to rotate icon', () => {
    render(
      <ViewMoreLessButton
        id="vmlb"
        dataTestid="vmlb"
        icon={true}
        caption="test button"
        onClick={() => {
          return true
        }}
      />
    )

    const img = screen.getByTestId('vmlb').children[0] //get the img for the icon
    expect(img).toBeTruthy()
  })

  it('has no a11y viollations', async () => {
    const { container } = render(
      <ViewMoreLessButton
        id="testid"
        icon={false}
        caption="test button"
        onClick={() => {
          return true
        }}
      />
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
