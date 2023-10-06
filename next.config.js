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
      "default-src 'self'; base-uri 'self'; frame-ancestors 'self'; form-action 'self' https://srv113-i.lab.hrdc-drhc.gc.ca; object-src 'none'; script-src-elem 'self' 'unsafe-inline' https://assets.adobedtm.com; script-src 'self' 'unsafe-eval' https://assets.adobedtm.com; connect-src 'self' https://canada.demdex.net https://dpm.demdex.net https://assets.adobedtm.com https://srv241-s2.lab.hrdc-drhc.gc.ca; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; frame-src 'self' 'unsafe-inline' https://assets.adobedtm.com; img-src 'self' data: https:",
  },
]

module.exports = {
  env: {
    BUILD_DATE: process.env.BUILD_DATE,
    LOGGING_LEVEL: process.env.LOGGING_LEVEL,
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
  async redirects() {
    return [
      {
        source: '/en',
        destination: '/',
        locale: false,
        permanent: false,
      },
      {
        source: '/fr',
        destination: '/',
        locale: false,
        permanent: false,
      },
      {
        source: '/und/my-dashboard',
        destination: '/en/my-dashboard',
        locale: false,
        permanent: false,
      },
      {
        source: '/und/privacy-notice-terms-conditions',
        destination: '/en/privacy-notice-terms-conditions',
        locale: false,
        permanent: false,
      },
      {
        source: '/und/profile',
        destination: '/en/profile',
        locale: false,
        permanent: false,
      },
      {
        source: '/und/security-settings',
        destination: '/en/security-settings',
        locale: false,
        permanent: false,
      },
      {
        source: '/und/contact-us',
        destination: '/en/contact-us',
        locale: false,
        permanent: false,
      },
      {
        source: '/und/contact-us/:path*',
        destination: '/en/contact-us/:path*',
        locale: false,
        permanent: false,
      },
    ]
  },
}
