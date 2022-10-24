/// <reference types="cypress" />
/// <reference types="cypress" />
const dashboardPo = require('../PageObjects/dashboardPO.cy')

function LookingFor() {
  return cy.get("[data-cy ='looking-for']")
}

function LookingForSecurityLink() {
  return cy.get("[data-cy ='access-security-page-link']")
}

function BackToDashboardButton() {
  return cy.get('#back-to-dashboard-button')
}

function Eachsectionheading() {
  return cy.get('[data-cy ="task-group-list"]')
}

function MostReqheading() {
  return cy.get('[data-cy ="most-requested"]')
}

function MostReq() {
  return cy.get('[data-cy ="most-requested-section"]>div')
}

function Cards() {
  return cy.get('#homeContent>div')
}

function AllCardTaskSection(sectionName) {
  Cards().each(($el, index, $list) => {
    cy.wrap($el).click()
    cy.wait(1000)
  })
  Eachsectionheading().each(($el1, index, $list) => {
    const header = $el1.find('div>h3')
    if (header.text() === sectionName) {
      cy.wrap($el1).find('ul').should('be.visible')
    }
  })
}

function ValidateCardTaskListAndSection(CardName, SectionName, NumberOfLinks) {
  Cards().each(($el, index, $list) => {
    const cardHeader = $el.find('h2')
    if (cardHeader.text() === CardName) {
      cy.wrap($el).find('button').click()
      cy.wait(1000)
    }
  })

  dashboardPo.Section().each(($el1, index, $list) => {
    const header = $el1.find('h3')
    if (header.text() === SectionName) {
      cy.wrap($el1).find('ul').should('be.visible')
      cy.wrap($el1)
        .find('ul>li>a')
        .should('have.length', NumberOfLinks)
        .and('not.have.length', 0)
        .and('not.have.attr', 'href', '#undefined')
    }
  })
}

function ProfileHeaderEN() {
  dashboardPo.dashboardHeader().should('be.visible').and('have.text', 'Profile')
}

function ProfileUrlFR() {
  cy.url().should('contains', '/fr/profile')
}
function ProfileUrlEN() {
  cy.url().should('contains', '/profile')
}
function ProfileHeaderFR() {
  dashboardPo.dashboardHeader().should('be.visible').and('have.text', 'Profil')
}

function FirstCard() {
  return cy.get('#homeContent > div')
}
function CardHeading() {
  return cy.get('[data-cy="Cards"]>h2')
}
function CardButton() {
  return cy.get('[data-cy="viewMoreLessButton"]')
}

module.exports = {
  LookingFor,
  LookingForSecurityLink,
  BackToDashboardButton,
  Eachsectionheading,
  Cards,
  AllCardTaskSection,
  ValidateCardTaskListAndSection,
  MostReqheading,
  ProfileHeaderEN,
  ProfileHeaderFR,
  ProfileUrlFR,
  ProfileUrlEN,
  FirstCard,
  CardHeading,
  CardButton,
  MostReq,
}
