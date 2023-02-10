/// <reference types="cypress" />
const contactUsPo = require('../e2e/PageObjects/ContactUsPO.cy')
const dashboardPo = require('../e2e/PageObjects/dashboardPO.cy')
const securityPo = require('../e2e/PageObjects/securitySettingsPO.cy')
const EIcontactUs = require('../e2e/PageObjects/EIContactUsPo.cy')
import ContactUsEIdata from '../fixtures/ContactUsEIdata.json'

beforeEach(() => {
  cy.visit('/contact-us/contact-employment-insurance')
})

describe('Validate EI Contact Us Landing page', () => {
  it('Validate EI Contact us URL and header in EN', () => {
    EIcontactUs.ValidateEIContactUsUrl()
    EIcontactUs.ValidateEIContactUsHeaderEN()
  })

  it.skip('Validate EI Contact us URL and header in FR', () => {
    // dashboardPo.FrenchButton().click()
    EIcontactUs.ValidateEIContactUsUrlFR()
    EIcontactUs.ValidateEIContactUsHeaderFR()
  })

  it('Validate the breadcrumbs on EI contact us Page', () => {
    securityPo.breadcrumbsLink1().should('be.visible')
    securityPo.breadcrumbsLink2().should('be.visible')
    securityPo.breadcrumbsLink1().click()
    dashboardPo.ValidateDashboardUrl()
    cy.go('back')
    securityPo.breadcrumbsLink2().click()
    contactUsPo.ValidateContactUsUrl()
  })

  it('Validate the "On this Page" section', () => {
    EIcontactUs.ValidateOnthisPageLinks()
  })

  it('Validate Table of Content Links on EI contact Us page', () => {
    EIcontactUs.ValidateEachtableOfContentLink()
  })

  it('Validate each section on EI contact Us page', () => {
    EIcontactUs.ValidateEachSectionEIContactUs()
  })

  it.skip('Validate Mail section on EI contact Us page', () => {
    EIcontactUs.ValidateMailCardsEIContactUs()
  })

  it('Validate Telephone section on EI contact Us page', () => {
    EIcontactUs.ValidateEachSectionContent()
  })
})
