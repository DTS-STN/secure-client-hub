/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth'
declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user']
  }

  interface Profile {
    id?: string
    spid?: string
    sin?: string
  }
}
