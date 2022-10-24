/// <reference types="cypress" />

function dashboardHeader() {
  return cy.get('#my-dashboard-heading')
}

function FrenchButton() {
  return cy.get('#lang1')
}

function FirstCard() {
  return cy.get('#homeContent:nth-child(1) > div')
}

function CardHeading() {
  return cy.get('#homeContent:nth-child(1)>div>h2')
}

function CardButton() {
  return cy.get('#homeContent > div:nth-child(2)>button')
}

function ExpandedCard() {
  return cy
    .get('[data-cy="viewMoreLessButton"]')
    .should('have.attr', 'aria-expanded', 'true')
}

function Cards() {
  return cy.get('#homeContent').find('div>button')
}

function MostRequestedSection() {
  return cy.get('[data-cy="most-requested"]')
}

function MostRequestedSectionHeading() {
  return cy.get('[data-cy="most-requested"]')
}

function MostRequestedSectionLinks() {
  return cy.get('div:nth-child(1)>div>ul')
}

function Menu() {
  return cy.get('#dropdownNavbarLink')
}

function SecuritySettingsMenu() {
  return cy.get('#dropdownNavbar > li:nth-child(2) > a')
}

function ProfileMenu() {
  return cy.get('#dropdownNavbar > li:nth-child(3) > a')
}

function ValidateDashboardUrl() {
  cy.url().should('contains', '/home')
}

function ValidateDashboardHeaderEN() {
  dashboardHeader().should('be.visible').and('have.text', 'My dashboard')
}

function ValidateDashboardUrlFR() {
  cy.url().should('contains', '/fr/home')
}

function ValidateDashboardHeaderFR() {
  dashboardHeader().should('be.visible').and('have.text', 'Mon tableau de bord')
}

module.exports = {
  dashboardHeader,
  FrenchButton,
  FirstCard,
  CardHeading,
  CardButton,
  ExpandedCard,
  Cards,
  MostRequestedSection,
  MostRequestedSectionLinks,
  MostRequestedSectionHeading,
  Menu,
  SecuritySettingsMenu,
  ProfileMenu,
  ValidateDashboardUrl,
  ValidateDashboardUrlFR,
  ValidateDashboardHeaderFR,
  ValidateDashboardHeaderEN,
}
