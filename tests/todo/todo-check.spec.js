const test = require('../../src/fixtures/common-fixture')
const { expect } = require('@playwright/test')
const TodoPage = require('../../src/pages/todo-page')
const { LISTA_TAREFA } = require('../../src/consts/consts')

test.describe("Check de tarefa @check", () => {
    test.beforeEach( async ({ page }) => {
        const todoPage = new TodoPage(page)
            for (const tarefa of LISTA_TAREFA) {
                await todoPage.create(tarefa);
            }
    })

    test("Realizar o check de uma tarefa", async ({page}) => {
        const todoPage = new TodoPage(page)
        await todoPage.toggleCheckTodo(2,"check")
        await expect(page.locator("input[ng-model='todo.completed']").nth(2)).toBeChecked()
    })

    test("Realizar o check de todos os items da lista de tarefa", async ({page}) => {
        await test.step("Clicando no botao de checkar todos", async () => {
            const todoPage = new TodoPage(page)
            await todoPage.checkAll()
        })
        await test.step("Validando cada checkbox preenchida", async () => {
            for(var i = 0; i < LISTA_TAREFA.length; i++) {
                await expect(page.locator("input[ng-model='todo.completed']").nth(i)).toBeChecked()
            }
        })
    })

    test("Remover o check de todos os items da lista de tarefa", async ({page}) => {
        const todoPage = new TodoPage(page)
        await test.step("Clicando no botao de checkar todos", async () => {
            await todoPage.checkAll()
        })
        await test.step("Removendo cada checkbox clicado", async () => {
            for(var i = 0; i < LISTA_TAREFA.length; i++) {
                await todoPage.toggleCheckTodo(i,"uncheck")
            }
        })
        await test.step("Validando cada checkbox nao preenchida", async () => {
            for(var i = 0; i < LISTA_TAREFA.length; i++) {
                await expect(page.locator("input[ng-model='todo.completed']").nth(i)).not.toBeChecked()
            }
        })
    })
})