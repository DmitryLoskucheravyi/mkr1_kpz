import { Command } from './Command'

export class RemoveChildCommand extends Command {
    constructor(parent, child) {
        super()

        this.parent = parent
        this.child = child
    }

    execute() {
        this.parent.removeChild(this.child)
    }

    undo() {
        this.parent.appendChild(this.child)
    }
}