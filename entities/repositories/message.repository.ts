import type { MessageDto } from '../dtos/message.dto'
import { getLogger } from '../../logging/log-util'

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

    const messageEntities: readonly MessageDto[] = [
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

    logger.debug('Returning messages [%j]', messageEntities)
    return await Promise.resolve(messageEntities)
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
