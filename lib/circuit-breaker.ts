const CircuitBreakerStates = {
  OPEN: 'open',
  CLOSED: 'closed',
}

export class CircuitBreaker {
  declare state
  declare maxFailures
  declare lastAttempt
  declare openAttemptDelay
  declare closedAttemptDelay

  constructor({
    maxFailures = 5,
    openAttemptDelay = 60000,
    closedAttemptDelay = 1000,
  }) {
    this.state = CircuitBreakerStates.CLOSED
    this.maxFailures = maxFailures
    this.lastAttempt = 0
    this.openAttemptDelay = openAttemptDelay // time in ms between global attempts if the circuit breaker is open (ie. an outage)
    this.closedAttemptDelay = closedAttemptDelay // time in ms between attempts if a single failure occurs (expected to be transient)
  }

  // recommended usage: rv = await CircuitBreakerObject.wrappedCallback(() => yourFunction(params))
  // Will protect yourFunction from being called an excessive number of times if it fails.
  async wrappedCallback<T>(callback: () => T): Promise<T> {
    let rv
    const currentTime = new Date().getTime()
    const timeSinceLastAttempt = currentTime - this.lastAttempt
    if (
      this.state !== CircuitBreakerStates.CLOSED &&
      timeSinceLastAttempt < this.openAttemptDelay
    ) {
      throw new Error('circuit breaker tripped, not attempting')
    }

    // if the circuit breaker is open, immediately update the condition that allows people through so only a small number get in
    this.lastAttempt = currentTime

    let attemptCount = 0
    while (attemptCount < this.maxFailures) {
      try {
        rv = await callback()
        break
      } catch (e: unknown) {
        await new Promise((unused) =>
          setTimeout(unused, this.closedAttemptDelay),
        )
        attemptCount += 1
      }
    }

    if (rv === undefined) {
      this.state = CircuitBreakerStates.OPEN
      throw Error('Max tries for circuit breaker exceeded, tripping breaker')
    }

    this.state = CircuitBreakerStates.CLOSED
    return rv
  }
}
