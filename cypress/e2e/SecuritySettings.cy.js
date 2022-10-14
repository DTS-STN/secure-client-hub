/// <reference types="cypress" />
const dashboardPo = require("../e2e/PageObjects/dashboardPO.cy")
const securityPo = require("../e2e/PageObjects/securitySettingsPO.cy")


beforeEach(() => {
cy.visit('/security') })

describe('Validate Security Settings page',() =>{


       it('Validate Security Settings Page header in English', () =>{

           securityPo.securitySettingsHeader().should('be.visible')
                                     .and('have.text','Security Settings');
        
        })

        it('Validate French button click goes to fr/Security page', () =>{

            dashboardPo.FrenchButton().click()
            cy.url().should("contains", "/fr/security");
         
         })

         it('Validate Security Settings Page header in French', () =>{

            dashboardPo.FrenchButton().click()
            securityPo.securitySettingsHeader().should('be.visible')
                                     .and('have.text','Paramètres de sécurité');
         
         })

         it('Validate that user can select "Security settings" from Menu dropdown options', () =>{
            cy.visit('/home')
            dashboardPo.Menu().click()
            dashboardPo.SecuritySettingsMenu().click()
            cy.url().should("contains", "/security");
            securityPo.securitySettingsHeader().should('be.visible')
                                     .and('have.text','Security Settings');

         })

         it('validate the breadcrumbs are present on Security settings page', () =>{
            
            securityPo.breadcrumbs().should('be.visible')
            securityPo.breadcrumbsLink1().should('have.attr','href','https://www.canada.ca/home.html')
            securityPo.breadcrumbsLink2().should('have.attr','href','https://www.canada.ca/fr/emploi-developpement-social/ministere/portefeuille/service-canada.html')

           
         })

         it('validate that user is navigated to /fr/security page from /fr/dashboard', () =>{
            
            cy.visit('/home')
            dashboardPo.FrenchButton().click()
            dashboardPo.Menu().click()
            dashboardPo.SecuritySettingsMenu().click()
            cy.url().should("contains", "/fr/security")
            securityPo.securitySettingsHeader().should('be.visible')
                                     .and('have.text','Paramètres de sécurité');
            
           
         })
            
    })