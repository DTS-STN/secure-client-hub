/*
 * Touch MSCA session is an endpoint exposed for the client to refresh ECAS session timers on action or page load
 *
 */

import { AuthIsDisabled, AuthIsValid, ValidateSession } from '../../lib/auth'
import { getLogger } from '../../logging/log-util'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import { getToken } from 'next-auth/jwt'

// Including crypto module
const crypto = require('crypto')

//The below sets the minimum logging level to error and surpresses everything below that
const logger = getLogger('refresh-msca')
logger.level = 'error'

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  const token = await getToken({ req })
  //Generate a random id for each request to ensure unique responses/no caching
  const id = crypto.randomBytes(20).toString('hex')

  if (req.method === 'GET') {
    //Send request to ECAS to refresh MSCA session
    if (AuthIsDisabled()) {
      //Service unavailable when auth is disabled
      res.status(503).json({ success: false })
    } else if (await AuthIsValid(req, session)) {
      //If auth session is valid, make GET request to validateSession endpoint
      const sessionValid = await ValidateSession(
        process.env.CLIENT_ID,
        token.sub
      )
      if (sessionValid) {
        res.status(200).json({ success: sessionValid, id: id })
      } else {
        res.status(302).json({ success: sessionValid, id: id })
      }
    } else {
      res.status(500).json({ success: false })
      logger.error('Authentication is not valid')
    }
  } else {
    //return unimplemented
    res.status(501).json({ success: false })
    logger.error(
      'Something went wrong when trying reach the MSCA refresh endpoint'
    )
  }
}
