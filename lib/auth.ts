import axios from 'axios'
import { getLogger } from '../logging/log-util'
import * as jose from 'jose'
import { decodeJwt } from 'jose'
import { GetServerSidePropsContext } from 'next'
import { UTCDate } from '@date-fns/utc'
import { getCookieValue } from './cookie-utils'

const logger = getLogger('auth-helpers')

export function AuthIsDisabled() {
  return (
    process.env.AUTH_DISABLED &&
    process.env.AUTH_DISABLED.toLowerCase() === 'true'
  )
}

export async function AuthIsValid(req: GetServerSidePropsContext['req']) {
  const idToken = getIdToken(req)
  if (!idToken) {
    return false
  }
  const decodedIdToken: jose.JWTPayload = decodeJwt(idToken)
  const now = Math.floor(UTCDate.now() / 1000) // current time, rounded down to the nearest second
  if (decodedIdToken.exp && decodedIdToken.exp > now) {
    return true
  }
  return false
}

//This function grabs the idToken from request cookies
function getIdToken(req: GetServerSidePropsContext['req']) {
  return getCookieValue('idToken', req.cookies)
}

export function getDecodedIdToken(req: GetServerSidePropsContext['req']) {
  const idToken = getIdToken(req)
  if (idToken !== null) {
    return decodeJwt(idToken as string)
  }

  return null
}

export async function ValidateSession(
  cookies: Partial<{ [key: string]: string }>,
  clientId: string,
) {
  const sessionId = getCookieValue('sessionId', cookies)

  if (sessionId === undefined || sessionId === null || sessionId === '') {
    return false
  }

  logger.trace('Renewing session...')

  //Necessary to test locally until we no longer need the proxy. Will use request without proxy on deployed app
  const getResponse =
    process.env.AUTH_ON_PROXY &&
    process.env.AUTH_ON_PROXY.toLowerCase() === 'true'
      ? await axios
          .get(
            process.env.AUTH_ECAS_REFRESH_ENDPOINT +
              `?client_id=${clientId}&shared_session_id=${sessionId}`,
            {
              proxy: {
                protocol: 'http',
                host: 'localhost',
                port: 3128,
              },
            },
          )
          .then((response) => response)
          .catch((error) => {
            if (error.response) {
              console.error(error.response.data)
              console.error(error.response.status)
              console.error(error.response.headers)
            } else if (error.request) {
              console.error(error.request)
            } else {
              console.error('Error', error.message)
            }
          })
      : await axios
          .get(
            process.env.AUTH_ECAS_REFRESH_ENDPOINT +
              `?client_id=${clientId}&shared_session_id=${sessionId}`,
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

export async function getLogoutURL(
  cookies: Partial<{ [key: string]: string }>,
  locale: GetServerSidePropsContext['locale'],
) {
  const localeParam = locale === 'en' ? 'en' : 'fr'

  const sessionId = getCookieValue('sessionId', cookies)
  if (sessionId !== undefined && sessionId !== null && sessionId !== '') {
    return (
      process.env.AUTH_ECAS_GLOBAL_LOGOUT_URL +
      `?client_id=${process.env.CLIENT_ID}&shared_session_id=${sessionId as string}&ui_locales=${localeParam}`
    )
  }

  return '/'
}

export function Redirect(locale: string) {
  return {
    redirect: {
      permanent: false,
      destination: `/${locale}/auth/login`,
    },
  }
}
