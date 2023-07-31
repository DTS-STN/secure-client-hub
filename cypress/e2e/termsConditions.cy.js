/// <reference types="cypress" />
const dashboardPo = require('../e2e/PageObjects/dashboardPO.cy')
const termsConditionsPo = require('../e2e/PageObjects/termsAndConditionsPO.cy')
const profilePo = require('../e2e/PageObjects/ProfilePO.cy')
const securityPo = require('../e2e/PageObjects/securitySettingsPO.cy')

beforeEach(() => {
  cy.visit('/privacy-notice-terms-conditions')
})

it.only('Dashboard has no detectable a11y violations on load', () => {
  cy.injectAxe()
  cy.checkA11y()
})

describe('Validate Terms and Conditions Page', () => {
  it('validate the "Terms and Conditions" click on dashboard page goes to Terms and Conditions page', () => {
    cy.visit('/my-dashboard')
    dashboardPo.TermsAndConditionsLink().click()
    termsConditionsPo.ValidateTermsAndConditionsUrl()
  })

  it('Validate "Terms and Conditions" URL and header in EN', () => {
    termsConditionsPo.ValidateTermsAndConditionsUrl()
    termsConditionsPo.ValidateTermsConditionsHeaderEN()
  })

  it('Validate"Terms and Conditions" and header in FR', () => {
    dashboardPo.FrenchButton().click()
    termsConditionsPo.ValidateTermsConditionsUrlFR()
    termsConditionsPo.ValidateTermsConditionsHeaderFR()
  })

  it('Validate the breadcrumbs on "Terms and Conditions" Page', () => {
    securityPo.breadcrumbsLink1().should('be.visible')
    securityPo.breadcrumbsLink1().click()
    dashboardPo.ValidateDashboardUrl()
    cy.go('back')
    termsConditionsPo.ValidateTermsAndConditionsUrl()
    termsConditionsPo.ValidateTermsConditionsHeaderEN()
  })

  it('Validate the "Back to Dashboard" click navigates to dashboard page', () => {
    profilePo.BackToDashboardButton().click()
    dashboardPo.ValidateDashboardUrl()
    dashboardPo.ValidateDashboardHeaderEN()
  })

  it('Validate the Information section is present on Terms and conditions page', () => {
    termsConditionsPo.ValidateinformationSection()
  })
})
