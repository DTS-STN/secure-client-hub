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

          return cy.get('#homeContent > div:nth-child(2)>button')
}

function ExpandedCard()  {

          return cy.get('.pb-12 ')
}

function Cards()  {

  return cy.get("#homeContent").find("div>button")
}

function MostRequestedSection() {

  return cy.get("[class ='pb-12 ']>div:nth-child(1)")

}

function MostRequestedSectionHeading() {

  return cy.get("[class ='pb-12 '] >div:nth-child(1)>div>h3")

}

function MostRequestedSectionLinks() {

  return cy.get("[class ='pb-12 '] >div:nth-child(1)>div>ul")

}

function Menu() {

  return cy.get("#dropdownNavbarLink")

}

function SecuritySettingsMenu() {

  return cy.get("#dropdownNavbar > li:nth-child(2) > a")

}

function ProfileMenu() {

  return cy.get("#dropdownNavbar > li:nth-child(3) > a")

}

module.exports = {dashboardHeader,
                   FrenchButton,
                   FirstCard,
                   CardHeading,
                   CardButton,
                   ExpandedCard,
                   Cards,
                   MostRequestedSection,
                   MostRequestedSectionLinks,
                   MostRequestedSectionHeading,
                   Menu,
                   SecuritySettingsMenu,
                   ProfileMenu,
                   SecuritySettingsMenu

}
