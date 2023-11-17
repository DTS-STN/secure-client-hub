import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { NextAuthOptions } from 'next-auth'

import { getLogger } from '../../../logging/log-util'

//The below sets the minimum logging level to error and surpresses everything below that
const logger = getLogger('next-auth')
logger.level = 'warn'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: 'credentials',
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const res = await fetch(
          'https://jsonendpoint.com/my-unique/endpoint/scch'
        )

        //Array of user objects
        const listOfUsers = await res.json()

        //Find user based on credentials used to login
        const user = listOfUsers.find(
          (user) =>
            user.username === credentials?.username &&
            user.password === credentials?.password
        )

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user
        }
        // Return null if user data could not be retrieved
        return null
      },
    }),
    {
      id: 'ecasProvider',
      name: 'ECAS',
      clientId: process.env.CLIENT_ID,
      type: 'oauth',
      wellKnown: process.env.AUTH_ECAS_WELL_KNOWN,
      authorization: {
        url: process.env.AUTH_ECAS_AUTHORIZATION,
        params: {
          scope: 'openid profile',
        },
      },
      client: {
        token_endpoint_auth_method: 'private_key_jwt',
        introspection_endpoint_auth_method: 'private_key_jwt',
        id_token_encrypted_response_alg: 'RSA-OAEP-256',
        id_token_encrypted_response_enc: 'A256GCM',
        token_endpoint_auth_signing_alg: 'RS256',
        id_token_signed_response_alg: 'RS512',
      },
      token: {
        url: 'https://srv241-s2.lab.hrdc-drhc.gc.ca/ecas-seca/raoidc_ii/v1/token',
        params: {
          scope: 'openid profile',
        },
      },
      jwks: {
        keys: [JSON.parse(process.env.AUTH_PRIVATE)],
      },
      userinfo: process.env.AUTH_ECAS_USERINFO,
      idToken: true,
      checks: ['state', 'nonce'],
      profile(profile) {
        return {
          id: profile.sid,
        }
      },
    },
  ],
  theme: {
    colorScheme: 'light',
    logo: 'https://www.canada.ca/etc/designs/canada/wet-boew/assets/wmms-blk.svg',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, account }) {
      return { ...token, ...account }
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      //else if (process.env.AUTH_ECAS_GLOBAL_LOGOUT_URL === url) return url
      return baseUrl
    },
  },
  logger: {
    error(code, metadata) {
      logger.error(code)
      logger.error(metadata)
    },
    warn(code) {
      logger.warn(code)
    },
  },
  // pages: {
  //   signIn: '/auth/login/',
  // },
}
export default NextAuth(authOptions)
