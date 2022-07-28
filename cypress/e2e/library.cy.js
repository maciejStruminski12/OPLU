/// <reference types="cypress" />

import { LibraryPage } from './PageObjects/LibraryPage'
import { Nav } from './PageObjects/Nav'

const library = new LibraryPage()
const nav = new Nav()

describe('Manage users tests', () => {
  beforeEach(() => {
    cy.login()
    cy.getToken().as('token')
    cy.get('@token').then((token) => {
      cy.createNewProject(token)
    })
    library.navigate()
  })
  it('Change name', () => {
    library.getEditButton(0).click()
    library.getLastEditedBy(0).should('contain', 'N/A')
    library.getNameInput(0).clear().type('Cypress edited')
    library.getSubmitButton().click()
    nav.vailidateToast('Project name updated successfully')
    library.getDocumentName(0).should('contain', 'Cypress edited')
    library.getLastEditedBy(0).should('contain', 'QATest')
    library.getWitnesses(0).should('contain', '1')
    library.getCreatedBy(0).should('contain', 'QATest')
    cy.get('@token').then((token) => {
      cy.get('@id').then((id) => {
        cy.deleteProject(token, id)
      })
    })
  })
  it('Delete project', () => {
    library.getDocumentName(0).should('contain', 'Cypress project')
    library.getDeleteButton(0).click()
    library.getDeleteModalButton().click()
    nav.vailidateToast('Record successfully deleted')
    library.getDocumentName(0).should('not.contain', 'Cypress project')
  })
})
