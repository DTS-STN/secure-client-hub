const REWRITES = [
  {
    source: '/contactez-nous',
    destination: '/contact-us',
  },
  {
    source: '/mon-tableau-de-bord',
    destination: '/my-dashboard',
  },
  {
    source: '/profil',
    destination: '/profile',
  },
  {
    source: '/parametres-securite',
    destination: '/security-settings',
  },
  {
    source: '/contactez-nous/communiquer-assurance-emploi',
    destination: '/contact-us/contact-employment-insurance',
  },
  {
    source: '/contactez-nous/communiquer-securite-vieillesse',
    destination: '/contact-us/contact-old-age-security',
  },
  {
    source: '/contactez-nous/communiquer-regime-pensions-canada',
    destination: '/contact-us/contact-canada-pension-plan',
  },
  {
    source: '/avis-confidentialite-modalites',
    destination: '/privacy-notice-terms-conditions',
  },
  {
    source: '/demande-revision',
    destination: '/decision-reviews',
  },
]

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '0',
  },
  {
    key: 'Content-Security-Policy',
    value:
      "default-src 'self' *.omtrdc.net *.2o7.net https://assets.adobedtm.com; base-uri 'self'; frame-ancestors 'self'; form-action 'self' https://srv113-i.lab.hrdc-drhc.gc.ca; object-src 'none'; script-src-elem 'self' 'unsafe-inline' https://assets.adobedtm.com; script-src 'self' 'unsafe-eval' https://*.demdex.net https://cm.everesttech.net https://assets.adobedtm.com *.omtrdc.net *.2o7.net; connect-src 'self' https://*.demdex.net https://cm.everesttech.net https://assets.adobedtm.com *.omtrdc.net *.2o7.net https://srv241-s2.lab.hrdc-drhc.gc.ca; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; frame-src 'self' https://*.demdex.net *.omtrdc.net *.2o7.net https://assets.adobedtm.com; img-src 'self' data: https: https://*.demdex.net https://cm.everesttech.net https://assets.adobedtm.com *.omtrdc.net *.2o7.net;",
  },
]

module.exports = {
  publicRuntimeConfig: {
    LOGGING_LEVEL: process.env.LOGGING_LEVEL ?? 'info',
    ENVIRONMENT: process.env.ENVIRONMENT,
  },
  reactStrictMode: true,
  //
  // i18n setup
  //
  i18n: {
    locales: ['und', 'en', 'fr'],
    defaultLocale: 'und',
    localeDetection: false,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    //GraphQL loader for .graphql files
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    })

    return config
  },
  //disable X-Powered-By
  poweredByHeader: false,
  // Image configured host
  images: {
    domains: ['www.canada.ca'],
  },
  experimental: {
    instrumentationHook: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
  //Redirect French URLs
  async rewrites() {
    return REWRITES
  },
}
