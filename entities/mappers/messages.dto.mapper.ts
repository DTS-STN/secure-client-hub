import type { MessageDto, PdfDto } from '../dtos/message.dto'
import type { MessageEntity } from '../entities/message.entity'

export interface MessageDtoMapper {
  mapMessageDtosToMessageEntities(
    messageEntities: readonly MessageDto[],
  ): readonly MessageEntity[]

  mapPdfDtoToString(pdfDto: PdfDto): string
}

export function getMessageDtoMapper(): MessageDtoMapper {
  return new DefaultMessageDtoMapper()
}

export class DefaultMessageDtoMapper implements MessageDtoMapper {
  mapMessageDtosToMessageEntities(
    messageEntities: readonly MessageDto[],
  ): readonly MessageEntity[] {
    return messageEntities.map((messageEntity) =>
      this.mapMessageDtoToMessageEntity(messageEntity),
    )
  }

  private mapMessageDtoToMessageEntity(messageDto: MessageDto): MessageEntity {
    return {
      messageId: messageDto.id,
      messageDate: messageDto.date,
      messageName: messageDto.name,
      messageType: messageDto.type,
    }
  }

  mapPdfDtoToString(pdfDto: PdfDto): string {
    return pdfDto.documentBytes
  }
}
