import moize from 'moize'
import { JWK } from 'jose'
import { Issuer } from 'openid-client'

import { getLogger } from '../../logging/log-util'

const log = getLogger('openid-client-service')

/**
 * Return a singleton instance (by means of memomization) of the openid client service.
 */
export const getOpenIdClientService = moize.promise(createOpenIdClientService, {
  onCacheAdd: () => log.info('Creating new open id client service'),
})
console.log('testing')
console.log(process.env.AUTH_PRIVATE)
const authPrivate = process.env.AUTH_PRIVATE

let jwk = {} as JwkWithPropName
if (typeof authPrivate != 'undefined') {
  jwk = JSON.parse(authPrivate) as JwkWithPropName
}

const jwkWithPropNameSet = { keys: [jwk] }

async function createOpenIdClientService() {
  const issuer = await Issuer.discover(
    process.env.AUTH_ECAS_WELL_KNOWN as string,
  )
  const redirectUrl = `${process.env.NEXTAUTH_URL}${process.env.AUTH_REDIRECT_ENDPOINT}`
  const openIdClient = await buildClient(
    issuer,
    redirectUrl,
    jwkWithPropNameSet,
  )

  return {
    authorize: async (
      scope: string,
      codeChallenge: string,
      codeChallengeMethod: string,
      state: string,
      nonce: string,
    ) => {
      return openIdClient.authorizationUrl({
        scope: scope,
        code_challenge: codeChallenge,
        code_challenge_method: codeChallengeMethod,
        response_type: 'code',
        state: state,
        nonce: nonce,
      })
    },
    callback: async (
      params: Partial<{ [key: string]: string | string[] }>,
      state: string,
      nonce: string,
      codeVerifier: string,
      jti: string,
      expiry: number,
      iat: number,
      nbf: number,
    ) => {
      return openIdClient.callback(
        `${process.env.NEXTAUTH_URL}${process.env.AUTH_REDIRECT_ENDPOINT}`,
        params,
        {
          state: state,
          nonce: nonce,
          code_verifier: codeVerifier,
        },
        {
          clientAssertionPayload: {
            aud: process.env.AUTH_CLIENT_ASSERTION_AUD,
            exp: expiry,
            iat: iat,
            iss: process.env.CLIENT_ID,
            jti: jti,
            nbf: nbf,
            sub: process.env.CLIENT_ID,
          },
        },
      )
    },
    userinfo: async (accessToken: string) => {
      return openIdClient.userinfo<{ sin: string; uid: string }>(accessToken)
    },
  }
}

export async function buildClient(
  issuer: Issuer,
  redirectUrl: string,
  jwkSet: { keys: JwkWithPropName[] },
) {
  return new issuer.Client(
    {
      client_id: process.env.CLIENT_ID as string,
      client_secret: process.env.CLIENT_SECRET as string,
      redirect_uris: [redirectUrl],
      token_endpoint_auth_method: 'private_key_jwt',
      token_endpoint_auth_signing_alg: 'RS256',
      introspection_endpoint_auth_method: 'private_key_jwt',
      introspection_endpoint_auth_signing_alg: 'RS256',
      id_token_encrypted_response_alg: 'RSA-OAEP-256',
      id_token_encrypted_response_enc: 'A256GCM',
      id_token_signed_response_alg: 'RS512',
    },
    jwkSet,
  )
}

// Extending the jose JWK interface with a property present in the openid-client jose JWK interface
// TODO replace this with full openid-client jose JWK interface
interface JwkWithPropName extends JWK {
  [propName: string]:
    | string
    | undefined
    | boolean
    | string[]
    | Array<{ d?: string; r?: string; t?: string }>
}
