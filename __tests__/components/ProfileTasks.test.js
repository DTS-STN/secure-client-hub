import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import ProfileTasks from '../../components/ProfileTasks'
import { faCircle, faStamp } from '@fortawesome/free-solid-svg-icons'

expect.extend(toHaveNoViolations)

describe('ProfileTasks', () => {
  const { container } = render(
    <ProfileTasks
      locale="en"
      tasks={[
        {
          title: 'Province of residence',
          icon: 'circle',
          link: '/dashboard',
        },
        {
          title: 'Language of correspondence',
          icon: 'stamp',
          link: '/dashboard',
        },
      ]}
    />
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
