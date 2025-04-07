import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import {
  ContactSectionRow,
  ContactSectionRowProps,
} from '../../../components/contact/ContactSectionRow'

expect.extend(toHaveNoViolations)

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

const mockContactSectionRowProps = {
  id: 'test-id',
  items: [{ content: 'test-content', link: 'https://www.example.com' }],
  refPageAA: 'test-refPageAA',
  button: true,
  buttonId: 'test-buttonId',
  lang: 'en',
} satisfies ContactSectionRowProps

describe('ContactSectionRow', () => {
  it('renders contactSectionRow', () => {
    const primary = render(
      <dl>
        <ContactSectionRow {...mockContactSectionRowProps} />
      </dl>,
    )
    expect(primary).toBeTruthy()
  })

  it('has no a11y violations', async () => {
    const { container } = render(
      <dl>
        <ContactSectionRow {...mockContactSectionRowProps} />
      </dl>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
