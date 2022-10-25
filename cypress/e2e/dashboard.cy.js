/// <reference types="cypress" />
const dashboardPo = require('../e2e/PageObjects/dashboardPO.cy')
const securityPo = require('../e2e/PageObjects/securitySettingsPO.cy')

beforeEach(() => {
  cy.visit('/my-dashboard')
})

describe('Validate dashboard page', () => {
  it('Validate dashboard header', () => {
    dashboardPo.ValidateDashboardUrl()
    dashboardPo.ValidateDashboardHeaderEN()
  })

  it('French button click goes to fr/dashboard page', () => {
    dashboardPo.FrenchButton().click()
    //cy.wait(2000)
    dashboardPo.ValidateDashboardUrlFR()
  })

  it('Validate dashboard header in French', () => {
    dashboardPo.FrenchButton().click()
    cy.wait(3000)
    dashboardPo.ValidateDashboardHeaderFR()
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

  it('Validate the EI card "Application" section in EN and FR', () => {
    dashboardPo.ValidateCardTaskListAndSection(
      'Employment Insurance',
      'Applications',
      '2'
    )
    dashboardPo.FrenchButton().click()
    dashboardPo.ValidateCardTaskListAndSection(
      'Assurance-emploi',
      'Demandes de prestations',
      '2'
    )
  })

  it('Validate the EI card "Payments and claims" section', () => {
    dashboardPo.ValidateCardTaskListAndSection(
      'Employment Insurance',
      'Payments and claims',
      '3'
    )
    dashboardPo.FrenchButton().click()
    dashboardPo.ValidateCardTaskListAndSection(
      'Assurance-emploi',
      'Paiements et demandes',
      '3'
    )
  })

  it('Validate the EI card "Taxes" section', () => {
    dashboardPo.ValidateCardTaskListAndSection(
      'Employment Insurance',
      'Taxes',
      '2'
    )
    dashboardPo.FrenchButton().click()
    dashboardPo.ValidateCardTaskListAndSection(
      'Assurance-emploi',
      'Impôts',
      '2'
    )
  })

  it('Validate the EI card "Reports and documents" section', () => {
    dashboardPo.ValidateCardTaskListAndSection(
      'Employment Insurance',
      'Reports and documents',
      '7'
    )
    dashboardPo.FrenchButton().click()
    dashboardPo.ValidateCardTaskListAndSection(
      'Assurance-emploi',
      'Rapports et documents',
      '7'
    )
  })

  it('Validate the EI card "Personal information" section', () => {
    dashboardPo.ValidateCardTaskListAndSection(
      'Employment Insurance',
      'Personal information',
      '4'
    )
    dashboardPo.FrenchButton().click()
    dashboardPo.ValidateCardTaskListAndSection(
      'Assurance-emploi',
      'Renseignements personnels',
      '4'
    )
  })

  it('Validate the CPP card "Applications" section', () => {
    dashboardPo.ValidateCardTaskListAndSection(
      'Canada Pension Plan',
      'Applications',
      '6'
    )
    dashboardPo.FrenchButton().click()
    dashboardPo.ValidateCardTaskListAndSection(
      'Régime de pensions du Canada',
      'Demandes de prestations',
      '6'
    )
  })

  it('Validate the CPP card "Payments" section', () => {
    dashboardPo.ValidateCardTaskListAndSection(
      'Canada Pension Plan',
      'Payments',
      '4'
    )
    dashboardPo.FrenchButton().click()
    dashboardPo.ValidateCardTaskListAndSection(
      'Régime de pensions du Canada',
      'Paiements',
      '4'
    )
  })

  it('Validate the CPP card "Taxes" section', () => {
    dashboardPo.ValidateCardTaskListAndSection(
      'Canada Pension Plan',
      'Taxes',
      '3'
    )
    dashboardPo.FrenchButton().click()
    dashboardPo.ValidateCardTaskListAndSection(
      'Régime de pensions du Canada',
      'Impôts',
      '3'
    )
  })

  it('Validate the CPP card "Documents" section', () => {
    dashboardPo.ValidateCardTaskListAndSection(
      'Canada Pension Plan',
      'Documents',
      '2'
    )
    dashboardPo.FrenchButton().click()
    dashboardPo.ValidateCardTaskListAndSection(
      'Régime de pensions du Canada',
      'Documents',
      '2'
    )
  })

  it('Validate the CPP card "Provisions" section', () => {
    dashboardPo.ValidateCardTaskListAndSection(
      'Canada Pension Plan',
      'Provisions',
      '4'
    )
    dashboardPo.FrenchButton().click()
    dashboardPo.ValidateCardTaskListAndSection(
      'Régime de pensions du Canada',
      'Clauses',
      '4'
    )
  })

  it('Validate the CPP card "Personal information" section', () => {
    dashboardPo.ValidateCardTaskListAndSection(
      'Canada Pension Plan',
      'Personal information',
      '2'
    )
    dashboardPo.FrenchButton().click()
    dashboardPo.ValidateCardTaskListAndSection(
      'Régime de pensions du Canada',
      'Renseignements personnels',
      '2'
    )
  })

  it('Validate the OAS card "Applications" section', () => {
    dashboardPo.ValidateCardTaskListAndSection(
      'Old Age Security',
      'Applications',
      '4'
    )
    dashboardPo.FrenchButton().click()
    dashboardPo.ValidateCardTaskListAndSection(
      'Sécurité de la vieillesse',
      'Demandes de prestations',
      '4'
    )
  })

  it('Validate the OAS card "Payments" section', () => {
    dashboardPo.ValidateCardTaskListAndSection(
      'Old Age Security',
      'Payments',
      '4'
    )
    dashboardPo.FrenchButton().click()
    dashboardPo.ValidateCardTaskListAndSection(
      'Sécurité de la vieillesse',
      'Paiements',
      '4'
    )
  })

  it('Validate the OAS card "Taxes" section', () => {
    dashboardPo.ValidateCardTaskListAndSection('Old Age Security', 'Taxes', '3')
    dashboardPo.FrenchButton().click()
    dashboardPo.ValidateCardTaskListAndSection(
      'Sécurité de la vieillesse',
      'Impôts',
      '3'
    )
  })

  it('Validate the OAS card "Personal information" section', () => {
    dashboardPo.ValidateCardTaskListAndSection(
      'Old Age Security',
      'Personal information',
      '2'
    )
    dashboardPo.FrenchButton().click()
    dashboardPo.ValidateCardTaskListAndSection(
      'Sécurité de la vieillesse',
      'Renseignements personnels',
      '2'
    )
  })

  it('Validate the "Most requested"section on EI card', () => {
    dashboardPo.ValidateMostRequestedsection(
      'Employment Insurance',
      'Most requested',
      '2'
    )
    dashboardPo.FrenchButton().click()
    dashboardPo.ValidateMostRequestedsection(
      'Assurance-emploi',
      'En demande',
      '2'
    )
  })

  it('Validate the "Most requested"section on CPP card', () => {
    dashboardPo.ValidateMostRequestedsection(
      'Canada Pension Plan',
      'Most requested',
      '2'
    )
    dashboardPo.FrenchButton().click()
    dashboardPo.ValidateMostRequestedsection(
      'Régime de pensions du Canada',
      'En demande',
      '2'
    )
  })

  it('Validate the "Most requested"section on OAS card', () => {
    dashboardPo.ValidateMostRequestedsection(
      'Old Age Security',
      'Most requested',
      '2'
    )
    dashboardPo.FrenchButton().click()
    dashboardPo.ValidateMostRequestedsection(
      'Sécurité de la vieillesse',
      'En demande',
      '2'
    )
  })
})
