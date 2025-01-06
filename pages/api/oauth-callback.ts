import { NextApiRequest, NextApiResponse } from 'next'
import { getRedisService } from './redis-service'
import { getOpenIdClientService } from './openid-client-service'
import { generators } from 'openid-client'
import { UTCDate } from '@date-fns/utc'
import axios from 'axios'
import https from 'https'
import fs from 'fs'
import { getLogger } from '../../logging/log-util'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const redisService = await getRedisService()
  req.query['lang']
  const codeVerifier = (await redisService.get('codeVerifier')) as string
  const state = (await redisService.get('state')) as string
  const nonce = (await redisService.get('nonce')) as string
  const now = Math.floor(UTCDate.now() / 1000) // current time, rounded down to the nearest second
  const expiry = now + 60 // valid for 1 minute
  const jwtId = generators.random(32)
  const maxAge = process.env.SESSION_MAX_AGE as string
  const openIdService = await getOpenIdClientService()
  const tokenSet = await openIdService.callback(
    req.query,
    state,
    nonce,
    codeVerifier,
    parseInt(maxAge),
    jwtId,
    expiry,
    now,
    now,
  )

  const userinfo = await openIdService.userinfo(tokenSet.access_token as string)

  redisService.set('idToken', tokenSet.id_token)
  redisService.set('userinfo', userinfo)

  updateMscaNg(userinfo.sin, userinfo.uid)

  res.status(307).redirect('/en/my-dashboard')
}

function updateMscaNg(sin: string, uid: string) {
  const logger = getLogger('update-msca-ng')
  //Create httpsAgent to read in cert to make BRZ call
  const httpsAgent =
    process.env.AUTH_DISABLED === 'true'
      ? new https.Agent()
      : new https.Agent({
          ca: fs.readFileSync('certs/env.crt' as fs.PathOrFileDescriptor),
        })

  //Make call to msca-ng API to create user if it doesn't exist
  axios
    .post(
      `https://${process.env.HOSTALIAS_HOSTNAME}${process.env.MSCA_NG_USER_ENDPOINT}`,
      {
        pid: sin,
        spid: uid,
      },
      {
        headers: {
          'authorization': `Basic ${process.env.MSCA_NG_CREDS}`,
          'Content-Type': 'application/json',
        },
        httpsAgent: httpsAgent,
      },
    )
    .then((response) => {
      logger.debug(response)
      updateLastLoginDate(uid)
    })
    .catch((error) => logger.error(error))

  function updateLastLoginDate(uid: string) {
    axios({
      method: 'post',
      url: `https://${process.env.HOSTALIAS_HOSTNAME}${process.env.MSCA_NG_USER_ENDPOINT}/${uid}/logins`,
      headers: {
        'Authorization': `Basic ${process.env.MSCA_NG_CREDS}`,
        'Content-Type': 'application/json',
      },
      httpsAgent: httpsAgent,
    })
      .then((response) => logger.debug(response))
      .catch((error) => logger.error(error))
  }
}
