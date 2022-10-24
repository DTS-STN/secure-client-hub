/// <reference types="cypress" />
const profilePo = require('../PageObjects/profilePO.cy')

function dashboardHeader() {
  return cy.get('#my-dashboard-heading')
}

function FrenchButton() {
  return cy.get('#lang1')
}

function FirstCard() {
  return cy.get('#myDashboardContent:nth-child(1) > div')
}

function CardHeading() {
  return cy.get('#myDashboardContent:nth-child(1)>div>h2')
}

function CardButton() {
  return cy.get('#myDashboardContent > div:nth-child(2)>button')
}

function ExpandedCard() {
  return cy.get('[data-cy="viewMoreLessButton"]')
}

function CardsButton() {
  return cy.get('#myDashboardContent').find('div>button')
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
  cy.url().should('contains', '/my-dashboard')
}

function ValidateDashboardHeaderEN() {
  dashboardHeader().should('be.visible').and('have.text', 'My dashboard')
}

function ValidateDashboardUrlFR() {
  cy.url().should('contains', '/fr/my-dashboard')
}

function ValidateDashboardHeaderFR() {
  dashboardHeader().should('be.visible').and('have.text', 'Mon tableau de bord')
}

function AllCardTaskSection(sectionName) {
  CardsButton().each(($el, index, $list) => {
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

function Cards() {
  return cy.get('#myDashboardContent >div')
}

function ValidateCardTaskListAndSection(CardName, SectionName, NumberOfLinks) {
  Cards().each(($el, index, $list) => {
    const cardHeader = $el.find('h2')
    if (cardHeader.text() === CardName) {
      cy.wrap($el).find('button').click()
      cy.wait(1000)
    }
  })

  Section().each(($el1, index, $list) => {
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

function ValidateMostRequestedsection(CardName, SectionName, NumberOfLinks) {
  Cards().each(($el, index, $list) => {
    const cardHeader = $el.find('h2')
    if (cardHeader.text() === CardName) {
      cy.wrap($el).find('button').click()
      cy.wait(1000)
    }
  })
  profilePo.MostReq().each(($el1, index, $list) => {
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

function Eachsectionheading() {
  return cy.get('[data-cy ="task-group-list"]')
}

function Section() {
  return cy.get('[data-cy ="Task"]>div')
}

module.exports = {
  dashboardHeader,
  FrenchButton,
  FirstCard,
  CardHeading,
  CardButton,
  ExpandedCard,
  Cards,
  CardsButton,
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
  ValidateMostRequestedsection,
  ValidateCardTaskListAndSection,
  AllCardTaskSection,
  Eachsectionheading,
  Section,
}
