/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Login from '../../pages/auth/login'
import { useRouter } from 'next/router'

// mocks useRouter to be able to use component' router.asPath
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

//mock auth function
jest.mock('../../lib/auth', () => ({
  AuthIsDisabled: () => {
    return true
  },
}))

describe('login page', () => {
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
      pathname: '/auth/login',
      asPath: '/auth/login',
    }))
  })

  it('should render the page', () => {
    render(<Login locale="en" />)
    // const loading = screen.stringContaining('Loading / Chargement en cours ...')
    expect.toBeInTheDocument('stringContaining')
  })
})
