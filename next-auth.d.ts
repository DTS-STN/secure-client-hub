/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth'
declare module 'next-auth' {
  interface Session {
    sin?: string
    spid?: string
    user: DefaultSession['user']
  }

  interface Profile {
    uid?: string
    sin?: string
  }
}
