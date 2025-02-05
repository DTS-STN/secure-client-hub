/// <reference types="cypress" />

describe('Validate Profile page', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      hostname: 'assets.adobedtm.com',
      path: /.*\/launch-.*/,
    }).as('adobeAnalytics')
    cy.visit('/profile', { retryOnStatusCodeFailure: true })
  })

  it('Profile has no detectable a11y violations on load', () => {
    cy.injectAxe()
    cy.checkA11y()
  })

  it('Validate Profile URL and Header in EN and FR', () => {
    cy.url().should('contains', '/profile')
    cy.get('#profile-heading').should('be.visible').and('have.text', 'Profile')
    cy.changeLang().should('have.text', 'English')
    cy.url().should('contains', '/fr/profil')
    cy.get('#profile-heading').should('be.visible').and('have.text', 'Profil')
  })

  it('validate the breadcrumbs are present on Profile page', () => {
    cy.get('[data-cy="breadcrumb-My dashboard"]')
      .should('be.visible')
      .and('have.text', 'My dashboard')
      .and('have.attr', 'href', '/en/my-dashboard')
    cy.changeLang().should('have.text', 'English')
    cy.url().should('contains', '/fr/profil')
    cy.get('[data-cy="breadcrumb-Mon tableau de bord"]')
      .should('be.visible')
      .and('have.text', 'Mon tableau de bord')
      .and('have.attr', 'href', '/fr/mon-tableau-de-bord')
  })

  it('Validate that the "Looking for" section is present on Profile Page EN', () => {
    cy.get("[data-cy ='looking-for']").should('be.visible')
    cy.get('[data-cy="access-security-page-link"]').should(
      'have.attr',
      'href',
      '/en/security-settings'
    )
    cy.get('#back-to-dashboard-button')
      .should('be.visible')
      .and('have.text', 'Back to my dashboard')
      .and('have.attr', 'href', '/en/my-dashboard')
  })

  it('Validate that the "Looking for" section is present on Profile Page FR', () => {
    cy.changeLang().should('have.text', 'English')
    cy.url().should('contains', '/fr/profil')
    cy.get("[data-cy ='looking-for']").should('be.visible')
    cy.get('[data-cy="access-security-page-link"]').should(
      'have.attr',
      'href',
      '/fr/parametres-securite'
    )
    cy.get('#back-to-dashboard-button')
      .should('be.visible')
      .and('have.text', 'Retour à mon tableau de bord')
      .and('have.attr', 'href', '/fr/mon-tableau-de-bord')
  })

  it('Validate the "Security Settings" click navigates to Security Settings Page EN', () => {
    cy.get('[data-cy="access-security-page-link"]').click()
    cy.location('pathname', { timeout: 10000 }).should(
      'equal',
      '/en/security-settings'
    )
    cy.get('#security-settings-heading')
      .should('be.visible')
      .and('have.text', 'Security settings')
  })

  it('Validate the "Security Settings" click navigates to Security Settings Page FR', () => {
    cy.changeLang().should('have.text', 'English')
    cy.url().should('contains', '/fr/profil')
    cy.get('[data-cy="access-security-page-link"]').click()
    cy.location('pathname', { timeout: 10000 }).should(
      'equal',
      '/fr/parametres-securite'
    )
    cy.get('#security-settings-heading')
      .should('be.visible')
      .and('have.text', 'Paramètres de sécurité')
  })

  it('validate the menu navigates to Profile page from Dashboard EN', () => {
    cy.visit('/my-dashboard')
    cy.get('[data-testid="menuButton"]').click()
    cy.get(':nth-child(2) > .border-t-2').click()
    cy.url().should('contains', '/en/profile')
  })

  it('validate the menu navigates to Profile page from Dashboard FR', () => {
    cy.visit('/my-dashboard')
    cy.changeLang().should('have.text', 'English')
    cy.url().should('contains', '/fr/mon-tableau-de-bord')
    cy.get('[data-testid="menuButton"]').click()
    cy.get(':nth-child(2) > .border-t-2').click()
    cy.url().should('contains', '/fr/profil')
  })

  it('Validate the titles and links on the page EN', () => {
    cy.get(':nth-child(1) > [data-cy="program-title"]')
      .should('be.visible')
      .and('contain.text', 'Employment Insurance')
    cy.get(':nth-child(2) > [data-cy="program-title"]')
      .should('be.visible')
      .and('contain.text', 'Canada Pension Plan')
    cy.get(':nth-child(3) > [data-cy="program-title"]')
      .should('be.visible')
      .and('contain.text', 'Old Age Security')
    cy.get(':nth-child(4) > [data-cy="program-title"]')
      .should('be.visible')
      .and('contain.text', 'Social Insurance Number')
    // Iterate through the list
    cy.get('[data-cy=task] a[data-cy=task-link]').each(($link) => {
      cy.wrap($link)
        .should('be.visible')
        .and('not.have.attr', 'href', '#undefined')
    })
  })

  it('Validate the titles and links on the page FR', () => {
    cy.changeLang().should('have.text', 'English')
    cy.url().should('contains', '/fr/profil')
    cy.get(':nth-child(1) > [data-cy="program-title"]')
      .should('be.visible')
      .and('contain.text', 'Assurance-emploi')
    cy.get(':nth-child(2) > [data-cy="program-title"]')
      .should('be.visible')
      .and('contain.text', 'Régime de pensions du Canada')
    cy.get(':nth-child(3) > [data-cy="program-title"]')
      .should('be.visible')
      .and('contain.text', 'Sécurité de la vieillesse')
    cy.get(':nth-child(4) > [data-cy="program-title"]')
      .should('be.visible')
      .and('contain.text', 'Numéro d’assurance sociale')
    // Iterate through the list
    cy.get('[data-cy=task] a[data-cy=task-link]').each(($link) => {
      cy.wrap($link)
        .should('be.visible')
        .and('not.have.attr', 'href', '#undefined')
    })
  })

  it('Validate there is exactly one copy of the AA script and it was only loaded once', () => {
    cy.get('@adobeAnalytics.all').its('length').should('eq', 1)
    cy.get('script[src*="adobedtm"]').filter('[src*="launch-"]').as('analyticsScript')
    cy.get('@analyticsScript').its('length').should('eq', 1)
  })
})
