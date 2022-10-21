/// <reference types="cypress" />

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

module.exports = {
  pageHeader,
  breadcrumbs,
  breadcrumbsLink1,
  breadcrumbsLink2,
  LookingForProfileLink,
}

