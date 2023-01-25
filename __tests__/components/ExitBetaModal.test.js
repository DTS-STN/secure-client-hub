import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import ExitBetaModal from '../../components/ExitBetaModal'

expect.extend(toHaveNoViolations)

describe('Exit Beta Modal', () => {
  it('renders Exit Beta Modal', () => {
    render(
      <ExitBetaModal
        closeModal={() => {}}
        closeModalAria={'close'}
        continueLink="/"
        popupId={'Test Id'}
        popupTitle={'Test Title'}
        popupDescription={'Test Description'}
        popupPrimaryBtn={{ id: 'Test Primary Id', text: 'Test Primary Text' }}
        popupSecondaryBtn={{
          id: 'Test Secondary Id',
          text: 'Test Secondary Text',
        }}
      />
    )
    const title = screen.getByText('Test Title')
    const description = screen.getByText('Test Description')
    const primaryBtnText = screen.getByText('Test Primary Text')
    const secondaryBtnText = screen.getByText('Test Secondary Text')
    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
    expect(primaryBtnText).toBeInTheDocument()
    expect(secondaryBtnText).toBeInTheDocument()
  })
  it('has no a11y viollations', async () => {
    const { container } = render(
      <ExitBetaModal
        closeModal={() => {}}
        closeModalAria={'close'}
        continueLink="/"
        popupId={'Test Id'}
        popupTitle={'Test Title'}
        popupDescription={'Test Description'}
        popupPrimaryBtn={{ id: 'Test Primary Id', text: 'Test Primary Text' }}
        popupSecondaryBtn={{
          id: 'Test Secondary Id',
          text: 'Test Secondary Text',
        }}
      />
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
  it('placeholder', () => {})
})
