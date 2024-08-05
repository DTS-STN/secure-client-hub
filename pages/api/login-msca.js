/*
 * Touch MSCA session is an endpoint exposed for the client to refresh ECAS session timers on action or page load
 *
 */

import {
  AuthIsDisabled,
  AuthIsValid,
  ValidateSession,
  getIdToken,
} from '../../lib/auth'
import { getLogger } from '../../logging/log-util'
import { authOptions } from './auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'

// Including crypto module
const crypto = require('crypto')

const fetchFn = getFetchFn(HTTP_PROXY_URL);
function getMetadata() { async () => {await fetchServerMetadata(AUTH_RAOIDC_BASE_URL, fetchFn)};}
const { jwkSet, serverMetadata } = getMetadata();

//The below sets the minimum logging level to error and surpresses everything below that
const logger = getLogger('refresh-msca')
logger.level = 'error'

export default async function handler(req, res) {
 
}

async function fetchServerMetadata(authServerUrl: string, fetchFn?: FetchFunction) {
  const discoveryUrl = authServerUrl + '/.well-known/openid-configuration';
  log.info('Fetching OIDC server metadata from [%s]', discoveryUrl);

  // prettier-ignore
  const discoveryResponse = fetchFn
    ? await fetchFn(discoveryUrl)
    : await fetch(discoveryUrl);

  if (discoveryResponse.status !== 200) {
    throw new Error('Error fetching server metadata: non-200 status');
  }

  const serverMetadata = (await discoveryResponse.json()) as ServerMetadata;
  validateServerMetadata(serverMetadata);
  log.trace('Server metadata response: [%j]', serverMetadata);

  const jwksUrl = serverMetadata?.jwks_uri;
  log.info('Fetching OIDC server public keys from [%s]', jwksUrl);

  // prettier-ignore
  const jwksResponse = fetchFn
    ? await fetchFn(serverMetadata.jwks_uri)
    : await fetch(serverMetadata.jwks_uri);

  if (jwksResponse.status !== 200) {
    throw new Error('Error fetching server jwks: non-200 status');
  }

  const jwkSet = (await jwksResponse.json()) as JWKSet;
  validateJwkSet(jwkSet);
  log.trace('Server JWKS response: [%j]', jwkSet);

  return { jwkSet, serverMetadata };
}
