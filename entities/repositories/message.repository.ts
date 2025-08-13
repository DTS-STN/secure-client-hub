import type { MessageDto } from '../dtos/message.dto'
import type { PdfEntity } from '../entities/message.entity'
import { getLogger } from '../../logging/log-util'
import getPdfByMessageIdJson from '../../pages/api/resources/get-pdf-by-message-id.json'

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
  findMessagesBySin(sin: string): Promise<readonly MessageDto[]>

  /**
   * Retrieve the PDF entity associated with a specific letter id.
   *
   * @param letterId The letter id of the PDF entity.
   * @param userId The user that made the request, only used for auditing
   * @returns A Promise that resolves to the PDF entity for a letter id.
   */
  getPdfByMessageId(letterId: string): Promise<PdfEntity>

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
  return new MockLetterRepository()
}

export class MockLetterRepository implements MessageRepository {
  async findMessagesBySin(sin: string): Promise<readonly MessageDto[]> {
    logger.debug('Fetching messages for sin [%s]', sin)

    const messageDtos: readonly MessageDto[] = [
      {
        name: 'Your Statement of accounts - Your statement of accounts',
        id: '123456-b3bc-4332-8b69-172197842b88',
        date: '2025/06/13',
        type: 'statement of accounts',
      },
      {
        name: 'Notice of debts - Notice of debts',
        id: '123456-b3bc-4332-8b69-172197842b89',
        date: '2025/06/13',
        type: 'notice of debts',
      },
    ]

    logger.debug('Returning messages [%j]', messageDtos)
    return await Promise.resolve(messageDtos)
  }

  async getPdfByMessageId(messageId: string): Promise<PdfEntity> {
    logger.debug('Fetching PDF for messageId [%s]', messageId)

    const pdfEntity: PdfEntity = getPdfByMessageIdJson

    logger.debug('Returning PDF [%j]', pdfEntity)
    return await Promise.resolve(pdfEntity)
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
