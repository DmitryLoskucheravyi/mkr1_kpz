export class DFSIterator {
    constructor(root) {
        this.stack = [root]
    }

    hasNext() {
        return this.stack.length > 0
    }

    next() {
        if (!this.hasNext()) {
            return null
        }

        const current = this.stack.pop()

        for (let i = current.children.length - 1; i >= 0; i--) {
            this.stack.push(current.children[i])
        }

        return current
    }
}