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

	remove(index) {
		if (index < 0 || index >= this.length) {
			console.error("Index out of bounds");
			return;
		}
		// Remove from beginning
		if (index === 0) {
			this.head = this.head.next;
			// If the list had only one node
			if (this.length === 1) {
				this.tail = null;
			}
			this.length--;
			return this; // For method chaining
		}

		// Remove from middle
		const leadingNode = this._traverseToIndex(index - 1);
		const removedNode = leadingNode.next;
		leadingNode.next = removedNode.next;
		// If removing the tail
		if (index === this.length - 1) {
			this.tail = leadingNode;
		}
		this.length--;
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

	clear() {
		this.head = null;
		this.tail = null;
		this.length = 0;
		return this; // For method chaining
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

// Remove example
list.remove(3);
console.log("After removing element at index 3:");
list.print(); // Outputs: 1, 5, 10, 20, 25, 30, 40
list.remove(0);
console.log("After removing element at index 0:");
list.print(); // Outputs: 5, 10, 20, 25, 30, 40
list.remove(list.length - 1);
console.log("After removing last element:");
list.print(); // Outputs: 5, 10, 20, 25, 30
console.log("Length of the list after removal:", list.length); // Outputs: 7
// Clear example
list.clear();
console.log("After clearing the list:");
list.print(); // Outputs: null
console.log("Length of the list after clearing:", list.length); // Outputs: 0

// ==========================================
// DOUBLY LINKED LIST IMPLEMENTATION
// ==========================================

class DoublyNode {
	constructor(data) {
		this.data = data;
		this.next = null;
		this.prev = null;
	}
}

class DoublyLinkedList {
	constructor() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}

	append(data) {
		const newNode = new DoublyNode(data);
		if (this.head === null) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			this.tail.next = newNode;
			newNode.prev = this.tail;
			this.tail = newNode;
		}
		this.length++;
		return this;
	}

	prepend(data) {
		const newNode = new DoublyNode(data);
		if (this.head === null) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			newNode.next = this.head;
			this.head.prev = newNode;
			this.head = newNode;
		}
		this.length++;
		return this;
	}

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
		const newNode = new DoublyNode(data);

		if (index === 0) {
			this.prepend(data);
			return this;
		}
		if (index === this.length) {
			this.append(data);
			return this;
		}

		const leadingNode = this._traverseToIndex(index - 1);
		const followingNode = leadingNode.next;

		leadingNode.next = newNode;
		newNode.prev = leadingNode;
		newNode.next = followingNode;
		followingNode.prev = newNode;

		this.length++;
		return this;
	}

	remove(index) {
		if (index < 0 || index >= this.length) {
			console.error("Index out of bounds");
			return;
		}

		if (index === 0) {
			this.head = this.head.next;
			if (this.head) {
				this.head.prev = null;
			} else {
				this.tail = null;
			}
			this.length--;
			return this;
		}

		if (index === this.length - 1) {
			this.tail = this.tail.prev;
			this.tail.next = null;
			this.length--;
			return this;
		}

		const nodeToRemove = this._traverseToIndex(index);
		const prevNode = nodeToRemove.prev;
		const nextNode = nodeToRemove.next;

		prevNode.next = nextNode;
		nextNode.prev = prevNode;

		this.length--;
		return this;
	}

	print() {
		const elements = [];
		let currentNode = this.head;
		while (currentNode) {
			elements.push(currentNode.data);
			currentNode = currentNode.next;
		}
		elements.push("null");
		console.log(elements.join(" <-> "));
	}

	printReverse() {
		const elements = [];
		let currentNode = this.tail;
		while (currentNode) {
			elements.push(currentNode.data);
			currentNode = currentNode.prev;
		}
		elements.push("null");
		console.log(elements.join(" <-> "));
	}

	clear() {
		this.head = null;
		this.tail = null;
		this.length = 0;
		return this;
	}
}

// Example usage for Doubly Linked List:
console.log("\n=== Doubly Linked List Examples ===");
const doublyList = new DoublyLinkedList();
doublyList.append(10);
doublyList.append(20);
doublyList.append(30);
console.log("Doubly Linked List contents:");
doublyList.print(); // Outputs: 10 <-> 20 <-> 30 <-> null

doublyList.prepend(5);
console.log("After prepending 5:");
doublyList.print(); // Outputs: 5 <-> 10 <-> 20 <-> 30 <-> null

doublyList.insert(15, 2);
console.log("After inserting 15 at index 2:");
doublyList.print(); // Outputs: 5 <-> 10 <-> 15 <-> 20 <-> 30 <-> null

console.log("Reverse order:");
doublyList.printReverse(); // Outputs: 30 <-> 20 <-> 15 <-> 10 <-> 5 <-> null

doublyList.remove(2);
console.log("After removing element at index 2:");
doublyList.print(); // Outputs: 5 <-> 10 <-> 20 <-> 30 <-> null

// ==========================================
// CIRCULAR LINKED LIST IMPLEMENTATION
// ==========================================

class CircularLinkedList {
	constructor() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}

	append(data) {
		const newNode = new Node(data);
		if (this.head === null) {
			this.head = newNode;
			this.tail = newNode;
			newNode.next = this.head; // Point to itself
		} else {
			this.tail.next = newNode;
			newNode.next = this.head; // Point back to head
			this.tail = newNode;
		}
		this.length++;
		return this;
	}

	prepend(data) {
		const newNode = new Node(data);
		if (this.head === null) {
			this.head = newNode;
			this.tail = newNode;
			newNode.next = this.head;
		} else {
			newNode.next = this.head;
			this.head = newNode;
			this.tail.next = this.head; // Update tail to point to new head
		}
		this.length++;
		return this;
	}

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

		if (index === 0) {
			this.prepend(data);
			return this;
		}
		if (index === this.length) {
			this.append(data);
			return this;
		}

		const leadingNode = this._traverseToIndex(index - 1);
		newNode.next = leadingNode.next;
		leadingNode.next = newNode;

		this.length++;
		return this;
	}

	remove(index) {
		if (index < 0 || index >= this.length) {
			console.error("Index out of bounds");
			return;
		}

		if (index === 0) {
			if (this.length === 1) {
				this.head = null;
				this.tail = null;
			} else {
				this.head = this.head.next;
				this.tail.next = this.head;
			}
			this.length--;
			return this;
		}

		const leadingNode = this._traverseToIndex(index - 1);
		const nodeToRemove = leadingNode.next;

		if (index === this.length - 1) {
			this.tail = leadingNode;
		}

		leadingNode.next = nodeToRemove.next;
		this.length--;
		return this;
	}

	print() {
		if (this.head === null) {
			console.log("null");
			return;
		}
		const elements = [];
		let currentNode = this.head;
		let count = 0;
		do {
			elements.push(currentNode.data);
			currentNode = currentNode.next;
			count++;
		} while (currentNode !== this.head && count < this.length + 1); // Prevent infinite loop
		elements.push("(back to " + this.head.data + ")");
		console.log(elements.join(" -> "));
	}

	clear() {
		this.head = null;
		this.tail = null;
		this.length = 0;
		return this;
	}
}

// Example usage for Circular Linked List:
console.log("\n=== Circular Linked List Examples ===");
const circularList = new CircularLinkedList();
circularList.append(10);
circularList.append(20);
circularList.append(30);
console.log("Circular Linked List contents:");
circularList.print(); // Outputs: 10 -> 20 -> 30 -> (back to 10)

circularList.prepend(5);
console.log("After prepending 5:");
circularList.print(); // Outputs: 5 -> 10 -> 20 -> 30 -> (back to 5)

circularList.insert(15, 2);
console.log("After inserting 15 at index 2:");
circularList.print(); // Outputs: 5 -> 10 -> 15 -> 20 -> 30 -> (back to 5)

circularList.remove(2);
console.log("After removing element at index 2:");
circularList.print(); // Outputs: 5 -> 10 -> 20 -> 30 -> (back to 5)

// ==========================================
// DOUBLY CIRCULAR LINKED LIST IMPLEMENTATION
// ==========================================

class DoublyCircularLinkedList {
	constructor() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}

	append(data) {
		const newNode = new DoublyNode(data);
		if (this.head === null) {
			this.head = newNode;
			this.tail = newNode;
			newNode.next = this.head;
			newNode.prev = this.head;
		} else {
			this.tail.next = newNode;
			newNode.prev = this.tail;
			newNode.next = this.head;
			this.head.prev = newNode;
			this.tail = newNode;
		}
		this.length++;
		return this;
	}

	prepend(data) {
		const newNode = new DoublyNode(data);
		if (this.head === null) {
			this.head = newNode;
			this.tail = newNode;
			newNode.next = this.head;
			newNode.prev = this.head;
		} else {
			newNode.next = this.head;
			newNode.prev = this.tail;
			this.head.prev = newNode;
			this.tail.next = newNode;
			this.head = newNode;
		}
		this.length++;
		return this;
	}

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
		const newNode = new DoublyNode(data);

		if (index === 0) {
			this.prepend(data);
			return this;
		}
		if (index === this.length) {
			this.append(data);
			return this;
		}

		const leadingNode = this._traverseToIndex(index - 1);
		const followingNode = leadingNode.next;

		leadingNode.next = newNode;
		newNode.prev = leadingNode;
		newNode.next = followingNode;
		followingNode.prev = newNode;

		this.length++;
		return this;
	}

	remove(index) {
		if (index < 0 || index >= this.length) {
			console.error("Index out of bounds");
			return;
		}

		if (this.length === 1) {
			this.head = null;
			this.tail = null;
			this.length--;
			return this;
		}

		if (index === 0) {
			this.head = this.head.next;
			this.head.prev = this.tail;
			this.tail.next = this.head;
			this.length--;
			return this;
		}

		if (index === this.length - 1) {
			this.tail = this.tail.prev;
			this.tail.next = this.head;
			this.head.prev = this.tail;
			this.length--;
			return this;
		}

		const nodeToRemove = this._traverseToIndex(index);
		const prevNode = nodeToRemove.prev;
		const nextNode = nodeToRemove.next;

		prevNode.next = nextNode;
		nextNode.prev = prevNode;

		this.length--;
		return this;
	}

	print() {
		if (this.head === null) {
			console.log("null");
			return;
		}
		const elements = [];
		let currentNode = this.head;
		let count = 0;
		do {
			elements.push(currentNode.data);
			currentNode = currentNode.next;
			count++;
		} while (currentNode !== this.head && count < this.length + 1);
		elements.push("(back to " + this.head.data + ")");
		console.log(elements.join(" <-> "));
	}

	printReverse() {
		if (this.head === null) {
			console.log("null");
			return;
		}
		const elements = [];
		let currentNode = this.tail;
		let count = 0;
		do {
			elements.push(currentNode.data);
			currentNode = currentNode.prev;
			count++;
		} while (currentNode !== this.tail && count < this.length + 1);
		elements.push("(back to " + this.tail.data + ")");
		console.log(elements.join(" <-> "));
	}

	clear() {
		this.head = null;
		this.tail = null;
		this.length = 0;
		return this;
	}
}

// Example usage for Doubly Circular Linked List:
console.log("\n=== Doubly Circular Linked List Examples ===");
const doublyCircularList = new DoublyCircularLinkedList();
doublyCircularList.append(10);
doublyCircularList.append(20);
doublyCircularList.append(30);
console.log("Doubly Circular Linked List contents:");
doublyCircularList.print(); // Outputs: 10 <-> 20 <-> 30 <-> (back to 10)

doublyCircularList.prepend(5);
console.log("After prepending 5:");
doublyCircularList.print(); // Outputs: 5 <-> 10 <-> 20 <-> 30 <-> (back to 5)

doublyCircularList.insert(15, 2);
console.log("After inserting 15 at index 2:");
doublyCircularList.print(); // Outputs: 5 <-> 10 <-> 15 <-> 20 <-> 30 <-> (back to 5)

console.log("Reverse order:");
doublyCircularList.printReverse(); // Outputs: 30 <-> 20 <-> 15 <-> 10 <-> 5 <-> (back to 30)

doublyCircularList.remove(2);
console.log("After removing element at index 2:");
doublyCircularList.print(); // Outputs: 5 <-> 10 <-> 20 <-> 30 <-> (back to 5)
