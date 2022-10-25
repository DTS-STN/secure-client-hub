/// <reference types="cypress" />
const dashboardPo = require('../PageObjects/dashboardPO.cy')

function pageHeader() {
  return cy.get('#my-dashboard-heading')
}

function breadcrumbs() {
  return cy.get("[class='ds-container'] >nav>ul>li>a")
}

function breadcrumbsLink1() {
  return cy.get("[class='ds-container'] >nav>ul>li:nth-child(1)>a")
}

function breadcrumbsLink2() {
  return cy.get("[class='ds-container'] >nav>ul>li:nth-child(2)>a")
}

function LookingForProfileLink() {
  return cy.get('#link-for-profile')
}

function SecurityHeaderEN() {
  SecurityHeader().should('be.visible').and('have.text', 'Security settings')
}

function SecurityUrlFR() {
  cy.url().should('contains', '/fr/security')
}
function SecurityUrlEN() {
  cy.url().should('contains', '/security')
}
function SecurityHeaderFR() {
  SecurityHeader()
    .should('be.visible')
    .and('have.text', 'Paramètres de sécurité')
}

function SecurityHeader() {
  return cy.get('[data-testid ="securityContent-test"]>h1')
}

module.exports = {
  pageHeader,
  breadcrumbs,
  breadcrumbsLink1,
  breadcrumbsLink2,
  LookingForProfileLink,
  SecurityHeaderEN,
  SecurityUrlFR,
  SecurityUrlEN,
  SecurityHeaderFR,
  SecurityHeader,
}
