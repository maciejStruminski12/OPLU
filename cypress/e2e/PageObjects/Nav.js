export class Nav {
  validateNav (text) {
    cy.get('nav li').should('contain', text)
  }

  vailidateToast (text) {
    return cy.get('.Toastify__toast-body').should('contain', text)
  }

  getNav () {
    return cy.get('nav li')
  }

  getUserName () {
    return cy.get('header span') // to be changed with cy-data
  }

  getLogoutButton () {
    return cy.get('button').contains('Log out')
  }
}
