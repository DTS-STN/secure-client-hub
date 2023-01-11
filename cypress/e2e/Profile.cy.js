/// <reference types="cypress" />
/// <reference types="cypress" />

const dashboardPo = require('../e2e/PageObjects/dashboardPO.cy')
const securityPo = require('../e2e/PageObjects/securitySettingsPO.cy')
const profilePo = require('../e2e/PageObjects/ProfilePO.cy')
import dashboardData from '../../cypress/fixtures/dashboardData.json'

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
    securityPo.breadcrumbs().click()
    dashboardPo.ValidateDashboardUrlFR()
    dashboardPo.ValidateDashboardHeaderFR()
  })

  it('Validate that the Card placeholder is present on Profile Page', () => {
    profilePo.FirstCard().should('be.visible')
  })

  it('Validate that the Card Header is visible on profile page', () => {
    profilePo.CardHeading().should('be.visible')
  })

  it('Validate that the Test card button on profile page expands and collapses on clicking', () => {
    profilePo.CardButton().should('be.visible')
    profilePo.ClickAllCardButtons()
    profilePo.FirstCard().should('be.visible')
    profilePo.Section().should('be.visible')
    profilePo.ClickAllCardButtons()
    profilePo.Section().should('not.exist')
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
      .should('have.text', 'Back to my Dashboard')
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

  it('Validate the "Vous recherchez les paramètres de sécurité?" click navigates to /fr/security-settings Page', () => {
    dashboardPo.FrenchButton().click()
    cy.wait(2000)
    profilePo.LookingForSecurityLink().click()
    securityPo.SecurityUrlFR()
    securityPo.SecurityHeaderFR()
  })

  it('Validate the "Retour à mon tableau de bord" click navigates to /fr/home Page', () => {
    dashboardPo.FrenchButton().click()
    profilePo.BackToDashboardButton().click()
    dashboardPo.ValidateDashboardUrlFR()
    dashboardPo.ValidateDashboardHeaderFR()
  })

  it('Validate that the Task List is Present for each card on profile page', () => {
    profilePo.Cards().each(($el, index, $list) => {
      cy.wrap($el).click()
      dashboardPo.ExpandedCard().should('be.visible')
    })
  })

  it('Validate the EI card in EN and FR', () => {
    profilePo.ValidateCardTaskListAndSection('Employment Insurance', '5')
    dashboardPo.FrenchButton().click()
    profilePo.ValidateCardTaskListAndSection('Assurance-emploi', '5')
  })

  it('Validate the CPP card in EN and FR', () => {
    profilePo.ValidateCardTaskListAndSection('Canada Pension Plan', '4')
    dashboardPo.FrenchButton().click()
    profilePo.ValidateCardTaskListAndSection(
      'Régime de pensions du Canada',
      '4'
    )
  })

  it('Validate the OAS card in EN and FR', () => {
    profilePo.ValidateCardTaskListAndSection('Old Age Security', '4')
    dashboardPo.FrenchButton().click()
    profilePo.ValidateCardTaskListAndSection('Sécurité de la vieillesse', '4')
  })

  it('Validate the "Exit Beta Version" modal and buttons for all links inside EI card', () => {
    profilePo.ExpandCard('Employment Insurance')
    profilePo.ClickonTaskLinks()
  })

  it('Validate the "Exit Beta Version" modal and buttons for all links inside CPP card', () => {
    profilePo.ExpandCard('Canada Pension Plan')
    profilePo.ClickonTaskLinks()
  })

  it('Validate the "Exit Beta Version" modal and buttons for all links inside OAS card', () => {
    profilePo.ExpandCard('Old Age Security')
    profilePo.ClickonTaskLinks()
  })
})
