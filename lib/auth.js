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
  //return a boolean not the session obj
  return session && token ? true : false
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
