import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import ProfileTasks from '../../components/ProfileTasks'

expect.extend(toHaveNoViolations)

// mock for icons
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: () => {
    return <svg />
  },
}))

describe('ProfileTasks', () => {
  const { container } = render(
    <ProfileTasks
      locale="en"
      tasks={[
        {
          title: 'Province of residence',
          icon: 'circle',
          link: '/dashboard',
          areaLabel: 'task1',
          betaPopUp: false,
        },
        {
          title: 'Language of correspondence',
          icon: 'stamp',
          link: '/dashboard',
          areaLabel: 'task2',
          betaPopUp: false,
        },
      ]}
    />,
  )

  it('renders ProfileTasks', () => {
    const taskTitle1 = screen.getByText('Province of residence')
    const taskTitle2 = screen.getByText('Language of correspondence')
    expect(taskTitle1).toBeInTheDocument()
    expect(taskTitle2).toBeInTheDocument()
  })

  it('has no a11y violations', async () => {
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
