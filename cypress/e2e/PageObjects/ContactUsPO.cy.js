/// <reference types="cypress" />

function ContactUsHeader() {
  return cy.get('[data-testid ="contactContent-test"]>h1')
}

function ValidateContactUsUrl() {
  cy.url().should('contains', '/contact-us')
}

function ValidateContactUsHeaderEN() {
  ContactUsHeader().should('be.visible').and('have.text', 'Contact us')
}

// function ValidateContactUsUrlFR() {
//   cy.url().should('contains', '/fr/contactez-nous')
// }

// function ValidateContactUsHeaderFR() {
//   ContactUsHeader().should('be.visible').and('have.text', 'Contactez-nous')
// }

function ValidateContactUsLinksNumber() {
  cy.get('[data-cy = "contact-task-list"]')
    .find('a')
    .should('be.visible')
    .and('have.length', '3')
    .and('not.have.length', 0)
    .and('not.have.attr', 'href', '#undefined')
}

function EmploymentInsuranceLink() {
  return cy.get('[data-cy="ei-contact-us"]')
}

module.exports = {
  ContactUsHeader,
  ValidateContactUsUrl,
  ValidateContactUsHeaderEN,
  ValidateContactUsUrlFR,
  ValidateContactUsHeaderFR,
  ValidateContactUsLinksNumber,
  EmploymentInsuranceLink,
}
