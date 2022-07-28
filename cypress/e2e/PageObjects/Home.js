export class Home {
  getContinueEditing () {
    return cy.get('a').contains('Continue editing')
  }

  getCreateNewEdition () {
    return cy.get('a').contains('Create new edition')
  }

  getGoToLibrary () {
    return cy.get('a').contains('Go to library')
  }

  getManageUsers () {
    return cy.get('a').contains('Manage users')
  }
}
