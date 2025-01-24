import { CircuitBreaker } from '../../lib/circuit-breaker'

let successCallback
let failCallback
let cb

beforeEach(() => {
  successCallback = jest.fn(() => {
    return 'success'
  })
  failCallback = jest.fn(() => {
    throw new Error()
  })
  cb = new CircuitBreaker({ maxFailures: 3, closedAttemptDelay: 1 })
})

test('successful call on closed breaker let through normally', async () => {
  expect(await cb.wrappedCallback(successCallback)).toBe('success')
})

test('failing call eventually trips breaker', async () => {
  expect(cb.wrappedCallback(failCallback)).rejects.toThrow()
  expect(cb.wrappedCallback(successCallback)).rejects.toThrow()
})

test('breaker eventually lets through requests', async () => {
  cb = new CircuitBreaker({
    maxFailures: 1,
    openAttemptDelay: 1,
    closedAttemptDelay: 1,
  })
  expect(cb.wrappedCallback(failCallback)).rejects.toThrow()
  await setTimeout(() => {}, 100)
  expect(await cb.wrappedCallback(successCallback)).toBe('success')
  expect(await cb.wrappedCallback(successCallback)).toBe('success')
})

test('intermittent failures do not trip breaker', async () => {
  let pass = false
  let intermittentCallback = () => {
    if (pass) {
      pass = false
      return 'success'
    } else {
      pass = true
      throw new Error('')
    }
  }
  expect(await cb.wrappedCallback(intermittentCallback)).toBe('success')
  expect(await cb.wrappedCallback(intermittentCallback)).toBe('success')
  expect(await cb.wrappedCallback(intermittentCallback)).toBe('success')
  expect(await cb.wrappedCallback(intermittentCallback)).toBe('success')
})

test('respects maxAttempts', async () => {
  cb.maxFailures = 5

  expect(cb.wrappedCallback(failCallback)).rejects.toThrow()
  expect(failCallback).toHaveBeenCalledTimes(5)
})
