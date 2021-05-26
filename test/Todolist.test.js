const Todolist = artifacts.require('Todolist.sol')

contract('Todolist', (accounts) => {
    before(async () => {
        this.todolist = await Todolist.deployed()
    })

    it('deploys successfully', async () => {
        const address = await this.todolist.address

        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
    })

    it('lists tasks', async () => {
        const taskcount = await this.todolist.taskcount()
        const task = await this.todolist.tasks(taskcount)

        assert.equal(task.id.toNumber(), taskcount.toNumber())

        assert.equal(task.content, 'buy more ethereum!')
        assert.equal(task.completed, false)
        assert.equal(taskcount.toNumber(), 1)
    })

    it('creates tasks', async () => {
        const result = await this.todolist.createTask('a new task')
        const taskcount = await this.todolist.taskcount()
        assert.equal(taskcount, 2)

        const event = result.logs[0].args
        assert.equal(event.id.toNumber(), 2)
        assert.equal(event.content, 'a new task')
        assert.equal(event.completed, false)    
    })

    it('toggles task completion', async () => {
        const result = await this.todolist.toggleCompleted(1)
        const task = await this.todolist.tasks(1)
        assert.equal(task.completed, true)

        const event = result.logs[0].args
        assert.equal(event.id.toNumber(), 1)
        assert.equal(event.completed, true)
    })

})