/// <reference types="cypress" />

function termsConditionsHeader() {
  cy.get('[data-cy ="terms-conditions"]>h1')
}

function ValidateTermsAndConditionsUrl() {
  cy.url().should('contains', '/privacy-notice-terms-conditions')
}

function ValidateTermsConditionsHeaderEN() {
  termsConditionsHeader()
    .should('be.visible')
    .and('have.text', 'Privacy notice and terms and conditions')
}

function ValidateTermsConditionsUrlFR() {
  cy.url().should('contains', '/fr/avis-confidentialite-modalites')
}

function ValidateTermsConditionsHeaderFR() {
  termsConditionsHeader()
    .should('be.visible')
    .and('have.text', 'Avis de confidentialité et modalités')
}

function BackToDashboardButton() {
  termsConditionsHeader()
    .should('be.visible')
    .and('have.text', 'Avis de confidentialité et modalités')
}

function ValidateinformationSection() {
  cy.get('[data-cy="terms-conditions"]>div:nth-child(2)')
    .should('be.visible')
    .should('contains', 'Information')
}

module.exports = {
  ValidateTermsAndConditionsUrl,
  ValidateTermsConditionsHeaderEN,
  ValidateTermsConditionsUrlFR,
  ValidateTermsConditionsHeaderFR,
  termsConditionsHeader,
  ValidateinformationSection,
}
