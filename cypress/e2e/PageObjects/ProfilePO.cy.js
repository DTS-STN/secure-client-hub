/// <reference types="cypress" />
/// <reference types="cypress" />

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
  return cy.get('[data-cy ="viewMoreLessButton"]')
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
function ProfileHeader() {
  return cy.get('[data-testid ="profileContent-test"]>h1')
}

function ValidateCardTaskListAndSection(CardName, NumberOfLinks) {
  Cards().each(($el, index, $list) => {
    const cardHeader = $el.find('h2')
    if (cardHeader.text() === CardName) {
      cy.wrap($el).find('button').click()
      cy.wait(500)
    }
  })
  Section()
    .find('a')
    .should('have.length', NumberOfLinks)
    .and('not.have.length', 0)
    .and('not.have.attr', 'href', '#undefined')
}

function ProfileHeaderEN() {
  ProfileHeader().should('be.visible').and('have.text', 'Profile')
}

function ProfileUrlFR() {
  cy.url().should('contains', '/fr/profile')
}
function ProfileUrlEN() {
  cy.url().should('contains', '/profile')
}
function ProfileHeaderFR() {
  ProfileHeader().should('be.visible').and('have.text', 'Profil')
}

function FirstCard() {
  return cy.get('#homeContent > div')
}
function CardHeading() {
  return cy.get('[data-cy="cards"]>h2')
}
function CardButton() {
  return cy.get('[data-cy="viewMoreLessButton"]')
}
function Section() {
  return cy.get('[data-cy ="task-list"]')
}

function ClickAllCardButtons() {
  CardButton().each(($el, index, $list) => {
    cy.wrap($el).click()
    //cy.wait(200)
  })
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

function ClickonTaskLinks() {
  return cy
    .get("[data-cy='task-list']")
    .find('a')
    .each(($el1, index, $list) => {
      cy.wrap($el1).click()
      ExitBetaModal().should('be.visible')
      StayOnBetabutton().click()
      cy.wrap($el1).click()
      ExitBetaModal().should('be.visible')
      CloseModalButton().click()
    })
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
  ProfileHeader,
  Section,
  ClickAllCardButtons,
  ExpandCard,
  ClickonTaskLinks,
  ExitBetaModal,
  StayOnBetabutton,
  ExitBetaModalButton,
  CloseModalButton,
}
