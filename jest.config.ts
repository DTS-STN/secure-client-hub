import nextJest from 'next/jest'
import { Config } from 'jest'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

const customJestConfig: Config = {
  modulePathIgnorePatterns: ['./cypress'],
  collectCoverageFrom: [
    'components/**/*.{js,jsx,ts,tsx}',
    'pages/**/*.{js,jsx,ts,tsx}',
  ],
  moduleNameMapper: {
    // these are to fix an issue with next auth
    '^jose': require.resolve('jose'),
    //'^@panva/hkdf': require.resolve('@panva/hkdf'),
    '^preact-render-to-string': require.resolve('preact-render-to-string'),
    '^preact': require.resolve('preact'),
    '^uuid': require.resolve('uuid'),

    /* Handle CSS imports (with CSS modules)
      https://jestjs.io/docs/webpack#mocking-css-modules */
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

    /* Handle image imports
      https://jestjs.io/docs/webpack#handling-static-assets */
    '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  coverageReporters: [
    'clover',
    'json',
    'json-summary',
    'lcov',
    ['text', { skipFull: true }],
  ],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/__mocks__/utils.mock.ts'],
  preset: 'ts-jest',
  setupFilesAfterEnv: ['@testing-library/react'],
}
export default createJestConfig(customJestConfig)
