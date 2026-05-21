import { ElementState } from './ElementState'

export class LoadingState extends ElementState {
    render(element) {
        return `
            <div>
                Loading ${element.tagName}...
            </div>
        `
    }
}