class Stack {
    constructor() {
        this.items = []
    }
    isEmpty = () => this.items.length === 0
    push = (item) => this.items.unshift(item)
    pop = () => this.isEmpty() ? false : this.items.shift()
    peek = () => this.isEmpty() ? false : this.items[0]
    print = () => {
        let str = '['
        this.items.forEach(item => str += item.toString() + ', ')
        return str += ']'
    }
}