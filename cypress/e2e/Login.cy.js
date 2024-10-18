/**This and the logout tests currently only test that the page is accessible and reachable.
It does not test the authentication functionality currently since those endpoints are on prem only at this time. **/

beforeEach(() => {
  cy.intercept({
    method: 'GET',
    hostname: 'assets.adobedtm.com',
    path: /.*\/launch-.*/,
  }).as('adobeAnalytics')
  cy.visit('/auth/login')
})

describe('Validate login page', () => {
  it('Login has no detectable a11y violations on load', () => {
    cy.injectAxe()
    cy.checkA11y()
  })
 
  it('Logs in, checks the loading spinner and redirects to dashboard', () => {
    // Create a Promise and capture a reference to its resolve
    // function so that we can resolve it when we want to:
    let sendResponse
    const trigger = new Promise((resolve) => {
      sendResponse = resolve
    })
    // Intercept requests to the URL and does not let the response occur until the Promise is resolved
    cy.intercept('POST', 'api/auth/signin', async (request) => {
      await trigger
      request.reply()
    })
    cy.visit('/auth/login/')
    // Verify the loading spinner and text
    cy.get('[data-cy="loading-spinner"]')
      .should('be.visible')
      .and('have.text', 'Loading / Chargement en cours ...')
      .then(() => {
        // all the resolve function of the above Promise
        sendResponse()
        // Return to dashboard page 
        cy.location('pathname').should('include', '/my-dashboard')
      })
      cy.get('[data-cy="loading-spinner"]').should('not.exist')
  })

  it('Validate there is exactly one copy of the AA script and it was only loaded once', () => {
    cy.get('@adobeAnalytics.all').its('length').should('eq', 1)
    cy.get('script[src*="adobedtm"]').filter('[src*="launch-"]').as('analyticsScript')
    cy.get('@analyticsScript').its('length').should('eq', 1)
  })
})
