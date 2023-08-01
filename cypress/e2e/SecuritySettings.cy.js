/// <reference types="cypress" />
const dashboardPo = require('../e2e/PageObjects/dashboardPO.cy')
const securityPo = require('../e2e/PageObjects/securitySettingsPO.cy')
const profilePo = require('../e2e/PageObjects/ProfilePO.cy')

beforeEach(() => {
  cy.visit('/security-settings')
})

it('Security settings has no detectable a11y violations on load', () => {
  cy.injectAxe()
  cy.checkA11y()
})

describe('Validate Security Settings page', () => {
  it('Validate Security Settings Page header in English', () => {
    securityPo.SecurityHeaderEN()
  })

  it('Validate French button click goes to fr/Security-settings page', () => {
    dashboardPo.FrenchButton().click()
    securityPo.SecurityUrlFR()
  })

  it('Validate Security Settings Page header in French', () => {
    dashboardPo.FrenchButton().click()
    securityPo.SecurityHeaderFR()
  })

  it('Validate that user can select "Security settings" from Menu dropdown options', () => {
    cy.visit('/my-dashboard')
    dashboardPo.Menu().click()
    dashboardPo.SecuritySettingsMenu().click()
    securityPo.SecurityUrlEN()
    securityPo.SecurityHeaderEN()
  })

  it('validate that user is navigated to /fr/security-settings page from /fr/dashboard', () => {
    cy.visit('/my-dashboard')
    dashboardPo.FrenchButton().click()
    dashboardPo.Menu().click()
    dashboardPo.SecuritySettingsMenu().click()
    securityPo.SecurityUrlFR()
    securityPo.SecurityHeaderFR()
  })

  it('validate the "My dashboard" click goes to dashboard page', () => {
    securityPo.breadcrumbs().click()
    dashboardPo.ValidateDashboardUrl()
    dashboardPo.ValidateDashboardHeaderEN()
  })

  it('validate the "Mon tableau de bord" click goes from Security to "/fr/home"page', () => {
    dashboardPo.FrenchButton().click()
    securityPo.breadcrumbs().click()
    dashboardPo.ValidateDashboardUrlFR()
    dashboardPo.ValidateDashboardHeaderFR()
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
    securityPo.LookingForProfileLinkEn().should('be.visible')
    profilePo.BackToDashboardButton().should('be.visible')
  })

  it('Validate the "Back to Dashboard" click navigates to dashboard page', () => {
    profilePo.BackToDashboardButton().click()
    dashboardPo.ValidateDashboardUrl()
    dashboardPo.ValidateDashboardHeaderEN()
  })

  it('Validate the "Profile" click navigates to Profile Page', () => {
    securityPo.LookingForProfileLinkEn().click()
    profilePo.ProfileUrlEN()
    profilePo.ProfileHeaderEN()
  })

  it('Validate the "Looking for Profile Settings" and button text text in English', () => {
    profilePo.LookingFor().should('have.text', 'Looking for profile settings?')
    profilePo
      .BackToDashboardButton()
      .should('have.text', 'Back to my dashboard')
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

  it('Validate the "Vous recherchez les paramètres de sécurité?" click navigates to /fr/security-settings Page', () => {
    dashboardPo.FrenchButton().click()
    securityPo.LookingForProfileLinkFR().click()
    profilePo.ProfileUrlFR()
    profilePo.ProfileHeaderFR()
  })

  it('Validate the "Retour à mon tableau de bord" click navigates to /fr/home Page', () => {
    dashboardPo.FrenchButton().click()
    profilePo.BackToDashboardButton().click()
    dashboardPo.ValidateDashboardUrlFR()
    dashboardPo.ValidateDashboardHeaderFR()
  })

  it('Validate the "Security Questions" Link in English and French', () => {
    securityPo
      .SecurityQuestionsLink()
      .should('be.visible')
      .and('not.have.attr', 'href', '#undefined')
    dashboardPo.FrenchButton().click()
    securityPo
      .SecurityQuestionsLink()
      .should('be.visible')
      .and('not.have.attr', 'href', '#undefined')
  })

  it('Validate the "Employment Insurance access code" Link in English and French', () => {
    securityPo
      .EmploymentInsuranceCode()
      .should('be.visible')
      .and('not.have.attr', 'href', '#undefined')
    dashboardPo.FrenchButton().click()
    securityPo
      .EmploymentInsuranceCode()
      .should('be.visible')
      .and('not.have.attr', 'href', '#undefined')
  })
})
