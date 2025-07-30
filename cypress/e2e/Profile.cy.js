/// <reference types="cypress" />

const runThis = false
// TODO: Re-enable this test once AEM is updated
if (runThis) {
  describe('Validate Profile page', () => {
    beforeEach(() => {
      cy.intercept({
        method: 'GET',
        hostname: 'assets.adobedtm.com',
        path: /.*\/launch-.*/,
      }).as('adobeAnalytics')
      cy.visit('/en/personal-information-by-benefit', { retryOnStatusCodeFailure: true, timeout: 60000 })
    })

    it('Profile has no detectable a11y violations on load', () => {
      cy.injectAxe()
      cy.checkA11y()
    })

    it('Validate Profile URL and Header in EN and FR', () => {
      cy.url().should('contains', '/personal-information-by-benefit')
      cy.get('#profile-heading').should('be.visible').and('have.text', 'Personal information by benefit')
      cy.changeLang().should('have.text', 'English')
      cy.url().should('contains', '/fr/renseignements-personnels-par-prestation')
      cy.get('#profile-heading').should('be.visible').and('have.text', 'Renseignements personnels par prestation')
    })

    it('validate the breadcrumbs are present on Profile page', () => {
      cy.get('[data-cy="breadcrumb-My dashboard"]')
        .should('be.visible')
        .and('have.text', 'My dashboard')
        .and('have.attr', 'href', '/en/my-dashboard')
      cy.changeLang().should('have.text', 'English')
      cy.url().should('contains', '/fr/renseignements-personnels-par-prestation')
      cy.get('[data-cy="breadcrumb-Mon tableau de bord"]')
        .should('be.visible')
        .and('have.text', 'Mon tableau de bord')
        .and('have.attr', 'href', '/fr/mon-tableau-de-bord')
    })

    // TODO: Move this test into profile and preferences
    // it('validate the menu navigates to Profile page from Dashboard EN', () => {
    //   cy.visit('/my-dashboard')
    //   cy.get('[data-testid="menuButton"]').click()
    //   cy.get(':nth-child(2) > .border-t-2').click()
    //   cy.url().should('contains', '/en/personal-information-by-benefit')
    // })

    // TODO: Move this test into profile and preferences
    // it('validate the menu navigates to Profile page from Dashboard FR', () => {
    //   cy.visit('/my-dashboard')
    //   cy.changeLang().should('have.text', 'English')
    //   cy.url().should('contains', '/fr/mon-tableau-de-bord')
    //   cy.get('[data-testid="menuButton"]').click()
    //   cy.get(':nth-child(2) > .border-t-2').click()
    //   cy.url().should('contains', '/fr/renseignements-personnels-par-prestation')
    // })

    it('Validate the titles and links on the page EN', () => {
      cy.get(':nth-child(1) > [data-cy="program-title"]')
        .should('be.visible')
        .and('contain.text', 'Employment Insurance')
      cy.get(':nth-child(2) > [data-cy="program-title"]')
        .should('be.visible')
        .and('contain.text', 'Canada Pension Plan')
      cy.get(':nth-child(3) > [data-cy="program-title"]')
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
      cy.url().should('contains', '/fr/renseignements-personnels-par-prestation')
      cy.get(':nth-child(1) > [data-cy="program-title"]')
        .should('be.visible')
        .and('contain.text', 'Assurance-emploi')
      cy.get(':nth-child(2) > [data-cy="program-title"]')
        .should('be.visible')
        .and('contain.text', 'Régime de pensions du Canada')
      cy.get(':nth-child(3) > [data-cy="program-title"]')
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
}