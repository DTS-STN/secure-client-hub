/// <reference types="cypress" />
const contactUsPo = require('../e2e/PageObjects/ContactUsPO.cy')
const dashboardPo = require('../e2e/PageObjects/dashboardPO.cy')

beforeEach(() => {
  cy.visit('/my-dashboard')
})

describe('Validate Contact Us Landing page', () => {
  it.skip('Validate Contact us URL and header in EN and FR', () => {
    //this is just a template for now
    dashboardPo.ContactUsFooterLink().click()
    contactUsPo.ValidateContactUsUrl()
    contactUsPo.ValidateContactUsHeaderEN()
    dashboardPo.FrenchButton().click()
    contactUsPo.ValidateContactUsUrlFR()
    contactUsPo.ValidateContactUsHeaderFR()
  })
})
