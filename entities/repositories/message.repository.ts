import type { MessageDto, PdfDto } from '../dtos/message.dto'
import { getLogger } from '../../logging/log-util'
import getPdfByMessageIdJson from '../../pages/api/resources/get-pdf-by-message-id.json'
import { getHttpClient } from '../../pages/api/http-client'

/**
 * A repository that provides access to letters.
 */

const logger = getLogger('letter.repository')

export interface MessageRepository {
  /**
   * Find all letter entities for a given sin.
   *
   * @param sin The sin to find all message entities for.
   * @param userId The user that made the request, only used for auditing
   * @returns A Promise that resolves to all message entities found for a sin.
   */
  findMessagesBySin(sin: string, userId: string): Promise<readonly MessageDto[]>

  /**
   * Retrieve the PDF entity associated with a specific message id.
   *
   * @param messageId The message id of the PDF dto.
   * @param userId The user that made the request, only used for auditing
   * @returns A Promise that resolves to the PDF dto for a message id.
   */
  getPdfByMessageId(messageId: string, userId: string): Promise<PdfDto>

  /**
   * Retrieves metadata associated with the letter repository.
   *
   * @returns A record where the keys and values are strings representing metadata information.
   */
  getMetadata(): Record<string, string>

  /**
   * Performs a health check to ensure that the letter repository is operational.
   *
   * @throws An error if the health check fails or the repository is unavailable.
   * @returns A promise that resolves when the health check completes successfully.
   */
  checkHealth(): Promise<void>
}

export function getMessageRepository(): MessageRepository {
  return process.env.ENABLE_MOCK_LETTER_SERVICE === 'true'
    ? new MockMessageRepository()
    : new DefaultMessageRepository()
}

export class DefaultMessageRepository implements MessageRepository {
  private readonly baseUrl = `${process.env.CCT_API_BASE_URI}${process.env.CCT_API_LETTERS_URI}`

  constructor() {}

  async findMessagesBySin(
    sin: string,
    userId: string,
  ): Promise<readonly MessageDto[]> {
    logger.trace('Fetching letters for sin [%s]', sin)
    console.log(userId)
    const url = new URL(
      `${this.baseUrl}${process.env.CCT_API_LETTERS_ENDPOINT}`,
    )
    url.searchParams.set('clientId', sin)
    url.searchParams.set('userId', userId) //TODO fix userId
    url.searchParams.set('community', `${process.env.CCT_API_COMMUNITY}`)
    url.searchParams.set('Exact', 'false')

    const httpClient = getHttpClient()

    const response = await httpClient.httpFetch(url, {
      // proxyUrl: this.serverConfig.HTTP_PROXY_URL,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': `${process.env.CCT_API_KEY}`,
        'Ocp-Apim-Subscription-Key': `${process.env.INTEROP_API_SUBSCRIPTION_KEY}`,
      },
      retryOptions: {
        retries: parseInt(`${process.env.CCT_API_MAX_RETRIES}`),
        backoffMs: parseInt(`${process.env.CCT_API_RETRY_DELAY}`),
        retryConditions: {
          [502]: [],
        },
      },
    })
    logger.trace('response test' + response)

    if (!response.ok) {
      logger.error('%j', {
        message: 'Failed to find letters',
        status: response.status,
        statusText: response.statusText,
        url: url,
        responseBody: await response.text(),
      })

      throw new Error(
        `Failed to find letters. Status: ${response.status}, Status Text: ${response.statusText}`,
      )
    }

    const messageDtos: readonly MessageDto[] = await response.json()
    logger.trace('Returning letters [%j]', messageDtos)
    return messageDtos
  }

  async getPdfByMessageId(messageId: string, userId: string): Promise<PdfDto> {
    logger.trace(
      'Fetching message for userId [%s] and message id [%s]',
      userId,
      messageId,
    )
    console.log(userId)
    const url = new URL(`${this.baseUrl}${process.env.CCT_API_PDF_ENDPOINT}`)
    url.searchParams.set('id', messageId)
    url.searchParams.set('userId', userId) //TODO fix userId
    url.searchParams.set('community', `${process.env.CCT_API_COMMUNITY}`)

    const httpClient = getHttpClient()

    const response = await httpClient.httpFetch(url, {
      // proxyUrl: this.serverConfig.HTTP_PROXY_URL,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': `${process.env.CCT_API_KEY}`,
        'Ocp-Apim-Subscription-Key': `${process.env.INTEROP_API_SUBSCRIPTION_KEY}`,
      },
      retryOptions: {
        retries: parseInt(`${process.env.CCT_API_MAX_RETRIES}`),
        backoffMs: parseInt(`${process.env.CCT_API_RETRY_DELAY}`),
        retryConditions: {
          [502]: [],
        },
      },
    })
    logger.trace('response test' + response)

    if (!response.ok) {
      logger.error('%j', {
        message: 'Failed to find pdf',
        status: response.status,
        statusText: response.statusText,
        url: url,
        responseBody: await response.text(),
      })

      throw new Error(
        `Failed to find pdf. Status: ${response.status}, Status Text: ${response.statusText}`,
      )
    }

    const pdfDto: PdfDto = await response.json()
    logger.trace('Returning pdf [%j]', pdfDto)

    return pdfDto
  }

  getMetadata(): Record<string, string> {
    return {
      baseUrl: this.baseUrl,
    }
  }

  async checkHealth(): Promise<void> {
    await this.findMessagesBySin(
      `${process.env.HEALTH_PLACEHOLDER_REQUEST_VALUE}`,
      'MSCA-RES',
    )
  }
}

export class MockMessageRepository implements MessageRepository {
  constructor() {}

  async findMessagesBySin(
    sin: string,
    userId: string,
  ): Promise<readonly MessageDto[]> {
    logger.info('mock - fetching messages by [%s], [%s]', sin, userId)

    const messageDtos: readonly MessageDto[] = [
      {
        LetterName: 'PSCDMSA',
        LetterId: '123456-b3bc-4332-8b69-172197842b881',
        LetterDate: '2025/06/13',
        LetterType: 'statement of accounts',
      },
      {
        LetterName: 'PSCDNOD',
        LetterId: '123456-b3bc-4332-8b69-172197842b892',
        LetterDate: '2025/06/15',
        LetterType: 'debt notice',
      },
      {
        LetterName: 'Your Statement of accounts - Your statement of accounts',
        LetterId: '123456-b3bc-4332-8b69-172197842b883',
        LetterDate: '2025/06/13',
        LetterType: 'statement of accounts',
      },
      // {
      //   LetterName: 'Notice of debts - Notice of debts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b894',
      //   LetterDate: '2025/06/13',
      //   LetterType: 'debt notice',
      // },
      // {
      //   LetterName: 'Your Statement of accounts - Your statement of accounts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b885',
      //   LetterDate: '2025/07/18',
      //   LetterType: 'statement of accounts',
      // },
      // {
      //   LetterName: 'Notice of debts - Notice of debts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b896',
      //   LetterDate: '2025/09/13',
      //   LetterType: 'debt notice',
      // },
      // {
      //   LetterName: 'Your Statement of accounts - Your statement of accounts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b887',
      //   LetterDate: '2025/06/13',
      //   LetterType: 'statement of accounts',
      // },
      // {
      //   LetterName: 'Notice of debts - Notice of debts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b898',
      //   LetterDate: '2025/06/13',
      //   LetterType: 'debt notice',
      // },
      // {
      //   LetterName: 'Your Statement of accounts - Your statement of accounts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b889',
      //   LetterDate: '2025/06/13',
      //   LetterType: 'statement of accounts',
      // },
      // {
      //   LetterName: 'Notice of debts - Notice of debts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b8910',
      //   LetterDate: '2025/06/13',
      //   LetterType: 'debt notice',
      // },
      // {
      //   LetterName: 'Your Statement of accounts - Your statement of accounts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b8811',
      //   LetterDate: '2025/06/13',
      //   LetterType: 'statement of accounts',
      // },
      // {
      //   LetterName: 'Notice of debts - Notice of debts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b8912',
      //   LetterDate: '2025/06/13',
      //   LetterType: 'debt notice',
      // },
      // {
      //   LetterName: 'Your Statement of accounts - Your statement of accounts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b881',
      //   LetterDate: '2025/06/13',
      //   LetterType: 'statement of accounts',
      // },
      // {
      //   LetterName: 'Notice of debts - Notice of debts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b892',
      //   LetterDate: '2025/06/15',
      //   LetterType: 'debt notice',
      // },
      // {
      //   LetterName: 'Your Statement of accounts - Your statement of accounts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b883',
      //   LetterDate: '2025/06/13',
      //   LetterType: 'statement of accounts',
      // },
      // {
      //   LetterName: 'Notice of debts - Notice of debts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b894',
      //   LetterDate: '2025/06/13',
      //   LetterType: 'debt notice',
      // },
      // {
      //   LetterName: 'Your Statement of accounts - Your statement of accounts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b885',
      //   LetterDate: '2025/07/18',
      //   LetterType: 'statement of accounts',
      // },
      // {
      //   LetterName: 'Notice of debts - Notice of debts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b896',
      //   LetterDate: '2025/09/13',
      //   LetterType: 'debt notice',
      // },
      // {
      //   LetterName: 'Your Statement of accounts - Your statement of accounts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b887',
      //   LetterDate: '2025/06/13',
      //   LetterType: 'statement of accounts',
      // },
      // {
      //   LetterName: 'Notice of debts - Notice of debts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b898',
      //   LetterDate: '2025/06/13',
      //   LetterType: 'debt notice',
      // },
      // {
      //   LetterName: 'Your Statement of accounts - Your statement of accounts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b889',
      //   LetterDate: '2025/06/13',
      //   LetterType: 'statement of accounts',
      // },
      // {
      //   LetterName: 'Notice of debts - Notice of debts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b8910',
      //   LetterDate: '2025/06/13',
      //   LetterType: 'debt notice',
      // },
      // {
      //   LetterName: 'Your Statement of accounts - Your statement of accounts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b8811',
      //   LetterDate: '2025/06/13',
      //   LetterType: 'statement of accounts',
      // },
      // {
      //   LetterName: 'Notice of debts - Notice of debts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b8912',
      //   LetterDate: '2025/06/13',
      //   LetterType: 'debt notice',
      // },
      // {
      //   LetterName: 'Your Statement of accounts - Your statement of accounts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b881',
      //   LetterDate: '2025/06/13',
      //   LetterType: 'statement of accounts',
      // },
      // {
      //   LetterName: 'Notice of debts - Notice of debts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b892',
      //   LetterDate: '2025/06/15',
      //   LetterType: 'debt notice',
      // },
      // {
      //   LetterName: 'Your Statement of accounts - Your statement of accounts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b883',
      //   LetterDate: '2025/06/13',
      //   LetterType: 'statement of accounts',
      // },
      // {
      //   LetterName: 'Notice of debts - Notice of debts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b894',
      //   LetterDate: '2025/06/13',
      //   LetterType: 'debt notice',
      // },
      // {
      //   LetterName: 'Your Statement of accounts - Your statement of accounts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b885',
      //   LetterDate: '2025/07/18',
      //   LetterType: 'statement of accounts',
      // },
      // {
      //   LetterName: 'Notice of debts - Notice of debts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b896',
      //   LetterDate: '2025/09/13',
      //   LetterType: 'debt notice',
      // },
      // {
      //   LetterName: 'Your Statement of accounts - Your statement of accounts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b887',
      //   LetterDate: '2025/06/13',
      //   LetterType: 'statement of accounts',
      // },
      // {
      //   LetterName: 'Notice of debts - Notice of debts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b898',
      //   LetterDate: '2025/06/13',
      //   LetterType: 'debt notice',
      // },
      // {
      //   LetterName: 'Your Statement of accounts - Your statement of accounts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b889',
      //   LetterDate: '2025/06/13',
      //   LetterType: 'statement of accounts',
      // },
      // {
      //   LetterName: 'Notice of debts - Notice of debts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b8910',
      //   LetterDate: '2025/06/13',
      //   LetterType: 'debt notice',
      // },
      // {
      //   LetterName: 'Your Statement of accounts - Your statement of accounts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b8811',
      //   LetterDate: '2025/06/13',
      //   LetterType: 'statement of accounts',
      // },
      // {
      //   LetterName: 'Notice of debts - Notice of debts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b8912',
      //   LetterDate: '2025/06/13',
      //   LetterType: 'debt notice',
      // },
      // {
      //   LetterName: 'Your Statement of accounts - Your statement of accounts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b881',
      //   LetterDate: '2025/06/13',
      //   LetterType: 'statement of accounts',
      // },
      // {
      //   LetterName: 'Notice of debts - Notice of debts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b892',
      //   LetterDate: '2025/06/15',
      //   LetterType: 'debt notice',
      // },
      // {
      //   LetterName: 'Your Statement of accounts - Your statement of accounts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b883',
      //   LetterDate: '2025/06/13',
      //   LetterType: 'statement of accounts',
      // },
      // {
      //   LetterName: 'Notice of debts - Notice of debts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b894',
      //   LetterDate: '2025/06/13',
      //   LetterType: 'debt notice',
      // },
      // {
      //   LetterName: 'Your Statement of accounts - Your statement of accounts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b885',
      //   LetterDate: '2025/07/18',
      //   LetterType: 'statement of accounts',
      // },
      // {
      //   LetterName: 'Notice of debts - Notice of debts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b896',
      //   LetterDate: '2025/09/13',
      //   LetterType: 'debt notice',
      // },
      // {
      //   LetterName: 'Your Statement of accounts - Your statement of accounts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b887',
      //   LetterDate: '2025/06/13',
      //   LetterType: 'statement of accounts',
      // },
      // {
      //   LetterName: 'Notice of debts - Notice of debts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b898',
      //   LetterDate: '2025/06/13',
      //   LetterType: 'debt notice',
      // },
      // {
      //   LetterName: 'Your Statement of accounts - Your statement of accounts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b889',
      //   LetterDate: '2025/06/13',
      //   LetterType: 'statement of accounts',
      // },
      // {
      //   LetterName: 'Notice of debts - Notice of debts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b8910',
      //   LetterDate: '2025/06/13',
      //   LetterType: 'debt notice',
      // },
      // {
      //   LetterName: 'Your Statement of accounts - Your statement of accounts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b8811',
      //   LetterDate: '2025/06/13',
      //   LetterType: 'statement of accounts',
      // },
      // {
      //   LetterName: 'Notice of debts - Notice of debts',
      //   LetterId: '123456-b3bc-4332-8b69-172197842b8912',
      //   LetterDate: '2025/06/13',
      //   LetterType: 'debt notice',
      // },
    ]

    return await Promise.resolve(messageDtos)
  }

  async getPdfByMessageId(messageId: string): Promise<PdfDto> {
    logger.info('mock - pdf by message id ' + messageId)

    const pdfDto: PdfDto = getPdfByMessageIdJson

    return await Promise.resolve(pdfDto)
  }

  getMetadata(): Record<string, string> {
    return {
      mockEnabled: 'true',
    }
  }

  async checkHealth(): Promise<void> {
    return await Promise.resolve()
  }
}
