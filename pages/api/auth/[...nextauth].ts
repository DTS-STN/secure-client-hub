/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import { getLogger } from '../../../logging/log-util'
import axios from 'axios'
import * as jose from 'jose'

//The below sets the minimum logging level to error and surpresses everything below that
const logger = getLogger('next-auth')
logger.level = 'warn'

/*Adds the signing algorithm to the end of the private key. Necessary to decrypt the userinfo_token.
 * Simply adding this to the end of the environment variable breaks the idToken decryption so this is a workaround.
 * May need to look at regenerating the keyset at a later date.*/
const jwk = JSON.parse(process.env.AUTH_PRIVATE ?? '{}')
jwk.alg = 'RS256'

async function decryptJwe(jwe: string, jwk: any) {
  const key = await jose.importJWK({ ...jwk })
  const decryptResult = await jose.compactDecrypt(jwe, key, {
    keyManagementAlgorithms: ['RSA-OAEP-256'],
  })
  return jose.decodeJwt(decryptResult.plaintext.toString())
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
          //Necessary to test locally until we no longer need the proxy. Will use request without proxy on deployed app
          const res =
            process.env.AUTH_ON_PROXY &&
            process.env.AUTH_ON_PROXY.toLowerCase() === 'true'
              ? await axios
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
              : await axios
                  .get(process.env.AUTH_ECAS_USERINFO as string, {
                    headers: {
                      Authorization: `Bearer ${context.tokens.access_token}`,
                    },
                  })
                  .then((response) => response)
                  .catch((error) => logger.error(error))
          return res?.data
        },
      },
      idToken: true,
      checks: ['state', 'nonce'],
      profile: async (profile) => {
        profile = await decryptJwe(profile.userinfo_token, jwk)
        //Make call to msca-ng API to update last login date
        const response = await axios
          .post(
            `https://${process.env.HOSTALIAS_HOSTNAME}${process.env.MSCA_NG_USER_ENDPOINT}`,
            {
              pid: profile.sin,
              spid: profile.uid,
            },
            {
              headers: {
                'authorization': `Basic ${process.env.MSCA_NG_CREDS}`,
                'Content-Type': 'application/json',
              },
            },
          )
          .then((response) => response)
          .catch((error) => logger.error(error))
        console.log(response)
        return {
          id: profile.sub,
          ...profile,
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
    async jwt({ token, user, account }) {
      return { ...token, ...user, ...account }
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      //else if (process.env.AUTH_ECAS_GLOBAL_LOGOUT_URL === url) return url
      return baseUrl
    },
    async session({ session }) {
      return { ...session }
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
