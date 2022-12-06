/// <reference types="cypress" />
import ContactUsEIdata from '../../fixtures/ContactUsEIdata.json'

function EIContactUsHeader() {
  return cy.get('[data-cy ="eIContactUsContent"]>h1')
}

function ValidateEIContactUsUrl() {
  cy.url().should('contains', '/contact-employment-insurance')
}

function ValidateEIContactUsHeaderEN() {
  EIContactUsHeader()
    .should('be.visible')
    .and('have.text', 'Contact Employment Insurance')
}

function ValidateEIContactUsUrlFR() {
  cy.url().should('contains', '/fr/contact-employment-insurance')
}

function ValidateEIContactUsHeaderFR() {
  EIContactUsHeader()
    .should('be.visible')
    .and('have.text', "Communiquer avec l'assurance-emploi")
}

function ValidateOnthisPageLinks() {
  return cy
    .get('[data-cy ="eIContactUsContent"]>section')
    .find('a')
    .should('be.visible')
    .and('have.length', '4')
    .and('not.have.length', 0)
    .and('not.have.attr', 'href', '#undefined')
}

function ValidateTelephoneLink() {
  cy.get('[data-cy="tableLink1"]')
    .should('have.attr', 'target', '_self')
    .click()
  cy.url().should('contains', 'ei-contact-telephone')
}

function ValidateTelephoneHeading() {
  cy.get('[name="ei-contact-telephone"]>h2').should('have.text', 'Telephone')
}

function ValidateTelephoneSectionContent() {
  return cy.get('[name ="ei-contact-telephone"]>div').should('be.visible')
}

function ValidateCallBackHeading() {
  cy.get('[name="ei-contact-callback"]>h2').should('have.text', 'Callback')
}

function ValidateCallbackSectionContent() {
  return cy.get('[name ="ei-contact-callback"]>div').should('be.visible')
}

function ValidateEachtableOfContentLink() {
  for (let i = 0; i < ContactUsEIdata.length; i++) {
    const LinkName = ContactUsEIdata[i].Link
    cy.get('[data-cy ="eIContactUsContent"]>section')
      .find('a')
      .each(($el1, index, $list) => {
        const linkText = $el1.find('span').text()

        if (linkText.includes(ContactUsEIdata[i].Link)) {
          cy.wrap($el1).should('have.attr', 'target', '_self').click()
          cy.url().should('contains', ContactUsEIdata[i].URL)
        }
      })
  }
}

function ValidateEachSectionEIContactUs() {
  cy.get('[data-cy="sections"]>div').each(($el2, index, $list) => {
    cy.wrap($el2).should('be.visible')
  })
}

function EachContactSection() {
  return cy.get('[data-cy="eIContactUsContent"]>div')
}

function ProvinceCard() {
  return cy.get('[data-cy="provinceCards"]')
}

function ValidateMailCardsEIContactUs() {
  cy.get('[data-cy="provinceCards"]').each(($el1, index, $list) => {
    cy.wrap($el1).click()
    cy.wrap($el1).find('[data-cy="mailContactDetails"]').should('be.visible')
  })
}

module.exports = {
  EIContactUsHeader,
  ValidateEIContactUsUrl,
  ValidateEIContactUsHeaderEN,
  ValidateEIContactUsUrlFR,
  ValidateEIContactUsHeaderFR,
  ValidateOnthisPageLinks,
  ValidateTelephoneLink,
  ValidateTelephoneHeading,
  ValidateTelephoneSectionContent,
  ValidateCallBackHeading,
  ValidateCallbackSectionContent,
  ValidateEachtableOfContentLink,
  ValidateEachSectionEIContactUs,
  ValidateMailCardsEIContactUs,
  EachContactSection,
  ProvinceCard,
}
