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

function ProfileHeader() {
  return cy.get('[data-testid ="profileContent-test"]>h1')
}

function ProfileHeaderEN() {
  ProfileHeader().should('be.visible').and('have.text', 'Profile')
}

function ProfileUrlFR() {
  cy.url().should('contains', '/fr/profil')
}
function ProfileUrlEN() {
  cy.url().should('contains', '/profile')
}
function ProfileHeaderFR() {
  ProfileHeader().should('be.visible').and('have.text', 'Profil')
}

function Section() {
  return cy.get('[data-cy ="task-list"]')
}

function ClickonTaskLinks() {
  return cy
    .get("[data-cy='task-list']")
    .find('a')
    .each(($el1, index, $list) => {
      cy.wrap($el1).click()
      ExitBeta().should('be.visible')
      StayOnBetabutton().click()
      cy.wrap($el1).click()
      ExitBeta().should('be.visible')
      CloseModalButton().click()
    })
}

function ExitBeta() {
  return cy.get("[data-cy ='exitBeta']")
}

function StayOnBetabutton() {
  return cy.get("[id ='stay-on-beta-version']")
}

function ExitBetaButton() {
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
  MostReqheading,
  ProfileHeaderEN,
  ProfileHeaderFR,
  ProfileUrlFR,
  ProfileUrlEN,
  MostReq,
  ProfileHeader,
  Section,
  ClickonTaskLinks,
  ExitBeta,
  StayOnBetabutton,
  ExitBetaButton,
  CloseModalButton,
}
