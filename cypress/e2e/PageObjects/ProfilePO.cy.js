/// <reference types="cypress" />

function LookingFor() {

    return cy.get("[data-cy ='looking-for']")
    
    }

function LookingForProfileLink() {

    return cy.get("[id ='link-for-securitysettings']")
}
    
function BackToDashboardButton() {

    return cy.get("[id ='back-to-dashboard-button']")
}
    
    
    
    module.exports = {LookingFor,
                      LookingForProfileLink,
                      BackToDashboardButton

         
        }