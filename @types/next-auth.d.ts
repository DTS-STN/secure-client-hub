import { DefaultSession, DefaultUser } from 'next-auth'
// import { DefaultJWT } from 'next-auth/jwt'
import { MessageEntity } from '../entities/entities/message.entity'

declare module 'next-auth' {
  interface User extends DefaultUser {
    messages?: MessageEntity[]
  }
  interface Session extends DefaultSession {
    user: User & DefaultSession['user']
    messages: MessageEntity[]
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    messages: MessageEntity[]
  }
}
