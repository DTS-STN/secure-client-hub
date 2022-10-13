/// <reference types="cypress" />
const dashboardPo = require("../e2e/PageObjects/dashboardPO.cy")


beforeEach(() => {
cy.visit('/home') })

describe('Validate dashboard page',() =>{


       it('Validate dashboard header', () =>{

           dashboardPo.dashboardHeader().should('be.visible')
                                     .and('have.text','My dashboard');
        
        })


       it('French button click goes to fr/dashboard page',() =>{
       
           dashboardPo.FrenchButton().click()
           //cy.wait(2000)
           cy.url().should("contains", "/fr/home");

        })


        it('Validate dashboard header in French',() =>{
            dashboardPo.FrenchButton().click()
            cy.wait(3000)
            dashboardPo.dashboardHeader().should('be.visible').and('have.text','Mon tableau de bord');

      })

      it('Validate that the Card placeholder is present',() =>{
            
             dashboardPo.FirstCard().should('be.visible')

      })
      

      it('Validate that the Card Header is visible',() =>{
            
        dashboardPo.CardHeading().should('be.visible')

      })


      it('Validate that the Test card button expands on clicking',() =>{
            
        dashboardPo.CardButton().should('be.visible')
        dashboardPo.CardButton().click()
        dashboardPo.TaskList().should('be.visible')


      })     

})

