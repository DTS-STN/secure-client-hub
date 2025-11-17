import { retry } from 'moderndash'

import { getLogger } from '../../logging/log-util'

const logger = getLogger('message.service')

/**
 * A custom fetch(..) function that can be used for making HTTP requests.
 * Primarily used for intercepting responses or configuring an HTTP proxy.
 */
export type FetchFn = typeof fetch

/**
 * Options for configuring a custom fetch function.
 */
export interface FetchOptions {
  /**
   * The proxy URL to be used for HTTP requests.
   * If provided, the fetch function will use this proxy.
   */
  proxyUrl?: string

  /**
   * Timeout value (in milliseconds) for the fetch requests.
   * If not provided, a default timeout may be used.
   */
  timeout?: number
}

/**
 * Options for configuring a retry mechanism for fetch function.
 */
export interface RetryOptions {
  /**
   * Maximum number of retry attempts (excluding the first try).
   * Set to 0 or undefined to disable retries.
   */
  retries?: number

  /**
   * Base delay in milliseconds before the first retry attempt.
   * Subsequent retries will use exponential backoff.
   */
  backoffMs?: number

  /**
   * A mapping of HTTP status codes to body matchers (string or RegExp) that should trigger a retry.
   * If the array is empty, any response with the corresponding status code will trigger a retry.
   */
  retryConditions?: Record<number, (string | RegExp)[]>
}

/**
 * Options for performing a fetch request with conditional retry logic
 * based on HTTP status codes and optional response body matchers.
 */
interface FetchRetryOptions {
  fetchFn: typeof fetch
  input: RequestInfo | URL
  init: RequestInit
  retryConditions: Record<number, (string | RegExp)[]>
}

/**
 * Extended options for instrumented fetch calls.
 */
export type InstrumentedFetchOptions = RequestInit &
  FetchOptions & {
    retryOptions?: RetryOptions
  }

/**
 * Service interface for managing HTTP requests with optional instrumentation and proxy support.
 */
export interface HttpClient {
  /**
   * Makes an HTTP request with instrumentation support for metrics.
   *
   * @param input - The input for the HTTP request, which can be a URL or a `RequestInfo` object.
   * @param options - (Optional) Additional options for the request, including proxy settings, initialization options and retry configuration.
   * @returns A promise that resolves with the `Response` object from the HTTP request.
   * @throws Will throw an error if the HTTP request fails.
   */
  httpFetch(
    input: RequestInfo | URL,
    options?: InstrumentedFetchOptions,
  ): Promise<Response>
}

export function getHttpClient(): HttpClient {
  return new DefaultHttpClient()
}

export class DefaultHttpClient implements HttpClient {
  constructor() {}

  async httpFetch(
    input: RequestInfo | URL,
    options: InstrumentedFetchOptions = {},
  ): Promise<Response> {
    logger.debug(
      'Executing http fetch function; input: [%s], options: [%j]',
      input,
      options,
    )
    const { retryOptions, ...init } = options

    // Configure default retry options if not specified
    const {
      retries = 0,
      backoffMs = 100,
      retryConditions = {},
    } = retryOptions ?? {}

    const fetchFn = fetch

    try {
      const response = await retry(
        async () =>
          await this.fetchWithRetryConditions({
            fetchFn,
            input,
            init,
            retryConditions,
          }),
        {
          maxRetries: retries,
          backoff: (retries: number) => retries * backoffMs,
          onRetry: (error, attempt) => {
            if (typeof attempt === 'number') {
              logger.warn(
                'HTTP request failed; attempt [%d] of [%d]; [%s]',
                attempt,
                retries,
                error,
              )
            } else {
              logger.warn('HTTP request failed; [%s]', error)
            }
          },
        },
      )

      logger.trace('HTTP request completed; status: [%d]', response.status)

      return response
    } catch (error) {
      throw new Error('instrumented fetch failed')
    }
  }

  /**
   * Fetches a resource and checks for retry conditions based on the response status and body.
   *
   * @param fetchFn - The fetch function to use for making the request.
   * @param input - The input for the HTTP request, which can be a URL or a `RequestInfo` object.
   * @param init - The initialization options for the fetch request.
   * @param retryConditions - A map of status codes to response body contents that should trigger a retry.
   * @returns A promise that resolves with the `Response` object from the HTTP request.
   */
  private async fetchWithRetryConditions({
    fetchFn,
    input,
    init,
    retryConditions,
  }: FetchRetryOptions): Promise<Response> {
    const response = await fetchFn(input, init)
    logger.trace('log fetch ' + response)
    console.log(retryConditions)
    //Check if the response status is configured to be retried
    let conditions
    if (
      Object.keys(retryConditions)
        .map((k) => parseInt(k))
        .includes(response.status)
    ) {
      conditions = retryConditions[response.status]
    }

    if (!conditions) {
      return response
    }

    // Clone the response before reading its body to avoid consuming the original stream
    const body = await response.clone().text()

    //Retry on this status regardless of body content
    if (conditions.length === 0) {
      throw new Error(
        `Retryable response thrown with http status: [${response.status} ${response.statusText}]; response body: [${body}]`,
      )
    }

    //Retry only if the body matches one of the configured retry conditions (string or regex)
    const matchedCondition = conditions.find((condition) =>
      typeof condition === 'string' ? condition === body : condition.test(body),
    )
    if (matchedCondition) {
      throw new Error(
        `Retryable response thrown with http status: [${response.status} ${response.statusText}]; matched condition: [${matchedCondition}]; response body: [${body}]`,
      )
    }

    // Response matched a retriable status but not a retriable body - treat as successful
    return response
  }
}
