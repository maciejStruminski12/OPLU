export class CreateNewEditionPage {
  navigate () {
    cy.visit('/import-file')
  }

  getFileInput () {
    return cy.get('input[type="file"]')
  }

  getDocumentNameInput () {
    return cy.get('input[name="name"]')
  }

  getWitnessNameInput () {
    return cy.get('input[name="default_witness_name"]')
  }

  getSiglumInput () {
    return cy.get('input[name="default_witness"]')
  }

  getSubmitButton () {
    return cy.get('button[type="submit"]')
  }

  getValidationAlert () {
    return cy.get('span[role=alert]')
  }
}
