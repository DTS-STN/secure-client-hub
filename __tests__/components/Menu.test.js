/**
 * @jest-environment jsdom
 */
import { render, screen, act } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Menu } from '../../components/Menu'

expect.extend(toHaveNoViolations)

describe('Menu', () => {
  const defaultProps = {
    lang: 'en',
    menuList: [
      {
        key: 'dashKey',
        value: 'My dashboard',
        id: 'dashboard',
        path: '/',
        showIcon: false,
      },
      {
        key: 'profileKey',
        value: 'Profile',
        id: 'profile',
        path: '/',
        showIcon: false,
      },
      {
        key: 'securityKey',
        value: 'Security settings',
        id: 'security',
        path: '/',
        showIcon: false,
      },
      {
        key: 'craAccountKey',
        value: 'Switch to CRA My Account',
        id: 'cra',
        path: '/',
        showIcon: false,
      },
      {
        key: 'outKey',
        value: 'Sign out',
        id: 'signout',
        path: '/',
        showIcon: true,
      },
    ],
  }
  it('toggles aria-expanded attribute when clicked', () => {
    render(<Menu {...defaultProps} />)
    const inputElem = screen.getByTestId('menuButton')
    act(() => {
      inputElem.click()
    })
    expect(inputElem.getAttribute('aria-expanded')).toEqual('true')
  })
  it('toggles aria-expanded attribute when clicked', () => {
    render(<Menu {...defaultProps} />)
    const inputElem = screen.getByTestId('menuButton')
    act(() => {
      inputElem.click()
    })
    expect(inputElem.getAttribute('aria-expanded')).toEqual('true')
  })
  it('has no a11y violations', async () => {
    const { container } = render(<Menu {...defaultProps} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
