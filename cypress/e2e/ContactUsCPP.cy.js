/// <reference types="cypress" />

describe('Validate Contact Canada Pension Plan page', () => {

  beforeEach(() => {
    cy.visit('/contact-us/contact-canada-pension-plan')
  })

  it('Contact us CPP has no detectable a11y violations on load', () => {
    cy.injectAxe()
    cy.checkA11y()
  })

  it('Navigate to the CPP contact us page from Contact index page', () => {
    cy.visit('/contact-us')
    cy.get('[data-testid="cpp-contact-us"]').click()
    cy.location('pathname', { timeout: 10000 })
      .should('equal', '/en/contact-us/contact-canada-pension-plan')
  })

  it('Validate CPP Contact Us header and page items in EN and FR', () => {
    cy.get('#contact-us-heading').should('be.visible').and('have.text', 'Contact Canada Pension Plan')
    cy.get('[data-cy="breadcrumb-Contact us"]').should('be.visible')
    cy.get('[data-cy="breadcrumb-My dashboard"]').should('be.visible')
    cy.changeLang().should('have.text', 'English')
    cy.location('pathname', { timeout: 10000 })
      .should('equal', '/fr/contactez-nous/communiquer-regime-pensions-canada')
    cy.get('[data-cy="breadcrumb-Mon tableau de bord"]').should('be.visible')
    cy.get('[data-cy="breadcrumb-Contactez-nous"]').should('be.visible').click()
    cy.location('pathname', { timeout: 10000 })
      .should('equal', '/fr/contactez-nous')
    cy.get('[data-testid="cpp-contact-us"]').click()
    cy.get('#contact-us-heading').should('be.visible').and('have.text', 'Communiquer avec le Régime de pensions du Canada')

  })

  it('Validate the "On this Page" section and links EN', () => {
    cy.get('#onthispage').find('a')
      .should('be.visible')
      .and('have.length', '4')
      .and('not.have.length', 0)
      .and('not.have.attr', 'href', '#undefined')
  })

  it('Validate Phone section on CPP contact Us page', () => {
       cy.get('[data-cy="tableLink1"]').should('be.visible').click()
       cy.url().should('contains', 'cpp-contact-telephone')
       cy.get('#cpp-contact-telephone').should('be.visible')
       cy.get('#cpp-contact-telephone > [data-cy="section1"]').should('be.visible')
       cy.get('#cpp-contact-telephone > [data-cy="section2"]').should('be.visible')
  })

  it('Validate Callback section on CPP contact Us page', () => {
    cy.get('#onthispage').find('[data-cy="tableLink2"]')
      .should('be.visible')
      .click()
    cy.url().should('contains', '/en/contact-us/contact-canada-pension-plan#cpp-contact-callback')
    cy.get('#cpp-contact-callback').should('be.visible')
    cy.get('#cpp-contact-callback > [data-cy="section1"]').should('be.visible')
    cy.get('#cpp-contact-callback > [data-cy="section2"]').should('be.visible')
})

  it('Validate In Person section on CPP contact Us page', () => {
    cy.get('[data-cy="tableLink3"]').click()
    cy.url().should('contains', 'cpp-contact-in-person')
    cy.get('#cpp-contact-in-person').should('be.visible')
    cy.get('#cpp-contact-in-person > [data-cy="section1"]').should('be.visible')
    cy.get('#cpp-contact-in-person > [data-cy="section2"]').should('be.visible')
})
  it('Validate Mail section on CPP contact Us page', () => {
    cy.get('[data-cy="tableLink4"]').click()
    cy.url().should('contains', 'cpp-contact-mail')
    cy.get('#cpp-contact-mail').should('be.visible')
    cy.get('[data-cy="provinceCards"]').should('have.length', '13')
    cy.get('[data-cy="summary"]').each(($list) => {
      cy.wrap($list).click()
      cy.get('[data-cy="mail-addys"]')
       .should('be.visible')
    })
  })

})