# Behavioral HTML Engine

Освітній проект, що демонструє реалізацію **поведінкових паттернів проектування** на базі простого HTML-движка.

## Опис

**Behavioral HTML Engine** — це TypeScript/JavaScript проект, який показує практичне застосування основних поведінкових паттернів:
- **Iterator Pattern** — обхід HTML-дерева
- **State Pattern** — управління станом елементів
- **Command Pattern** — команди з історією undo/redo
- **Visitor Pattern** — аналіз та статистика по елементам
- **Template Method Pattern** — життєвий цикл елементів

## Структура проекту

```
behavioral-html-engine/
├── index.html              # Головна сторінка
├── package.json            # Конфігурація проекту
├── vite.config.js          # Конфігурація Vite
├── public/                 # Статичні файли
└── src/                    # Вихідний код
    ├── main.js             # Точка входу
    ├── app.js              # Основна програма
    ├── counter.js          # Приклади лічильників
    ├── style.css           # Стилі
    ├── assets/             # Ресурси
    ├── core/               # Ядро фреймворку
    │   ├── BaseHtmlElement.js # Базовий клас
    │   ├── HtmlDocument.js    # HTML документ
    │   └── HtmlElement.js     # HTML елемент
    └── patterns/           # Поведінкові паттерни
        ├── command/        # Паттерн "Команда"
        │   ├── Command.js
        │   ├── CommandManager.js
        │   ├── AppendChildCommand.js
        │   └── RemoveChildCommand.js
        ├── iterator/       # Паттерн "Ітератор"
        │   ├── DFSIterator.js      # Пошук у глибину
        │   └── BFSIterator.js      # Пошук у ширину
        ├── state/          # Паттерн "Стан"
        │   ├── ElementState.js
        │   ├── HiddenState.js  # Стан приховування
        │   ├── LoadingState.js # Стан завантаження
        │   └── VisibleState.js # Видимий стан
        ├── template-method/ # Паттерн "Шаблонний метод"
        │   └── LifecycleElement.js
        └── visitor/        # Паттерн "Відвідувач"
            ├── CountElementsVisitor.js     # Лічення елементів
            └── TagStatisticsVisitor.js     # Статистика тегів
```

## Паттерни проектування

### 1. **Iterator Pattern** (Ітератор)
Дозволяє послідовно обходити елементи HTML-дерева.

**Реалізація:**
- `DFSIterator` — пошук у глибину (Depth-First Search)
- `BFSIterator` — пошук у ширину (Breadth-First Search)

**Використання:**
```javascript
const iterator = new DFSIterator(rootElement)
while (iterator.hasNext()) {
    const element = iterator.next()
    console.log(element.tagName)
}
```

---

### 2. **State Pattern** (Стан)
Дозволяє об'єкту змінювати свою поведінку в залежності від внутрішнього стану.

**Реалізація:**
- `VisibleState` — видимий стан (за замовчуванням)
- `HiddenState` — приховування елемента
- `LoadingState` — стан завантаження (показує анімацію)

**Використання:**
```javascript
element.setState(new HiddenState())  // Елемент приховується
element.setState(new LoadingState()) // Показує індикатор завантаження
```

---

### 3. **Command Pattern** (Команда)
Інкапсулює запит у вигляді об'єкта, дозволяючи параметризувати клієнтів з запитами та реалізувати undo/redo.

**Реалізація:**
- `Command` — базовий интерфейс команди
- `AppendChildCommand` — добавити дочірній елемент
- `RemoveChildCommand` — видалити дочірній елемент
- `CommandManager` — менеджер команд з історією

**Використання:**
```javascript
const manager = new CommandManager()
const command = new AppendChildCommand(parent, child)
manager.execute(command)      // Виконати команду
manager.undo()                // Скасувати останню команду
```

---

### 4. **Visitor Pattern** (Відвідувач)
Представляє операцію, яку потрібно виконати над елементами структури об'єктів.

**Реалізація:**
- `CountElementsVisitor` — лічення всіх елементів у дереві
- `TagStatisticsVisitor` — збір статистики про використані теги

**Використання:**
```javascript
const visitor = new CountElementsVisitor()
root.accept(visitor)  // Відвідує всі елементи
console.log(visitor.getCount())  // Отримати результат
```

---

### 5. **Template Method Pattern** (Шаблонний метод)
Визначає загальну структуру алгоритму, залишаючи частини деталізації для підклассів.

**Реалізація:**
- `LifecycleElement` — елемент з крючками життєвого циклу

**Методи-крючки:**
- `onCreated()` — викликається при створенні
- `onInserted(child)` — викликається при додаванні дочірнього елемента
- `onRemoved(child)` — викликається при видаленні дочірнього елемента
- `beforeRender()` — викликається перед рендеренням
- `afterRender()` — викликається після рендеренням

---

## Встановлення та запуск

### Вимоги
- Node.js (версія 14+)
- npm або yarn

### Встановлення
```bash
# Клонувати репозиторій
git clone <URL-репозиторію>
cd behavioral-html-engine

# Встановити залежності
npm install
```

### Запуск в режимі розробки
```bash
npm run dev
```
Проект буде доступний на `http://localhost:5173`

### Побудова для виробництва
```bash
npm run build
```

### Перегляд збудованого проекту
```bash
npm run preview
```

---

## Функціонал

Додаток демонструє роботу всіх паттернів через інтерактивні кнопки:

| Кнопка | Функціонал |
|--------|-----------|
| **DFS Iterator** | Обхід дерева в глибину |
| **BFS Iterator** | Обхід дерева в ширину |
| **Hidden State** | Приховати елемент |
| **Loading State** | Показати стан завантаження |
| **Undo Command** | Скасувати останню команду |
| **Visitor Stats** | Показати статистику елементів |

---

## Основні класи

### `BaseHtmlElement`
Базовий клас для всіх HTML-елементів.
- `appendChild(child)` — додати дочірній елемент
- `removeChild(child)` — видалити дочірній елемент
- `setText(text)` — встановити текст
- `render()` — отримати HTML-представлення
- Крючки життєвого циклу

### `HtmlElement`
Стандартний HTML-елемент, спадкоємець `BaseHtmlElement`.

### `HtmlDocument`
Представляє HTML-документ.

---

## Технологічний стек

- **JavaScript (ES6+)** — мова програмування
- **Vite** — інструмент збірки
- **HTML5** — розмітка
- **CSS3** — стилізація

---

## Корисні ресурси

- [Паттерни проектування (GoF)](https://refactoring.guru/uk/design-patterns)
- [Refactoring.Guru — Паттерни](https://refactoring.guru/uk/design-patterns)
- [Iterator Pattern](https://refactoring.guru/uk/design-patterns/iterator)
- [State Pattern](https://refactoring.guru/uk/design-patterns/state)
- [Command Pattern](https://refactoring.guru/uk/design-patterns/command)
- [Visitor Pattern](https://refactoring.guru/uk/design-patterns/visitor)

---

## Приклади використання

### Створення простого дерева елементів
```javascript
const root = new HtmlElement('div')
const section = new HtmlElement('section')
const paragraph = new HtmlElement('p')

root.appendChild(section)
section.appendChild(paragraph)
```

### Виконання команди з можливістю undo
```javascript
const manager = new CommandManager()
const command = new AppendChildCommand(root, newChild)
manager.execute(command)
manager.undo() // Скасувати додавання
```

### Обхід елементів за допомогою ітератора
```javascript
const dfs = new DFSIterator(root)
const bfs = new BFSIterator(root)

// DFS обхід
while (dfs.hasNext()) {
    console.log(dfs.next().tagName)
}
```

---

## Ліцензія

Цей проект створений в навчальних цілях і розповсюджується вільно.

---

## Контрибьютори

Освітній проект для вивчення поведінкових паттернів проектування.

---
