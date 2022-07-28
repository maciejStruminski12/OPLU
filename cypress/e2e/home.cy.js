/// <reference types="cypress" />

import { CreateNewEditionPage } from './PageObjects/CreateNewEditionPage'
import { Home } from './PageObjects/Home'
import { LibraryPage } from './PageObjects/LibraryPage'
import { ManageUsersPage } from './PageObjects/ManageUsersPage'

import { Nav } from './PageObjects/Nav'

const createNewEdition = new CreateNewEditionPage()
const home = new Home()
const nav = new Nav()
const manageUsers = new ManageUsersPage()
const library = new LibraryPage()

describe('Homepage tests', () => {
  beforeEach(() => {
    cy.login()
  })
  it('Clicking Create new edition button, takes user to Create new edition page', () => {
    home.getCreateNewEdition().click()
    nav.validateNav('Import file')
    createNewEdition.getFileInput().parent().should('be.visible')
    createNewEdition.getDocumentNameInput().should('be.visible')
    createNewEdition.getSubmitButton().should('be.visible')
  })
  it('Clicking Manage users button, takes user to manage users page', () => {
    home.getManageUsers().click()
    nav.validateNav('Manage users')
    manageUsers.getTableColumnTitles().within((title) => {
      expect(title.eq(0)).to.have.text('User')
      expect(title.eq(1)).to.have.text('Name')
      expect(title.eq(2)).to.have.text('Registration date')
      expect(title.eq(3)).to.have.text('Active')
    })
  })
  it('Clicking Go to library button, takes user to Library page', () => {
    home.getGoToLibrary().click()
    nav.validateNav('Library')
    library.getTableColumnTitles().within((title) => {
      expect(title.eq(0)).to.have.text('Document name')
      expect(title.eq(1)).to.have.text('Last edit by')
      expect(title.eq(2)).to.have.text('Last edit date')
      expect(title.eq(3)).to.have.text('Created by')
      expect(title.eq(4)).to.have.text('Creation date')
      expect(title.eq(5)).to.have.text('Witnesses')
      expect(title.eq(6)).to.have.text('Delete')
    })
  })
})
