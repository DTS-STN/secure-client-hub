import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import {
  ContactProvince,
  ContactProvinceProps,
} from '../../../components/contact/ContactProvince'

expect.extend(toHaveNoViolations)

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

const mockContactProvinceProps = {
  details: [
    {
      id: 'test-details-id',
      items: [
        {
          city: 'test-details-items-city',
          content: 'test-details-items-content',
          country: 'test-details-items-country',
          poBox: 'test-details-items-poBox',
          postal: 'test-details-items-postal',
          program: 'test-details-items-program',
          province: 'test-details-items-province',
          recipient: 'test-details-items-recipient',
          station: 'test-details-items-station',
        },
      ],
      title: 'test-details-title',
    },
  ],
  id: 'test-id',
  intro: 'test-intro',
  title: 'test-title',
} satisfies ContactProvinceProps

describe('ContactProvince', () => {
  it('renders contactProvince', () => {
    const primary = render(<ContactProvince {...mockContactProvinceProps} />)
    expect(primary).toBeTruthy()
  })

  it('has no a11y violations', async () => {
    const { container } = render(
      <ContactProvince {...mockContactProvinceProps} />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
