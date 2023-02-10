/// <reference types="cypress" />
import ContactUsCPPdata from '../../fixtures/ContactUsCPPdata.json'

function CPPContactUsHeader() {
  return cy.get('[data-cy ="eIContactUsContent"]>h1')
}

function ValidateCPPContactUsUrl() {
  cy.url().should('contains', '/contact-us/contact-canada-pension-plan')
}

function ValidateCPPContactUsHeaderEN() {
  CPPContactUsHeader()
    .should('be.visible')
    .and('have.text', 'Contact Canada Pension Plan')
}

// function ValidateCPPContactUsUrlFR() {
//   cy.url().should(
//     'contains',
//     '/fr/contactez-nous/communiquer-regime-pensions-canada/'
//   )
// }

function ValidateCPPContactUsHeaderFR() {
  CPPContactUsHeader()
    .should('be.visible')
    .and('have.text', 'Communiquer avec le Régime de pensions du Canada')
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
  cy.url().should('contains', 'cpp-contact-telephone')
}

function ValidateTelephoneHeading() {
  cy.get('[name="oas-contact-telephone"]>h2').should('have.text', 'Telephone')
}

function ValidateTelephoneSectionContent() {
  return cy.get('[name ="cpp-contact-telephone"]>div').should('be.visible')
}

function ValidateCallBackHeading() {
  cy.get('[name="cpp-contact-callback"]>h2').should('have.text', 'Callback')
}

function ValidateCallbackSectionContent() {
  return cy.get('[name ="cpp-contact-callback"]>div').should('be.visible')
}

function ValidateEachtableOfContentLink() {
  for (let i = 0; i < ContactUsCPPdata.length; i++) {
    cy.get('[data-cy ="eIContactUsContent"]>section')
      .find('a')
      .each(($el1, index, $list) => {
        const linkText = $el1.find('span').text()

        if (linkText.includes(ContactUsCPPdata[i].Link)) {
          cy.wrap($el1).should('have.attr', 'target', '_self').click()
          cy.url().should('contains', ContactUsCPPdata[i].URL)
        }
      })
  }
}

function ValidateEachSectionCPPContactUs() {
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

function CPPContactUsSections() {
  return cy.get('[data-cy="sections"]')
}

function ValidateEachSectionContent() {
  CPPContactUsSections().each(($el1, index, $list) => {
    const sectionHeader = $el1.find('h2').text()
    for (let j = 0; j < ContactUsCPPdata.length; j++) {
      if (sectionHeader.includes(ContactUsCPPdata[j].Link)) {
        cy.wrap($el1).find('[data-cy="section1"]').should('be.visible')
        cy.wrap($el1).find('[data-cy="section2"]').should('be.visible')
        for (let i = 0; i < ContactUsCPPdata[j].RowName.length; i++) {
          cy.wrap($el1)
            .find('[data-cy="section2"]')
            .should('include.text', ContactUsCPPdata[j].RowName[i])
        }
      }
    }
  })
}

function ValidateMailCardsCPPContactUs() {
  ProvinceCard().should('have.length', '6')
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
  CPPContactUsHeader,
  ValidateCPPContactUsUrl,
  ValidateCPPContactUsHeaderEN,
  ValidateCPPContactUsUrlFR,
  ValidateCPPContactUsHeaderFR,
  ValidateOnthisPageLinks,
  ValidateTelephoneLink,
  ValidateTelephoneHeading,
  ValidateTelephoneSectionContent,
  ValidateCallBackHeading,
  ValidateCallbackSectionContent,
  ValidateEachtableOfContentLink,
  ValidateEachSectionCPPContactUs,
  ValidateMailCardsCPPContactUs,
  EachContactSection,
  ProvinceCard,
  CPPContactUsSections,
  ValidateEachSectionContent,
}
