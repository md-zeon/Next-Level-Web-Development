// M03V07.js - Linked List Implementation - append() and print()

// ==========================================
// NODE AND LINKED LIST CLASSES
// ==========================================

class Node {
	constructor(data) {
		this.data = data;
		this.next = null;
	}
}

class LinkedList {
	constructor() {
		this.head = null;
		this.size = 0;
	}

	// Append method - add to end
	append(data) {
		const newNode = new Node(data);

		if (!this.head) {
			// List is empty, new node becomes head
			this.head = newNode;
		} else {
			// Traverse to the last node
			let current = this.head;
			while (current.next) {
				current = current.next;
			}
			// Set the last node's next to the new node
			current.next = newNode;
		}

		this.size++;
		console.log(`Appended ${data} to the list`);
	}

	// Print method - display all elements
	print() {
		if (!this.head) {
			console.log("List is empty");
			return;
		}

		let current = this.head;
		let result = "";

		while (current) {
			result += current.data;
			if (current.next) {
				result += " -> ";
			}
			current = current.next;
		}

		console.log(result);
	}

	// Helper methods
	getSize() {
		return this.size;
	}

	isEmpty() {
		return this.size === 0;
	}
}

// ==========================================
// BASIC DEMONSTRATION
// ==========================================

console.log("=== Basic append() and print() Demo ===");

const list = new LinkedList();

console.log("Initial list:");
list.print(); // List is empty

list.append(10);
console.log("After append(10):");
list.print(); // 10

list.append(20);
console.log("After append(20):");
list.print(); // 10 -> 20

list.append(30);
console.log("After append(30):");
list.print(); // 10 -> 20 -> 30

console.log("Size:", list.getSize()); // Size: 3

// ==========================================
// DIFFERENT DATA TYPES
// ==========================================

console.log("\n=== Different Data Types ===");

const mixedList = new LinkedList();

mixedList.append("Hello");
mixedList.append(42);
mixedList.append({ name: "Alice", age: 30 });
mixedList.append(true);

mixedList.print();
// Output: Hello -> 42 -> [object Object] -> true

// ==========================================
// PERFORMANCE TEST
// ==========================================

console.log("\n=== Performance Test ===");

const bigList = new LinkedList();

console.time("Append 1000 elements");
for (let i = 0; i < 1000; i++) {
	bigList.append(i);
}
console.timeEnd("Append 1000 elements");

console.log("Big list size:", bigList.getSize());

// ==========================================
// ALTERNATIVE PRINT IMPLEMENTATIONS
// ==========================================

console.log("\n=== Alternative Print Implementations ===");

// Add alternative print methods to LinkedList class
LinkedList.prototype.printRecursive = function () {
	function printNode(node) {
		if (!node) return;
		process.stdout.write(node.data.toString());
		if (node.next) {
			process.stdout.write(" -> ");
		}
		printNode(node.next);
	}

	if (!this.head) {
		console.log("List is empty");
		return;
	}

	printNode(this.head);
	console.log(); // New line
};

LinkedList.prototype.printWithIndices = function () {
	if (!this.head) {
		console.log("List is empty");
		return;
	}

	let current = this.head;
	let index = 0;

	while (current) {
		console.log(`[${index}]: ${current.data}`);
		current = current.next;
		index++;
	}
};

LinkedList.prototype.printVisual = function () {
	if (!this.head) {
		console.log("Empty List");
		return;
	}

	let result = "Head --> ";
	let current = this.head;

	while (current) {
		result += `[${current.data} | ${current.next ? "*" : "null"}]`;
		if (current.next) {
			result += " --> ";
		}
		current = current.next;
	}

	console.log(result);
};

// Test alternative prints
const altList = new LinkedList();
altList.append(1);
altList.append(2);
altList.append(3);

console.log("Standard print:");
altList.print();

console.log("Recursive print:");
altList.printRecursive();

console.log("Print with indices:");
altList.printWithIndices();

console.log("Visual print:");
altList.printVisual();

// ==========================================
// EDGE CASES
// ==========================================

console.log("\n=== Edge Cases ===");

// Empty list operations
const emptyList = new LinkedList();
emptyList.print(); // "List is empty"
console.log("Size:", emptyList.getSize()); // Size: 0
console.log("Is empty:", emptyList.isEmpty()); // Is empty: true

// Null and undefined data
const nullList = new LinkedList();
nullList.append(null);
nullList.append(undefined);
nullList.print(); // null -> undefined

// ==========================================
// PRACTICAL APPLICATIONS
// ==========================================

console.log("\n=== Practical Applications ===");

// 1. Task List
console.log("1. Task List Application:");
class TaskList {
	constructor() {
		this.tasks = new LinkedList();
	}

	addTask(task) {
		this.tasks.append(task);
		console.log(`Added task: ${task}`);
	}

	showTasks() {
		console.log("Current tasks:");
		this.tasks.print();
	}
}

const myTasks = new TaskList();
myTasks.addTask("Learn Linked Lists");
myTasks.addTask("Implement append()");
myTasks.addTask("Implement print()");
myTasks.showTasks();

// 2. Number Sequence
console.log("\n2. Number Sequence:");
class NumberSequence {
	constructor() {
		this.numbers = new LinkedList();
	}

	addNumber(num) {
		this.numbers.append(num);
	}

	sum() {
		let sum = 0;
		let current = this.numbers.head;
		while (current) {
			sum += current.data;
			current = current.next;
		}
		return sum;
	}

	average() {
		if (this.numbers.size === 0) return 0;
		return this.sum() / this.numbers.size;
	}

	showSequence() {
		console.log("Number sequence:");
		this.numbers.print();
		console.log(`Sum: ${this.sum()}, Average: ${this.average()}`);
	}
}

const sequence = new NumberSequence();
for (let i = 1; i <= 5; i++) {
	sequence.addNumber(i);
}
sequence.showSequence();

// ==========================================
// TESTING IMPLEMENTATION
// ==========================================

console.log("\n=== Comprehensive Testing ===");

function testLinkedList() {
	const testList = new LinkedList();

	console.log("Testing append() and print()...");

	// Test empty list
	console.assert(testList.isEmpty(), "List should be empty initially");
	console.assert(testList.getSize() === 0, "Size should be 0 initially");

	// Test append operations
	testList.append(1);
	console.assert(!testList.isEmpty(), "List should not be empty after append");
	console.assert(testList.getSize() === 1, "Size should be 1 after one append");

	testList.append(2);
	testList.append(3);
	console.assert(
		testList.getSize() === 3,
		"Size should be 3 after three appends",
	);

	// Test print doesn't crash
	testList.print();

	console.log("✓ All tests passed!");
}

testLinkedList();

// ==========================================
// SUMMARY
// ==========================================

console.log("\n=== Implementation Summary ===");
console.log("✓ Node class with data and next properties");
console.log("✓ LinkedList class with head and size tracking");
console.log("✓ append() method: O(n) time complexity");
console.log("✓ print() method: O(n) time complexity");
console.log(
	"✓ Alternative print implementations (recursive, with indices, visual)",
);
console.log("✓ Edge case handling (empty lists, null data)");
console.log("✓ Practical applications (task lists, number sequences)");
console.log("✓ Comprehensive testing");
console.log("✓ Performance considerations for large lists");


// End of M03V07.js


// Module Practice

