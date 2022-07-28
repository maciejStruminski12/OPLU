/// <reference types="cypress" />

import { CreateAccountPage } from './PageObjects/CreateAccountPage'
import { Home } from './PageObjects/Home'
import { Nav } from './PageObjects/Nav'
import { ResendActivationEmail } from './PageObjects/ResendActivationEmailPage'
import { ResetPasswordPage } from './PageObjects/ResetPasswordPage'
import { SignIn } from './PageObjects/SignIn'

const signIn = new SignIn()
const nav = new Nav()
const home = new Home()
const createAccount = new CreateAccountPage()
const resetPassword = new ResetPasswordPage()
const resendActivationEmail = new ResendActivationEmail()

const userEmail = Cypress.env('userEmail')
const inactiveUserEmail = Cypress.env('inactiveUserEmail')
const password = Cypress.env('password')

describe('Login tests', () => {
  beforeEach(() => {
    signIn.navigate()
  })
  it('Valid Sign In page', () => {
    nav.validateNav('Sign in')
    signIn.getEmail().should('be.visible')
    signIn.getPassword().should('be.visible')
    signIn.getSubmitButton().should('be.visible')
    signIn.getCreateAccount().should('be.visible')
    signIn.getResetPassword().should('be.visible')
    signIn.getResendActivationEmail().should('be.visible')
  })
  it('Create account link', () => {
    signIn.getCreateAccount().click()
    nav.validateNav('Register account')
    createAccount.getEmail().should('be.visible')
    createAccount.getPassword().should('be.visible')
    createAccount.getConfirmPassword().should('be.visible')
    createAccount.getName().should('be.visible')
    createAccount.getSubmitButton().should('be.visible')
  })
  it('Reset password link', () => {
    signIn.getResetPassword().click()
    nav.validateNav('Reset password')
    resetPassword.getEmail().should('be.visible')
    resetPassword.getSubmitButton().should('be.visible')
  })
  it('Resend activation email link', () => {
    signIn.getResendActivationEmail().click()
    nav.validateNav('Resend activation email')
    resendActivationEmail.getEmail().should('be.visible')
    resendActivationEmail.getSubmitButton().should('be.visible')
  })
  it('Login user with empty input fields', () => {
    signIn.getSubmitButton().click()
    signIn.getValidationAlert('Invalid email').should('be.visible')
    signIn.getValidationAlert('Invalid password (min. 8 characters)').should('be.visible')
  })
  it('Login user with empty password', () => {
    signIn.getEmail().type(userEmail)
    signIn.getSubmitButton().click()
    signIn.getValidationAlert('Invalid email').should('not.exist')
    signIn.getValidationAlert('Invalid password (min. 8 characters)').should('be.visible')
  })
  it('Login user with valid email and password with lest than 8 characters', () => {
    signIn.getEmail().type(userEmail)
    signIn.getPassword().type('123')
    signIn.getSubmitButton().click()
    signIn.getValidationAlert('Invalid email').should('not.exist')
    signIn.getValidationAlert('Invalid password (min. 8 characters)').should('be.visible')
  })
  it('Login user with empty email and password with 8 characters but no number', () => {
    signIn.getEmail().type(userEmail)
    signIn.getPassword().type('qwertqwert')
    signIn.getSubmitButton().click()
    signIn.getValidationAlert('Invalid email').should('not.exist')
    signIn.getValidationAlert('Invalid password (1 numbers is required)').should('be.visible')
  })
  it('Login user with wrong email ', () => {
    signIn.getEmail().type('wrongemail@test.pl')
    signIn.getPassword().type(password)
    signIn.getSubmitButton().click()
    nav.vailidateToast('Invalid Email or password.').should('be.visible')
  })
  it('Login user with wrong password ', () => {
    signIn.getEmail().type('maciej.struminski@xfive.co')
    signIn.getPassword().type('123123123')
    signIn.getSubmitButton().click()
    nav.vailidateToast('Invalid Email or password.').should('be.visible')
  })
  it('Login with correct credentials but account no activated yet', () => {
    signIn.getEmail().type(inactiveUserEmail)
    signIn.getPassword().type(password)
    signIn.getSubmitButton().click()
    nav.vailidateToast('Your account has not been approved by the administrator yet.').should('be.visible')
  })
  it('Succesfull login', () => {
    signIn.getEmail().type(userEmail)
    signIn.getPassword().type(password)
    cy.intercept({
      method: 'POST',
      url: 'https://api-staging.openphilology.eu/api/v1/users/sign_in'

    }).as('login')
    signIn.getSubmitButton().click()
    cy.wait('@login').then((interception) => {
      // correct name should be displayed in top bar
      nav.getUserName().should('contain', interception.response.body.name)
    })
    nav.validateNav('Home')
    nav.getNav().should('have.length', 1)
    home.getContinueEditing().should('be.visible')
    home.getCreateNewEdition().should('be.visible')
    home.getGoToLibrary().should('be.visible')
    home.getManageUsers().should('be.visible')
    nav.vailidateToast('Signed in successfully.').should('be.visible')
  })
  it('Logout', () => {
    cy.login()
    cy.visit('/')
    nav.getLogoutButton().click()
    nav.validateNav('Sign in')
    // add assertion
  })
})
