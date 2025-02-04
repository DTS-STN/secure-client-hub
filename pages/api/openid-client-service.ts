import moize from 'moize'
import { JWK } from 'jose'
import { HttpsProxyAgent } from 'https-proxy-agent'
import { Issuer, custom } from 'openid-client'

import { getLogger } from '../../logging/log-util'

const log = getLogger('openid-client-service')

const proxyAgent = new HttpsProxyAgent('http://localhost:3128')

custom.setHttpOptionsDefaults({
  agent: proxyAgent,
})

/**
 * Return a singleton instance (by means of memomization) of the openid client service.
 */
export const getOpenIdClientService = moize.promise(createOpenIdClientService, {
  onCacheAdd: () => log.info('Creating new open id client service'),
})
console.log('testing')
console.log(process.env.AUTH_PRIVATE)
const jwk = JSON.parse(
  '{"p": "4lyDhzHJARwl9NuSX1T-I5ZBL6XcHIuSYqNaiXgO5BE-72yJ7_SZmsogicswz5FjP8bwy_TB2MpMYQ2hzNDPEmrU9elLn4EvKsdxBr5vDPh3o9r6koaWMr6sKBLCMjZTrl0sfoca7uVH1_pjt8iYn0cgA3cuq4OA9zW2NYkukQs","kty": "RSA","q": "kjEeO73RCnal05hHtcH_d0x1SaCAg2oSJwMBh4jpCi25TxOsqkTXNyhvD4IJ1WcLluAL2ry2rCaNu3wi265ErgaRAGXFLJ71mnMDyqfZb1gZeMkDWO_cyJFRicPpwJYkr_NO0_R7bhZ8vRtUaydZ_yPtzCm_xzWexMe5NQo_LlM","d": "czT8wjI0UosFg9KWfQEwU_aQdWeytC_zwahLb9JZfKzMmktKqoeAzSXN_6zmWHX6WJIgEkSGFp439VM_0mhJq_tlNMy3bzslwAmRGQIwB9TbsQ5SNMrTQhUkeTaq36Z5PsOboin_xUuX3DOsL1kEV64NcKcJxAUMNQFWEVNn7uXoO-AYdUEqZVxIuvD1FxNCEcrZHLs5Ri23uBVj58Cd8narPtXMKsO9h58ltCM-EpSs--YQFvZwxhraSnfXr8dz-m_0F0xobzGiZfpWRDVTLmD9oC5BjlfJwKMVWp09cOCSd5855s1t916Z9FnVg5jc3DtowBpGe5djnbt6TrfBVQ","e": "AQAB","kid": "gc-decd","qi": "3_tl4gfT3N6fimyHqEy_WGPZt4dC76mWEey1SksEhudeu_uW17sKRXmS2gPaDx594yZbxwnEuNKbp58GxHrSq9lSNYhYL5vk-ZmGnz9fXfvujS2bFzidjSE6u86EvZ0FOOsyO5iqFOAEF9PbljaiDrY7MQrhAuilxgQKogjwEVw","dp": "Anu_WalbKi7z36bVCUS2cQ-B8ZLhQlLprTlbkeyGRUxHI3tOXBqT4NXc24YmJ_DRZO66z5IE2msFwX7Typpz2yDe6z---6YALXj4rXlDYKINNff-DcN6PF5JJztldAWSj3QoO88hpYNQcXcmxuplekHegQs6sNkFfjDRqe6yWxc","dq": "hMtfRi8vUszh5un9wam-MBTguYe1FSpl4NAHNKF15kwQdzdM8cHkqPLup2ydGB8pVNyhiAlB-fBvcG3bkCeltVq7nlvTlquyN6DgQdbkWRLy2Ffn1YLUz8_I_FZc4BbCrp1Z7oi3EhIVLwZDUa6GPo_Zc0o9LWyUkvVFVFvBdoc","n": "gUQxc_HYdfwDByPiUTsiptoD74nfeD9S3ZKZZIv-wECOhwlIZC9ME5yXp4NyfcgPdNqsfF8TO5PyZL3WKxEUmKtbyGp4WFXSOvbgG7bYbVAl0u0sGeGOg3ZIjA5FZCjDx7o8JlTDxYwK69dPnF-dnbPN1im-k7B12yWNihkaF7mkbBP0Y7vBwBm7qO6AnGTiTPHf47e5ILn5VEyhPaW-7t3L6Zh46Hvn3Q-742ZRAJjgkaNZi7kqbGiGvcRwkbEfYVNxP_o_CejYh2RwsG04ZE7gslUIag5MZvBmvsh9covsBu-AbJ8KUkRC-uLmUukbB0damDxkPdL0skBo994AkQ"}',
) as JwkWithPropName
const jwkWithPropNameSet = { keys: [jwk] }

async function createOpenIdClientService() {
  const issuer = await Issuer.discover(
    process.env.AUTH_ECAS_WELL_KNOWN as string,
  )
  const redirectUrl = `${process.env.BASE_URL}${process.env.AUTH_REDIRECT_ENDPOINT}`
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
        process.env.BASE_URL + '/api/oauth-callback',
        params,
        {
          state: state,
          nonce: nonce,
          code_verifier: codeVerifier,
        },
        {
          clientAssertionPayload: {
            aud: 'GC-ECAS-DEV',
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
