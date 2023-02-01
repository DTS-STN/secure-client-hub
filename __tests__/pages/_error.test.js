/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CustomError from '../../pages/_error'

jest.mock('../../graphql/mappers/beta-banner-opt-out', () => ({
  getBetaBannerContent: () => {
    return new Promise(function (resolve, reject) {
      resolve({
        en: {},
        fr: {},
      })
    })
  },
}))

jest.mock('../../graphql/mappers/beta-popup-exit', () => ({
  getBetaPopupExitContent: () => {
    return new Promise(function (resolve, reject) {
      resolve({ en: {}, fr: {} })
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
