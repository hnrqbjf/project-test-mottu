const base = require('@playwright/test')

const test = base.test.extend({
  page: async ({ page, baseURL }, use) => {
    await page.goto(baseURL+"examples/angularjs/")
    await use(page)
  },
  
})

module.exports = test