/// <reference types="cypress" />
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
    cy.visit('/home')
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
    dashboardPo.FirstCard().should('be.visible')
  })

  it('Validate that the Card Header is visible on profile page', () => {
    dashboardPo.CardHeading().should('be.visible')
  })

  it('Validate that the Test card button on profile page expands and collapses on clicking', () => {
    dashboardPo.CardButton().should('be.visible')
    dashboardPo.CardButton().click()
    dashboardPo.ExpandedCard().should('be.visible')
    dashboardPo.CardButton().click({ force: true })
    dashboardPo.ExpandedCard().should('not.exist')
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
    cy.wait(2000)
    profilePo.LookingForSecurityLink().click()
    cy.url().should('contains', '/security')
    dashboardPo.dashboardHeader().should('have.text', 'Security Settings')
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

  it('Validate the "Vous recherchez les paramètres de sécurité?" click navigates to /fr/security Page', () => {
    dashboardPo.FrenchButton().click()
    cy.wait(2000)
    profilePo.LookingForSecurityLinkFrench().click()
    cy.url().should('contains', '/fr/security')
    dashboardPo.dashboardHeader().should('have.text', 'Paramètres de sécurité')
  })

  it('Validate the "Retour à mon tableau de bord" click navigates to /fr/home Page', () => {
    dashboardPo.FrenchButton().click()
    profilePo.BackToDashboardButton().click()
    cy.url().should('contains', '/fr/home')
    dashboardPo.dashboardHeader().should('have.text', 'Mon tableau de bord')
  })

  it('Validate that the Task List is Present for each card on profile page', () => {
    dashboardPo.Cards().each(($el, index, $list) => {
      cy.wrap($el).click()
      dashboardPo.ExpandedCard().should('be.visible')
    })
  })

  it('Validate that each card has a "Most Requested" section', () => {
    profilePo.AllCardTaskSection('Most requested')
  })

  it('Validate that each card has a "Application" section', () => {
    profilePo.AllCardTaskSection('Applications')
  })
})
