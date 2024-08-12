import { generateCryptoKey, generateJwkId } from '../lib/crypto-utils.server';
import { createClientAssertion, validateAuthorizationToken, validateJwkSet, JWKSet, decryptJwe, verifyJwt, IdToken, generateRandomString } from '../lib/auth-utils';
import { UTCDate } from '@date-fns/utc';
import { getLogger } from '../logging/log-util'
import { Client } from 'openid-client';
import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import getRedisService from '../redis-service.ts';
import { subtle } from 'crypto';
import axios from 'axios'
import { JWTVerifyResult } from 'jose';

//The below sets the minimum logging level to error and surpresses everything below that
const logger = getLogger('oauth-callback')
logger.level = 'error'

export default async function handler(req: NextRequest, res: NextResponse) {
  const privateDecryptionKey = await generateCryptoKey(process.env.KEYCLOAK_AUTH_PRIVATE as string, 'decrypt');
  //const privateSigningKey = await generateCryptoKey(process.env.KEYCLOAK_AUTH_PRIVATE as string, 'sign');
  //const privateKeyId = generateJwkId(await subtle.exportKey('jwk', privateSigningKey));

  const redisService = await getRedisService();
  const client = await redisService.get('client') as Client;
  const codeVerifier = await redisService.get('codeVerifier') as string;
  const state = await redisService.get('state') as string;
  const nonce = await redisService.get('nonce') as string;
  const redirectUrl = await redisService.get('redirectUrl') as string;
  const jwksUrl = await redisService.get('jwksUrl') as string;

  const now = Math.floor(UTCDate.now() / 1000); // current time, rounded down to the nearest second
  const expiry = now + 60; // valid for 1 minute
  const jwtId = generateRandomString(32); // mitigate replay attacks
  //const clientAssertion = await createClientAssertion(privateKeyId, privateSigningKey);
  //const clientAssertionType = 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer';
  const grantType = 'authorization_code';

  const params = client.callbackParams(req.url);

  const tokenSet = await client.callback(
    redirectUrl,
    params,
    {
      state: state,
      nonce: nonce,
      code_verifier: codeVerifier,
    },
    {
      exchangeBody: {
        grant_type: grantType,
        //client_assertion: clientAssertion,
        //client_assertion_type: clientAssertionType 
      },
      clientAssertionPayload: {
        aud: process.env.KEYCLOAK_WELL_KNOWN as string,
        exp: expiry,
        iat: now,
        iss: process.env.CLIENT_ID,
        jti: jwtId,
        nbf: now,
        sub: process.env.CLIENT_ID,
      }
    }
  );
  validateAuthorizationToken(tokenSet);

  const jwkSet = await fetchJwkSet(jwksUrl);

  const decryptedIdToken = await decryptJwe(tokenSet.id_token as string, privateDecryptionKey);
  const idTokenVerifyResult: JWTVerifyResult<IdToken> = await verifyJwt(decryptedIdToken, jwkSet);
  const idToken = idTokenVerifyResult.payload;

  const userinfo = await client.userinfo(tokenSet.access_token as string);

  redisService.set('idToken', idToken);
  redisService.set('userinfo', userinfo);

}

async function fetchJwkSet(jwksUrl: String) {

  logger.info('Fetching OIDC server public keys from [%s]', jwksUrl);

  const jwksResponse =
    process.env.AUTH_ON_PROXY &&
    process.env.AUTH_ON_PROXY.toLowerCase() === 'true'
      ? await axios
          .get(jwksUrl as string, {
            proxy: {
              protocol: 'http',
              host: 'localhost',
              port: 3128,
            },
          })
          .then((response) => response)
          .catch((error) => logger.error(error))
      : await axios
          .get( jwksUrl as string)
          .then((response) => response)
          .catch((error) => logger.error(error))

  if (jwksResponse?.status !== 200) {
    throw new Error('Error fetching server jwks: non-200 status');
  }

  const jwkSet = jwksResponse.data as JWKSet;
  validateJwkSet(jwkSet);
  logger.trace('Server JWKS response: [%j]', jwkSet);

  return jwkSet;
}