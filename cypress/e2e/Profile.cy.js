/// <reference types="cypress" />

const dashboardPo = require('../e2e/PageObjects/dashboardPO.cy')
const securityPo = require('../e2e/PageObjects/securitySettingsPO.cy')
const profilePo = require('../e2e/PageObjects/ProfilePO.cy')

beforeEach(() => {
  cy.visit('/profile')
})

describe('Validate Profile page', () => {
  it('Validate Profile Page header in English', () => {
    profilePo.ProfileUrlEN()
    profilePo.ProfileHeaderEN()
  })

  it('Validate Profile Page header in French', () => {
    dashboardPo.FrenchButton().click()
    profilePo.ProfileHeaderFR()
    profilePo.ProfileUrlFR()
  })

  it('validate the breadcrumbs are present on Profile page', () => {
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

  it('validate the "My dashboard" click on Profile page goes to dashboard page', () => {
    securityPo.breadcrumbs().click()
    dashboardPo.ValidateDashboardUrl()
    dashboardPo.ValidateDashboardHeaderEN()
  })

  it('validate that user is navigated to /fr/profile page from /fr/dashboard', () => {
    cy.visit('/my-dashboard')
    dashboardPo.FrenchButton().click()
    cy.get('#mainSiteNav').should('have.text', 'Mon dossier Service Canada')
    dashboardPo.Menu().click()
    dashboardPo.ProfileMenu().click()
    profilePo.ProfileUrlFR()
    profilePo.ProfileHeaderFR()
  })

  it('validate the "My dashboard" click from profile page goes to dashboard page', () => {
    securityPo.breadcrumbs().click()
    dashboardPo.ValidateDashboardUrl()
    dashboardPo.ValidateDashboardHeaderEN()
  })

  it('validate the "Mon tableau de bord" click goes from Profile to "/fr/home"page', () => {
    dashboardPo.FrenchButton().click()
    cy.get('#mainSiteNav').should('have.text', 'Mon dossier Service Canada')
    securityPo.breadcrumbs().click()
    dashboardPo.ValidateDashboardUrlFR()
    dashboardPo.ValidateDashboardHeaderFR()
  })

  it('Validate that the "Looking for" section is present on Profile Page', () => {
    profilePo.LookingFor().should('be.visible')
    profilePo.LookingForSecurityLink().should('be.visible')
    profilePo.BackToDashboardButton().should('be.visible')
  })

  it('Validate the "Back to Dashboard" click navigates to dashboard page', () => {
    profilePo.BackToDashboardButton().click()
    dashboardPo.ValidateDashboardUrl()
    dashboardPo.ValidateDashboardHeaderEN()
  })

  it('Validate the "Security Settings" click navigates to Security Settings Page', () => {
    cy.wait(3000)
    profilePo.LookingForSecurityLink().click({ froce: true })
    securityPo.SecurityUrlEN()
    securityPo.SecurityHeaderEN()
  })

  it('Validate the "Looking for Security Settings" and button text text in English', () => {
    profilePo.LookingFor().should('have.text', 'Looking for security settings?')
    profilePo
      .BackToDashboardButton()
      .should('have.text', 'Back to my dashboard')
  })

  it('Validate the "Looking for security Settings text" and button text in French', () => {
    dashboardPo.FrenchButton().click()
    profilePo
      .LookingFor()
      .should('have.text', 'Vous recherchez les paramètres de sécurité?')
    profilePo
      .BackToDashboardButton()
      .should('have.text', 'Retour à mon tableau de bord')
  })

  it('Validate the "Vous recherchez les paramètres de sécurité?" click navigates to /fr/parametres-securite Page', () => {
    dashboardPo.FrenchButton().click()
    cy.wait(2000)
    profilePo.LookingForSecurityLink().click()
    securityPo.SecurityUrlFR()
    securityPo.SecurityHeaderFR()
  })

  it('Validate the "Retour à mon tableau de bord" click navigates to /fr/home Page', () => {
    dashboardPo.FrenchButton().click()
    cy.get('#mainSiteNav').should('have.text', 'Mon dossier Service Canada')
    profilePo.BackToDashboardButton().click()
    dashboardPo.ValidateDashboardUrlFR()
    dashboardPo.ValidateDashboardHeaderFR()
  })

  it('Profile has no detectable a11y violations on load', () => {
    cy.injectAxe()
    cy.checkA11y()
  })
})
