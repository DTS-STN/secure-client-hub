/// <reference types="cypress" />
const dashboardPo = require('../e2e/PageObjects/dashboardPO.cy')
const securityPo = require('../e2e/PageObjects/securitySettingsPO.cy')
const profilePo = require('../e2e/PageObjects/ProfilePO.cy')

beforeEach(() => {
  cy.visit('/home')
})

describe('Validate dashboard page', () => {
  it('Validate dashboard header', () => {
    dashboardPo
      .dashboardHeader()
      .should('be.visible')
      .and('have.text', 'My dashboard')
  })

  it('French button click goes to fr/dashboard page', () => {
    dashboardPo.FrenchButton().click()
    //cy.wait(2000)
    cy.url().should('contains', '/fr/home')
  })

  it('Validate dashboard header in French', () => {
    dashboardPo.FrenchButton().click()
    cy.wait(3000)
    dashboardPo
      .dashboardHeader()
      .should('be.visible')
      .and('have.text', 'Mon tableau de bord')
  })

  it('Validate that the Card placeholder is present', () => {
    dashboardPo.FirstCard().should('be.visible')
  })

  it('Validate that the Card Header is visible', () => {
    dashboardPo.CardHeading().should('be.visible')
  })

  it('Validate that the Test card button expands and collapses on clicking', () => {
    dashboardPo.CardButton().should('be.visible')
    dashboardPo.CardButton().click()
    dashboardPo.ExpandedCard().should('be.visible')
    dashboardPo.CardButton().click({ force: true })
    dashboardPo.ExpandedCard().should('not.exist')
  })

  it('Validate that the Task List is Present for each card on dashboard page', () => {
    dashboardPo.Cards().each(($el, index, $list) => {
      cy.wrap($el).click()
      dashboardPo.ExpandedCard().should('be.visible')
    })
  })

  it('Validate that each card has a "Most Requested" section', () => {
    dashboardPo.Cards().each(($el, index, $list) => {
      cy.wrap($el).click()
      cy.wait(1000)
      dashboardPo
        .MostRequestedSectionHeading()
        .should('contain.text', 'Most requested')
      dashboardPo.MostRequestedSection().should('be.visible')
      dashboardPo.MostRequestedSectionLinks().should('be.visible')
    })
  })

  it('validate the "My dashboard" page doesnt have breadcrumbs', () => {
    securityPo.breadcrumbs().should('not.exist')
  })

  it('Validate the EI card "Application" section', () => {
    profilePo.ValidateCardTaskListAndSection(
      'Employment Insurance',
      'Applications',
      '2'
    )
  })

  it('Validate the EI card "Payments and claims" section', () => {
    profilePo.ValidateCardTaskListAndSection(
      'Employment Insurance',
      'Payments and claims',
      '3'
    )
  })

  it('Validate the EI card "Taxes" section', () => {
    profilePo.ValidateCardTaskListAndSection(
      'Employment Insurance',
      'Taxes',
      '2'
    )
  })

  it('Validate the EI card "Reports and documents" section', () => {
    profilePo.ValidateCardTaskListAndSection(
      'Employment Insurance',
      'Reports and documents',
      '7'
    )
  })

  it('Validate the EI card "Reports and documents" section', () => {
    profilePo.ValidateCardTaskListAndSection(
      'Employment Insurance',
      'Personal information',
      '4'
    )
  })

  it('Validate the CPP card "Applications" section', () => {
    profilePo.ValidateCardTaskListAndSection(
      'Canada Pension Plan',
      'Applications',
      '6'
    )
  })

  it('Validate the CPP card "Payments" section', () => {
    profilePo.ValidateCardTaskListAndSection(
      'Canada Pension Plan',
      'Payments',
      '4'
    )
  })

  it('Validate the CPP card "Taxes" section', () => {
    profilePo.ValidateCardTaskListAndSection(
      'Canada Pension Plan',
      'Taxes',
      '3'
    )
  })

  it('Validate the CPP card "Documents" section', () => {
    profilePo.ValidateCardTaskListAndSection(
      'Canada Pension Plan',
      'Documents',
      '2'
    )
  })

  it('Validate the CPP card "Provisions" section', () => {
    profilePo.ValidateCardTaskListAndSection(
      'Canada Pension Plan',
      'Provisions',
      '4'
    )
  })

  it('Validate the CPP card "Personal information" section', () => {
    profilePo.ValidateCardTaskListAndSection(
      'Canada Pension Plan',
      'Personal information',
      '2'
    )
  })

  it('Validate the OAS card "Applications" section', () => {
    profilePo.ValidateCardTaskListAndSection(
      'Old Age Security',
      'Applications',
      '4'
    )
  })

  it('Validate the OAS card "Payments" section', () => {
    profilePo.ValidateCardTaskListAndSection(
      'Old Age Security',
      'Payments',
      '4'
    )
  })

  it('Validate the OAS card "Taxes" section', () => {
    profilePo.ValidateCardTaskListAndSection('Old Age Security', 'Taxes', '3')
  })

  it('Validate the OAS card "Personal information" section', () => {
    profilePo.ValidateCardTaskListAndSection(
      'Old Age Security',
      'Personal information',
      '2'
    )
  })

  it('Validate the OAS card "Personal information" section', () => {
    profilePo.ValidateCardTaskListAndSection(
      'Old Age Security',
      'Personal information',
      '2'
    )
  })

  it('Validate the "Most requested"section on EI card', () => {
    profilePo.ValidateMostRequestedsection('Employment Insurance', '2')
  })

  it('Validate the "Most requested"section on CPP card', () => {
    profilePo.ValidateMostRequestedsection('Canada Pension Plan', '2')
  })

  it('Validate the "Most requested"section on OAS card', () => {
    profilePo.ValidateMostRequestedsection('Old Age Security', '2')
  })
})
