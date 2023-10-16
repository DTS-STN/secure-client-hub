import { render, screen, act, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { axe, toHaveNoViolations } from 'jest-axe'
import BenefitTasks from '../../components/BenefitTasks'

expect.extend(toHaveNoViolations)

describe('BenefitTasks', () => {
  const taskListTest = {
    title: 'Application',
    tasks: [
      {
        areaLabel: 'View my Employment Insurance status updates',
        betaPopUp: true,
        icon: 'list-check',
        id: 'ei-view-my-status-updates',
        link: '/',
        title: 'View my status updates',
      },
    ],
  }
  it('renders Benefit Task', async () => {
    render(
      <BenefitTasks
        acronym={'test'}
        taskList={taskListTest}
        dataCy="task-group-list-test"
        openModal={() => {}}
        refPageAA={'test'}
      />
    )
    const testid = screen.getByTestId('benefitTasks-test')
    expect(testid).toBeInTheDocument()
  })

  it('has no a11y violations', async () => {
    const { container } = render(
      <BenefitTasks
        acronym={'test'}
        taskList={taskListTest}
        dataCy="task-group-list-test"
        openModal={() => {}}
        refPageAA={'test'}
      />
    )
    await act(async () => {
      const results = await axe(container)
      await waitFor(() => {
        expect(results).toHaveNoViolations()
      })
    })
  })
})
