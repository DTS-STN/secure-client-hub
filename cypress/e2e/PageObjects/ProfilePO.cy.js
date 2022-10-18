/// <reference types="cypress" />

function LookingFor() {
  return cy.get("[data-cy ='looking-for']")
}

function LookingForSecurityLink() {
  return cy.get('#link-for-securitysettings')
}

function LookingForSecurityLinkFrench() {
  return cy.get('#link-for-paramètresdesécurité')
}

function BackToDashboardButton() {
  return cy.get('#back-to-dashboard-button')
}

module.exports = {
  LookingFor,
  LookingForSecurityLink,
  LookingForSecurityLinkFrench,
  BackToDashboardButton,
}

