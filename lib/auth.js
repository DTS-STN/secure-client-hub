import { getToken } from 'next-auth/jwt'
import axios from 'axios'
import { getLogger } from '../logging/log-util'
import * as jose from 'jose'

const logger = getLogger('auth-helpers')

export function AuthIsDisabled() {
  return (
    process.env.AUTH_DISABLED &&
    process.env.AUTH_DISABLED.toLowerCase() === 'true'
  )
}

export async function AuthIsValid(req, session) {
  const token = await getToken({ req })
  if (session && token) {
    return true
  }
  return false
}

//This function grabs the idToken from the getToken function and decodes it
export async function getIdToken(req) {
  const token = await getToken({ req })
  if (token && token.provider !== 'credentialsProvider') {
    const idToken = jose.decodeJwt(token.id_token)
    return idToken
  }
  return token
}

export async function ValidateSession(clientId, sharedSessionId) {
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
  getResponse === true
    ? logger.trace('Session renewed')
    : logger.trace('Something went wrong renewing the session')

  //return response to handler
  return getResponse?.data ?? false
}

export async function getLogoutURL(req, session) {
  const token = await getToken({ req })

  if (session && token) {
    return (
      process.env.AUTH_ECAS_GLOBAL_LOGOUT_URL +
      `?client_id=${process.env.CLIENT_ID}&shared_session_id=${token.sub}`
    )
  }
  return
}

export function Redirect(locale) {
  //Can't use locale here if using the default next-auth sign-in page for multiple providers
  return {
    redirect: {
      permanent: false,
      destination: `/api/auth/signin`,
    },
  }
}
