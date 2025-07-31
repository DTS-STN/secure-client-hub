/**
 * Represents a Data Transfer Object (DTO) for a message.
 */
export type MessageDto = Readonly<{
  /** Unique identifier for the message. */
  id: string

  /** Date of the message. */
  date: string

  name: string

  /** Identifier of the message type. */
  type: string
}>

/**
 * Represents a Data Transfer Object (DTO) for a letters request.
 */
export type MessagesRequestDto = Readonly<{
  /** SIN for the client associated with the request. */
  sin: string
}>

/**
 * Represents a Data Transfer Object (DTO) for a PDF request.
 */
export type PdfRequestDto = Readonly<{
  /** Unique identifier for the message whose PDF is requested. */
  messageId: string
}>

export type PdfDto = Readonly<{
  documentBytes: string
}>
