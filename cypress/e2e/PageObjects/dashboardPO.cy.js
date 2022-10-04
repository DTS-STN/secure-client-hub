/// <reference types="cypress" />



function dashboardHeader(){

          return cy.get('#my-dashboard-heading')
            }

function FrenchButton(){

          return cy.get('#lang1')
            }



module.exports = {dashboardHeader,
                   FrenchButton

}