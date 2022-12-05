import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import ContactProvince from '../../../components/contact/ContactProvince'

expect.extend(toHaveNoViolations)

describe('ContactProvince', () => {
  it('renders contactProvince', () => {
    const primary = render(
      <ContactProvince
        {...ContactProvince.args}
        contentEi=""
        contentDocuments=""
      />
    )
    expect(primary).toBeTruthy()
  })
})
