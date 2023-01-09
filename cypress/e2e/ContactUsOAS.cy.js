/// <reference types="cypress" />
const contactUsPo = require('../e2e/PageObjects/ContactUsPO.cy')
const dashboardPo = require('../e2e/PageObjects/dashboardPO.cy')
const securityPo = require('../e2e/PageObjects/securitySettingsPO.cy')
const OAScontactUs = require('../e2e/PageObjects/OASContactUsPo.cy')
import ContactUsOASdata from '../fixtures/ContactUsOASdata.json'

beforeEach(() => {
  cy.visit('/contact-us/contact-old-age-security')
})

describe('Validate OAS Contact Us Landing page', () => {
  it('Validate OAS Contact us URL and header in EN', () => {
    OAScontactUs.ValidateOASContactUsUrl()
    OAScontactUs.ValidateOASContactUsHeaderEN()
  })

  it('Validate OAS Contact us URL and header in FR', () => {
    dashboardPo.FrenchButton().click()
    OAScontactUs.ValidateOASContactUsUrlFR()
    OAScontactUs.ValidateOASContactUsHeaderFR()
  })

  it('Validate the breadcrumbs on OAS contact us Page', () => {
    securityPo.breadcrumbsLink1().should('be.visible')
    securityPo.breadcrumbsLink1().should('be.visible')
    securityPo.breadcrumbsLink1().click()
    dashboardPo.ValidateDashboardUrl()
    cy.go('back')
    securityPo.breadcrumbsLink2().click()
    contactUsPo.ValidateContactUsUrl()
  })

  it('Validate the "On this Page" section', () => {
    OAScontactUs.ValidateOnthisPageLinks()
  })

  it('Validate Table of Content Links on OAS contact Us page', () => {
    OAScontactUs.ValidateEachtableOfContentLink()
  })

  it('Validate each section on OAS contact Us page', () => {
    OAScontactUs.ValidateEachSectionOASContactUs()
  })

  // it('Validate Mail section on OAS contact Us page', () => {
  //   OAScontactUs.ValidateMailCardsOASContactUs()
  // })

  it('Validate Telephone section on OAS contact Us page', () => {
    OAScontactUs.ValidateEachSectionContent()
  })
})
