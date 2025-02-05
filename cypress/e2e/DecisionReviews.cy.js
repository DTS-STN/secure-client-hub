/// <reference types="cypress" />

describe('Validate Request a review of a decision page', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      hostname: 'assets.adobedtm.com',
      path: /.*\/launch-.*/,
    }).as('adobeAnalytics')
    cy.visit('/en/decision-reviews', { retryOnStatusCodeFailure: true, timeout: 60000 })
  })
  it('Request a review has no detectable a11y violations on load', () => {
    cy.injectAxe()
    cy.checkA11y()
  })

  it('Heading is visible and Ask Service Canada to reconsider has href EN', () => {
    cy.get('#DecisionReviews-heading').as('pageHeading')
    cy.url().should('contains', '/decision-reviews')
    cy.get('#DecisionReviews-heading')
      .should('be.visible')
      .and('have.text', 'Request a review of a decision')
    cy.get('[data-testid="decision-review-ask-service-canada"]')
      .should('have.attr', 'href')
      .and('contain', '/sc/msca-mdsc/portal-portail/pro/reqr-demr/?Lang=eng')
  })
  it('Heading is visible and Ask Service Canada to reconsider has href FR', () => {
    cy.get('[data-cy="lang1"]').click()
    cy.get('[data-cy="lang1"] > span').should('have.text', 'English')
    cy.get('#DecisionReviews-heading')
      .should('be.visible')
      .and('have.text', 'Faire une demande de révision')
    cy.url().should('contains', '/demande-revision')
    cy.get('[data-testid="decision-review-ask-service-canada"]')
      .should('have.attr', 'href')
      .and('contain', '/sc/msca-mdsc/portal-portail/pro/reqr-demr/?Lang=fra')
  })
  it('The button for Appeal to the SST has href EN', () => {
    cy.get('[data-testid="decision-review-appeal-to-sst"]')
      .should('have.attr', 'href')
      .and(
        'contain',
        '/sc/msca-mdsc/portal-portail/pro/sstgdis-tssdgsr/?Lang=eng'
      )
  })
  it('The button for Appeal to the SST has href FR', () => {
    cy.get('[data-cy="lang1"]').click()
    cy.get('[data-cy="lang1"] > span').should('have.text', 'English')
    cy.get('[data-testid="decision-review-appeal-to-sst"]')
      .should('have.attr', 'href')
      .and(
        'contain',
        '/sc/msca-mdsc/portal-portail/pro/sstgdis-tssdgsr/?Lang=fra'
      )
  })
  it('The breadcrumb returns user to dashboard', () => {
    cy.get('[data-cy="breadcrumb-My dashboard"]').click()
    cy.url().should('include', '/my-dashboard')
  })

  it('Validate there is exactly one copy of the AA script and it was only loaded once', () => {
    cy.get('@adobeAnalytics.all').its('length').should('eq', 1)
    cy.get('script[src*="adobedtm"]').filter('[src*="launch-"]').as('analyticsScript')
    cy.get('@analyticsScript').its('length').should('eq', 1)
  })
})
