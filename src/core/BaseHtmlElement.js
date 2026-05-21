export class BaseHtmlElement {
    constructor(tagName) {
        this.tagName = tagName
        this.children = []
        this.text = ''

        this.onCreated()
    }

    appendChild(child) {
        this.children.push(child)

        this.onInserted(child)
    }

    removeChild(child) {
        this.children = this.children.filter(c => c !== child)

        this.onRemoved(child)
    }

    setText(text) {
        this.text = text

        this.onTextRendered()
    }

    render() {
        this.beforeRender()

        const html = this.renderElement()

        this.afterRender()

        return html
    }

    renderElement() {
        const childrenHtml = this.children
            .map(child => child.render())
            .join('')

        return `
            <${this.tagName}>
                ${this.text}
                ${childrenHtml}
            </${this.tagName}>
        `
    }

    beforeRender() {}
    afterRender() {}

    onCreated() {
        console.log(`${this.tagName} created`)
    }

    onInserted(child) {
        console.log(`${child.tagName} inserted into ${this.tagName}`)
    }

    onRemoved(child) {
        console.log(`${child.tagName} removed from ${this.tagName}`)
    }

    onTextRendered() {
        console.log(`Text rendered in ${this.tagName}`)
    }
}