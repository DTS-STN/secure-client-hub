/// <reference types="cypress" />

function ContactUsHeader() {
  //return cy.get('')
}

function ValidateContactUsUrl() {
  //Will add details
  cy.url().should('contains', '/')
}

module.exports = {
  ContactUsHeader,
  ValidateContactUsUrl,
}
