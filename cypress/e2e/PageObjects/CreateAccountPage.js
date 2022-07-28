export class CreateAccountPage {
  navigate () {
    cy.visit('/register-account')
  }

  getEmail () {
    return cy.get('input[name="email"]')
  }

  getPassword () {
    return cy.get('input[name="password"]')
  }

  getConfirmPassword () {
    return cy.get('input[name="password_confirmation"]')
  }

  getName () {
    return cy.get('input[name="name"]')
  }

  getSubmitButton () {
    return cy.get('button[type="submit"]')
  }

  getValidationAlert () {
    return cy.get('span[role=alert]')
  }
}
