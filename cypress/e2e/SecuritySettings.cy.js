/// <reference types="cypress" />
const dashboardPo = require('../e2e/PageObjects/dashboardPO.cy')
const securityPo = require('../e2e/PageObjects/securitySettingsPO.cy')
const profilePo = require('../e2e/PageObjects/ProfilePO.cy')

beforeEach(() => {
  cy.visit('/security')
})

describe('Validate Security Settings page', () => {
  it('Validate Security Settings Page header in English', () => {
    securityPo
      .pageHeader()
      .should('be.visible')
      .and('have.text', 'Security Settings')
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
      .and('have.text', 'Security Settings')
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

  it('Validate that the "Looking for" section is present on Security Settings Page', () => {
    profilePo.LookingFor().should('be.visible')
    securityPo.LookingForProfileLink().should('be.visible')
    profilePo.BackToDashboardButton().should('be.visible')
  })

  it('Validate the "Back to Dashboard" click navigates to dashboard page', () => {
    profilePo.BackToDashboardButton().click()
    cy.url().should('contains', '/home')
    dashboardPo.dashboardHeader().should('have.text', 'My dashboard')
  })

  it('Validate the "Profile" click navigates to Profile Page', () => {
    securityPo.LookingForProfileLink().click()
    cy.url().should('contains', '/profile')
    dashboardPo.dashboardHeader().should('have.text', 'Profile')
  })

  it('Validate the "Looking for Profile Settings" and button text text in English', () => {
    profilePo.LookingFor().should('have.text', 'Looking for profile settings?')
    profilePo
      .BackToDashboardButton()
      .should('have.text', 'Back to my Dashboard')
  })

  it('Validate the "Looking for Profile Settings text" and button text in French', () => {
    dashboardPo.FrenchButton().click()
    profilePo
      .LookingFor()
      .should('have.text', 'Vous recherchez les paramètres de votre profil?')
    profilePo
      .BackToDashboardButton()
      .should('have.text', 'Retour à mon tableau de bord')
  })

  it.skip('Validate the "Vous recherchez les paramètres de sécurité?" click navigates to /fr/security Page', () => {
    dashboardPo.FrenchButton().click()
    securityPo.LookingForProfileLink().click()
    cy.url().should('contains', '/fr/security')
    dashboardPo.dashboardHeader().should('have.text', 'Paramètres de sécurité')
  })

  it('Validate the "Retour à mon tableau de bord" click navigates to /fr/home Page', () => {
    dashboardPo.FrenchButton().click()
    profilePo.BackToDashboardButton().click()
    cy.url().should('contains', '/fr/home')
    dashboardPo.dashboardHeader().should('have.text', 'Mon tableau de bord')
  })
})
