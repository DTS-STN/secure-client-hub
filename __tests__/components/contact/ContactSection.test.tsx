import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import {
  ContactSection,
  ContactSectionProps,
} from '../../../components/contact/ContactSection'

expect.extend(toHaveNoViolations)

const mockContactSectionProps = {
  details: [
    {
      title: 'test-details-title',
      id: 'test-details-id',
      color: true,
      items: [
        {
          content: 'test-details-items-content',
          id: 'test-details-items-id',
          icon: 'test-details-items-icon',
          button: [],
          highlight: true,
          link: 'test-details-items-link',
        },
      ],
    },
  ],
  id: 'test-id',
  intro: 'test-intro',
  title: 'test-title',
} satisfies ContactSectionProps

describe('ContactSection', () => {
  it('renders contactSection', () => {
    const primary = render(
      <ContactSection
        {...mockContactSectionProps}
        details={[]}
        intro=""
        title="Test title"
      />,
    )
    expect(primary).toBeTruthy()
  })

  it('has no a11y violations', async () => {
    const { container } = render(
      <ContactSection
        {...mockContactSectionProps}
        details={[]}
        intro=""
        title="test title"
      />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
