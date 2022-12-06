/// <reference types="cypress" />
const contactUsPo = require('../e2e/PageObjects/ContactUsPO.cy')
const dashboardPo = require('../e2e/PageObjects/dashboardPO.cy')
const securityPo = require('../e2e/PageObjects/securitySettingsPO.cy')
const EIcontactUs = require('../e2e/PageObjects/EIContactUsPo.cy')

beforeEach(() => {
  cy.visit('/contact-us')
})

describe('Validate Contact Us Landing page', () => {
  it('Validate Contact us URL and header in EN and FR', () => {
    contactUsPo.ValidateContactUsUrl()
    contactUsPo.ValidateContactUsHeaderEN()
    dashboardPo.FrenchButton().click()
    contactUsPo.ValidateContactUsUrlFR()
    contactUsPo.ValidateContactUsHeaderFR()
  })

  it('Validate the links on Contact us page', () => {
    contactUsPo.ValidateContactUsLinksNumber()
  })

  it('validate the breadcrumbs are present on Contact us page', () => {
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

  it.skip('Validate the EI link navigates to EI Contact us page', () => {
    contactUsPo.EmploymentInsuranceLink().click()
    EIcontactUs.ValidateEIContactUsUrl()
  })
})
