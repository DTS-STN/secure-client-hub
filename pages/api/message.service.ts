import type { MessagesRequestDto } from '../../entities/dtos/message.dto'
import type { MessageEntity } from '../../entities/entities/message.entity'
import type { MessageDtoMapper } from '../../entities/mappers/letter.dto.mapper'
import type { MessageRepository } from '../../entities/repositories/message.repository'
import { getMessageDtoMapper } from '../../entities/mappers/letter.dto.mapper'
import { getMessageRepository } from '../../entities/repositories/message.repository'
import { getLogger } from '../../logging/log-util'

const logger = getLogger('message.service')

export interface MessageService {
  /**
   * Find all letters for a given client id.
   *
   * @param lettersRequestDto The letters request dto that includes the client id and user id for auditing
   * @returns A Promise that resolves to all letters found for the client id.
   */
  findMessagesBySin(
    messagesRequestDto: MessagesRequestDto,
  ): Promise<readonly MessageEntity[]>
}

export function getMessageService(): MessageService {
  const mapper = getMessageDtoMapper()
  const repo = getMessageRepository()
  return new DefaultMessageService(mapper, repo)
}

export class DefaultMessageService implements MessageService {
  private readonly messageDtoMapper: MessageDtoMapper
  private readonly messageRepository: MessageRepository

  constructor(
    messageDtoMapper: MessageDtoMapper,
    messageRepository: MessageRepository,
  ) {
    this.messageDtoMapper = messageDtoMapper
    this.messageRepository = messageRepository
    this.init()
  }

  private init(): void {
    logger.debug('DefaultLetterService initiated.')
  }

  async findMessagesBySin({
    sin,
  }: MessagesRequestDto): Promise<readonly MessageEntity[]> {
    logger.trace('Finding letters with clientId [%s]', sin)

    const messageDtos = await this.messageRepository.findMessagesBySin(sin)
    logger.trace('Returning letters [%j] for clientId [%s]', messageDtos, sin)

    return this.messageDtoMapper.mapMessageDtosToMessageEntities(messageDtos)
  }

  // async getPdfByLetterId({ letterId, userId }: PdfRequestDto): Promise<string> {
  //   logger.trace('Finding PDF with letterId [%s] and userId [%s]', letterId, userId);

  //   const pdfEntity = await this.messageRepository.getPdfByLetterId(letterId, userId);
  //   const pdf = this.messageDtoMapper.mapPdfEntityToString(pdfEntity);

  //   logger.trace('Returning pdf [%s] for letterId [%s]', pdf, letterId);
  //   return pdf;
  // }
}
