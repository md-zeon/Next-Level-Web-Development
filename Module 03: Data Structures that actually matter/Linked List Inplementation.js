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
		return this; // For method chaining
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
		return this; // For method chaining
	}

	// Helper method to traverse to a specific index
	// _ Indicates that this is a private method and should not be used outside the class
	_traverseToIndex(index) {
		let count = 0;
		let currentNode = this.head;

		while (count !== index) {
			currentNode = currentNode.next;
			count++;
		}
		return currentNode;
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
			return this; // For method chaining
		}
		// Insert at the end
		if (index === this.length) {
			this.append(data);
			return this; // For method chaining
		}

		// Insert in the middle

		// find the leading node
		const leadingNode = this._traverseToIndex(index - 1);
		// Adjust the pointers
		const holdingNode = leadingNode.next;
		leadingNode.next = newNode;
		newNode.next = holdingNode;
		this.length++;
		return this; // For method chaining
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

console.log("Length of the list:", list.length); // Outputs: 5

// Chaining example
list.append(40).prepend(1).insert(25, 5);
console.log("After chaining operations:");
list.print(); // Outputs: 1, 5, 10, 15, 20, 25, 30, 40
console.log("Length of the list after chaining:", list.length); // Outputs: 8
