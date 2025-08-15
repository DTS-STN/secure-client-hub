import { DefaultSession } from 'next-auth'
// // import { DefaultJWT } from 'next-auth/jwt'
// import { MessageEntity } from '../entities/entities/message.entity'

declare module 'next-auth' {
  //   export interface User extends DefaultUser {
  //     messages?: MessageEntity[]
  //     sin?: string
  //   }
  export interface Session {
    spid?: string
    sin?: string
    messages?: MessageEntity[]
    user: DefaultSession['user']
  }

  export interface Profile {
    sin?: string
    uid?: string
  }
}

// declare module 'next-auth/jwt' {
//   interface JWT extends DefaultJWT {
//     messages: MessageEntity[]
//   }
// }
