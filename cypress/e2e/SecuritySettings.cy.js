/// <reference types="cypress" />

describe('Validate Security Settings page', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      hostname: 'assets.adobedtm.com',
      path: /.*\/launch-.*/,
    }).as('adobeAnalytics')
    cy.visit('/security-settings', { retryOnStatusCodeFailure: true })
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

  it('Validate that the "Looking for" section is present on Security Settings Page EN/FR', () => {
    cy.get("[data-cy ='looking-for']").should('be.visible')
    cy.get('[data-cy="access-profile-page-link"]').should(
      'have.attr',
      'href',
      '/en/profile'
    )
    cy.get('#back-to-dashboard-button')
      .should('be.visible')
      .and('have.text', 'Back to my dashboard')
    cy.get('[data-cy="lang1"] > span').click()
    cy.get('[data-cy="looking-for"]')
      .should('be.visible')
      .and('have.text', 'Vous recherchez les paramètres de votre profil?')
    cy.get('[data-cy="access-profile-page-link"]').should(
      'have.attr',
      'href',
      '/fr/profil'
    )
    cy.get('#back-to-dashboard-button')
      .should('be.visible')
      .and('have.text', 'Retour à mon tableau de bord')
  })

  it('Validate the "Profile" click navigates to Profile Page EN', () => {
    cy.get('[data-cy="access-profile-page-link"]').click()
    cy.url().should('contains', '/profile')
    cy.get('[data-testid ="profileContent-test"]>h1')
      .should('be.visible')
      .and('have.text', 'Profile')
  })

  it('Validate the "Profil" click navigates to Profile Page FR', () => {
    cy.get('[data-cy="lang1"] > span').click()
    cy.url().should('contains', '/fr/parametres-securite')
    cy.get('[data-cy="access-profile-page-link"]').click()
    cy.url().should('contains', '/profil')
    cy.get('[data-testid ="profileContent-test"]>h1')
      .should('be.visible')
      .and('have.text', 'Profil')
  })

  it('Validate there is exactly one copy of the AA script and it was only loaded once', () => {
    cy.get('@adobeAnalytics.all').its('length').should('eq', 1)
    cy.get('script[src*="adobedtm"]').filter('[src*="launch-"]').as('analyticsScript')
    cy.get('@analyticsScript').its('length').should('eq', 1)
  })
})
