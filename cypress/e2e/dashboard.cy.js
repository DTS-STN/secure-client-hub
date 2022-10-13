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
     
            dashboardPo.dashboardHeader().should('be.visible').and('have.text','Mon tableau de bord');

      })

})

