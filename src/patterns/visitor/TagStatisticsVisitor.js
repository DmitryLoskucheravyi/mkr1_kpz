export class TagStatisticsVisitor {
    constructor() {
        this.stats = {}
    }

    visit(element) {
        const tag = element.tagName

        if (!this.stats[tag]) {
            this.stats[tag] = 0
        }

        this.stats[tag]++
    }
}