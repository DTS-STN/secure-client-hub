import { getMessageService } from './message.service'

import { NextApiRequest } from 'next'
import { getSession } from 'next-auth/react'

export default async function handler(req: NextApiRequest) {
  const messageId = req.query['id'] ? req.query['id'].toString() : ''
  const session = await getSession()
  const messages = session?.user.messages
  // Optional TODO: add a check to see if the letter belongs to the user. (Done with LetterService call)
  // if (!messages) {
  //   throw data(null, { status: 404 });
  // }

  let message
  if (messages) {
    message = messages.find((message) => message.messageId === messageId)
  } else {
    throw new Error('could not find messages')
  }
  if (!message) {
    throw new Error('could not find message')
  }

  // if (!userinfoTokenClaims.sin) {
  //   throw new AppError('No SIN found in userinfo token', ErrorCodes.AUTH_USERINFO_FETCH_ERROR);
  // }
  // const user = userinfoTokenClaims.sub;

  const pdfBytes = await getMessageService().getPdfByMessageId({
    messageId: message.messageId,
  })

  const decodedPdfBytes = Buffer.from(pdfBytes, 'base64')
  return new Response(decodedPdfBytes, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Length': decodedPdfBytes.length.toString(),
      'Content-Disposition': `inline; filename="${messageId}.pdf"`,
    },
  })
}
