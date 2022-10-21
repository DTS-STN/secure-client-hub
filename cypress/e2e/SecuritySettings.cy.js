/// <reference types="cypress" />
const dashboardPo = require('../e2e/PageObjects/dashboardPO.cy')
const securityPo = require('../e2e/PageObjects/securitySettingsPO.cy')

beforeEach(() => {
  cy.visit('/security')
})

describe('Validate Security Settings page', () => {
  it('Validate Security Settings Page header in English', () => {
    securityPo
      .pageHeader()
      .should('be.visible')
      .and('have.text', 'Security settings')
  })

  it('Validate French button click goes to fr/Security page', () => {
    dashboardPo.FrenchButton().click()
    cy.url().should('contains', '/fr/security')
  })

  it('Validate Security Settings Page header in French', () => {
    dashboardPo.FrenchButton().click()
    securityPo
      .pageHeader()
      .should('be.visible')
      .and('have.text', 'Paramètres de sécurité')
  })

  it('Validate that user can select "Security settings" from Menu dropdown options', () => {
    cy.visit('/home')
    dashboardPo.Menu().click()
    dashboardPo.SecuritySettingsMenu().click()
    cy.url().should('contains', '/security')
    securityPo
      .pageHeader()
      .should('be.visible')
      .and('have.text', 'Security settings')
  })

  it('validate the breadcrumbs are present on Security settings page', () => {
    securityPo.breadcrumbs().should('be.visible')
  })

  it('validate that user is navigated to /fr/security page from /fr/dashboard', () => {
    cy.visit('/home')
    dashboardPo.FrenchButton().click()
    dashboardPo.Menu().click()
    dashboardPo.SecuritySettingsMenu().click()
    cy.url().should('contains', '/fr/security')
    securityPo
      .pageHeader()
      .should('be.visible')
      .and('have.text', 'Paramètres de sécurité')
  })

  it('validate the "My dashboard" click goes to dashboard page', () => {
    securityPo.breadcrumbs().click()
    cy.url().should('contains', '/home')
    dashboardPo
      .dashboardHeader()
      .should('be.visible')
      .and('have.text', 'My dashboard')
  })

  it('validate the "Mon tableau de bord" click goes from Security to "/fr/home"page', () => {
    dashboardPo.FrenchButton().click()
    securityPo.breadcrumbs().click()
    cy.url().should('contains', '/fr/home')
    dashboardPo
      .dashboardHeader()
      .should('be.visible')
      .and('have.text', 'Mon tableau de bord')
  })

  it('validate the breadcrumbs are present on Security settings page', () => {
    securityPo
      .breadcrumbs()
      .should('be.visible')
      .and('have.text', 'My dashboard')
    dashboardPo.FrenchButton().click()
    securityPo
      .breadcrumbs()
      .should('be.visible')
      .and('have.text', 'Mon tableau de bord')
  })
})
