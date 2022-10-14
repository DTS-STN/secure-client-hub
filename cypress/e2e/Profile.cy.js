/// <reference types="cypress" />
/// <reference types="cypress" />

const dashboardPo = require("../e2e/PageObjects/dashboardPO.cy")
const securityPo = require("../e2e/PageObjects/securitySettingsPO.cy")
const profilePo = require("../e2e/PageObjects/ProfilePO.cy")

beforeEach(() => {
    cy.visit('/profile') })
    
    describe('Validate Profile page',() =>{
    
    
           it('Validate Profile Page header in English', () =>{
    
               securityPo.pageHeader().should('be.visible')
                                         .and('have.text','Profile');
            
            })

            it('Validate Profile Page header in French', () =>{

                dashboardPo.FrenchButton().click()
                securityPo.pageHeader().should('be.visible')
                                          .and('have.text','Profil');
             
             })

             it('validate the breadcrumbs are present on Profile page', () =>{
            
                securityPo.breadcrumbs().should('be.visible').and('have.text',"My dashboard")
                dashboardPo.FrenchButton().click()
                securityPo.breadcrumbs().should('be.visible').and('have.text',"Mon tableau de bord")
       
             })

             it('validate the "My dashboard" click on Profile page goes to dashboard page', () =>{
            
                securityPo.breadcrumbs().click()
                cy.url().should("contains", "/home");
                dashboardPo.dashboardHeader().should('be.visible')
                .and('have.text','My dashboard');
       
             })

             it('validate that user is navigated to /fr/profile page from /fr/dashboard', () =>{
            
                cy.visit('/home')
                dashboardPo.FrenchButton().click()
                dashboardPo.Menu().click()
                dashboardPo.ProfileMenu().click()
                cy.url().should("contains", "/fr/profile")
                securityPo.pageHeader().should('be.visible')
                                         .and('have.text','Profil');
                
               
             })
                
             it('validate the "Mon tableau de bord" click goes from Profile to "/fr/home"page', () =>{
                
                dashboardPo.FrenchButton().click()
                securityPo.breadcrumbs().click()
                cy.url().should("contains", "/fr/home");
                dashboardPo.dashboardHeader().should('be.visible')
                .and('have.text','Mon tableau de bord');
       
             })

             it('Validate French button click goes to fr/profile page', () =>{

                dashboardPo.FrenchButton().click()
                cy.url().should("contains", "/fr/profile");
             
             })

             it('Validate that user can select "Profile" from Menu dropdown options', () =>{
                cy.visit('/home')
                dashboardPo.Menu().click()
                dashboardPo.ProfileMenu().click()
                cy.url().should("contains", "/profile");
                securityPo.pageHeader().should('be.visible')
                                         .and('have.text','Profile');
    

             })


        })