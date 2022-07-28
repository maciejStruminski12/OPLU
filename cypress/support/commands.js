// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
Cypress.Commands.add('login', () => {
  cy.request({
    method: 'POST',
    url: 'https://api-staging.openphilology.eu/api/v1/users/sign_in',
    body: {
      user: {
        email: Cypress.env('userEmail'),
        password: Cypress.env('password')
      }
    }
  }).then((resp) => {
    cy.setCookie('accessToken', resp.headers.authorization)
  })
  cy.visit('/')
})
Cypress.Commands.add('createNewProject', (token) => {
  cy.fixture('Files/sample3.txt', 'base64').then((file) => {
    cy.request({
      method: 'POST',
      url: 'https://api-staging.openphilology.eu/api/v1/projects',
      headers: {
        Authorization: token

      },
      body: {
        project: {
          name: 'Cypress project',
          source_file: {
            data: 'data:text/plain;base64,' + file
          },
          default_witness: 'Ct',
          default_witness_name: 'John Doe'
        }
      }
    }).then((resp) => {
      cy.wrap(resp.body.id).as('id')
    })
  })
})
Cypress.Commands.add('deleteProject', (token, id) => {
  cy.request({
    method: 'DELETE',
    url: 'https://api-staging.openphilology.eu/api/v1/projects/' + id,
    headers: {
      Authorization: token
    }
  })
})
Cypress.Commands.add('getToken', () => {
  cy.getCookie('accessToken').then((token) => {
    cy.wrap(token.value)
  })
})

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
