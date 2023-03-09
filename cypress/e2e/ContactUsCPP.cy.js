/// <reference types="cypress" />
const contactUsPo = require('../e2e/PageObjects/ContactUsPO.cy')
const dashboardPo = require('../e2e/PageObjects/dashboardPO.cy')
const securityPo = require('../e2e/PageObjects/securitySettingsPO.cy')
const CPPcontactUs = require('../e2e/PageObjects/CPPContactUsPO.cy')

beforeEach(() => {
  cy.visit('/contact-us/contact-canada-pension-plan')
})

describe('Validate CPP Contact Us Landing page', () => {
  it('Validate CPP Contact us URL and header in EN', () => {
    CPPcontactUs.ValidateCPPContactUsUrl()
    CPPcontactUs.ValidateCPPContactUsHeaderEN()
  })

  it('Validate CPP Contact us URL and header in FR', () => {
    dashboardPo.FrenchButton().click()
    CPPcontactUs.ValidateCPPContactUsUrlFR()
    CPPcontactUs.ValidateCPPContactUsHeaderFR()
  })

  it('Validate the breadcrumbs on CPP contact us Page', () => {
    securityPo.breadcrumbsLink1().should('be.visible')
    securityPo.breadcrumbsLink2().should('be.visible')
    securityPo.breadcrumbsLink1().click()
    dashboardPo.ValidateDashboardUrl()
    cy.go('back')
    securityPo.breadcrumbsLink2().click()
    contactUsPo.ValidateContactUsUrl()
  })

  it('Validate the "On this Page" section', () => {
    CPPcontactUs.ValidateOnthisPageLinks()
  })

  it('Validate Table of Content Links on CPP contact Us page', () => {
    CPPcontactUs.ValidateEachtableOfContentLink()
  })

  it('Validate each section on CPP contact Us page', () => {
    CPPcontactUs.ValidateEachSectionCPPContactUs()
  })

  // it('Validate Mail section on CPP contact Us page', () => {
  //   CPPcontactUs.ValidateMailCardsOASContactUs()
  // })

  it('Validate each section content on CPP contact Us page', () => {
    CPPcontactUs.ValidateEachSectionContent()
  })
})
