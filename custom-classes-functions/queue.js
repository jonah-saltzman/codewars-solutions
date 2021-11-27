class Queue {
	constructor() {
		this.items = []
	}
	enqueue = (item) => this.items.push(item)
	dequeue = () => this.isEmpty() ? false : this.items.shift()
	isEmpty = () => this.items.length === 0
    front = () => this.isEmpty() ? false : this.items[0]
    print = () => {
        let str = "["
        this.items.forEach(item => str += item.toString() + ", ")
        return str += "]"
    }
}