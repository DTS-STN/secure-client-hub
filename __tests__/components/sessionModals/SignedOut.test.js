import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import SignedOut from '../../../components/sessionModals/SignedOut'

expect.extend(toHaveNoViolations)

describe('SignedOutModal', () => {
  it('renders signedOut', () => {
    const primary = render(
      <SignedOut
        closeModal={() => console.log('Close Modal')}
        onContinue={() => console.log('Continue Clicked')}
        id="SignedOut"
      />
    )
    expect(primary).toBeTruthy()
  })
})
