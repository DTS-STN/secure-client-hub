import { getSession } from 'next-auth/react'
import * as jwt from 'next-auth/jwt'

export function AuthIsDisabled() {
  return (
    process.env.AUTH_DISABLED &&
    process.env.AUTH_DISABLED.toLowerCase() === 'true'
  )
}

export async function AuthIsValid(req) {
  const session = await getSession({ req })
  const token = await jwt.getToken({ req })
  console.log(token)
  if (session && token) {
    await ValidateSession(process.env.CLIENT_ID, token.sub)
    return true
  }
  return false
}

export async function ValidateSession(clientId, sharedSessionId) {
  console.log(
    `Called MSCA Session refresh endpoint. [Client Id: ${clientId}, Shared Session Id: ${sharedSessionId}]`
  )
}

export async function getToken(req) {
  return jwt.getToken(req)
}

export function Redirect() {
  return {
    redirect: {
      permanent: false,
      destination: '/api/auth/signin',
    },
  }
}
