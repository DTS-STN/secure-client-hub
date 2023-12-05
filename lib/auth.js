import * as jwt from 'next-auth/jwt'
import axios from 'axios'
import { getLogger } from '../logging/log-util'

const logger = getLogger('auth-helpers')

export function AuthIsDisabled() {
  return (
    process.env.AUTH_DISABLED &&
    process.env.AUTH_DISABLED.toLowerCase() === 'true'
  )
}

export async function AuthIsValid(req, session) {
  const token = await jwt.getToken({ req })
  if (session && token) {
    await ValidateSession(process.env.CLIENT_ID, token.sub)
    return true
  }
  return false
}

export async function ValidateSession(clientId, sharedSessionId) {
  logger.trace('Renewing session...')

  //Necessary to test locally until we no longer need the proxy. Will use request without proxy on deployed app
  process.env.AUTH_ON_PROXY &&
  process.env.AUTH_ON_PROXY.toLowerCase() === 'true'
    ? axios
        .get(
          process.env.AUTH_ECAS_REFRESH_ENDPOINT +
            `?client_id=${clientId}&shared_session_id=${sharedSessionId}`,
          {
            proxy: {
              protocol: 'http',
              host: 'localhost',
              port: 3128,
            },
          }
        )
        .then((response) => {
          if (response.data === true) {
            logger.trace('Session renewed!')
          }
        })
        .catch((error) => logger.error(error))
    : axios
        .get(
          process.env.AUTH_ECAS_REFRESH_ENDPOINT +
            `?client_id=${clientId}&shared_session_id=${sharedSessionId}`
        )
        .then((response) => {
          if (response.data === true) {
            logger.trace('Session renewed')
          }
        })
        .catch((error) => logger.error(error))
}

export async function getToken(req) {
  return jwt.getToken(req)
}

export async function getLogoutURL(req, session) {
  const token = await jwt.getToken({ req })

  if (session && token) {
    return (
      process.env.AUTH_ECAS_GLOBAL_LOGOUT_URL +
      `?client_id=${process.env.CLIENT_ID}&shared_session_id=${token.sub}`
    )
  }
  return
}

export function Redirect(locale) {
  return {
    redirect: {
      permanent: false,
      destination: `/${locale}/auth/login`,
    },
  }
}
