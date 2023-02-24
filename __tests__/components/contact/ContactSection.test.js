import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import ContactSection from '../../../components/contact/ContactSection'

expect.extend(toHaveNoViolations)

describe('ContactSection', () => {
  it('renders contactSection', () => {
    const primary = render(
      <ContactSection
        {...ContactSection.args}
        details={[]}
        intro=""
        title="Test title"
      />
    )
    expect(primary).toBeTruthy()
  })

  it('has no a11y violations', async () => {
    const { container } = render(
      <ContactSection
        {...ContactSection.args}
        details={[]}
        intro=""
        title="test title"
      />
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
