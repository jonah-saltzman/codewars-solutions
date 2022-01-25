const LinkedList = function () {
	this.head = undefined
	this.tail = undefined
}

const Node = function (value, next) {
	this.value = value
	this.next = next
}

const Iterator = function* (head) {
	let currentNode = head
	while (currentNode) {
		const temp = currentNode
		currentNode = currentNode.next
		yield temp
	}
	return
}

LinkedList.prototype.prepend = function (value) {
	const empty = this.head === undefined
	const newNode = new Node(value, this.head)
	this.head = newNode
	if (empty) {
		this.tail = newNode
	}
}

LinkedList.prototype.removeFirst = function () {
	const length = this.length()
	const ret = this.head ? this.head.value : undefined
	this.head = this.head
		? this.head.next
			? this.head.next
			: undefined
		: undefined
	this.tail = length > 1 ? this.tail : undefined
	return ret
}

LinkedList.prototype.length = function () {
	let l = 0
	let currentNode = this.head
	while (currentNode) {
		l++
		currentNode = currentNode.next
	}
	return l
}

LinkedList.prototype.last = function () {
	const last = this.lastNode()
	return last ? last.value : undefined
}

LinkedList.prototype.lastNode = function () {
	let currentNode = this.head
	while (currentNode) {
		if (!currentNode.next) {
			return currentNode
		}
		currentNode = currentNode.next
	}
	return currentNode ? currentNode : undefined
}

LinkedList.prototype.append = function (value) {
	const newLast = new Node(value, undefined)
	if (this.head) {
		const last = this.lastNode()
		last.next = newLast
		this.tail = newLast
	} else {
		this.head = newLast
		this.tail = newLast
	}
}

LinkedList.prototype.newIterator = function () {
	return Iterator(this.head)
}

LinkedList.prototype.print = function (value) {
	for (const node of this.newIterator()) {
		console.log(node.value)
	}
}

LinkedList.prototype.includes = function (value) {
	for (const node of this.newIterator()) {
		if (node.value === value) {
			return true
		}
	}
	return false
}

LinkedList.prototype.insertAfter = function (target, value) {
	const targetNode = this._search(target)
	if (!targetNode) {
		return
	}
	const newNode = new Node(value, targetNode?.next)
	targetNode.next = newNode
	this.tail = this.lastNode()
}

LinkedList.prototype._search = function (value) {
	if (this.head) {
		let currentNode = this.head
		while (currentNode) {
			if (currentNode.value === value) {
				return currentNode
			}
			if (currentNode.next) {
				currentNode = currentNode.next
				continue
			} else {
				return undefined
			}
		}
	}
	return undefined
}

LinkedList.prototype.toString = function () {
	let str = ''
	for (const node of this.newIterator()) {
		str += node.value.toString()
	}
	console.log(str)
	return str
}

LinkedList.prototype.remove = function (value) {
	// Edge cases
	// If the list is empty, return
	if (!this.head) {
		return
	}
	// If the value to remove is the first element...
	if (this.head.value === value) {
		// and the only element, set head and tail to undefined
		if (this.length() === 1) {
			this.head = undefined
			this.tail = undefined
			return
		}
		// If there are other elements, make this.head = this.head.next & update the tail
		this.head = this.head.next
		this.tail = this.lastNode()
		return
	}
	const iterator = this.newIterator()
	let current = iterator.next()
	let next = iterator.next()
	while (!next.done) {
		if (next.value.value === value) {
			const newNext = iterator.next().value
			current.value.next = newNext
			this.tail = this.lastNode()
			break
		}
		current = next
		next = iterator.next()
	}
}
