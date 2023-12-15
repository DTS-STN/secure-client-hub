/// <reference types="cypress" />

describe('Validate Request a review of a decision page', () => {
  beforeEach(() => {
    cy.visit('/en/decision-reviews')
  })
  it('Request a review has no detectable a11y violations on load', () => {
    cy.injectAxe()
    cy.checkA11y()
  })

  it('The heading and button for Ask Service Canada to reconsider has href EN', () => {
    cy.get('#DecisionReviews-heading').as('pageHeading')
    cy.url().should('contains', '/decision-reviews')
    cy.get('#DecisionReviews-heading')
      .should('be.visible')
      .and('have.text', 'Request a review of a decision')
    cy.get('[data-testid="decision-review-ask-service-canada"]').click()
    cy.get('[data-cy="exitBeta"]').should('be.visible')
    cy.get('#continue-to-page')
      .should('have.attr', 'href')
      .and('contain', '/sc/msca-mdsc/portal-portail/pro/reqr-demr/?Lang=eng')
  })
  it('The heading and button for Ask Service Canada to reconsider has href FR', () => {
    cy.get('[data-cy="lang1"]').click()
    cy.get('[data-cy="lang1"] > span').should('have.text', 'English')
    cy.get('#DecisionReviews-heading')
      .should('be.visible')
      .and('have.text', 'Faire une demande de révision')
    cy.url().should('contains', '/demande-revision')
    cy.get('[data-testid="decision-review-ask-service-canada"]').click()
    cy.get('[data-cy="exitBeta"]').should('be.visible')
    cy.get('#continue-to-page')
      .should('have.attr', 'href')
      .and('contain', '/sc/msca-mdsc/portal-portail/pro/reqr-demr/?Lang=fra')
  })
  it('The button for Appeal to the SST has href EN', () => {
    cy.get('[data-testid="decision-review-appeal-to-sst"]').click()
    cy.get('[data-cy="exitBeta"]').should('be.visible')
    cy.get('#continue-to-page')
      .should('have.attr', 'href')
      .and(
        'contain',
        '/sc/msca-mdsc/portal-portail/pro/sstgdis-tssdgsr/?Lang=eng'
      )
  })
  it('The button for Appeal to the SST has href FR', () => {
    cy.get('[data-cy="lang1"]').click()
    cy.get('[data-cy="lang1"] > span').should('have.text', 'English')
    cy.get('[data-testid="decision-review-appeal-to-sst"]').click()
    cy.get('[data-cy="exitBeta"]').should('be.visible')
    cy.get('#continue-to-page')
      .should('have.attr', 'href')
      .and(
        'contain',
        '/sc/msca-mdsc/portal-portail/pro/sstgdis-tssdgsr/?Lang=fra'
      )
  })
})
