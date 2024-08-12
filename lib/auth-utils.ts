import { getLogger } from '../logging/log-util'
import type { JWTPayload, JWTVerifyResult } from 'jose';
import { SignJWT, compactDecrypt, importJWK, jwtVerify } from 'jose';
import type { webcrypto, subtle } from 'node:crypto';
import { UTCDate } from '@date-fns/utc';

const logger = getLogger('auth-utils')
logger.level = 'warn'

/**
 * An OIDC ID token.
 */
export interface IdToken extends Record<string, unknown> {
  aud: string;
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  nbf: number;
  nonce: string;
  sid: string;
  sub: string;
  //
  // optional
  //
  locale?: string;
}

/**
 * Generate a random state state.
 */
export function generateRandomState(len = 32) {
  return generateRandomString(len);
}

export function generateRandomNonce(len = 32) {
  return generateRandomString(len);
}

export async function createClientAssertion(privateKeyId: string, privateSigningKey: webcrypto.CryptoKey) {
  logger.debug(`Creating client [%s] assertion for issuer [%s]`, process.env.CLIENT_ID, process.env.KEYCLOAK_WELL_KNOWN);

  const now = Math.floor(UTCDate.now() / 1000); // current time, rounded down to the nearest second
  const expiry = now + 60; // valid for 1 minute
  const jwtId = generateRandomString(32); // mitigate replay attacks

  const header = {
    alg: 'RS256', //same as set in client metadata - token_endpoint_auth_signing_alg
    kid: privateKeyId,
  };

  const payload = {
    aud: process.env.KEYCLOAK_WELL_KNOWN as string,
    exp: expiry,
    iat: now,
    iss: process.env.CLIENT_ID,
    jti: jwtId,
    nbf: now,
    sub: process.env.CLIENT_ID,
  };

  // prettier-ignore
  return await new SignJWT(payload)
    .setProtectedHeader(header)
    .sign(privateSigningKey);
}


/**
 * Throw if the JWK set is fubar.
 */
export function validateJwkSet(jwkSet: JWKSet) {
  if (jwkSet.keys.length === 0) {
    throw new Error('JWK set has no keys');
  }

  logger.info('JWK set has been successfilly validated');

}

export interface JWKSet {
  keys: Array<JsonWebKey & Record<string, unknown>>;
}

export function validateAuthorizationToken(tokenEndpointResponse: TokenEndpointResponse) {
  if (!tokenEndpointResponse.access_token) {
    throw new Error('Authorization token is missing access_token claim');
  }

  if (!tokenEndpointResponse.id_token) {
    throw new Error('Authorization token is missing id_token claim');
  }

  log.debug('Authorization token successfully validated');
}

/**
 * Generate a random string, duh.
 */
export function generateRandomString(len: number) {
  const allowedChars = '0123456789abcdefghijklmnopqrstuvwxyz';
  const toRandomChar = () => allowedChars[Math.floor(Math.random() * allowedChars.length)];
  return Array(len).fill(undefined).map(toRandomChar).join('');
}

/**
 * Decrypt a JWE token using the provided private key.
 */
export async function decryptJwe(jwe: string, privateKey: CryptoKey) {
  const jwk = await subtle.exportKey('jwk', privateKey);
  const key = await importJWK({ ...jwk }, 'RSA-OAEP');
  const decryptResult = await compactDecrypt(jwe, key, { keyManagementAlgorithms: ['RSA-OAEP-256'] });
  return decryptResult.plaintext.toString();
}

/**
 * Verify a JWT by checking it against a collection of JWKs.
 */
export async function verifyJwt<Payload = JWTPayload>(jwt: string, jwks: JWKSet, alg = 'RSA-OAEP') {
  for (const key of jwks.keys) {
    const keyLike = await importJWK(key, alg);

    try {
      return await jwtVerify<Payload>(jwt, keyLike);
    } catch {
      // not the right JWK; skip to the next one
    }
  }

  log.warn('JWT verification failure; no matching JWK could be found');
  throw new Error('No matching JWK was found to verify JWT');
}