/// <reference types="cypress" />

describe('app page loads', () => {
  beforeEach(() => {
    cy.visit('/', { retryOnStatusCodeFailure: true })
    cy.injectAxe()
  })

  it('displays the index page', () => {
    cy.url().should('contains', '/')
  })

  it('App has no detectable a11y violations on load', () => {
    cy.checkA11y()
  })
})
