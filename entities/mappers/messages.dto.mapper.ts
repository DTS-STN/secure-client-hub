import type { MessageDto, PdfDto } from '../dtos/message.dto'
import type { MessageEntity } from '../entities/message.entity'
import { getLogger } from '../../logging/log-util'

const logger = getLogger('message dto mapper')
export interface MessageDtoMapper {
  mapMessageDtosToMessageEntities(
    messageDtos: readonly MessageDto[],
  ): MessageEntity[]

  mapPdfDtoToString(pdfDto: PdfDto): string
}

export function getMessageDtoMapper(): MessageDtoMapper {
  return new DefaultMessageDtoMapper()
}

export class DefaultMessageDtoMapper implements MessageDtoMapper {
  mapMessageDtosToMessageEntities(
    messageDtos: readonly MessageDto[],
  ): MessageEntity[] {
    return messageDtos.map((messageDto) =>
      this.mapMessageDtoToMessageEntity(messageDto),
    )
  }

  private mapMessageDtoToMessageEntity(messageDto: MessageDto): MessageEntity {
    logger.trace('message id' + messageDto.LetterId)
    return {
      messageId: messageDto.LetterId,
      messageDate: messageDto.LetterDate,
      messageName: messageDto.LetterName,
      messageType: messageDto.LetterType,
    }
  }

  mapPdfDtoToString(pdfDto: PdfDto): string {
    return pdfDto.documentBytes
  }
}
