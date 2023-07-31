const test = require('../../src/fixtures/common-fixture')
const { expect } = require('@playwright/test')
const TodoPage = require('../../src/pages/todo-page')
const { LISTA_TAREFA } = require('../../src/consts/consts')

test.describe("Edicao de tarefas @edit", () => {
    test.beforeEach( async ({ page }) => {
        const todoPage = new TodoPage(page)
            for (const tarefa of LISTA_TAREFA) {
                await todoPage.create(tarefa);
            }
    })

    test("Edição de tarefa", async ({page}) => {
            const todoPage = new TodoPage(page)
            await test.step("Editar tarefa", async () => {
                await todoPage.editTodo(0,"teste edicao")
            })
            await test.step("Validar tarefa alterada", async () => {
                await expect(page.getByText("teste edicao")).toBeVisible();
            })
        })

    test("Edição de tarefa com texto vazio exclui o item", async ({page}) => {
            const todoPage = new TodoPage(page)
            await test.step("Editar tarefa", async () => {
                await todoPage.editTodo(0,"")
            })
            await test.step("Validar tarefa excluida", async () => {
                await expect(page.getByText("teste edicao")).not.toBeVisible();
            })
    })
})