// M03V04.js - Queue Implementation using Array Examples

// ==========================================
// SIMPLE ARRAY-BASED QUEUE IMPLEMENTATION
// ==========================================

class ArrayQueue {
	constructor() {
		this.items = [];
	}

	// Add element to the rear of queue
	enqueue(element) {
		this.items.push(element);
		console.log(`Enqueued: ${element}`);
	}

	// Remove and return front element
	dequeue() {
		if (this.isEmpty()) {
			console.log("Queue is empty - cannot dequeue");
			return null;
		}
		const dequeued = this.items.shift();
		console.log(`Dequeued: ${dequeued}`);
		return dequeued;
	}

	// Return front element without removing it
	front() {
		if (this.isEmpty()) {
			console.log("Queue is empty - cannot peek front");
			return null;
		}
		return this.items[0];
	}

	// Return rear element without removing it
	rear() {
		if (this.isEmpty()) {
			console.log("Queue is empty - cannot peek rear");
			return null;
		}
		return this.items[this.items.length - 1];
	}

	// Check if queue is empty
	isEmpty() {
		return this.items.length === 0;
	}

	// Return size of queue
	size() {
		return this.items.length;
	}

	// Clear the queue
	clear() {
		this.items = [];
		console.log("Queue cleared");
	}

	// Print queue contents
	print() {
		console.log("Queue contents (front to rear):", this.items);
	}
}

console.log("=== Simple Array-Based Queue Demo ===");
const arrayQueue = new ArrayQueue();

arrayQueue.enqueue(10);
arrayQueue.enqueue(20);
arrayQueue.enqueue(30);
arrayQueue.print();

console.log("Front:", arrayQueue.front());
console.log("Rear:", arrayQueue.rear());
console.log("Size:", arrayQueue.size());

arrayQueue.dequeue();
arrayQueue.print();

arrayQueue.dequeue();
arrayQueue.dequeue();
arrayQueue.dequeue(); // Try to dequeue from empty queue

// ==========================================
// CIRCULAR QUEUE IMPLEMENTATION
// ==========================================

class CircularQueue {
	constructor(capacity) {
		this.capacity = capacity;
		this.items = new Array(capacity);
		this.front = -1;
		this.rear = -1;
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
			console.log("Queue is full - cannot enqueue");
			return false;
		}

		// Calculate new rear position (circular)
		this.rear = (this.rear + 1) % this.capacity;
		this.items[this.rear] = element;
		this.size++;

		// If this is the first element, set front to rear
		if (this.front === -1) {
			this.front = this.rear;
		}

		console.log(`Enqueued: ${element}`);
		return true;
	}

	dequeue() {
		if (this.isEmpty()) {
			console.log("Queue is empty - cannot dequeue");
			return null;
		}

		const item = this.items[this.front];
		this.front = (this.front + 1) % this.capacity;
		this.size--;

		// Reset pointers if queue becomes empty
		if (this.size === 0) {
			this.front = -1;
			this.rear = -1;
		}

		console.log(`Dequeued: ${item}`);
		return item;
	}

	peekFront() {
		if (this.isEmpty()) return null;
		return this.items[this.front];
	}

	peekRear() {
		if (this.isEmpty()) return null;
		return this.items[this.rear];
	}

	getSize() {
		return this.size;
	}

	getCapacity() {
		return this.capacity;
	}

	// Print queue contents showing the circular nature
	print() {
		if (this.isEmpty()) {
			console.log("Queue is empty");
			return;
		}

		const elements = [];
		let i = this.front;
		for (let count = 0; count < this.size; count++) {
			elements.push(this.items[i]);
			i = (i + 1) % this.capacity;
		}
		console.log("Queue contents (front to rear):", elements);
	}
}

console.log("\n=== Circular Queue Demo ===");
const circularQueue = new CircularQueue(5);

circularQueue.enqueue("A");
circularQueue.enqueue("B");
circularQueue.enqueue("C");
circularQueue.print();

console.log("Front:", circularQueue.peekFront());
console.log("Rear:", circularQueue.peekRear());
console.log("Size:", circularQueue.getSize());

circularQueue.dequeue();
circularQueue.print();

// Demonstrate circular behavior
circularQueue.enqueue("D");
circularQueue.enqueue("E");
circularQueue.enqueue("F"); // This should work now that we have space
circularQueue.print();

// Fill the queue
circularQueue.enqueue("G");
circularQueue.print();

// Try to add to full queue
circularQueue.enqueue("H"); // Should fail

// ==========================================
// REAL-WORLD EXAMPLES
// ==========================================

// 1. Task Scheduler Simulation
class TaskScheduler {
	constructor() {
		this.taskQueue = new ArrayQueue();
		this.completedTasks = [];
	}

	addTask(task) {
		this.taskQueue.enqueue(task);
		console.log(`Task added: ${task.name}`);
	}

	processNextTask() {
		const task = this.taskQueue.dequeue();
		if (task) {
			// Simulate task processing
			console.log(`Processing task: ${task.name} (Priority: ${task.priority})`);
			setTimeout(() => {
				console.log(`Task completed: ${task.name}`);
				this.completedTasks.push(task);
			}, task.duration);
			return task;
		}
		return null;
	}

	getPendingTasks() {
		return this.taskQueue.size();
	}

	getCompletedTasks() {
		return this.completedTasks.length;
	}
}

console.log("\n=== Task Scheduler Simulation ===");
const scheduler = new TaskScheduler();

scheduler.addTask({ name: "Send email", priority: "High", duration: 100 });
scheduler.addTask({
	name: "Generate report",
	priority: "Medium",
	duration: 200,
});
scheduler.addTask({ name: "Backup data", priority: "Low", duration: 300 });

console.log("Pending tasks:", scheduler.getPendingTasks());

scheduler.processNextTask();
scheduler.processNextTask();

// 2. Breadth-First Search (BFS) Simulation
function bfsSimulation(startNode, graph) {
	const queue = new ArrayQueue();
	const visited = new Set();
	const result = [];

	queue.enqueue(startNode);
	visited.add(startNode);
	result.push(startNode);

	while (!queue.isEmpty()) {
		const currentNode = queue.dequeue();
		console.log(`Visiting node: ${currentNode}`);

		// Visit all neighbors
		const neighbors = graph[currentNode] || [];
		for (const neighbor of neighbors) {
			if (!visited.has(neighbor)) {
				visited.add(neighbor);
				queue.enqueue(neighbor);
				result.push(neighbor);
			}
		}
	}

	return result;
}

console.log("\n=== BFS Simulation ===");
const graph = {
	A: ["B", "C"],
	B: ["A", "D", "E"],
	C: ["A", "F"],
	D: ["B"],
	E: ["B", "F"],
	F: ["C", "E"],
};

console.log("BFS traversal starting from A:");
const bfsResult = bfsSimulation("A", graph);
console.log("Traversal order:", bfsResult);

// 3. Print Job Queue Simulation
class PrintQueue {
	constructor() {
		this.jobQueue = new ArrayQueue();
		this.jobId = 1;
	}

	addPrintJob(documentName, user, pages) {
		const job = {
			id: this.jobId++,
			documentName,
			user,
			pages,
			timestamp: new Date(),
		};
		this.jobQueue.enqueue(job);
		console.log(
			`Print job added: ${documentName} for ${user} (${pages} pages)`,
		);
		return job.id;
	}

	processNextJob() {
		const job = this.jobQueue.dequeue();
		if (job) {
			console.log(`Printing: ${job.documentName} for ${job.user}`);
			// Simulate printing time based on pages
			const printTime = job.pages * 50; // 50ms per page
			setTimeout(() => {
				console.log(`Print job completed: ${job.documentName}`);
			}, printTime);
			return job;
		}
		return null;
	}

	getPendingJobs() {
		return this.jobQueue.size();
	}

	peekNextJob() {
		const job = this.jobQueue.front();
		return job ? `${job.documentName} (${job.pages} pages)` : null;
	}
}

console.log("\n=== Print Queue Simulation ===");
const printQueue = new PrintQueue();

printQueue.addPrintJob("Report.pdf", "Alice", 5);
printQueue.addPrintJob("Presentation.pptx", "Bob", 20);
printQueue.addPrintJob("Letter.docx", "Charlie", 2);

console.log("Pending jobs:", printQueue.getPendingJobs());
console.log("Next job:", printQueue.peekNextJob());

printQueue.processNextJob();

// ==========================================
// COMMON QUEUE PROBLEMS & SOLUTIONS
// ==========================================

// 1. Generate Binary Numbers using Queue
function generateBinaryNumbers(n) {
	const queue = new ArrayQueue();
	const result = [];

	queue.enqueue("1");

	for (let i = 0; i < n; i++) {
		const current = queue.dequeue();
		result.push(current);

		// Generate next binary numbers
		queue.enqueue(current + "0");
		queue.enqueue(current + "1");
	}

	return result;
}

console.log("\n=== Generate Binary Numbers ===");
console.log("First 10 binary numbers:", generateBinaryNumbers(10));

// 2. Reverse First K Elements of Queue
function reverseFirstKElements(queue, k) {
	if (queue.isEmpty() || k <= 0 || k > queue.size()) {
		return queue;
	}

	const stack = [];
	const tempQueue = new ArrayQueue();

	// Dequeue first k elements and push to stack
	for (let i = 0; i < k; i++) {
		stack.push(queue.dequeue());
	}

	// Pop from stack and enqueue to temp queue (reversed)
	while (stack.length > 0) {
		tempQueue.enqueue(stack.pop());
	}

	// Move remaining elements from original queue to temp queue
	while (!queue.isEmpty()) {
		tempQueue.enqueue(queue.dequeue());
	}

	// Copy back to original queue
	while (!tempQueue.isEmpty()) {
		queue.enqueue(tempQueue.dequeue());
	}

	return queue;
}

console.log("\n=== Reverse First K Elements ===");
const testQueue = new ArrayQueue();
testQueue.enqueue(1);
testQueue.enqueue(2);
testQueue.enqueue(3);
testQueue.enqueue(4);
testQueue.enqueue(5);

console.log("Original queue:");
testQueue.print();

reverseFirstKElements(testQueue, 3);
console.log("After reversing first 3 elements:");
testQueue.print();

// 3. Interleave First Half with Second Half
function interleaveQueue(queue) {
	if (queue.size() % 2 !== 0) {
		console.log("Queue size must be even for interleaving");
		return queue;
	}

	const halfSize = Math.floor(queue.size() / 2);
	const firstHalf = new ArrayQueue();
	const secondHalf = new ArrayQueue();

	// Split queue into two halves
	for (let i = 0; i < halfSize; i++) {
		firstHalf.enqueue(queue.dequeue());
	}
	for (let i = 0; i < halfSize; i++) {
		secondHalf.enqueue(queue.dequeue());
	}

	// Interleave elements
	while (!firstHalf.isEmpty() && !secondHalf.isEmpty()) {
		queue.enqueue(firstHalf.dequeue());
		queue.enqueue(secondHalf.dequeue());
	}

	return queue;
}

console.log("\n=== Interleave Queue Halves ===");
const interleaveTest = new ArrayQueue();
interleaveTest.enqueue(1);
interleaveTest.enqueue(2);
interleaveTest.enqueue(3);
interleaveTest.enqueue(4);
interleaveTest.enqueue(5);
interleaveTest.enqueue(6);

console.log("Original queue:");
interleaveTest.print();

interleaveQueue(interleaveTest);
console.log("After interleaving:");
interleaveTest.print();

// ==========================================
// PERFORMANCE COMPARISON
// ==========================================

console.log("\n=== Performance Comparison ===");

function performanceTest(queue, operations) {
	const start = Date.now();

	// Enqueue operations
	for (let i = 0; i < operations; i++) {
		queue.enqueue ? queue.enqueue(i) : queue.push(i);
	}

	// Dequeue operations
	for (let i = 0; i < operations / 2; i++) {
		queue.dequeue ? queue.dequeue() : queue.shift();
	}

	const end = Date.now();
	return end - start;
}

const testSize = 5000;

const simpleQueue = new ArrayQueue();
const circularQueuePerf = new CircularQueue(10000);

console.log(`Performance test with ${testSize} operations:`);
console.log(`Simple Array Queue: ${performanceTest(simpleQueue, testSize)}ms`);
console.log(
	`Circular Queue: ${performanceTest(circularQueuePerf, testSize)}ms`,
);

// ==========================================
// QUEUE IMPLEMENTATION USING TWO STACKS
// ==========================================

class QueueUsingStacks {
	constructor() {
		this.stack1 = []; // For enqueue
		this.stack2 = []; // For dequeue
	}

	enqueue(element) {
		this.stack1.push(element);
		console.log(`Enqueued: ${element}`);
	}

	dequeue() {
		if (this.isEmpty()) {
			console.log("Queue is empty - cannot dequeue");
			return null;
		}

		// If stack2 is empty, transfer all elements from stack1
		if (this.stack2.length === 0) {
			while (this.stack1.length > 0) {
				this.stack2.push(this.stack1.pop());
			}
		}

		const dequeued = this.stack2.pop();
		console.log(`Dequeued: ${dequeued}`);
		return dequeued;
	}

	front() {
		if (this.isEmpty()) return null;

		// If stack2 is empty, transfer all elements from stack1
		if (this.stack2.length === 0) {
			while (this.stack1.length > 0) {
				this.stack2.push(this.stack1.pop());
			}
		}

		return this.stack2[this.stack2.length - 1];
	}

	isEmpty() {
		return this.stack1.length === 0 && this.stack2.length === 0;
	}

	size() {
		return this.stack1.length + this.stack2.length;
	}
}

console.log("\n=== Queue using Two Stacks ===");
const queueWithStacks = new QueueUsingStacks();

queueWithStacks.enqueue("X");
queueWithStacks.enqueue("Y");
queueWithStacks.enqueue("Z");

console.log("Front:", queueWithStacks.front());
queueWithStacks.dequeue();
console.log("Front after dequeue:", queueWithStacks.front());

// ==========================================
// SUMMARY
// ==========================================

console.log("\n=== Queue Implementation Summary ===");
console.log(
	"✓ Simple Array Queue: Easy to implement, O(n) dequeue due to shift()",
);
console.log(
	"✓ Circular Queue: Efficient O(1) operations, fixed capacity, reuses space",
);
console.log(
	"✓ Real-world applications: Task scheduling, BFS, print queues, message queues",
);
console.log(
	"✓ Common problems: Binary number generation, queue reversal, interleaving",
);
console.log("✓ Advanced: Queue using stacks, priority queues, deques");
console.log(
	"✓ Performance: Circular queue generally better for frequent operations",
);
