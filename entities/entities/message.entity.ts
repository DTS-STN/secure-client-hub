export type MessageEntity = Readonly<{
  messageId: string
  messageDate: string
  messageName: string
  messageType: string
}>

export type PdfEntity = Readonly<{
  documentBytes: string
}>
