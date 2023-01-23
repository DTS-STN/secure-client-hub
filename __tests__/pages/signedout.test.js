/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Signedout from '../../pages/signedout'
import { getStaticProps } from '../../pages/index'

import { useRouter } from 'next/router'

// mocks useRouter to be able to use component' router.asPath
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

describe('signedout page', () => {
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
      pathname: '/signedout',
      asPath: '/signedout',
    }))
  })

  it('should render the page', () => {
    render(<Signedout locale="en" />)
    // const loading = screen.stringContaining('Loading / Chargement en cours ...')
    expect.toBeInTheDocument('stringContaining')
  })
})
