import { BaseHtmlElement } from './BaseHtmlElement'
import { VisibleState } from '../patterns/state/VisibleState'

export class HtmlElement extends BaseHtmlElement {
    constructor(tagName) {
        super(tagName)

        this.state = new VisibleState()
    }

    setState(state) {
        this.state = state
    }

    render() {
        this.beforeRender()

        const html = this.state.render(this)

        this.afterRender()

        return html
    }

    accept(visitor) {
        visitor.visit(this)

        for (const child of this.children) {
            child.accept(visitor)
        }
    }
}