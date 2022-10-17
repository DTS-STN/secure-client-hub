/// <reference types="cypress" />


function securitySettingsHeader(){

    return cy.get('#my-dashboard-heading')
      }

function breadcrumbs() {

    return cy.get("[class='ds-container'] >nav>ul")
}

function breadcrumbsLink1() {

    return cy.get("[class='ds-container'] >nav>ul>li:nth-child(1)>a")
}

function breadcrumbsLink2() {

    return cy.get("[class='ds-container'] >nav>ul>li:nth-child(2)>a")
}

      module.exports = {securitySettingsHeader,
                        breadcrumbs,
                        breadcrumbsLink1,
                        breadcrumbsLink2


      }