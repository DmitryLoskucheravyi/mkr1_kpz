import { ElementState } from './ElementState'

export class VisibleState extends ElementState {
    render(element) {
        const childrenHtml = element.children
            .map(child => child.render())
            .join('')

        return `
            <${element.tagName}>
                ${element.text}
                ${childrenHtml}
            </${element.tagName}>
        `
    }
}