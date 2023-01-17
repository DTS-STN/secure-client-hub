/// <reference types="cypress" />
const dashboardPo = require('../e2e/PageObjects/dashboardPO.cy')
const securityPo = require('../e2e/PageObjects/securitySettingsPO.cy')
const contactUsPo = require('../e2e/PageObjects/ContactUsPO.cy')
import dashboardData from '../../cypress/fixtures/dashboardData.json'

beforeEach(() => {
  cy.visit('/my-dashboard')
})

describe('Validate dashboard page', () => {
  it('Validate dashboard URL and Header in EN and FR', () => {
    dashboardPo.ValidateDashboardUrl()
    dashboardPo.ValidateDashboardHeaderEN()
    dashboardPo.FrenchButton().click()
    dashboardPo.ValidateDashboardUrlFR()
    dashboardPo.ValidateDashboardHeaderFR()
  })

  it('Validate that the Card placeholder is present and Car Header is Visible', () => {
    dashboardPo.FirstCard().should('be.visible')
    dashboardPo.CardHeading().should('be.visible')
  })

  it('Validate that the Test card button expands and collapses on clicking', () => {
    dashboardPo.CardButton().should('be.visible')
    dashboardPo.CardButton().click()
    dashboardPo.ExpandedCard().should('be.visible')
    dashboardPo.CardButton().click({ force: true })
  })

  it('Validate that the Task List is Present for each card on dashboard page', () => {
    dashboardPo.Cards().each(($el, index, $list) => {
      cy.wrap($el).click()
      dashboardPo.ExpandedCard().should('be.visible')
    })
  })

  it('validate the "My dashboard" page doesnt have breadcrumbs', () => {
    securityPo.breadcrumbs().should('not.exist')
  })

  it('Validate the EI,CPP and OAS card sections in EN', () => {
    for (let i = 0; i < dashboardData.length; i++) {
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

  it('Validate the EI,CPP and OAS card sections in FR', () => {
    dashboardPo.FrenchButton().click()
    cy.wait(1000)
    for (let i = 0; i < dashboardData.length; i++) {
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

  it('Validate the "Most requested"section on EI,CPP and OAS cards in English', () => {
    for (let i = 0; i < dashboardData.length; i++) {
      const CardName = dashboardData[i].CardNameEN
      dashboardPo.ExpandCard(CardName)
      dashboardPo.ValidateMostRequestedsection(
        dashboardData[i].MostReqCardNameEN,
        dashboardData[i].NumberOfLinksinMostReqcards
      )
      dashboardPo.ExpandCard(CardName)
    }
  })

  it('Validate the "Most requested"section on EI,CPP and OAS cards in French', () => {
    dashboardPo.FrenchButton().click()
    for (let i = 0; i < dashboardData.length; i++) {
      const CardName = dashboardData[i].CardNameFR
      dashboardPo.ExpandCard(CardName)
      dashboardPo.ValidateMostRequestedsection(
        dashboardData[i].MostReqCardNameFR,
        dashboardData[i].NumberOfLinksinMostReqcards
      )
      dashboardPo.ExpandCard(CardName)
    }
  })

  it('Validate Beta Version Banner is present on Dashboard', () => {
    dashboardPo.BetaBanner().should('be.visible')
    dashboardPo.LearnMoreABtBetaLink().should('be.visible')
    dashboardPo.ExitBetaButton().should('be.visible')
  })

  it('Validate Exit Beta Version Popup UI', () => {
    dashboardPo.ExpandCard('Employment Insurance')
    dashboardPo.FirstTaskLink().click()
    dashboardPo.ExitBetaModal().should('be.visible')
    dashboardPo.StayOnBetabutton().should('be.visible')
    dashboardPo.ContinueToPageModalButton().should('be.visible')
    dashboardPo.CloseModalButton().should('be.visible')
  })

  it('Validate the "Exit Beta Version" modal and buttons for all links inside EI card', () => {
    for (let k = 0; k < dashboardData.length; k++) {
      let CardName = dashboardData[k].CardNameEN
      if (CardName === 'Employment Insurance') {
        dashboardPo.ExpandCard(dashboardData[k].CardNameEN)

        for (let i = 0; i < dashboardData[k].BetaTest.length; i++) {
          let links = dashboardData[k].BetaTest[i].Links
          for (let j = 0; j < links.length; j++) {
            dashboardPo.validateExitBetaModalbuttonLink(
              dashboardData[k].BetaTest[i].sectionName,
              dashboardData[k].BetaTest[i].Links[j]
            )
          }
        }
      }
    }
  })

  it('Validate the "Exit Beta Version" modal and buttons for all links inside CCP card', () => {
    for (let k = 0; k < dashboardData.length; k++) {
      let CardName = dashboardData[k].CardNameEN
      if (CardName === 'Canada Pension Plan') {
        dashboardPo.ExpandCard(dashboardData[k].CardNameEN)
        let a = []
        let NumberOfSections = []
        dashboardData[k].BetaTest.forEach((section) => {
          NumberOfSections = a.push(section)
        })

        for (let i = 0; i < dashboardData[k].BetaTest.length; i++) {
          let links = dashboardData[k].BetaTest[i].Links
          for (let j = 0; j < links.length; j++) {
            dashboardPo.validateExitBetaModalbuttonLink(
              dashboardData[k].BetaTest[i].sectionName,
              dashboardData[k].BetaTest[i].Links[j]
            )
          }
        }
      }
    }
  })

  it('Validate the "Exit Beta Version" modal and buttons for all links inside OAS card', () => {
    for (let k = 0; k < dashboardData.length; k++) {
      let CardName = dashboardData[k].CardNameEN
      if (CardName === 'Old Age Security') {
        dashboardPo.ExpandCard(dashboardData[k].CardNameEN)
        let a = []
        let NumberOfSections
        dashboardData[k].BetaTest.forEach((section) => {
          NumberOfSections = a.push(section)
        })

        for (let i = 0; i < dashboardData[k].BetaTest.length; i++) {
          let links = dashboardData[k].BetaTest[i].Links
          for (let j = 0; j < links.length; j++) {
            dashboardPo.validateExitBetaModalbuttonLink(
              dashboardData[k].BetaTest[i].sectionName,
              dashboardData[k].BetaTest[i].Links[j]
            )
          }
        }
      }
    }
  })

  it('Validate that the clicking Update my Profile link on EI,CPP,OAS card navigates to profile page', () => {
    for (let k = 0; k < dashboardData.length; k++) {
      dashboardPo.ExpandCard(dashboardData[k].CardNameEN)
      dashboardPo.ClickUpdatemyProfileLink()
    }
  })

  it.skip('Validate that the clicking Complete my report or Apply for EI link on EI opens a new tab', () => {
    dashboardPo.ExpandCard('Employment Insurance')
    dashboardPo.ClickCompleteMyReportOrApplyEILink()
  })

  it('Validate that the clicking Contact Us naviagtes to Contact US landing Page', () => {
    dashboardPo.ContactUsFooterLink().should('be.visible').click()
    contactUsPo.ValidateContactUsUrl()
  })
})
