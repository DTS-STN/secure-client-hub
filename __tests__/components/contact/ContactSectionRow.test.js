import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import ContactSectionRow from '../../../components/contact/ContactSectionRow'

expect.extend(toHaveNoViolations)

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

describe('ContactSectionRow', () => {
  it('renders contactSectionRow', () => {
    const primary = render(<ContactSectionRow {...ContactSectionRow.args} />)
    expect(primary).toBeTruthy()
  })

  it('has no a11y violations', async () => {
    const { container } = render(
      <ContactSectionRow {...ContactSectionRow.args} />
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
