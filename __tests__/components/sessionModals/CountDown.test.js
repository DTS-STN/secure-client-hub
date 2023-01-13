import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import CountDown from '../../../components/sessionModals/CountDown'

expect.extend(toHaveNoViolations)

const fallbackContent = {
  en: {
    scHeading: '',
    signOutLinkText: '',
    staySignedInLinktext: '',
    scContent: [],
    scMinutesAnd: 'minutes and',
    scSeconds: 'seconds',
  },
  fr: {
    scHeading: '',
    signOutLinkText: '',
    staySignedInLinktext: '',
    scContent: [],
    scMinutesAnd: 'minutes et',
    scSeconds: 'secondes',
  },
}

describe('CountDownModal', () => {
  it('renders countDown', () => {
    const primary = render(
      <CountDown
        closeModal={() => console.log('Close Modal')}
        onSignOut={() => console.log('Sign Out Clicked')}
        onStay={() => console.log('Stay Signed In Clicked')}
        id="CountDown"
        deadline="January, 31, 2023"
        {...fallbackContent.en}
      />
    )
    expect(primary).toBeTruthy()
  })
})
