export class CommandManager {
    constructor() {
        this.history = []
    }

    execute(command) {
        command.execute()

        this.history.push(command)
    }

    undo() {
        const command = this.history.pop()

        if (command) {
            command.undo()
        }
    }
}