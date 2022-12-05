/// <reference types="cypress" />

function ContactUsHeader() {
  //return cy.get('')
}

function ValidateContactUsUrl() {
  cy.url().should('contains', '/')
}

function ValidateContactUsHeaderEN() {
  ContactUsHeader().should('be.visible').and('have.text', 'Contact us')
}

function ValidateContactUsUrlFR() {
  cy.url().should('contains', '/fr/')
}

function ValidateContactUsHeaderFR() {
  ContactUsHeader().should('be.visible').and('have.text', '')
}

module.exports = {
  ContactUsHeader,
  ValidateContactUsUrl,
  ValidateContactUsHeaderEN,
  ValidateContactUsUrlFR,
  ValidateContactUsHeaderFR,
}
