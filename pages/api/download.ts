import { getMessageService } from './message.service'
import { getServerSession } from 'next-auth'
import { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from './auth/[...nextauth]'
import { MessageEntity } from '../../entities/entities/message.entity'
import { getLogger } from '../../logging/log-util'

const logger = getLogger('download')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const messageId = req.query['id'] ? req.query['id'].toString() : ''

  const session = await getServerSession(req, res, authOptions)

  const sin: string = session?.user?.name ? session.user.name.split('|')[0] : ''
  const userId: string = session?.user?.name
    ? session.user.name.split('|')[2]
    : ''
  const messages: MessageEntity[] = await getMessageService().findMessagesBySin(
    { sin: sin, userId: userId },
  )

  // Optional TODO: add a check to see if the letter belongs to the user. (Done with LetterService call)

  let message
  if (messages.length > 0) {
    message = messages.find((message) => message.messageId === messageId)
  }
  if (!message) {
    throw new Error('could not find message')
  }

  const pdfBytes = await getMessageService().getPdfByMessageId({
    letterId: messageId,
    userId: userId,
  })

  logger.trace('got back to downloads page')

  const decodedPdfBytes = Buffer.from(pdfBytes, 'base64')

  logger.trace('decoded pdf bytes: ' + decodedPdfBytes)

  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Length', decodedPdfBytes.length.toString())
  res.setHeader('Content-Disposition', `inline; filename="${messageId}.pdf"`)

  logger.trace('added headers')

  res.send(decodedPdfBytes)
}
