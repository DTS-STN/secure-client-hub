/**
 * Represents a Data Transfer Object (DTO) for a message.
 */
export type MessageDto = Readonly<{
  /** Unique identifier for the message. */
  LetterId: string

  /** Date of the message. */
  LetterDate: string

  LetterName: string
}>

/**
 * Represents a Data Transfer Object (DTO) for a letters request.
 */
export type MessagesRequestDto = Readonly<{
  /** SIN for the client associated with the request. */
  sin: string
  userId: string
}>

/**
 * Represents a Data Transfer Object (DTO) for a PDF request.
 */
export type PdfRequestDto = Readonly<{
  /** Unique identifier for the message whose PDF is requested. */
  letterId: string
  userId: string
}>

export type PdfDto = Readonly<{
  documentBytes: string
}>
