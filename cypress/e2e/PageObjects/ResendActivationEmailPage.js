export class ResendActivationEmail {
  navigate () {
    cy.visit('/resend-activation-email')
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
