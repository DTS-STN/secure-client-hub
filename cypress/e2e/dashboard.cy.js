/// <reference types="cypress" />
const dashboardPo = require('../e2e/PageObjects/dashboardPO.cy')
const securityPo = require('../e2e/PageObjects/securitySettingsPO.cy')
import dashboardData from '../../cypress/fixtures/dashboardData.json'

beforeEach(() => {
  cy.visit('/my-dashboard')
})

describe('Validate dashboard page', () => {
  it.skip('Validate dashboard header', () => {
    dashboardPo.ValidateDashboardUrl()
    dashboardPo.ValidateDashboardHeaderEN()
  })

  it.skip('French button click goes to fr/dashboard page', () => {
    dashboardPo.FrenchButton().click()
    //cy.wait(2000)
    dashboardPo.ValidateDashboardUrlFR()
  })

  it.skip('Validate dashboard header in French', () => {
    dashboardPo.FrenchButton().click()
    cy.wait(3000)
    dashboardPo.ValidateDashboardHeaderFR()
  })

  it.skip('Validate that the Card placeholder is present', () => {
    dashboardPo.FirstCard().should('be.visible')
  })

  it.skip('Validate that the Card Header is visible', () => {
    dashboardPo.CardHeading().should('be.visible')
  })

  it.skip('Validate that the Test card button expands and collapses on clicking', () => {
    dashboardPo.CardButton().should('be.visible')
    dashboardPo.CardButton().click()
    dashboardPo.ExpandedCard().should('be.visible')
    dashboardPo.CardButton().click({ force: true })
  })

  it.skip('Validate that the Task List is Present for each card on dashboard page', () => {
    dashboardPo.Cards().each(($el, index, $list) => {
      cy.wrap($el).click()
      dashboardPo.ExpandedCard().should('be.visible')
    })
  })

  it.skip('validate the "My dashboard" page doesnt have breadcrumbs', () => {
    securityPo.breadcrumbs().should('not.exist')
  })

  it.skip('Validate the EI,CPP and OAS card sections in EN', () => {
    for (let i = 0; i < dashboardPo.getcardNumber(); i++) {
      const CardName = dashboardData[i].CardNameEN
      dashboardPo.ExpandCard(CardName)
      dashboardData[i].Section.forEach((section) => {
        dashboardPo.ValidateCardTaskListAndSection(
          section.sectionNameEN,
          section.NumberOfLinks
        )
      })
      dashboardPo.ExpandCard(CardName)
    }
  })

  it.skip('Validate the EI,CPP and OAS card sections in FR', () => {
    dashboardPo.FrenchButton().click()
    //dashboardPo.getcardNumber()
    cy.wait(1000)
    for (let i = 0; i < dashboardPo.getcardNumber(); i++) {
      const CardName = dashboardData[i].CardNameFR
      dashboardPo.ExpandCard(CardName)
      dashboardData[i].Section.forEach((section) => {
        dashboardPo.ValidateCardTaskListAndSection(
          section.sectionNameFR,
          section.NumberOfLinks
        )
      })
      dashboardPo.ExpandCard(CardName)
    }
  })

  it.skip('Validate the "Most requested"section on EI,CPP and OAS cards in English', () => {
    for (let i = 0; i < dashboardPo.getcardNumber(); i++) {
      const CardName = dashboardData[i].CardNameEN
      dashboardPo.ExpandCard(CardName)
      dashboardPo.ValidateMostRequestedsection(
        dashboardData[i].MostReqCardNameEN,
        dashboardData[i].NumberOfLinksinMostReqcards
      )
      dashboardPo.ExpandCard(CardName)
    }
  })

  it.skip('Validate the "Most requested"section on EI,CPP and OAS cards in French', () => {
    dashboardPo.FrenchButton().click()
    for (let i = 0; i < dashboardPo.getcardNumber(); i++) {
      const CardName = dashboardData[i].CardNameFR
      dashboardPo.ExpandCard(CardName)
      dashboardPo.ValidateMostRequestedsection(
        dashboardData[i].MostReqCardNameFR,
        dashboardData[i].NumberOfLinksinMostReqcards
      )
      dashboardPo.ExpandCard(CardName)
    }
  })

  it.skip('Validate Beta Version Banner is present on Dashboard', () => {
    dashboardPo.BetaBanner().should('be.visible')
    dashboardPo.LearnMoreABtBetaLink().should('be.visible')
    dashboardPo.ExitBetaButton().should('be.visible')
  })

  it.skip('Validate Beta Version Banner is present on Dashboard', () => {
    dashboardPo.BetaBanner().should('be.visible')
    dashboardPo.LearnMoreABtBetaLink().should('be.visible')
    dashboardPo.ExitBetaButton().should('be.visible')
  })

  it.skip('Validate Exit Beta Version Popup UI', () => {
    dashboardPo.ExpandCard('Employment Insurance')
    dashboardPo.FirstTaskLink().click()
    dashboardPo.ExitBetaModal().should('be.visible')
    dashboardPo.StayOnBetabutton().should('be.visible')
    dashboardPo.ExitBetaModalButton().should('be.visible')
    dashboardPo.CloseModalButton().should('be.visible')
  })

  it('Validate the "Exit Beta Version" modal and buttons for all links inside EI card', () => {
    dashboardPo.ExpandCard('Employment Insurance')
    var a = []
    var NumberOfSections
    dashboardData[0].BetaTest.forEach((section) => {
      NumberOfSections = a.push(section)
    })

    for (let i = 0; i < NumberOfSections; i++) {
      var links = dashboardData[0].BetaTest[i].Links
      for (let j = 0; j < links.length; j++) {
        //cy.log(dashboardData[0].BetaTest[i].Links[j])
        //cy.log(links)
        dashboardPo.validateExitBetaModalbuttonLink(
          dashboardData[0].BetaTest[i].sectionName,
          dashboardData[0].BetaTest[i].Links[j]
        )
      }
    }
  })

  it.skip('Validate the "Exit Beta Version" modal and buttons for all links inside CCP card', () => {
    dashboardPo.ExpandCard('Canada Pension Plan')
    //This test step logic will change once we have code to show modal only for specific links
    //its only valid till exit beta modal is displayed for all authenicated links
    dashboardPo.validateExitBetaModalbuttonLink()
  })

  it.skip('Validate the "Exit Beta Version" modal and buttons for all links inside OAS card', () => {
    dashboardPo.ExpandCard('Old Age Security')
    //This test step logic will change once we have code to show modal only for specific links
    //its only valid till exit beta modal is displayed for all authenicated links
    dashboardPo.validateExitBetaModalbuttonLink()
  })
})
