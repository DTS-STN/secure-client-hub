'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.openidClient = openidClient

var _openidClient = require('openid-client')
var HttpsProxyAgent = require('https-proxy-agent')

async function openidClient(options) {
  const provider = options.provider
  let httpOptions = {}
  if (provider.httpOptions) httpOptions = { ...provider.httpOptions }
  if (process.env.http_proxy_agent) {
    let agent = new HttpsProxyAgent(process.env.http_proxy_agent)
    httpOptions.agent = agent
  }
  _openidClient.custom.setHttpOptionsDefaults(httpOptions)

  let issuer

  if (provider.wellKnown) {
    issuer = await _openidClient.Issuer.discover(provider.wellKnown)
  } else {
    var _provider$authorizati,
      _provider$authorizati2,
      _provider$token$url,
      _provider$token,
      _provider$userinfo$ur,
      _provider$userinfo

    issuer = new _openidClient.Issuer({
      issuer: provider.issuer,
      authorization_endpoint:
        (_provider$authorizati =
          (_provider$authorizati2 = provider.authorization) === null ||
          _provider$authorizati2 === void 0
            ? void 0
            : _provider$authorizati2.url) !== null &&
        _provider$authorizati !== void 0
          ? _provider$authorizati
          : provider.authorization,
      token_endpoint:
        (_provider$token$url =
          (_provider$token = provider.token) === null ||
          _provider$token === void 0
            ? void 0
            : _provider$token.url) !== null && _provider$token$url !== void 0
          ? _provider$token$url
          : provider.token,
      userinfo_endpoint:
        (_provider$userinfo$ur =
          (_provider$userinfo = provider.userinfo) === null ||
          _provider$userinfo === void 0
            ? void 0
            : _provider$userinfo.url) !== null &&
        _provider$userinfo$ur !== void 0
          ? _provider$userinfo$ur
          : provider.userinfo,
    })
  }

  const client = new issuer.Client(
    {
      client_id: provider.clientId,
      client_secret: provider.clientSecret,
      redirect_uris: [provider.callbackUrl],
      ...provider.client,
    },
    provider.jwks,
  )
  client[_openidClient.custom.clock_tolerance] = 10
  return client
}
