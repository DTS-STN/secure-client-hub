/// <reference types="cypress" />

function Header() {
  return cy.get('[data-cy ="terms-conditions"]>h1')
}

function ValidateTermsAndConditionsUrl() {
  cy.url().should('contains', '/privacy-notice-terms-conditions')
}

function ValidateTermsConditionsHeaderEN() {
  Header()
    .should('be.visible')
    .and('have.text', 'Privacy notice and terms and conditions')
}

function ValidateTermsConditionsUrlFR() {
  cy.url().should('contains', '/fr/avis-confidentialite-modalites')
}

function ValidateTermsConditionsHeaderFR() {
  Header()
    .should('be.visible')
    .and('have.text', 'Avis de confidentialité et modalités')
}

function BackToDashboardButton() {
  Header()
    .should('be.visible')
    .and('have.text', 'Avis de confidentialité et modalités')
}

function ValidateinformationSection() {
  cy.get('[data-cy="terms-conditions"]').should('be.visible')
}

module.exports = {
  ValidateTermsAndConditionsUrl,
  ValidateTermsConditionsHeaderEN,
  ValidateTermsConditionsUrlFR,
  ValidateTermsConditionsHeaderFR,
  Header,
  ValidateinformationSection,
  BackToDashboardButton,
}
