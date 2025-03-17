/*
 * Touch MSCA session is an endpoint exposed for the client to refresh ECAS session timers on action or page load
 *
 */

import { AuthIsDisabled, ValidateSession } from '../../lib/auth'
import { getLogger } from '../../logging/log-util'
import { NextApiRequest, NextApiResponse } from 'next'
import {
  deleteAllCookiesWithPrefix,
  extendExpiryTime,
} from '../../lib/cookie-utils'
// Including crypto module
import crypto from 'crypto'

//The below sets the minimum logging level to error and surpresses everything below that
const logger = getLogger('refresh-msca')
logger.level = 'error'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  //Generate a random id for each request to ensure unique responses/no caching
  const id = crypto.randomBytes(20).toString('hex')

  if (req.method === 'GET') {
    //Send request to ECAS to refresh MSCA session
    if (AuthIsDisabled()) {
      //Service unavailable when auth is disabled
      res.status(503).json({ success: false })
    } else {
      //If auth session is valid, make GET request to validateSession endpoint
      const sessionValid = await ValidateSession(
        req.cookies,
        process.env.CLIENT_ID as string,
      )
      if (sessionValid) {
        extendExpiryTime(
          req,
          res,
          process.env.AUTH_COOKIE_PREFIX + 'sessionId',
          Number(process.env.SESSION_MAX_AGE as string),
        )
        res.status(200).json({ success: true, id: id })
      } else {
        deleteAllCookiesWithPrefix(
          req,
          res,
          process.env.AUTH_COOKIE_PREFIX as string,
        )
        res.status(401).json({ success: false, id: id })
        logger.error('Authentication is not valid')
      }
    }
  }
}
