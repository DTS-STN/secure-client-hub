/// <reference types="cypress" />

describe('Validate EI Contact Us Landing page', () => {

  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      hostname: 'assets.adobedtm.com',
      path: /.*\/launch-.*/,
    }).as('adobeAnalytics')
    cy.visit('/contact-us/contact-employment-insurance', { retryOnStatusCodeFailure: true })
  })

  it('Contact us EI has no detectable a11y violations on load', () => {
    cy.injectAxe()
    cy.checkA11y()
  })

  it('Navigate to the EI contact us page from Contact index page', () => {
    cy.visit('/contact-us')
    cy.get('[data-testid="ei-contact-us"]').click()
    cy.location('pathname', { timeout: 10000 })
      .should('equal', '/en/contact-us/contact-employment-insurance')
  })

  it('Validate EI Contact Us header and page items in EN and FR', () => {
    cy.get('#contact-us-heading').should('be.visible').and('have.text', 'Contact Employment Insurance')
    cy.get('[data-cy="breadcrumb-Contact us"]').should('be.visible')
    cy.get('[data-cy="breadcrumb-My dashboard"]').should('be.visible')
    cy.changeLang().should('have.text', 'English')
    cy.location('pathname', { timeout: 10000 })
      .should('equal', '/fr/contactez-nous/communiquer-assurance-emploi')
    cy.get('[data-cy="breadcrumb-Mon tableau de bord"]').should('be.visible')
    cy.get('[data-cy="breadcrumb-Contactez-nous"]').should('be.visible').click()
    cy.location('pathname', { timeout: 10000 })
      .should('equal', '/fr/contactez-nous')
    cy.get('[data-testid="ei-contact-us"]').click()
    cy.get('#contact-us-heading').should('be.visible').and('have.text', 'Communiquer avec l\'assurance-emploi')

  })

  it('Validate the "On this Page" section and links EN', () => {
    cy.get('#onthispage').find('a')
      .should('be.visible')
      .and('have.length', '4')
      .and('not.have.length', 0)
      .and('not.have.attr', 'href', '#undefined')
  })

  it('Validate Phone section on EI contact Us page', () => {
       cy.get('[data-cy="tableLink1"]').should('be.visible').click()
       cy.url().should('contains', 'ei-contact-telephone')
       cy.get('#ei-contact-telephone').should('be.visible')
       cy.get('#ei-contact-telephone > [data-cy="section1"]').should('be.visible')
       cy.get('#ei-contact-telephone > [data-cy="section2"]').should('be.visible')
  })

  it('Validate Callback section on EI contact Us page', () => {
    cy.get('#onthispage').find('[data-cy="tableLink2"]')
      .should('be.visible')
      .click()
    cy.url().should('contains', '/en/contact-us/contact-employment-insurance#ei-contact-callback')
    cy.get('#ei-contact-callback').should('be.visible')
    cy.get('#ei-contact-callback > [data-cy="section1"]').should('be.visible')
    cy.get('#ei-contact-callback > [data-cy="section2"]').should('be.visible')
})

  it('Validate In Person section on EI contact Us page', () => {
    cy.get('[data-cy="tableLink3"]').click()
    cy.url().should('contains', 'ei-contact-in-person')
    cy.get('#ei-contact-in-person').should('be.visible')
    cy.get('#ei-contact-in-person > [data-cy="section1"]').should('be.visible')
    cy.get('#ei-contact-in-person > [data-cy="section2"]').should('be.visible')
})
  it('Validate Mail section on EI contact Us page', () => {
    cy.get('[data-cy="tableLink4"]').click()
    cy.url().should('contains', 'ei-contact-mail')
    cy.get('#ei-contact-mail').should('be.visible')
    cy.get('[data-cy="provinceCards"]').should('have.length', '13')
    cy.get('[data-cy="summary"]').each(($list) => {
      cy.wrap($list).click()
      cy.get('[data-cy="mail-addys"]')
       .should('be.visible')
    })
  })

  it('Validate there is exactly one copy of the AA script and it was only loaded once', () => {
    cy.get('@adobeAnalytics.all').its('length').should('eq', 1)
    cy.get('script[src*="adobedtm"]').filter('[src*="launch-"]').as('analyticsScript')
    cy.get('@analyticsScript').its('length').should('eq', 1)
  })

})
