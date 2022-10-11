/// <reference types="cypress" />



function dashboardHeader(){

          return cy.get('#my-dashboard-heading')
            }

function FrenchButton(){

          return cy.get('#lang1')
            }

function FirstCard() {

          return cy.get('#homeContent:nth-child(1) > div')
}

function CardHeading() {

          return cy.get('#homeContent:nth-child(1)>div>h2')
}

function CardButton() {

          return cy.get('#eitest-card-button-')
}

function ExpandedCard()  {

          return cy.get('.pb-12 ')
}

function TaskList()  {

  return cy.get('#homeContent:nth-child(1) >div>p')
}

module.exports = {dashboardHeader,
                   FrenchButton,
                   FirstCard,
                   CardHeading,
                   CardButton,
                   ExpandedCard,
                   TaskList


}