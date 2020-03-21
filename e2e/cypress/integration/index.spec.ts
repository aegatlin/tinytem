/// <reference types="cypress"/>

describe('home page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  context('when not logged in', () => {
    it('should display the page title (in the browser tab)', () => {
      cy.get('h1').should('contain', 'TinyTem')
    })

    it('should display the login button', () => {
      cy.get('button').should('contain', 'Login')
    })
  })
})
