/// <reference types="cypress" />

import { CreateAccountPage } from './PageObjects/CreateAccountPage'

const createAccount = new CreateAccountPage()

const userEmail = Cypress.env('userEmail')
const password = Cypress.env('password')

describe('Create account tests', () => {
  beforeEach(() => {
    createAccount.navigate()
  })
  it('Submiting empty form', () => {
    createAccount.getSubmitButton().click()
    createAccount.getValidationAlert().should('have.length', 4).within((alert) => {
      expect(alert.eq(0)).to.have.text('Invalid email')
      expect(alert.eq(1)).to.have.text('Invalid password (min. 8 characters)')
      expect(alert.eq(2)).to.have.text('Invalid password (min. 8 characters)')
      expect(alert.eq(3)).to.have.text('Name is required')
    })
  })
  it('Submiting form with valid email only', () => {
    createAccount.getEmail().type(userEmail)
    createAccount.getSubmitButton().click()
    createAccount.getValidationAlert().should('have.length', 3).within((alert) => {
      expect(alert.eq(0)).to.have.text('Invalid password (min. 8 characters)')
      expect(alert.eq(1)).to.have.text('Invalid password (min. 8 characters)')
      expect(alert.eq(2)).to.have.text('Name is required')
    })
  })
  it('Submiting form with valid email and password with lest than 8 characters', () => {
    createAccount.getEmail().type(userEmail)
    createAccount.getPassword().type('123')
    createAccount.getSubmitButton().click()
    createAccount.getValidationAlert().should('have.length', 3).within((alert) => {
      expect(alert.eq(0)).to.have.text('Invalid password (min. 8 characters)')
      expect(alert.eq(1)).to.have.text('Invalid password (min. 8 characters)')
      expect(alert.eq(2)).to.have.text('Name is required')
    })
  })
  it('Submiting form with valid email and password with 8 characters but no number', () => {
    createAccount.getEmail().type(userEmail)
    createAccount.getPassword().type('asdasdasd')
    createAccount.getSubmitButton().click()
    createAccount.getValidationAlert().should('have.length', 3).within((alert) => {
      expect(alert.eq(0)).to.have.text('Invalid password (1 numbers is required)')
      expect(alert.eq(1)).to.have.text('Invalid password (min. 8 characters)')
      expect(alert.eq(2)).to.have.text('Name is required')
    })
  })
  it('Submiting form with valid email and passwords don\'t match', () => {
    createAccount.getEmail().type(userEmail)
    createAccount.getPassword().type(password)
    createAccount.getConfirmPassword().type('123123asd')
    createAccount.getSubmitButton().click()
    createAccount.getValidationAlert().should('have.length', 2).within((alert) => {
      expect(alert.eq(0)).to.have.text('Passwords don\'t match')
      expect(alert.eq(1)).to.have.text('Name is required')
    })
  })
  it('Submiting form without name', () => {
    createAccount.getEmail().type(userEmail)
    createAccount.getPassword().type(password)
    createAccount.getConfirmPassword().type(password)
    createAccount.getSubmitButton().click()
    createAccount.getValidationAlert().should('have.length', 1).within((alert) => {
      expect(alert.eq(0)).to.have.text('Name is required')
    })
  })
  it('Submiting form with taken email', () => {
    createAccount.getEmail().type(userEmail)
    createAccount.getPassword().type(password)
    createAccount.getConfirmPassword().type(password)
    createAccount.getName().type('Test Name')
    createAccount.getSubmitButton().click()
    createAccount.getValidationAlert().should('have.length', 1).within((alert) => {
      expect(alert.eq(0)).to.have.text('Email has already been taken')
    })
  })
})
