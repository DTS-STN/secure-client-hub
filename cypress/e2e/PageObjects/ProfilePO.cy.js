/// <reference types="cypress" />

function LookingFor() {
  return cy.get("[data-cy ='looking-for']")
}

function LookingForSecurityLink() {
  return cy.get('#link-for-securitysettings')
}

function LookingForSecurityLinkFrench() {
  return cy.get('#link-for-paramètresdesécurité')
}

function BackToDashboardButton() {
  return cy.get('#back-to-dashboard-button')
}

function Eachsectionheading() {
  return cy.get('.pb-12 >div>div>div')
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
    const header = $el1.find('h3')
    if (header.text() === sectionName) {
      cy.wrap($el1).find('ul').should('be.visible')
    }
  })
}

module.exports = {
  LookingFor,
  LookingForSecurityLink,
  LookingForSecurityLinkFrench,
  BackToDashboardButton,
  Eachsectionheading,
  Cards,
  AllCardTaskSection,
}
