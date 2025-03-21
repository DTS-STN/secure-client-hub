const { defineConfig } = require('cypress')

module.exports = defineConfig({
  experimentalWebKitSupport: true,
  video: false,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:3000',
    retries: 2,
    // For convenience to skip tests
    //excludeSpecPattern: 'cypress/e2e/{app,ContactUs,ContactUsCPP,ContactUsEI,ContactUsOAS,Profile,DecisionReviews,dashboard,Login,Logout,SecuritySettings}.cy.js'
  },
})
