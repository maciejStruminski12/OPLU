export class SignIn {
  navigate () {
    cy.visit('/sign-in')
  }

  getEmail () {
    return cy.get('input[name="email"]')
  }

  getPassword () {
    return cy.get('input[name="password"]')
  }

  getSubmitButton () {
    return cy.get('button[type="submit"]')
  }

  getCreateAccount () {
    return cy.get('a').contains('Create account')
  }

  getResetPassword () {
    return cy.get('a').contains('Reset password')
  }

  getResendActivationEmail () {
    return cy.get('a').contains('Resend activation email')
  }

  getValidationAlert (text) {
    return cy.get('span[role=alert]').contains(text)
  }
}
