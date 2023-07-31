const { LISTA_TAREFA } = require('../consts/consts')

class TodoPage {
    constructor(page){
        this.page = page
    }

    _inputTodo = "input[ng-model='newTodo']"
    _inputCheckAll = "label[for='toggle-all']"
    _inputCheck = "input[ng-model='todo.completed']"
    _inputEditTodo = "input[ng-model='todo.title']"

    async create(tarefa) {
        await this.page.fill(this._inputTodo,tarefa)
        await this.page.keyboard.press('Enter');
    }
    
    async checkAll() {
        await this.page.click(this._inputCheckAll)
    }

    async filter () {
        await this.page.click(this._inputCheckAll)
    }

    async toggleCheckTodo(elementIndex,action){
        if (action == "check") {
            await this.page.locator(this._inputCheck).nth(elementIndex).check()
            return
        }
        await this.page.locator(this._inputCheck).nth(elementIndex).uncheck()
    }

    async editTodo(elementIndex,value){
        await this.page.dblclick(`text=${LISTA_TAREFA[elementIndex]}`)
        await this.page.locator(this._inputEditTodo).nth(elementIndex).fill(value)
        await this.page.keyboard.press('Enter');
    }
}

module.exports = TodoPage