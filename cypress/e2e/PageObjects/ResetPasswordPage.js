export class ResetPasswordPage {
  navigate () {
    cy.visit('/reset-password')
  }

  getEmail () {
    return cy.get('input[name="email"]')
  }

  getSubmitButton () {
    return cy.get('button[type="submit"]')
  }

  getValidationAlert () {
    return cy.get('span[role=alert]')
  }
}
