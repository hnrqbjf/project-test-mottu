const test = require('../../src/fixtures/common-fixture')
const { expect } = require('@playwright/test')
const TodoPage = require('../../src/pages/todo-page')
const { LISTA_TAREFA } = require('../../src/consts/consts')

test.describe("Listagem de tarefa @list", () => {
    test.beforeEach( async ({ page }) => {
        const todoPage = new TodoPage(page)
            for (const tarefa of LISTA_TAREFA) {
                await todoPage.create(tarefa);
            }
    })
    
    test("Validar listagem de itens completados na pagina Completed", async ({page}) => {
        await test.step("Clicando no botao de checkar todos", async () => {
            const todoPage = new TodoPage(page)
            await todoPage.checkAll()
        })

        await test.step("Alterando para filtro Completed", async () => {
            await page.click("text=Completed")
        })

        await test.step("Validando cada tarefa checkada", async () => {
            for(var i = 0; i < LISTA_TAREFA.length; i++) {
                await expect(page.locator("input[ng-model='todo.completed']").nth(i)).toBeChecked()
            }
        })
    })

    test("Validar listagem de itens ativos na pagina Active", async ({page}) => {
        await test.step("Alterando para filtro Active", async () => {
            await page.click("text=Active")
        })

        await test.step("Validando cada tarefa sem check", async () => {
            for(var i = 0; i < LISTA_TAREFA.length; i++) {
                await expect(page.locator("input[ng-model='todo.completed']").nth(i)).not.toBeChecked()
            }
        })
    })
})