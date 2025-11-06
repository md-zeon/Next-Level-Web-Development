class Node {
	constructor(data) {
		this.data = data;
		this.next = null;
	}
}

class Queue {
	constructor() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}

	enqueue(data) {
		const newNode = new Node(data);
		if (this.isEmpty()) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			this.tail.next = newNode;
			this.tail = newNode;
		}
		this.length++;
		return this; // For method chaining
	}

	dequeue() {
		if (this.isEmpty()) {
			console.log("Queue is empty");
			return null;
		}
		const removedNode = this.head;
		this.head = this.head.next;
		this.length--;
		if (this.isEmpty()) {
			this.tail = null;
		}
		return removedNode.data;
	}

	front() {
		if (this.isEmpty()) {
			console.log("Queue is empty");
			return null;
		}
		return this.head.data;
	}

	rear() {
		if (this.isEmpty()) {
			console.log("Queue is empty");
			return null;
		}
		return this.tail.data;
	}

	isEmpty() {
		return this.length === 0;
	}

	size() {
		return this.length;
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
const queue = new Queue();

console.log("Enqueue operations:");
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
console.log("Queue contents:");
queue.print(); // Outputs: 10 -> 20 -> 30 -> null

console.log("Front element:", queue.front()); // Outputs: 10
console.log("Rear element:", queue.rear()); // Outputs: 30
console.log("Queue size:", queue.size()); // Outputs: 3

console.log("\nDequeue operation:");
const dequeued = queue.dequeue();
console.log("Dequeued element:", dequeued); // Outputs: 10
console.log("Queue contents after dequeue:");
queue.print(); // Outputs: 20 -> 30 -> null

console.log("Front element:", queue.front()); // Outputs: 20
console.log("Rear element:", queue.rear()); // Outputs: 30
console.log("Queue size:", queue.size()); // Outputs: 2

console.log("\nEnqueue more elements:");
queue.enqueue(40).enqueue(50);
console.log("Queue contents:");
queue.print(); // Outputs: 20 -> 30 -> 40 -> 50 -> null

console.log("Front element:", queue.front()); // Outputs: 20
console.log("Rear element:", queue.rear()); // Outputs: 50
console.log("Queue size:", queue.size()); // Outputs: 4

console.log("\nDequeue all elements:");
while (!queue.isEmpty()) {
	console.log("Dequeued:", queue.dequeue());
}
console.log("Queue contents after emptying:");
queue.print(); // Outputs: null
console.log("Is queue empty?", queue.isEmpty()); // Outputs: true

console.log("\nClear queue:");
queue.enqueue(100).enqueue(200);
console.log("Queue contents before clear:");
queue.print(); // Outputs: 100 -> 200 -> null
queue.clear();
console.log("Queue contents after clear:");
queue.print(); // Outputs: null
console.log("Queue size after clear:", queue.size()); // Outputs: 0
