class Node {
	constructor(data) {
		this.data = data;
		this.next = null;
	}
}

class LinkedList {
	constructor() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}

	append(data) {
		const newNode = new Node(data);
		// If the list is empty
		if (this.head === null) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			// If the list is not empty
			this.tail.next = newNode;
			this.tail = newNode;
		}
		this.length++;
	}

	prepend(data) {
		const newNode = new Node(data);
		// If the list is empty
		if (this.head === null) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			// If the list is not empty
			newNode.next = this.head;
			this.head = newNode;
		}
		this.length++;
	}

	insert(data, index) {
		if (index < 0 || index > this.length) {
			console.error("Index out of bounds");
			return;
		}
		const newNode = new Node(data);

		// Insert at the beginning
		if (index === 0) {
			this.prepend(data);
			return;
		}
		// Insert at the end
		if (index === this.length) {
			this.append(data);
			return;
		}

		// Insert in the middle

		// find the leading node

		let count = 0;
		let leadingNode = this.head;

		while (count != index - 1) {
			leadingNode = leadingNode.next;
			count++;
		}
		// Adjust the pointers
		newNode.next = leadingNode.next;
		leadingNode.next = newNode;
		this.length++;
	}

	print() {
		const elements = [];
		let currentNode = this.head;

		while (currentNode) {
			elements.push(currentNode.data);
			currentNode = currentNode.next;
		}
		elements.push("null");
		console.log(elements.join(" -> "));
	}
}

// Example usage:
const list = new LinkedList();
list.append(10);
list.append(20);
list.append(30);

console.log("Linked List contents:");
list.print(); // Outputs: 10, 20, 30

list.prepend(5);
console.log("After prepending 5:");
list.print(); // Outputs: 5, 10, 20, 30

list.insert(15, 2);
console.log("After inserting 15 at index 2:");
list.print(); // Outputs: 5, 10, 15, 20, 30
