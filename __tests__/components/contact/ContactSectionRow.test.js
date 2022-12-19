import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import ContactSectionRow from '../../../components/contact/ContactSectionRow'

expect.extend(toHaveNoViolations)

describe('ContactSectionRow', () => {
  it('renders contactSectionRow', () => {
    const primary = render(<ContactSectionRow {...ContactSectionRow.args} />)
    expect(primary).toBeTruthy()
  })
})
