/**This and the login tests currently only test that the page is accessible and reachable.
It does not test the authentication functionality currently since those endpoints are on prem only at this time. **/

beforeEach(() => {
  cy.visit('/auth/logout')
})

describe('Validate logout page', () => {
  it('Lands on logout page and displays loading spinner', () => {
    const spinner = cy.get('[data-cy="loading-spinner"]')
    spinner
      .should('be.visible')
      .and('have.text', 'Loading / Chargement en cours ...')
  })
  it('Redirects to index page', () => {
    cy.wait(2000)
    cy.url().should('contains', '/')
  })
})
