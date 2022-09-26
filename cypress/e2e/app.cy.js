/// <reference types="cypress" />

describe('app page loads', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.injectAxe();
  })

  it('displays the index page', { tags:'smoke' }, () => {
    cy.url().should("contains", "/");
  })

  it('App has no detectable a11y violations on load', () => {
    cy.checkA11y()
  })
})
