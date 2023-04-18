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

function LookingForProfileLinkEn() {
  return cy.get('#link-for-profile')
}

function LookingForProfileLinkFR() {
  return cy.get('#link-for-profil')
}

function SecurityHeaderEN() {
  SecurityHeader().should('be.visible').and('have.text', 'Security settings')
}

function SecurityUrlFR() {
  cy.url().should('contains', '/fr/parametres-securite')
}
function SecurityUrlEN() {
  cy.url().should('contains', '/security-settings')
}
function SecurityHeaderFR() {
  SecurityHeader()
    .should('be.visible')
    .and('have.text', 'Paramètres de sécurité')
}

function SecurityHeader() {
  return cy.get('[data-testid ="securityContent-test"]>h1')
}

function SecurityQuestionsLink() {
  return cy.get('[data-cy ="securityQuestionsLink"]')
}

function EmploymentInsuranceCode() {
  return cy.get('[data-cy ="eiAccessCodeLink"]')
}

module.exports = {
  pageHeader,
  breadcrumbs,
  breadcrumbsLink1,
  breadcrumbsLink2,
  LookingForProfileLinkEn,
  LookingForProfileLinkFR,
  SecurityHeaderEN,
  SecurityUrlFR,
  SecurityUrlEN,
  SecurityHeaderFR,
  SecurityHeader,
  SecurityQuestionsLink,
  EmploymentInsuranceCode,
}
