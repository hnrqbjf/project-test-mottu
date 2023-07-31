const test = require('../../src/fixtures/common-fixture')
const { expect } = require('@playwright/test')
const TodoPage = require('../../src/pages/todo-page')
const { LISTA_TAREFA } = require('../../src/consts/consts')

test.describe("Criar Todo @create", () => {
    test.beforeEach( async ({ page }) => {
        const todoPage = new TodoPage(page)
            for (const tarefa of LISTA_TAREFA) {
                await todoPage.create(tarefa);
            }
    })

    test("Inserir mais de uma tarefa na lista", async ({page}) => {
        await test.step("Validando Todos criados", async () => {
            for (const tarefa of LISTA_TAREFA) {
                await expect(page.getByText(tarefa)).toBeVisible();
            }
        })
        await test.step("Validando contador de tarefas", async () => {
            await expect(page.locator("span[class='todo-count'] > strong")).toHaveText(String(LISTA_TAREFA.length));
        })
    })
})