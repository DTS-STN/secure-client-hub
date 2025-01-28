import axios from 'axios'
import { getLogger } from '../logging/log-util'
import * as jose from 'jose'
import { decodeJwt } from 'jose'
import { GetServerSidePropsContext } from 'next'
import { getCookieValue } from './cookie-utils'
import { UTCDate } from '@date-fns/utc'

const logger = getLogger('auth-helpers')

export function AuthIsDisabled() {
  return (
    process.env.AUTH_DISABLED &&
    process.env.AUTH_DISABLED.toLowerCase() === 'true'
  )
}

export async function AuthIsValid(req: GetServerSidePropsContext['req']) {
  const idToken = await getIdToken(req)
  if (!idToken) {
    return false
  }
  const decodedIdToken: jose.JWTPayload = decodeJwt(idToken)
  const now = Math.floor(UTCDate.now() / 1000) // current time, rounded down to the nearest second
  if (decodedIdToken.exp && decodedIdToken.exp > now) {
    return true
  }
}

//This function grabs the idToken from request cookies
export async function getIdToken(req: GetServerSidePropsContext['req']) {
  return getCookieValue('idToken', req.cookies)
}

export async function ValidateSession(
  clientId: string,
  sharedSessionId: string,
) {
  logger.trace('Renewing session...')

  //Necessary to test locally until we no longer need the proxy. Will use request without proxy on deployed app
  const getResponse =
    process.env.AUTH_ON_PROXY &&
    process.env.AUTH_ON_PROXY.toLowerCase() === 'true'
      ? await axios
          .get(
            process.env.AUTH_ECAS_REFRESH_ENDPOINT +
              `?client_id=${clientId}&shared_session_id=${sharedSessionId}`,
            {
              proxy: {
                protocol: 'http',
                host: 'localhost',
                port: 3128,
              },
            },
          )
          .then((response) => response)
          .catch((error) => logger.error(error))
      : await axios
          .get(
            process.env.AUTH_ECAS_REFRESH_ENDPOINT +
              `?client_id=${clientId}&shared_session_id=${sharedSessionId}`,
          )
          .then((response) => response)
          .catch((error) => logger.error(error))

  //Log whether the session was renewed
  getResponse?.data
    ? logger.trace('Session renewed')
    : logger.trace('Something went wrong renewing the session')

  //return response to handler
  return getResponse?.data ?? false
}

export async function getLogoutURL(req: GetServerSidePropsContext['req']) {
  const idToken = await getIdToken(req)
  const idTokenJson = JSON.parse(idToken as string)

  if (idTokenJson) {
    return (
      process.env.AUTH_ECAS_GLOBAL_LOGOUT_URL +
      `?client_id=${process.env.CLIENT_ID}&shared_session_id=${idTokenJson.sid}`
    )
  }
  return
}

export function Redirect(locale: string) {
  return {
    redirect: {
      permanent: false,
      destination: `/${locale}/auth/login`,
    },
  }
}
