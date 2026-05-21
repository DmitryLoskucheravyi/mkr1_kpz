import { HtmlElement } from './core/HtmlElement'

import { DFSIterator } from './patterns/iterator/DFSIterator'
import { BFSIterator } from './patterns/iterator/BFSIterator'

import { HiddenState } from './patterns/state/HiddenState'
import { LoadingState } from './patterns/state/LoadingState'

import { AppendChildCommand } from './patterns/command/AppendChildCommand'
import { CommandManager } from './patterns/command/CommandManager'

import { CountElementsVisitor } from './patterns/visitor/CountElementsVisitor'
import { TagStatisticsVisitor } from './patterns/visitor/TagStatisticsVisitor'

export function createApp() {

    const app = document.getElementById('app')

    app.innerHTML = `
        <h1>Behavioral Patterns HTML Engine</h1>

        <button id="dfsBtn">DFS Iterator</button>
        <button id="bfsBtn">BFS Iterator</button>
        <button id="hideBtn">Hidden State</button>
        <button id="loadingBtn">Loading State</button>
        <button id="undoBtn">Undo Command</button>
        <button id="visitorBtn">Visitor Stats</button>

        <div class="card">
            <h2>Rendered HTML</h2>
            <div id="render"></div>
        </div>

        <div class="log" id="log"></div>
    `

    const log = document.getElementById('log')

    // HTML TREE

    const root = new HtmlElement('div')
    root.setText('ROOT')

    const section = new HtmlElement('section')
    section.setText('SECTION')

    const paragraph = new HtmlElement('p')
    paragraph.setText('PARAGRAPH')

    root.appendChild(section)
    section.appendChild(paragraph)

    // COMMAND MANAGER

    const commandManager = new CommandManager()

    // RENDER

    function renderTree() {
        document.getElementById('render').innerText = root.render()
    }

    renderTree()

    // DFS ITERATOR

    document.getElementById('dfsBtn').onclick = () => {

        const iterator = new DFSIterator(root)

        let output = 'DFS Traversal:\n'

        while (iterator.hasNext()) {

            const element = iterator.next()

            output += `${element.tagName}\n`
        }

        log.innerText = output
    }

    // BFS ITERATOR

    document.getElementById('bfsBtn').onclick = () => {

        const iterator = new BFSIterator(root)

        let output = 'BFS Traversal:\n'

        while (iterator.hasNext()) {

            const element = iterator.next()

            output += `${element.tagName}\n`
        }

        log.innerText = output
    }

    // HIDDEN STATE

    document.getElementById('hideBtn').onclick = () => {

        section.setState(new HiddenState())

        renderTree()

        log.innerText = 'HiddenState applied'
    }

    // LOADING STATE

    document.getElementById('loadingBtn').onclick = () => {

        section.setState(new LoadingState())

        renderTree()

        log.innerText = 'LoadingState applied'
    }

    // COMMAND + UNDO

    document.getElementById('undoBtn').onclick = () => {

        const newElement = new HtmlElement('span')
        newElement.setText('NEW ELEMENT')

        const command = new AppendChildCommand(root, newElement)

        commandManager.execute(command)

        renderTree()

        log.innerText = 'Element added. Undo in 2 seconds...'

        setTimeout(() => {

            commandManager.undo()

            renderTree()

            log.innerText = 'Undo executed'

        }, 2000)
    }

    // VISITOR

    document.getElementById('visitorBtn').onclick = () => {

        const countVisitor = new CountElementsVisitor()
        const statsVisitor = new TagStatisticsVisitor()

        root.accept(countVisitor)
        root.accept(statsVisitor)

        log.innerText = `
Elements count: ${countVisitor.count}

Tag statistics:
${JSON.stringify(statsVisitor.stats, null, 2)}
        `
    }
}