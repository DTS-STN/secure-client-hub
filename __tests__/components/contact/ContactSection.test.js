import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import ContactSection from '../../../components/contact/ContactSection'

expect.extend(toHaveNoViolations)

describe('ContactSection', () => {
  it('renders contactSection', () => {
    const primary = render(
      <ContactSection {...ContactSection.args} details={[]} intro="" />
    )
    expect(primary).toBeTruthy()
  })
})
