/**This and the login tests currently only test that the page is accessible and reachable.
It does not test the authentication functionality currently since those endpoints are on prem only at this time. **/

beforeEach(() => {
  cy.visit('/my-dashboard')
})

describe('Validate logout scenario and page', () => {
  it('should click Sign-out from the menu item go to /auth/logout/', () => {
    cy.intercept('POST', 'api/auth/signout').as('signout')

    cy.get('[data-testid="menuButton"]').click()
    cy.get('[id="dropdownNavbar"]>div:nth-child(5)').click()

    cy.wait('@signout')
      .its('response')
      .then((response) => {
        const { statusCode } = response
        // confirm the status code is 308 for a redirect
        expect(statusCode).to.eq(308)
      })
    cy.url().should('eq', 'http://localhost:3000/en/auth/logout/')
  })

  it('should show the loading spinner + text then return to index page once logged out', () => {
    // Create a Promise and capture a reference to its resolve
    // function so that we can resolve it when we want to:
    let sendResponse
    const trigger = new Promise((resolve) => {
      sendResponse = resolve
    })
    // Intercept requests to the URL and does not let the response occur until the Promise is resolved
    cy.intercept('POST', 'api/auth/signout', async (request) => {
      await trigger
      request.reply()
    })
    cy.visit('/auth/logout/')
    // Verify the loading spinner and text
    cy.get('[data-cy="loading-spinner"]')
      .should('be.visible')
      .and('have.text', 'Loading / Chargement en cours ...')
      .then(() => {
        // all the resolve function of the above Promise
        sendResponse()
        // Assert that the loading spinner is removed from the DOM
        cy.get('[data-cy="loading-spinner"]').should('not.exist')
        // Return to index page (this may change as noted at top)
        cy.url().should('eq', 'http://localhost:3000/')
      })
  })
})
