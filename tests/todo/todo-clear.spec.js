const test = require('../../src/fixtures/common-fixture')
const { expect } = require('@playwright/test')
const TodoPage = require('../../src/pages/todo-page')
const { LISTA_TAREFA } = require('../../src/consts/consts')

test.describe("Limpeza e delecao @clear", () => {
    test.beforeEach( async ({ page }) => {
        const todoPage = new TodoPage(page)
            for (const tarefa of LISTA_TAREFA) {
                await todoPage.create(tarefa);
            }
    })

    test("Realizar limpeza de uma tarefa finalizada", async ({page}) => {
        await test.step("Realizo check na tarefa", async () => {
            const todoPage = new TodoPage(page)
            await todoPage.toggleCheckTodo(2,"check")
        })
        await test.step("Excluo a tarefa completada pelo botao", async () => {
            await page.locator("button[class='destroy']").nth(2).click()
        })
        await test.step("Valido tarefa excluida", async () => {
            await expect(page.getByText(LISTA_TAREFA[2])).not.toBeVisible();
        })
    })
    
    test("Realizar limpeza da lista de tarefas completadas", async ({page}) => {
        await test.step("Clicando no botao de checkar todos", async () => {
            const todoPage = new TodoPage(page)
            await todoPage.checkAll()
        })
        await test.step("Clicando no botao de limpar todos completados", async () => {
            await page.click("text=Clear completed")
        })
        await test.step("Validar tarefas excluidas", async () => {
            for (const tarefa of LISTA_TAREFA) {
                await expect(page.getByText(tarefa)).not.toBeVisible();
            }
        })
     })
})