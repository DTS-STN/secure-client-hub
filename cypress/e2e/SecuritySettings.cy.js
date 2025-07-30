/// <reference types="cypress" />

const runThis = false
// TODO: Re-enable this test once AEM is updated
if (runThis) {
  describe('Validate Security Settings page', () => {
    beforeEach(() => {
      cy.intercept({
        method: 'GET',
        hostname: 'assets.adobedtm.com',
        path: /.*\/launch-.*/,
      }).as('adobeAnalytics')
      cy.visit('/en/security-settings', { retryOnStatusCodeFailure: true, timeout: 60000 })
    })

    it('Security settings has no detectable a11y violations on load', () => {
      cy.injectAxe()
      cy.checkA11y()
    })
    // skippin due to issue with href
    it('Validate Security Settings Page and Questions link EN', () => {
      cy.get('[data-testid ="securityContent-test"]>h1')
        .should('be.visible')
        .and('have.text', 'Security settings')
      cy.get('#securityQuestionsLink')
        .should('have.attr', 'href')
        .and('contain', '/SCL/SQE.aspx?Lang=eng')
      cy.get('[data-cy="breadcrumb-My dashboard"]')
        .should('be.visible')
        .and('have.text', 'My dashboard')
        .click()
      cy.url().should('contains', '/my-dashboard')
    })

    it('Validate Security Settings Page  and Questions link FR', () => {
      cy.get('[data-cy="lang1"] > span').click()
      cy.url().should('contains', '/fr/parametres-securite')
      cy.get('[data-testid ="securityContent-test"]>h1')
        .should('be.visible')
        .and('have.text', 'Paramètres de sécurité')
      cy.get('#securityQuestionsLink')
        .should('have.attr', 'href')
        .and('contain', '/SCL/SQE.aspx?Lang=fra')
      cy.get('[data-cy="breadcrumb-Mon tableau de bord"]')
        .should('be.visible')
        .and('have.text', 'Mon tableau de bord')
        .click()
      cy.url().should('contains', '/fr/mon-tableau-de-bord')
    })


    it('Validate there is exactly one copy of the AA script and it was only loaded once', () => {
      cy.get('@adobeAnalytics.all').its('length').should('eq', 1)
      cy.get('script[src*="adobedtm"]').filter('[src*="launch-"]').as('analyticsScript')
      cy.get('@analyticsScript').its('length').should('eq', 1)
    })
  })
}