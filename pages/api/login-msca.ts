/*
 * Touch MSCA session is an endpoint exposed for the client to refresh ECAS session timers on action or page load
 *
 */

import { getLogger } from '../../logging/log-util'
import { generateRandomState, generateRandomNonce } from '../../lib/auth-utils';
import { Issuer } from 'openid-client';
import { generators } from 'openid-client';
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

//The below sets the minimum logging level to error and surpresses everything below that
const logger = getLogger('refresh-msca')
logger.level = 'error'

export default async function handler(req : NextRequest) {
  const issuer = await Issuer.discover(process.env.KEYCLOAK_WELL_KNOWN as string);
  const jwksUrl = issuer.metadata?.jwks_uri;
  const redirectUrl = req.nextUrl.searchParams.get("redirectUrl") as string;
  const client = await buildClient(redirectUrl, issuer);
  const codeVerifier = generators.codeVerifier();
  const codeChallenge = generators.codeChallenge(codeVerifier);
  const scope = 'openid profile';
  const state = generateRandomState();
  const codeChallengeMethod = 'S256';
  const nonce = generateRandomNonce();
  const authorizationUrl = client.authorizationUrl({
    scope: scope, 
    code_challenge: codeChallenge, 
    code_challenge_method: codeChallengeMethod,
    state: state,
    nonce: nonce,
  });
  
  return NextResponse.json({authorizationUrl: authorizationUrl, jwksUrl: jwksUrl, codeVerifier: codeVerifier, state: state, nonce: nonce, client: client});
}

async function buildClient(redirectUrl: string, issuer: Issuer) {
  
  return new issuer.Client({
    client_id: process.env.CLIENT_ID as string,
    client_secret: process.env.CLIENT_SECRET as string,
    redirect_uris: [ redirectUrl, ],
    token_endpoint_auth_method: 'private_key_jwt',
    introspection_endpoint_auth_method: 'private_key_jwt',
    id_token_encrypted_response_alg: 'RSA-OAEP-256',
    id_token_encrypted_response_enc: 'A256GCM',
    token_endpoint_auth_signing_alg: 'RS256',
    introspection_endpoint_auth_signing_alg: 'RS256',
    id_token_signed_response_alg: 'RS512',
  }) 

}

