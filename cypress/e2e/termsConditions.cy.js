/// <reference types="cypress" />

describe('Validate Terms and Conditions Page', () => {
  beforeEach(() => {
    cy.visit('/privacy-notice-terms-conditions')
  })

  it('Terms and conditions and Privacy has no detectable a11y violations on load', () => {
    cy.injectAxe()
    cy.checkA11y()
  })

  it('validate the "Privacy" click on dashboard page goes to T&C page EN', () => {
    cy.visit('/my-dashboard')
    cy.get('#footerLink1').click()
    cy.location('pathname', { timeout: 10000 })
      .should('equal', '/en/privacy-notice-terms-conditions')
    cy.get('#PrivacyCondition-heading')
      .should('be.visible')
      .and('have.text', 'Privacy notice and terms and conditions')
    cy.get('#privacy-notice').should('be.visible')
    cy.get('#digital-identity-verification--consent').should('be.visible')
    cy.get('#system-requirements').should('be.visible')
    cy.get('[data-cy="breadcrumb-My dashboard"]')
      .should('be.visible')
      .and('have.text', 'My dashboard')
      .and('have.attr', 'href', '/en/my-dashboard')
  })

  it('validate the "Privacy" click on dashboard page goes to T&C page FR', () => {
    cy.visit('/my-dashboard')
    cy.changeLang().should('have.text', 'English')
    cy.url().should('contains', '/fr/mon-tableau-de-bord')
    cy.get('#footerLink1').click()
    cy.location('pathname', { timeout: 10000 }).should(
      'equal',
      '/fr/avis-confidentialite-modalites'
    )
    cy.get('#PrivacyCondition-heading')
      .should('be.visible')
      .and('have.text', 'Avis de confidentialité et modalités')
    cy.get('#avis-de-confidentialite').should('be.visible')
    cy.get('#verification-de-lidentite-numerique---consentement').should(
      'be.visible'
    )
    cy.get('#exigences-du-systeme').should('be.visible')
    cy.get('[data-cy="breadcrumb-Mon tableau de bord"]')
      .should('be.visible')
      .and('have.text', 'Mon tableau de bord')
      .and('have.attr', 'href', '/fr/mon-tableau-de-bord')
  })

  it('validate the "terms and conditions" click on dashboard page goes to T&C page EN', () => {
    cy.visit('/my-dashboard')
    cy.get('#footerLink0').click()
    cy.location('pathname', { timeout: 10000 }).should(
      'equal',
      '/en/privacy-notice-terms-conditions'
    )
    cy.get('#termsAndConditions').should('be.visible')
    cy.get('#terms-and-conditions-of-use').should('be.visible')
  })

  it('validate the "terms and conditions" click on dashboard page goes to T&C page FR', () => {
    cy.visit('/my-dashboard')
    cy.changeLang().should('have.text', 'English')
    cy.url().should('contains', '/fr/mon-tableau-de-bord')
    cy.get('#footerLink0').click()
    cy.location('pathname', { timeout: 10000 }).should(
      'equal',
      '/fr/avis-confidentialite-modalites'
    )
    cy.get('#conditions-dutilisation').should('be.visible')
    cy.get('#termesEtConditions').should('be.visible')
  })

  it('Validate the "Back to Dashboard" click navigates to dashboard page', () => {
    cy.get('#back-to-dashboard-button').should('be.visible')
  })
})
