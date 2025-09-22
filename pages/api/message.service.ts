import type {
  MessagesRequestDto,
  PdfRequestDto,
} from '../../entities/dtos/message.dto'
import type { MessageEntity } from '../../entities/entities/message.entity'
import type { MessageDtoMapper } from '../../entities/mappers/messages.dto.mapper'
import type { MessageRepository } from '../../entities/repositories/message.repository'
import { getMessageDtoMapper } from '../../entities/mappers/messages.dto.mapper'
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
  ): Promise<MessageEntity[]>

  /**
   * Retrieve the PDF for a given message id.
   *
   * @param pdfRequestDto  The PDF request dto that includes the message id
   * @returns A Promise that resolves to the PDF data as a base64-encoded string representing the bytes.
   */
  getPdfByMessageId(pdfRequestDto: PdfRequestDto): Promise<string>
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
    userId,
  }: MessagesRequestDto): Promise<MessageEntity[]> {
    logger.trace('Finding letters with clientId [%s]', sin)

    const messageDtos = await this.messageRepository.findMessagesBySin(
      sin,
      userId,
    )
    logger.trace('Returning letters [%j] for clientId [%s]', messageDtos, sin)

    return this.messageDtoMapper.mapMessageDtosToMessageEntities(messageDtos)
  }

  async getPdfByMessageId({
    letterId,
    userId,
  }: PdfRequestDto): Promise<string> {
    logger.trace('Finding PDF with messageId [%s]', letterId)

    const pdfDto = await this.messageRepository.getPdfByMessageId(
      letterId,
      userId,
    )
    const pdf = this.messageDtoMapper.mapPdfDtoToString(pdfDto)

    logger.trace('Returning pdf [%s] for letterId [%s]', pdf, letterId)
    return pdf
  }
}
