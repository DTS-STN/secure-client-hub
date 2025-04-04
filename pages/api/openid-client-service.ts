import moize from 'moize'
import { Issuer } from 'openid-client'

import { getLogger } from '../../logging/log-util'

const log = getLogger('openid-client-service')

/**
 * Return a singleton instance (by means of memomization) of the openid client service.
 */
export const getOpenIdClientService = moize.promise(createOpenIdClientService, {
  onCacheAdd: () => log.info('Creating new open id client service'),
})

const authPrivate = process.env.AUTH_PRIVATE

let jwk = {}
if (typeof authPrivate != 'undefined') {
  jwk = JSON.parse(authPrivate)
}

const jwkSet = { keys: [jwk] }

async function createOpenIdClientService() {
  const issuer = await Issuer.discover(
    process.env.AUTH_ECAS_WELL_KNOWN as string,
  )
  const redirectUrl = `${process.env.MSCAD_BASE_URL}${process.env.AUTH_REDIRECT_ENDPOINT}`
  const openIdClient = await buildClient(issuer, redirectUrl, jwkSet)

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
        `${process.env.MSCAD_BASE_URL}${process.env.AUTH_REDIRECT_ENDPOINT}`,
        params,
        {
          state: state,
          nonce: nonce,
          code_verifier: codeVerifier,
        },
        {
          clientAssertionPayload: {
            aud: `${process.env.AUTH_CLIENT_ASSERTION_AUD}`,
            exp: expiry,
            iat: iat,
            iss: `${process.env.CLIENT_ID}`,
            jti: jti,
            nbf: nbf,
            sub: `${process.env.CLIENT_ID}`,
          },
        },
      )
    },
  }
}

export async function buildClient(
  issuer: Issuer,
  redirectUrl: string,
  jwkSet: { keys: OpenIdJoseJWK[] },
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

// using the openid-client jose JWK interface
interface OpenIdJoseJWK {
  /** JWK "alg" (Algorithm) Parameter. */
  'alg'?: string
  'crv'?: string
  'd'?: string
  'dp'?: string
  'dq'?: string
  'e'?: string
  /** JWK "ext" (Extractable) Parameter. */
  'ext'?: boolean
  'k'?: string
  /** JWK "key_ops" (Key Operations) Parameter. */
  'key_ops'?: string[]
  /** JWK "kid" (Key ID) Parameter. */
  'kid'?: string
  /** JWK "kty" (Key Type) Parameter. */
  'kty'?: string
  'n'?: string
  'oth'?: Array<{
    d?: string
    r?: string
    t?: string
  }>
  'p'?: string
  'q'?: string
  'qi'?: string
  /** JWK "use" (Public Key Use) Parameter. */
  'use'?: string
  'x'?: string
  'y'?: string
  /** JWK "x5c" (X.509 Certificate Chain) Parameter. */
  'x5c'?: string[]
  /** JWK "x5t" (X.509 Certificate SHA-1 Thumbprint) Parameter. */
  'x5t'?: string
  /** "x5t#S256" (X.509 Certificate SHA-256 Thumbprint) Parameter. */
  'x5t#S256'?: string
  /** JWK "x5u" (X.509 URL) Parameter. */
  'x5u'?: string

  [propName: string]: unknown
}
