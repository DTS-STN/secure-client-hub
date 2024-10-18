/// <reference types="cypress" />


describe('Validate Contact Old Age Security page', () => {

  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      hostname: 'assets.adobedtm.com'
    }).as('adobeAnalytics')
    cy.visit('/contact-us/contact-old-age-security')
  })

  it('Contact us OAS has no detectable a11y violations on load', () => {
    cy.injectAxe()
    cy.checkA11y()
  })

  it('Navigate to the OAS contact us page from Contact index page', () => {
    cy.visit('/contact-us')
    cy.get('[data-testid="oas-contact-us"]').click()
    cy.location('pathname', { timeout: 10000 })
      .should('equal', '/en/contact-us/contact-old-age-security')
  })

  it('Validate OAS Contact Us header and page items in EN and FR', () => {
    cy.get('#contact-us-heading').should('be.visible').and('have.text', 'Contact Old Age Security')
    cy.get('[data-cy="breadcrumb-Contact us"]').should('be.visible')
    cy.get('[data-cy="breadcrumb-My dashboard"]').should('be.visible')
    cy.changeLang().should('have.text', 'English')
    cy.location('pathname', { timeout: 10000 })
      .should('equal', '/fr/contactez-nous/communiquer-securite-vieillesse')
    cy.get('[data-cy="breadcrumb-Mon tableau de bord"]').should('be.visible')
    cy.get('[data-cy="breadcrumb-Contactez-nous"]').should('be.visible').click()
    cy.location('pathname', { timeout: 10000 })
      .should('equal', '/fr/contactez-nous')
    cy.get('[data-testid="oas-contact-us"]').click()
    cy.get('#contact-us-heading').should('be.visible').and('have.text', 'Communiquer avec la Sécurité de la vieillesse')

  })

  it('Validate the "On this Page" section and links EN', () => {
    cy.get('#onthispage').find('a')
      .should('be.visible')
      .and('have.length', '4')
      .and('not.have.length', 0)
      .and('not.have.attr', 'href', '#undefined')
  })

  it('Validate Phone section on OAS contact Us page', () => {
       cy.get('[data-cy="tableLink1"]').should('be.visible').click()
       cy.url().should('contains', 'oas-contact-telephone')
       cy.get('#oas-contact-telephone').should('be.visible')
       cy.get('#oas-contact-telephone > [data-cy="section1"]').should('be.visible')
       cy.get('#oas-contact-telephone > [data-cy="section2"]').should('be.visible')
  })

  it('Validate Callback section on OAS contact Us page', () => {
    cy.get('#onthispage').find('[data-cy="tableLink2"]')
      .should('be.visible')
      .click()
    cy.url().should('contains', '/en/contact-us/contact-old-age-security#oas-contact-callback')
    cy.get('#oas-contact-callback').should('be.visible')
    cy.get('#oas-contact-callback > [data-cy="section1"]').should('be.visible')
    cy.get('#oas-contact-callback > [data-cy="section2"]').should('be.visible')
})

  it('Validate In Person section on OAS contact Us page', () => {
    cy.get('[data-cy="tableLink3"]').click()
    cy.url().should('contains', 'oas-contact-in-person')
    cy.get('#oas-contact-in-person').should('be.visible')
    cy.get('#oas-contact-in-person > [data-cy="section1"]').should('be.visible')
    cy.get('#oas-contact-in-person > [data-cy="section2"]').should('be.visible')
})
  it('Validate Mail section on OAS contact Us page', () => {
    cy.get('[data-cy="tableLink4"]').click()
    cy.url().should('contains', 'oas-contact-mail')
    cy.get('#oas-contact-mail').should('be.visible')
    cy.get('[data-cy="provinceCards"]').should('have.length', '13')
    cy.get('[data-cy="summary"]').each(($list) => {
      cy.wrap($list).click()
      cy.get('[data-cy="mail-addys"]')
       .should('be.visible')
    })
  })
  
  it('Validate there is exactly one copy of the AA script and it was only loaded once', () => {
    cy.get('@adobeAnalytics.all').its('length').should('eq', 1)
    cy.get('script[src*="adobedtm"]').as('analyticsScript')
    cy.get('@analyticsScript').its('length').should('eq', 1)
  })
})