/// <reference types="cypress" />
import ContactUsOASdata from '../../fixtures/ContactUsOASdata.json'

function OASContactUsHeader() {
  return cy.get('[data-cy ="oasContactUsContent"]>h1')
}

function ValidateOASContactUsUrl() {
  cy.url().should('contains', '/contact-us/contact-old-age-security')
}

function ValidateOASContactUsHeaderEN() {
  OASContactUsHeader()
    .should('be.visible')
    .and('have.text', 'Contact Old Age Security')
}

// function ValidateOASContactUsUrlFR() {
//   cy.url().should(
//     'contains',
//     '/fr/contactez-nous/communiquer-securite-vieillesse'
//   )
// }

function ValidateOASContactUsHeaderFR() {
  OASContactUsHeader()
    .should('be.visible')
    .and('have.text', 'Communiquer avec la Sécurité de la vieillesse')
}

function ValidateOnthisPageLinks() {
  return cy
    .get('[data-cy ="oasContactUsContent"]>section')
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
  cy.url().should('contains', 'oas-contact-telephone')
}

function ValidateTelephoneHeading() {
  cy.get('[name="oas-contact-telephone"]>h2').should('have.text', 'Telephone')
}

function ValidateTelephoneSectionContent() {
  return cy.get('[name ="oas-contact-telephone"]>div').should('be.visible')
}

function ValidateCallBackHeading() {
  cy.get('[name="oas-contact-callback"]>h2').should('have.text', 'Callback')
}

function ValidateCallbackSectionContent() {
  return cy.get('[name ="oas-contact-callback"]>div').should('be.visible')
}

function ValidateEachtableOfContentLink() {
  for (let i = 0; i < ContactUsOASdata.length; i++) {
    cy.get('[data-cy ="oasContactUsContent"]>section')
      .find('a')
      .each(($el1, index, $list) => {
        const linkText = $el1.find('span').text()

        if (linkText.includes(ContactUsOASdata[i].Link)) {
          cy.wrap($el1).should('have.attr', 'target', '_self').click()
          cy.url().should('contains', ContactUsOASdata[i].URL)
        }
      })
  }
}

function ValidateEachSectionOASContactUs() {
  cy.get('[data-cy="sections"]>div').each(($el2, index, $list) => {
    cy.wrap($el2).should('be.visible')
  })
}

function EachContactSection() {
  return cy.get('[data-cy="oasContactUsContent"]>div')
}

function ProvinceCard() {
  return cy.get('[data-cy="provinceCards"]')
}

function OASContactUsSections() {
  return cy.get('[data-cy="sections"]')
}

function ValidateEachSectionContent() {
  OASContactUsSections().each(($el1, index, $list) => {
    const sectionHeader = $el1.find('[data-cy="sectionHeader"]').text()
    for (let j = 0; j < ContactUsOASdata.length; j++) {
      if (sectionHeader.includes(ContactUsOASdata[j].Link)) {
        cy.wrap($el1).find('[data-cy="section1"]').should('be.visible')
        cy.wrap($el1).find('[data-cy="section2"]').should('be.visible')
        for (let i = 0; i < ContactUsOASdata[j].RowName.length; i++) {
          cy.wrap($el1)
            .find('[data-cy="section2"]')
            .should('include.text', ContactUsOASdata[j].RowName[i])
        }
      }
    }
  })
}

function ValidateMailCardsOASContactUs() {
  ProvinceCard().should('have.length', '13')
  ProvinceCard().each(($el1, index, $list) => {
    cy.wrap($el1).click()
    const ContactDetails = cy.wrap($el1).find('[data-cy="mailContactDetails"]')
    ContactDetails.should('be.visible')
    ContactDetails.find('[data-cy="column1"]').each(($el2, index, $list) => {
      cy.wrap($el2).should('be.visible').and('include.text', 'Service Canada')
    })
  })
}

module.exports = {
  OASContactUsHeader,
  ValidateOASContactUsUrl,
  ValidateOASContactUsHeaderEN,
  ValidateOASContactUsUrlFR,
  ValidateOASContactUsHeaderFR,
  ValidateOnthisPageLinks,
  ValidateTelephoneLink,
  ValidateTelephoneHeading,
  ValidateTelephoneSectionContent,
  ValidateCallBackHeading,
  ValidateCallbackSectionContent,
  ValidateEachtableOfContentLink,
  ValidateEachSectionOASContactUs,
  ValidateMailCardsOASContactUs,
  EachContactSection,
  ProvinceCard,
  OASContactUsSections,
  ValidateEachSectionContent,
}
