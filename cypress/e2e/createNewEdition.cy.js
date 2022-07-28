/// <reference types="cypress" />

import { CreateNewEditionPage } from './PageObjects/CreateNewEditionPage'

const createNewEdition = new CreateNewEditionPage()

describe('Create New Edition tests', () => {
  beforeEach(() => {
    cy.login()
    createNewEdition.navigate()
  })

  it('Submitting empty form', () => {
    createNewEdition.getSubmitButton().click()
    createNewEdition.getValidationAlert().should('have.length', 1).within((alert) => {
      expect(alert.eq(0)).to.have.text('String must contain at least 1 character(s)')
    })
  })
  it('Submitting form with document name (no file)', () => {
    createNewEdition.getDocumentNameInput().type('test document')
    createNewEdition.getSubmitButton().click()
    createNewEdition.getValidationAlert().should('have.length', 1).within((alert) => {
      expect(alert.eq(0)).to.have.text('Please select a file to proceed with upload')
    })
  })
  it('Select file other than txt or json', () => {
    createNewEdition.getDocumentNameInput().type('test document')
    createNewEdition.getFileInput().selectFile('cypress/fixtures/Files/test.csv', { force: true })
    createNewEdition.getValidationAlert().should('have.length', 1).within((alert) => {
      expect(alert.eq(0)).to.have.text('Incorrect file format')
    })
  })
  it('Select txt file and submit empty form', () => {
    createNewEdition.getFileInput().selectFile('cypress/fixtures/Files/sample3.txt', { force: true })
    createNewEdition.getFileInput().invoke('val').then((val) => {
      expect(val).to.include('sample3.txt')
    })
    createNewEdition.getDocumentNameInput().should('be.visible')
    createNewEdition.getSubmitButton().should('be.visible')
    createNewEdition.getWitnessNameInput().should('be.visible')
    createNewEdition.getSiglumInput().should('be.visible')
    createNewEdition.getSubmitButton().click()
    createNewEdition.getValidationAlert().should('have.length', 2).within((alert) => {
      expect(alert.eq(0)).to.have.text('String must contain at least 1 character(s)')
      expect(alert.eq(1)).to.have.text('String must contain at least 1 character(s)')
    })
  })
  it('Select json file and submit empty form', () => {
    createNewEdition.getFileInput().selectFile('cypress/fixtures/Files/sample1.json', { force: true })
    createNewEdition.getFileInput().invoke('val').then((val) => {
      expect(val).to.include('sample1.json')
    })
    createNewEdition.getDocumentNameInput().should('be.visible')
    createNewEdition.getSubmitButton().should('be.visible')
    createNewEdition.getWitnessNameInput().should('not.exist')
    createNewEdition.getSiglumInput().should('not.exist')
    createNewEdition.getSubmitButton().click()
    createNewEdition.getValidationAlert().should('have.length', 1).within((alert) => {
      expect(alert.eq(0)).to.have.text('String must contain at least 1 character(s)')
    })
  })
})
