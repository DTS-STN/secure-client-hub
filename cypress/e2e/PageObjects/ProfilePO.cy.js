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
  return cy.get('.pb-12 >div>div')
}

function MostReqheading() {
  return cy.get('.pb-12 >div')
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

  Eachsectionheading().each(($el1, index, $list) => {
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

function ValidateMostRequestedsection(CardName, NumberOfLinks) {
  Cards().each(($el, index, $list) => {
    const cardHeader = $el.find('h2')
    if (cardHeader.text() === CardName) {
      cy.wrap($el).find('button').click()
      cy.wait(1000)
    }
  })
  MostReqheading().each(($el1, index, $list) => {
    const header = $el1.find('h3')
    if (header.text() === 'Most requested') {
      cy.wrap($el1).find('ul').should('be.visible')
      cy.wrap($el1)
        .find('ul>li>a')
        .should('have.length', NumberOfLinks)
        .and('not.have.length', 0)
        .and('not.have.attr', 'href', '#undefined')
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
  ValidateCardTaskListAndSection,
  MostReqheading,
  ValidateMostRequestedsection,
}
