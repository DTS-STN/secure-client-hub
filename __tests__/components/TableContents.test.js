import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import TableContents from '../../components/TableContents'

expect.extend(toHaveNoViolations)

describe('TableContents', () => {
  const { container } = render(
    <TableContents
      locale="en"
      sectionList={[
        {
          name: 'Telephone',
          link: '#telephone',
        },
        {
          name: 'Callback',
          link: '#callback',
        },
      ]}
    />,
  )
  it('renders TableContents', () => {
    const listitem1 = screen.getByText('Telephone')
    const listitem2 = screen.getByText('Callback')
    expect(listitem1).toBeInTheDocument()
    expect(listitem2).toBeInTheDocument()
  })

  it('has no a11y viollations', async () => {
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
