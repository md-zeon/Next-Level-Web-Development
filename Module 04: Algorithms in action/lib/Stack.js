class Node {
	constructor(data) {
		this.data = data;
		this.next = null;
	}
}

class Stack {
	constructor() {
		this.head = null;
		this.tail = null;
		this.size = 0;
	}

	// insert data at the top of the stack
	push(data) {
		// O(1) time complexity
		const newNode = new Node(data);
		// If stack is empty
		if (this.size === 0) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			newNode.next = this.head;
			this.head = newNode;
		}
		this.size++;
		return this;
	}

	// remove data from the top of the stack
	pop() {
		// O(1) time complexity
		if (this.size === 0) {
			console.log("Stack Underflow: Cannot pop from an empty stack.");
			return null;
		}
		const poppedNode = this.head;
		this.head = this.head.next;
		this.size--;

		// If stack becomes empty after pop
		if (this.size === 0) {
			this.tail = null;
		}

		return poppedNode.data;
	}

	// return the top data of the stack
	peek() {
		// O(1) time complexity
		if (this.size === 0) return null;
		return this.head.data;
	}

	isEmpty() {
		return this.size === 0;
	}

	getSize() {
		return this.size;
	}

	print() {
		// O(n) time complexity
		let current = this.head;
		console.log("---------");

		while (current) {
			console.log("|   " + current.data + "   |");
			console.log("---------");
			current = current.next;
		}
		console.log(this.size + " item(s)");
	}

	clear() {
		this.head = null;
		this.tail = null;
		this.size = 0;
	}
}

export default Stack;
