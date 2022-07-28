const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://staging.openphilology.eu/',
    env: {
      userEmail: 'qatest@xfive.co',
      inactiveUserEmail: 'qatest+inactive@xfive.co',
      password: '123Asdasd'
    },
    setupNodeEvents (on, config) {
      // implement node event listeners here
    }
  }
})
