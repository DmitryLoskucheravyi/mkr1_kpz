export class CountElementsVisitor {
    constructor() {
        this.count = 0
    }

    visit() {
        this.count++
    }
}