/// <reference types="cypress" />

import { Nav } from './PageObjects/Nav'
import { ResetPasswordPage } from './PageObjects/ResetPasswordPage'

const resetPassword = new ResetPasswordPage()
const nav = new Nav()

const userEmail = Cypress.env('userEmail')

describe('Create account tests', () => {
  beforeEach(() => {
    resetPassword.navigate()
  })
  it('Submiting empty form', () => {
    resetPassword.getSubmitButton().click()
    resetPassword.getValidationAlert().should('have.length', 1).within((alert) => {
      expect(alert.eq(0)).to.have.text('Invalid email')
    })
  })
  it('Submiting correct email', () => {
    resetPassword.getEmail().type(userEmail)
    resetPassword.getSubmitButton().click()
    resetPassword.getValidationAlert().should('have.length', 0)
    nav.vailidateToast('If your email address exists in our database, you will receive a password recovery link at your email address in a few minutes.')
  })
})
