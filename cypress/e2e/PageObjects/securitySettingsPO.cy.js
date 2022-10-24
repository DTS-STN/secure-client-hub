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
  dashboardPo
    .dashboardHeader()
    .should('be.visible')
    .and('have.text', 'Security Settings')
}

function SecurityUrlFR() {
  cy.url().should('contains', '/fr/security')
}
function SecurityUrlEN() {
  cy.url().should('contains', '/security')
}
function SecurityHeaderFR() {
  dashboardPo
    .dashboardHeader()
    .should('be.visible')
    .and('have.text', 'Paramètres de sécurité')
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
}
