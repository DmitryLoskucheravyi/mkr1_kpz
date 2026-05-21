export class BFSIterator {
    constructor(root) {
        this.queue = [root]
    }

    hasNext() {
        return this.queue.length > 0
    }

    next() {
        if (!this.hasNext()) {
            return null
        }

        const current = this.queue.shift()

        for (const child of current.children) {
            this.queue.push(child)
        }

        return current
    }
}