import { Command } from './Command'

export class AppendChildCommand extends Command {
    constructor(parent, child) {
        super()

        this.parent = parent
        this.child = child
    }

    execute() {
        this.parent.appendChild(this.child)
    }

    undo() {
        this.parent.removeChild(this.child)
    }
}