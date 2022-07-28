export class ManageUsersPage {
  getTableColumnTitles () {
    return cy.get('table tr:nth-child(1) th')
  }
}
