import { NextApiRequest, NextApiResponse } from 'next'
import { getOpenIdClientService } from './openid-client-service'
import { generators } from 'openid-client'
import axios from 'axios'
import https from 'https'
import fs from 'fs'
import { getLogger } from '../../logging/log-util'
import {
  addCookie,
  getCookieValue,
  deleteCookieWithName,
} from '../../lib/cookie-utils'
import { decodeJwt } from 'jose'
import * as jose from 'jose'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const codeVerifier = getCookieValue(
    'codeVerifier',
    req.cookies,
    process.env.AUTH_COOKIE_PREFIX,
  ) as string
  const state = getCookieValue(
    'state',
    req.cookies,
    process.env.AUTH_COOKIE_PREFIX,
  ) as string
  const nonce = getCookieValue(
    'nonce',
    req.cookies,
    process.env.AUTH_COOKIE_PREFIX,
  ) as string
  const now = Math.floor(Date.now() / 1000) // current time, rounded down to the nearest second
  const expiry = now + 60 // valid for 1 minute
  const jwtId = generators.random(32)
  const openIdService = await getOpenIdClientService()
  const tokenSet = await openIdService.callback(
    req.query,
    state,
    nonce,
    codeVerifier,
    jwtId,
    expiry,
    now,
    now,
  )

  //const userinfo = await openIdService.userinfo(tokenSet.access_token as string)

  const decodedIdToken: jose.JWTPayload = decodeJwt(tokenSet.id_token as string)
  const sessionId = decodedIdToken.sid

  if (sessionId !== undefined && sessionId !== null && sessionId !== '') {
    addCookie(
      res,
      process.env.AUTH_COOKIE_PREFIX + 'sessionId',
      sessionId as string,
      Number(process.env.SESSION_MAX_AGE),
    )
  }

  addCookie(
    res,
    'accesstoken',
    tokenSet.access_token as string,
    Number(process.env.SESSION_MAX_AGE),
  )

  //updateMscaNg(userinfo.sin, userinfo.uid)
  const locale = getCookieValue('localeForOauthCallback', req.cookies)
  deleteCookieWithName(req, res, 'localeForOauthCallback')
  const dashboardRedirect =
    locale === 'en'
      ? 'https://mscad-sys2-s2.bdm.dshp-phdn.net/en/my-dashboard'
      : 'https://mscad-sys2-s2.bdm.dshp-phdn.net/fr/mon-tableau-de-bord'
  res.status(307).redirect(dashboardRedirect)
}

export function updateMscaNg(sin: string, uid: string) {
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
