/// <reference types="cypress" />

import { Nav } from './PageObjects/Nav'
import { ResendActivationEmail } from './PageObjects/ResendActivationEmailPage'

const resendActivationEmail = new ResendActivationEmail()
const nav = new Nav()

const userEmail = Cypress.env('userEmail')

describe('Create account tests', () => {
  beforeEach(() => {
    resendActivationEmail.navigate()
  })
  it('Submiting empty form', () => {
    resendActivationEmail.getSubmitButton().click()
    resendActivationEmail.getValidationAlert().should('have.length', 1).within((alert) => {
      expect(alert.eq(0)).to.have.text('Invalid email')
    })
  })
  it('Submiting correct email', () => {
    resendActivationEmail.getEmail().type(userEmail)
    resendActivationEmail.getSubmitButton().click()
    resendActivationEmail.getValidationAlert().should('have.length', 0)
    nav.vailidateToast('If your email address exists in our database, you will receive an email with instructions for how to confirm your email address in a few minutes.')
  })
})
