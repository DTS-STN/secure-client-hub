/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CustomError from '../../pages/_error'

// Mock useSession
jest.mock('next-auth/react', () => ({
  useSession: () => {
    return new Promise(function (resolve, reject) {
      resolve({ status: '' })
    })
  },
}))

describe('custom error', () => {
  it('renders custom statusCode without crashing', () => {
    render(<CustomError statusCode="500" />)
    expect(
      screen.getByText('An error 500 occurred on server')
    ).toBeInTheDocument()
  })

  it('renders no statusCode without crashing', () => {
    render(<CustomError />)
    expect(screen.getByText('An error occurred on client')).toBeInTheDocument()
  })
})
