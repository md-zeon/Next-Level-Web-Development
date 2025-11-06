class Node {
	constructor(data) {
		this.data = data;
		this.next = null;
	}
}

// ==========================================
// QUEUE IMPLEMENTATION USING ARRAY
// ==========================================

class ArrayQueue {
	constructor() {
		this.items = [];
	}

	enqueue(element) {
		this.items.push(element);
		return this; // For method chaining
	}

	dequeue() {
		if (this.isEmpty()) {
			console.log("Queue is empty");
			return null;
		}
		return this.items.shift();
	}

	front() {
		if (this.isEmpty()) return null;
		return this.items[0];
	}

	rear() {
		if (this.isEmpty()) return null;
		return this.items[this.items.length - 1];
	}

	isEmpty() {
		return this.items.length === 0;
	}

	size() {
		return this.items.length;
	}

	print() {
		if (this.isEmpty()) {
			console.log("Queue is empty");
			return;
		}
		console.log("Queue contents:", this.items.join(" <- "));
		return this; // For method chaining
	}

	clear() {
		this.items = [];
		return this; // For method chaining
	}
}

// ==========================================
// CIRCULAR QUEUE IMPLEMENTATION USING ARRAY
// ==========================================

class CircularQueue {
	constructor(capacity) {
		this.capacity = capacity;
		this.items = new Array(capacity);
		this.frontIndex = -1;
		this.rearIndex = -1;
		this.size = 0;
	}

	isEmpty() {
		return this.size === 0;
	}

	isFull() {
		return this.size === this.capacity;
	}

	enqueue(element) {
		if (this.isFull()) {
			console.log("Queue is full");
			return false;
		}

		this.rearIndex = (this.rearIndex + 1) % this.capacity;
		this.items[this.rearIndex] = element;
		this.size++;

		if (this.frontIndex === -1) {
			this.frontIndex = this.rearIndex;
		}

		return true;
	}

	dequeue() {
		if (this.isEmpty()) {
			console.log("Queue is empty");
			return null;
		}

		const item = this.items[this.frontIndex];
		this.frontIndex = (this.frontIndex + 1) % this.capacity;
		this.size--;

		if (this.size === 0) {
			this.frontIndex = -1;
			this.rearIndex = -1;
		}

		return item;
	}

	front() {
		if (this.isEmpty()) return null;
		return this.items[this.frontIndex];
	}

	rear() {
		if (this.isEmpty()) return null;
		return this.items[this.rearIndex];
	}

	getSize() {
		return this.size;
	}

	print() {
		if (this.isEmpty()) {
			console.log("Queue is empty");
			return;
		}
		const elements = [];
		let index = this.frontIndex;
		for (let i = 0; i < this.size; i++) {
			elements.push(this.items[index]);
			index = (index + 1) % this.capacity;
		}
		console.log("Circular Queue contents:", elements.join(" <- "));
		return this; // For method chaining
	}

	clear() {
		this.frontIndex = -1;
		this.rearIndex = -1;
		this.size = 0;
		return this;
	}
}

// ==========================================
// QUEUE IMPLEMENTATION USING LINKED LIST
// ==========================================

class LinkedListQueue {
	constructor() {
		// rename properties to avoid shadowing prototype methods
		this._front = null;
		this._rear = null;
		this.length = 0;
	}

	enqueue(data) {
		const newNode = new Node(data);
		if (this.isEmpty()) {
			this._front = newNode;
			this._rear = newNode;
		} else {
			this._rear.next = newNode;
			this._rear = newNode;
		}
		this.length++;
		return this; // For method chaining
	}

	dequeue() {
		if (this.isEmpty()) {
			console.log("Queue is empty");
			return null;
		}
		const dequeuedNode = this._front;
		this._front = this._front.next;
		if (this._front === null) {
			this._rear = null;
		}
		this.length--;
		return dequeuedNode.data;
	}

	front() {
		if (this.isEmpty()) return null;
		return this._front.data;
	}

	rear() {
		if (this.isEmpty()) return null;
		return this._rear.data;
	}

	isEmpty() {
		return this.length === 0;
	}

	size() {
		return this.length;
	}

	print() {
		if (this.isEmpty()) {
			console.log("Queue is empty");
			return;
		}
		const elements = [];
		let currentNode = this._front;
		while (currentNode) {
			elements.push(currentNode.data);
			currentNode = currentNode.next;
		}
		console.log("Linked List Queue contents:", elements.join(" <- "));
		return this; // For method chaining
	}

	clear() {
		this._front = null;
		this._rear = null;
		this.length = 0;
		return this; // For method chaining
	}
}

// ==========================================
// CIRCULAR QUEUE IMPLEMENTATION USING LINKED LIST
// ==========================================

class CircularLinkedQueue {
	constructor() {
		// rename to avoid shadowing prototype methods
		this._rear = null;
		this.length = 0;
	}

	enqueue(data) {
		const newNode = new Node(data);
		if (this.isEmpty()) {
			this._rear = newNode;
			this._rear.next = this._rear; // Point to itself
		} else {
			newNode.next = this._rear.next; // New node points to front (which is _rear.next)
			this._rear.next = newNode; // _rear points to new node
			this._rear = newNode; // Update _rear
		}
		this.length++;
		return this; // For method chaining
	}

	dequeue() {
		if (this.isEmpty()) {
			console.log("Queue is empty");
			return null;
		}
		const frontNode = this._rear.next; // Front is _rear.next in circular queue
		if (this.length === 1) {
			this._rear = null;
		} else {
			this._rear.next = frontNode.next; // _rear now points to the node after front
		}
		this.length--;
		return frontNode.data;
	}

	front() {
		if (this.isEmpty()) return null;
		return this._rear.next.data; // Front is _rear.next in circular queue
	}

	rear() {
		if (this.isEmpty()) return null;
		return this._rear.data;
	}

	isEmpty() {
		return this.length === 0;
	}

	size() {
		return this.length;
	}

	print() {
		if (this.isEmpty()) {
			console.log("Queue is empty");
			return;
		}
		const elements = [];
		let currentNode = this._rear.next; // Start from front
		let count = 0;
		do {
			elements.push(currentNode.data);
			currentNode = currentNode.next;
			count++;
		} while (currentNode !== this._rear.next && count < this.length);
		console.log("Circular Linked Queue contents:", elements.join(" <- "));
		return this; // For method chaining
	}

	clear() {
		this._rear = null;
		this.length = 0;
		return this; // For method chaining
	}
}

// ==========================================
// DOUBLY NODE FOR DEQUE
// ==========================================

class DoublyNode {
	constructor(data) {
		this.data = data;
		this.next = null;
		this.prev = null;
	}
}

// ==========================================
// DEQUE IMPLEMENTATION USING ARRAY
// ==========================================

class ArrayDeque {
	constructor() {
		this.items = [];
	}

	addFront(element) {
		this.items.unshift(element);
		return this; // For method chaining
	}

	addRear(element) {
		this.items.push(element);
		return this; // For method chaining
	}

	removeFront() {
		if (this.isEmpty()) {
			console.log("Deque is empty");
			return null;
		}
		// return this for method chaining
		this.items.shift();
		return this;
	}

	removeRear() {
		if (this.isEmpty()) {
			console.log("Deque is empty");
			return null;
		}
		// return this for method chaining
		this.items.pop();
		return this;
	}

	// Methods that return the removed value when needed
	removeFrontValue() {
		if (this.isEmpty()) {
			console.log("Deque is empty");
			return null;
		}
		return this.items.shift();
	}

	removeRearValue() {
		if (this.isEmpty()) {
			console.log("Deque is empty");
			return null;
		}
		return this.items.pop();
	}

	front() {
		if (this.isEmpty()) return null;
		return this.items[0];
	}

	rear() {
		if (this.isEmpty()) return null;
		return this.items[this.items.length - 1];
	}

	isEmpty() {
		return this.items.length === 0;
	}

	size() {
		return this.items.length;
	}

	print() {
		if (this.isEmpty()) {
			console.log("Deque is empty");
			return;
		}
		console.log("Deque contents:", this.items.join(" <-> "));
		return this; // For method chaining
	}

	clear() {
		this.items = [];
		return this; // For method chaining
	}
}

// ==========================================
// DEQUE IMPLEMENTATION USING DOUBLY LINKED LIST
// ==========================================

class DoublyLinkedDeque {
	constructor() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}

	addFront(data) {
		const newNode = new DoublyNode(data);
		if (this.isEmpty()) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			newNode.next = this.head;
			this.head.prev = newNode;
			this.head = newNode;
		}
		this.length++;
		return this; // For method chaining
	}

	addRear(data) {
		const newNode = new DoublyNode(data);
		if (this.isEmpty()) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			this.tail.next = newNode;
			newNode.prev = this.tail;
			this.tail = newNode;
		}
		this.length++;
		return this; // For method chaining
	}

	removeFront() {
		if (this.isEmpty()) {
			console.log("Deque is empty");
			return null;
		}
		const removed = this.head.data;
		this.head = this.head.next;
		if (this.head) {
			this.head.prev = null;
		} else {
			this.tail = null;
		}
		this.length--;
		return removed;
	}

	removeRear() {
		if (this.isEmpty()) {
			console.log("Deque is empty");
			return null;
		}
		const removed = this.tail.data;
		this.tail = this.tail.prev;
		if (this.tail) {
			this.tail.next = null;
		} else {
			this.head = null;
		}
		this.length--;
		return removed;
	}

	front() {
		if (this.isEmpty()) return null;
		return this.head.data;
	}

	rear() {
		if (this.isEmpty()) return null;
		return this.tail.data;
	}

	isEmpty() {
		return this.length === 0;
	}

	size() {
		return this.length;
	}

	print() {
		if (this.isEmpty()) {
			console.log("Deque is empty");
			return;
		}
		const elements = [];
		let current = this.head;
		while (current) {
			elements.push(current.data);
			current = current.next;
		}
		console.log("Doubly Linked Deque contents:", elements.join(" <-> "));
		return this; // For method chaining
	}

	printReverse() {
		if (this.isEmpty()) {
			console.log("Deque is empty");
			return;
		}
		const elements = [];
		let current = this.tail;
		while (current) {
			elements.push(current.data);
			current = current.prev;
		}
		console.log(
			"Doubly Linked Deque contents (reverse):",
			elements.join(" <-> "),
		);
		return this; // For method chaining
	}

	clear() {
		this.head = null;
		this.tail = null;
		this.length = 0;
		return this; // For method chaining
	}
}

// ==========================================
// EXAMPLES AND DEMONSTRATIONS
// ==========================================

// Example usage for ArrayQueue:
console.log("=== ArrayQueue Examples ===");
const arrayQueue = new ArrayQueue();
arrayQueue.enqueue(10).enqueue(20).enqueue(30);
console.log("Front:", arrayQueue.front()); // 10
console.log("Rear:", arrayQueue.rear()); // 30
console.log("Size:", arrayQueue.size()); // 3
arrayQueue.print(); // Queue contents: 10 <- 20 <- 30

// Example usage for CircularQueue:
console.log("\n=== CircularQueue Examples ===");
const circularQueue = new CircularQueue(5);
circularQueue.enqueue(1);
circularQueue.enqueue(2);
circularQueue.enqueue(3);
console.log("Front:", circularQueue.front()); // 1
console.log("Rear:", circularQueue.rear()); // 3
console.log("Size:", circularQueue.getSize()); // 3
circularQueue.print(); // Circular Queue contents: 1 <- 2 <- 3
console.log("Dequeue:", circularQueue.dequeue()); // 1
circularQueue.print(); // Circular Queue contents: 2 <- 3

// Example usage for LinkedListQueue:
console.log("\n=== LinkedListQueue Examples ===");
const linkedQueue = new LinkedListQueue();
linkedQueue.enqueue(100).enqueue(200).enqueue(300);
console.log("Front:", linkedQueue.front()); // 100
console.log("Rear:", linkedQueue.rear()); // 300
console.log("Size:", linkedQueue.size()); // 3
linkedQueue.print(); // Linked List Queue contents: 100 <- 200 <- 300
console.log("Dequeue:", linkedQueue.dequeue()); // 100
linkedQueue.print(); // Linked List Queue contents: 200 <- 300

// Example usage for CircularLinkedQueue:
console.log("\n=== CircularLinkedQueue Examples ===");
const circularLinkedQueue = new CircularLinkedQueue();
circularLinkedQueue.enqueue(1000).enqueue(2000).enqueue(3000);
console.log("Front:", circularLinkedQueue.front()); // 1000
console.log("Rear:", circularLinkedQueue.rear()); // 3000
console.log("Size:", circularLinkedQueue.size()); // 3
circularLinkedQueue.print(); // Circular Linked Queue contents: 1000 <- 2000 <- 3000
console.log("Dequeue:", circularLinkedQueue.dequeue()); // 1000
circularLinkedQueue.print(); // Circular Linked Queue contents: 2000 <- 3000

// Example usage for ArrayDeque:
console.log("\n=== ArrayDeque Examples ===");
const arrayDeque = new ArrayDeque();
arrayDeque.addFront(10).addRear(20).addFront(5).addRear(30);
console.log("Front:", arrayDeque.front()); // 5
console.log("Rear:", arrayDeque.rear()); // 30
console.log("Size:", arrayDeque.size()); // 4
arrayDeque.print(); // Deque contents: 5 <-> 10 <-> 20 <-> 30
console.log("Remove Front:", arrayDeque.removeFrontValue()); // 5
console.log("Remove Rear:", arrayDeque.removeRearValue()); // 30
arrayDeque.print(); // Deque contents: 10 <-> 20

// Example usage for DoublyLinkedDeque:
console.log("\n=== DoublyLinkedDeque Examples ===");
const doublyDeque = new DoublyLinkedDeque();
doublyDeque.addFront(100).addRear(200).addFront(50).addRear(300);
console.log("Front:", doublyDeque.front()); // 50
console.log("Rear:", doublyDeque.rear()); // 300
console.log("Size:", doublyDeque.size()); // 4
doublyDeque.print(); // Doubly Linked Deque contents: 50 <-> 100 <-> 200 <-> 300
doublyDeque.printReverse(); // Doubly Linked Deque contents (reverse): 300 <-> 200 <-> 100 <-> 50
console.log("Remove Front:", doublyDeque.removeFront()); // 50
console.log("Remove Rear:", doublyDeque.removeRear()); // 300
doublyDeque.print(); // Doubly Linked Deque contents: 100 <-> 200

// Method chaining example
console.log("\n=== Method Chaining Example ===");
const chainedQueue = new LinkedListQueue();
chainedQueue
	.enqueue("A")
	.enqueue("B")
	.enqueue("C")
	.print() // Linked List Queue contents: A <- B <- C
	.dequeue(); // Remove A
chainedQueue.print(); // Linked List Queue contents: B <- C

// Deque method chaining example
console.log("\n=== Deque Method Chaining Example ===");
const chainedDeque = new ArrayDeque();
chainedDeque
	.addFront("X")
	.addRear("Y")
	.addFront("W")
	.addRear("Z")
	.print() // Deque contents: W <-> X <-> Y <-> Z
	.removeFront() // Remove W
	.removeRear(); // Remove Z
chainedDeque.print(); // Deque contents: X <-> Y
