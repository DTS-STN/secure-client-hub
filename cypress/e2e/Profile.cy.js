/// <reference types="cypress" />
/// <reference types="cypress" />

const dashboardPo = require('../e2e/PageObjects/dashboardPO.cy')
const securityPo = require('../e2e/PageObjects/securitySettingsPO.cy')
const profilePo = require('../e2e/PageObjects/ProfilePO.cy')

beforeEach(() => {
  cy.visit('/profile')
})

describe('Validate Profile page', () => {
  it('Validate Profile Page header in English', () => {
    profilePo.ProfileUrlEN()
    profilePo.ProfileHeaderEN()
  })

  it('Validate Profile Page header in French', () => {
    dashboardPo.FrenchButton().click()
    profilePo.ProfileHeaderFR()
    profilePo.ProfileUrlFR()
  })

  it('validate the breadcrumbs are present on Profile page', () => {
    securityPo
      .breadcrumbs()
      .should('be.visible')
      .and('have.text', 'My dashboard')
    dashboardPo.FrenchButton().click()
    securityPo
      .breadcrumbs()
      .should('be.visible')
      .and('have.text', 'Mon tableau de bord')
  })

  it('validate the "My dashboard" click on Profile page goes to dashboard page', () => {
    securityPo.breadcrumbs().click()
    dashboardPo.ValidateDashboardUrl()
    dashboardPo.ValidateDashboardHeaderEN()
  })

  it('validate that user is navigated to /fr/profile page from /fr/dashboard', () => {
    cy.visit('/my-dashboard')
    dashboardPo.FrenchButton().click()
    dashboardPo.Menu().click()
    dashboardPo.ProfileMenu().click()
    profilePo.ProfileUrlFR()
    profilePo.ProfileHeaderFR()
  })

  it('validate the "My dashboard" click from profile page goes to dashboard page', () => {
    securityPo.breadcrumbs().click()
    dashboardPo.ValidateDashboardUrl()
    dashboardPo.ValidateDashboardHeaderEN()
  })

  it('validate the "Mon tableau de bord" click goes from Profile to "/fr/home"page', () => {
    dashboardPo.FrenchButton().click()
    securityPo.breadcrumbs().click()
    dashboardPo.ValidateDashboardUrlFR()
    dashboardPo.ValidateDashboardHeaderFR()
  })

  it('Validate that the Card placeholder is present on Profile Page', () => {
    profilePo.FirstCard().should('be.visible')
  })

  it('Validate that the Card Header is visible on profile page', () => {
    profilePo.CardHeading().should('be.visible')
  })

  it.skip('Validate that the Test card button on profile page expands and collapses on clicking', () => {
    profilePo.CardButton().should('be.visible')
    profilePo.CardButton().click()
    dashboardPo.ExpandedCard().should('be.visible')
    profilePo.CardButton().click({ force: true })
    profilePo.FirstCard().should('be.visible')
  })

  it('Validate that the "Looking for" section is present on Profile Page', () => {
    profilePo.LookingFor().should('be.visible')
    profilePo.LookingForSecurityLink().should('be.visible')
    profilePo.BackToDashboardButton().should('be.visible')
  })

  it('Validate the "Back to Dashboard" click navigates to dashboard page', () => {
    profilePo.BackToDashboardButton().click()
    dashboardPo.ValidateDashboardUrl()
    dashboardPo.ValidateDashboardHeaderEN()
  })

  it('Validate the "Security Settings" click navigates to Security Settings Page', () => {
    cy.wait(2000)
    profilePo.LookingForSecurityLink().click()
    securityPo.SecurityUrlEN()
    securityPo.SecurityHeaderEN()
  })

  it('Validate the "Looking for Security Settings" and button text text in English', () => {
    profilePo.LookingFor().should('have.text', 'Looking for security settings?')
    profilePo
      .BackToDashboardButton()
      .should('have.text', 'Back to my Dashboard')
  })

  it('Validate the "Looking for security Settings text" and button text in French', () => {
    dashboardPo.FrenchButton().click()
    profilePo
      .LookingFor()
      .should('have.text', 'Vous recherchez les paramètres de sécurité?')
    profilePo
      .BackToDashboardButton()
      .should('have.text', 'Retour à mon tableau de bord')
  })

  it('Validate the "Vous recherchez les paramètres de sécurité?" click navigates to /fr/security Page', () => {
    dashboardPo.FrenchButton().click()
    cy.wait(2000)
    profilePo.LookingForSecurityLink().click()
    securityPo.SecurityUrlFR()
    securityPo.SecurityHeaderFR()
  })

  it('Validate the "Retour à mon tableau de bord" click navigates to /fr/home Page', () => {
    dashboardPo.FrenchButton().click()
    profilePo.BackToDashboardButton().click()
    dashboardPo.ValidateDashboardUrlFR()
    dashboardPo.ValidateDashboardHeaderFR()
  })

  it('Validate that the Task List is Present for each card on profile page', () => {
    profilePo.Cards().each(($el, index, $list) => {
      cy.wrap($el).click()
      dashboardPo.ExpandedCard().should('be.visible')
    })
  })

  it('Validate that each card has a "Most Requested" section', () => {
    profilePo.AllCardTaskSection('Most requested')
  })

  it('Validate that each card has a "Application" section', () => {
    profilePo.AllCardTaskSection('Applications')
  })

  it('Validate the EI card "Application" section in EN and FR', () => {
    profilePo.ValidateCardTaskListAndSection(
      'Employment Insurance',
      'Applications',
      '2'
    )
    dashboardPo.FrenchButton().click()
    profilePo.ValidateCardTaskListAndSection(
      'Assurance-emploi',
      'Demandes de prestations',
      '2'
      )
    })
    it('Validate the EI card "Payments and claims" section', () => {
      profilePo.ValidateCardTaskListAndSection(
        'Employment Insurance',
        'Payments and claims',
        '3'
      )
      dashboardPo.FrenchButton().click()
      profilePo.ValidateCardTaskListAndSection(
        'Assurance-emploi',
        'Paiements et demandes',
        '3'
      )
    })
  
    it('Validate the EI card "Taxes" section', () => {
      profilePo.ValidateCardTaskListAndSection(
        'Employment Insurance',
        'Taxes',
        '2'
      )
      dashboardPo.FrenchButton().click()
      profilePo.ValidateCardTaskListAndSection('Assurance-emploi', 'Impôts', '2')
    })
  
    it('Validate the EI card "Reports and documents" section', () => {
      profilePo.ValidateCardTaskListAndSection(
        'Employment Insurance',
        'Reports and documents',
        '7'
      )
      dashboardPo.FrenchButton().click()
      profilePo.ValidateCardTaskListAndSection(
        'Assurance-emploi',
        'Rapports et documents',
        '7'
      )
    })
  
    it('Validate the EI card "Personal information" section', () => {
      profilePo.ValidateCardTaskListAndSection(
        'Employment Insurance',
        'Personal information',
        '4'
      )
      dashboardPo.FrenchButton().click()
      profilePo.ValidateCardTaskListAndSection(
        'Assurance-emploi',
        'Renseignements personnels',
        '4'
      )
    })
  
    it('Validate the CPP card "Applications" section', () => {
      profilePo.ValidateCardTaskListAndSection(
        'Canada Pension Plan',
        'Applications',
        '6'
      )
      dashboardPo.FrenchButton().click()
      profilePo.ValidateCardTaskListAndSection(
        'Régime de pensions du Canada',
        'Demandes de prestations',
        '6'
      )
    })
  
    it('Validate the CPP card "Payments" section', () => {
      profilePo.ValidateCardTaskListAndSection(
        'Canada Pension Plan',
        'Payments',
        '4'
      )
      dashboardPo.FrenchButton().click()
      profilePo.ValidateCardTaskListAndSection(
        'Régime de pensions du Canada',
        'Paiements',
        '4'
      )
    })
  
    it('Validate the CPP card "Taxes" section', () => {
      profilePo.ValidateCardTaskListAndSection(
        'Canada Pension Plan',
        'Taxes',
        '3'
      )
      dashboardPo.FrenchButton().click()
      profilePo.ValidateCardTaskListAndSection(
        'Régime de pensions du Canada',
        'Impôts',
        '3'
      )
    })
  
    it('Validate the CPP card "Documents" section', () => {
      profilePo.ValidateCardTaskListAndSection(
        'Canada Pension Plan',
        'Documents',
        '2'
      )
      dashboardPo.FrenchButton().click()
      profilePo.ValidateCardTaskListAndSection(
        'Régime de pensions du Canada',
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
      dashboardPo.FrenchButton().click()
      profilePo.ValidateCardTaskListAndSection(
        'Régime de pensions du Canada',
        'Clauses',
        '4'
      )
    })
  
    it('Validate the CPP card "Personal information" section', () => {
      profilePo.ValidateCardTaskListAndSection(
        'Canada Pension Plan',
        'Personal information',
        '2'
      )
      dashboardPo.FrenchButton().click()
      profilePo.ValidateCardTaskListAndSection(
        'Régime de pensions du Canada',
        'Renseignements personnels',
        '2'
      )
    })
  
    it('Validate the OAS card "Applications" section', () => {
      profilePo.ValidateCardTaskListAndSection(
        'Old Age Security',
        'Applications',
        '4'
      )
      dashboardPo.FrenchButton().click()
      profilePo.ValidateCardTaskListAndSection(
        'Sécurité de la vieillesse',
        'Demandes de prestations',
        '4'
      )
    })
  
    it('Validate the OAS card "Payments" section', () => {
      profilePo.ValidateCardTaskListAndSection(
        'Old Age Security',
        'Payments',
        '4'
      )
      dashboardPo.FrenchButton().click()
      profilePo.ValidateCardTaskListAndSection(
        'Sécurité de la vieillesse',
        'Paiements',
        '4'
      )
    })
  
    it('Validate the OAS card "Taxes" section', () => {
      profilePo.ValidateCardTaskListAndSection('Old Age Security', 'Taxes', '3')
      dashboardPo.FrenchButton().click()
      profilePo.ValidateCardTaskListAndSection(
        'Sécurité de la vieillesse',
        'Impôts',
        '3'
      )
    })
  
    it('Validate the OAS card "Personal information" section', () => {
      profilePo.ValidateCardTaskListAndSection(
        'Old Age Security',
        'Personal information',
        '2'
      )
      dashboardPo.FrenchButton().click()
      profilePo.ValidateCardTaskListAndSection(
        'Sécurité de la vieillesse',
        'Renseignements personnels',
        '2'
      )
    })
  
    it('Validate the "Most requested"section on EI card', () => {
      profilePo.ValidateCardTaskListAndSection(
        'Employment Insurance',
        'Most requested',
        '2'
      )
      dashboardPo.FrenchButton().click()
      profilePo.ValidateCardTaskListAndSection(
        'Assurance-emploi',
        'En demande',
        '2'
      )
    })
  
    it('Validate the "Most requested"section on CPP card', () => {
      profilePo.ValidateCardTaskListAndSection(
        'Canada Pension Plan',
        'Most requested',
        '2'
      )
      dashboardPo.FrenchButton().click()
      profilePo.ValidateCardTaskListAndSection(
        'Régime de pensions du Canada',
        'En demande',
        '2'
      )
    })
  
    it('Validate the "Most requested"section on OAS card', () => {
      profilePo.ValidateCardTaskListAndSection(
        'Old Age Security',
        'Most requested',
        '2'
      )
      dashboardPo.FrenchButton().click()
      profilePo.ValidateCardTaskListAndSection(
        'Sécurité de la vieillesse',
        'En demande',
        '2'
      )
    })
  })

