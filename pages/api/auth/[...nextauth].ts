/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import { getLogger } from '../../../logging/log-util'
import axios from 'axios'
import * as jose from 'jose'

//The below sets the minimum logging level to error and surpresses everything below that
const logger = getLogger('next-auth')
logger.level = 'warn'

async function decryptJwe(jwe: string, jwk: any) {
  const key = await jose.importJWK({ ...jwk }, 'RSA-OAEP')
  const decryptResult = await jose.compactDecrypt(jwe, key, {
    keyManagementAlgorithms: ['RSA-OAEP-256'],
  })
  return decryptResult.plaintext.toString()
}

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
        id_token_signed_response_alg: 'RS512',
        userinfo_encrypted_response_alg: 'RSA-OAEP-256',
        userinfo_encrypted_response_enc: 'A256GCM',
        userinfo_signed_response_alg: 'RS512',
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
      userinfo: {
        async request(context) {
          console.log(`Bearer ${context.tokens.access_token}`)
          const res = await axios
            .get(process.env.AUTH_ECAS_USERINFO as string, {
              headers: {
                Authorization: `Bearer ${context.tokens.access_token}`,
              },
              proxy: {
                protocol: 'http',
                host: 'localhost',
                port: 3128,
              },
            })
            .then((response) => response)
            .catch((error) => logger.error(error))
          return res?.data
        },
      },
      idToken: true,
      checks: ['state', 'nonce'],
      profile: (profile) => {
        const result = decryptJwe(
          profile.userinfo_token as string,
          process.env.AUTH_PRIVATE as string,
        )
        console.log(result)
        console.log('\n\n\nStart profile:\n')
        console.log(profile)
        console.log('\nEnd profile\n\n\n')
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async jwt({ token, account, user }) {
      return { ...token, ...account, ...user }
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
      logger.debug(code)
      logger.debug(metadata)
    },
  },
  pages: {
    signIn: '/auth/login/',
  },
}
export default NextAuth(authOptions)
