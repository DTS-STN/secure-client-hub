import { DefaultSession, DefaultUser } from 'next-auth'
// import { DefaultJWT } from 'next-auth/jwt'
import { MessageEntity } from '../entities/entities/message.entity'

declare module 'next-auth' {
  interface User extends DefaultUser {
    messages?: MessageEntity[]
    sin?: string
  }
  interface Session extends DefaultSession {
    user: User & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    messages: MessageEntity[]
  }
}
