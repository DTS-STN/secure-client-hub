/*
 * Touch MSCA session is an endpoint exposed for the client to refresh ECAS session timers on action or page load
 *
 */

import {
  AuthIsDisabled,
  AuthIsValid,
  ValidateSession,
  getDecodedIdToken,
} from '../../lib/auth'
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
  const idToken = getDecodedIdToken(req)

  //Generate a random id for each request to ensure unique responses/no caching
  const id = crypto.randomBytes(20).toString('hex')

  if (req.method === 'GET') {
    //Send request to ECAS to refresh MSCA session
    if (AuthIsDisabled()) {
      //Service unavailable when auth is disabled
      res.status(503).json({ success: false })
    } else if ((await AuthIsValid(req)) && idToken !== null) {
      //If auth session is valid, make GET request to validateSession endpoint
      const sessionValid = await ValidateSession(
        process.env.CLIENT_ID as string,
        idToken.sid as string,
      )
      if (sessionValid) {
        extendExpiryTime(
          req,
          res,
          'idToken',
          Number(process.env.SESSION_MAX_AGE as string),
        )
        res.status(200).json({ success: sessionValid, id: id })
      } else {
        deleteAllCookiesWithPrefix(
          req,
          res,
          process.env.AUTH_COOKIE_PREFIX as string,
        )
        res.status(401).json({ success: sessionValid, id: id })
      }
    } else {
      deleteAllCookiesWithPrefix(
        req,
        res,
        process.env.AUTH_COOKIE_PREFIX as string,
      )

      res.status(401).json({ success: false })
      logger.error('Authentication is not valid')
    }
  } else {
    //return unimplemented
    res.status(501).json({ success: false })
    logger.error(
      'Something went wrong when trying reach the MSCA refresh endpoint',
    )
  }
}
