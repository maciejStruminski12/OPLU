export class LibraryPage {
  navigate () {
    cy.visit('/library')
  }

  getTableColumnTitles () {
    return cy.get('table tr:nth-child(1) th')
  }

  getDocumentName (rowIndex) {
    return cy.get(`tbody>tr:nth-child(${rowIndex + 1}) > td:nth-child(1)`)
  }

  getEditButton (rowIndex) {
    return cy.get(`tbody>tr:nth-child(${rowIndex + 1}) > td:nth-child(1) button`)
  }

  getNameInput (rowIndex) {
    return cy.get(`tbody>tr:nth-child(${rowIndex + 1}) > td:nth-child(1) input`)
  }

  getCreatedBy (rowIndex) {
    return cy.get(`tbody>tr:nth-child(${rowIndex + 1}) > td:nth-child(4)`)
  }

  getLastEditedBy (rowIndex) {
    return cy.get(`tbody>tr:nth-child(${rowIndex + 1}) > td:nth-child(2)`)
  }

  getWitnesses (rowIndex) {
    return cy.get(`tbody>tr:nth-child(${rowIndex + 1}) > td:nth-child(6)`)
  }

  getDeleteButton (rowIndex) {
    return cy.get(`tbody>tr:nth-child(${rowIndex + 1}) > td:nth-child(7) button`)
  }

  getSubmitButton () {
    return cy.get('button[type="submit"]')
  }

  getDeleteModalButton () {
    return cy.contains('Yes, delete it')
  }
}
