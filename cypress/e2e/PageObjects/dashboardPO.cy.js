/// <reference types="cypress" />
const profilePo = require('../PageObjects/ProfilePO.cy')

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

function MostRequestedBlueSection() {
  return cy.get('[data-cy="most-requested-section"]')
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

function ExpandCard(CardName) {
  Cards().each(($el, index, $list) => {
    const cardHeader = $el.find('h2')
    if (cardHeader.text() === CardName) {
      cy.wrap($el).find('button').click()
      cy.wait(500)
    }
  })
}

function ValidateCardTaskListAndSection(SectionName, NumberOfLinks) {
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

function ValidateMostRequestedsection(SectionName, NumberOfLinks) {
  MostRequestedBlueSection().each(($el1, index, $list) => {
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
  return cy.get('[data-cy ="task-list"]>div')
}

function BetaBanner() {
  return cy.get('[data-cy ="topBanner"]')
}

function LearnMoreABtBetaLink() {
  return cy.get('[data-cy ="learnMoreAbtBeta"]')
}

function ExitBetaButton() {
  return cy.get("[data-cy ='topBanner']>button")
}

function FirstTaskLink() {
  return cy
    .get("[data-cy ='task-list']>div:nth-child(1)")
    .find('li:nth-child(1)>a:nth-child(1)')
}

function ExitBetaModal() {
  return cy.get("[data-cy ='exitBetaModal']")
}

function StayOnBetabutton() {
  return cy.get("[id ='modal-btn-close']")
}

function ExitBetaModalButton() {
  return cy.get("[id ='modal-btn-continue']")
}

function CloseModalButton() {
  return cy.get("[data-cy ='x-button']")
}

function validateExitBetaModalbuttonLink() {
  return cy
    .get("[data-cy ='cards']")
    .find('li>a')
    .each(($el1, index, $list) => {
      cy.wrap($el1).click()
      ExitBetaModal().should('be.visible')
      StayOnBetabutton().click()
      cy.wrap($el1).click()
      ExitBetaModal()
        .find('a')
        .should('have.length', '1')
        .and('not.have.length', 0)
        .and('not.have.attr', 'href', '#undefined')
      CloseModalButton().click()
    })
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
  MostRequestedBlueSection,
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
  ExpandCard,
  BetaBanner,
  LearnMoreABtBetaLink,
  ExitBetaButton,
  FirstTaskLink,
  ExitBetaModal,
  StayOnBetabutton,
  ExitBetaModalButton,
  CloseModalButton,
  validateExitBetaModalbuttonLink,
}
