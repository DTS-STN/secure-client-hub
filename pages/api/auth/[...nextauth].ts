import NextAuth from 'next-auth'
import { NextAuthOptions } from 'next-auth'

import { getLogger } from '../../../logging/log-util'

//The below sets the minimum logging level to error and surpresses everything below that
const logger = getLogger('next-auth')
logger.level = 'warn'

export const authOptions: NextAuthOptions = {
  providers: [
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
        id_token_signed_response_alg: 'RS256',
      },
      token: {
        url: process.env.AUTH_ECAS_TOKEN,
        params: {
          scope: 'openid profile',
        },
      },
      jwks: {
        keys: [JSON.parse(process.env.AUTH_PRIVATE ?? '{}')],
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
    maxAge: 5 * 10 * 24, //20 minutes
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
    debug(code, metadata) {
      logger.error(code)
      logger.error(metadata)
    },
  },
  pages: {
    signIn: '/auth/login/',
  },
}
export default NextAuth(authOptions)
