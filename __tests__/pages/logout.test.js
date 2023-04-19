/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Logout from '../../pages/auth/logout'
import { useRouter } from 'next/router'

// mocks useRouter to be able to use component' router.asPath
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

//mock auth functions
jest.mock('../../lib/auth', () => ({
  AuthIsDisabled: () => {
    return true
  },
  AuthIsValid: () => {
    return true
  },
  Redirect: jest.fn(),
}))

describe('logout page', () => {
  /* Place-holder Meta Data Props */
  const meta = {
    data_en: {
      title: '',
      desc: '',
      author: '',
      keywords: '',
    },
    data_fr: { title: '', desc: '', author: '', keywords: '' },
  }

  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      pathname: '/auth/logout',
      asPath: '/auth/logout',
    }))
  })

  it('should render the page', () => {
    render(<Logout locale="en" />)
    const loading = screen.getAllByText('Loading / Chargement en cours ...')
    expect(loading).toBeInTheDocument
  })
})
