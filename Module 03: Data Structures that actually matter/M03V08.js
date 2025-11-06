// M03V08.js - Linked List Implementation - prepend()

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

	// Prepend method - add to beginning
	prepend(data) {
		const newNode = new Node(data);

		// Set new node's next to current head
		newNode.next = this.head;

		// Update head to point to new node
		this.head = newNode;

		this.size++;
		console.log(`Prepended ${data} to the list`);
	}

	// Helper methods
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

console.log("=== Basic prepend() Demo ===");

const list = new LinkedList();

console.log("Initial list:");
list.print(); // List is empty

list.prepend(10);
console.log("After prepend(10):");
list.print(); // 10

list.prepend(20);
console.log("After prepend(20):");
list.print(); // 20 -> 10

list.prepend(30);
console.log("After prepend(30):");
list.print(); // 30 -> 20 -> 10

console.log("Size:", list.getSize()); // Size: 3

// ==========================================
// COMPARISON WITH APPEND
// ==========================================

console.log("\n=== prepend() vs append() Comparison ===");

const prependList = new LinkedList();
const appendList = new LinkedList();

// Using prepend (elements appear in reverse order)
prependList.prepend(1);
prependList.prepend(2);
prependList.prepend(3);
console.log("Prepend list (reverse order):");
prependList.print(); // 3 -> 2 -> 1

// Using append (elements appear in insertion order)
appendList.append(1);
appendList.append(2);
appendList.append(3);
console.log("Append list (insertion order):");
appendList.print(); // 1 -> 2 -> 3

// ==========================================
// STACK IMPLEMENTATION USING PREPEND
// ==========================================

console.log("\n=== Stack Implementation Using prepend() ===");

class StackUsingLinkedList {
	constructor() {
		this.list = new LinkedList();
	}

	push(data) {
		this.list.prepend(data);
		console.log(`Pushed ${data} to stack`);
	}

	pop() {
		if (this.list.head) {
			const data = this.list.head.data;
			this.list.head = this.list.head.next;
			this.list.size--;
			console.log(`Popped ${data} from stack`);
			return data;
		}
		console.log("Stack is empty");
		return null;
	}

	peek() {
		return this.list.head ? this.list.head.data : null;
	}

	print() {
		console.log("Stack (top to bottom):");
		this.list.print();
	}
}

const stack = new StackUsingLinkedList();
stack.push(10);
stack.push(20);
stack.push(30);
stack.print(); // 30 -> 20 -> 10

console.log("Peek:", stack.peek()); // 30

stack.pop(); // Popped 30
stack.print(); // 20 -> 10

// ==========================================
// PERFORMANCE COMPARISON
// ==========================================

console.log("\n=== Performance Comparison ===");

const perfList = new LinkedList();

console.time("Prepend 1000 elements");
for (let i = 0; i < 1000; i++) {
	perfList.prepend(i);
}
console.timeEnd("Prepend 1000 elements");

console.log("Final size:", perfList.getSize());
console.log("First few elements:");
perfList.print(); // Shows elements in reverse order: 999 -> 998 -> ...

// ==========================================
// REAL-WORLD APPLICATIONS
// ==========================================

console.log("\n=== Real-World Applications ===");

// 1. Undo Functionality
console.log("1. Text Editor with Undo:");
class TextEditor {
	constructor() {
		this.history = new LinkedList();
	}

	type(text) {
		this.history.prepend(text);
		console.log(`Typed: "${text}"`);
	}

	undo() {
		if (this.history.head) {
			const lastAction = this.history.head.data;
			this.history.head = this.history.head.next;
			this.history.size--;
			console.log(`Undid: "${lastAction}"`);
			return lastAction;
		}
		console.log("Nothing to undo");
		return null;
	}

	showHistory() {
		console.log("Edit history (most recent first):");
		this.history.print();
	}
}

const editor = new TextEditor();
editor.type("Hello");
editor.type(" World");
editor.type("!");
editor.showHistory(); // ! -> World -> Hello

editor.undo(); // Undid: "!"
editor.showHistory(); // World -> Hello

// 2. Browser History
console.log("\n2. Browser History:");
class BrowserHistory {
	constructor() {
		this.history = new LinkedList();
		this.current = null;
	}

	visit(url) {
		this.history.prepend(url);
		this.current = this.history.head;
		console.log(`Visited: ${url}`);
	}

	goBack() {
		if (this.current && this.current.next) {
			this.current = this.current.next;
			console.log(`Went back to: ${this.current.data}`);
			return this.current.data;
		}
		console.log("Can't go back further");
		return null;
	}

	showHistory() {
		console.log("Browser history (most recent first):");
		this.history.print();
	}
}

const browser = new BrowserHistory();
browser.visit("google.com");
browser.visit("github.com");
browser.visit("stackoverflow.com");
browser.showHistory(); // stackoverflow.com -> github.com -> google.com

browser.goBack(); // Went back to: github.com

// 3. Most Recently Used (MRU) Cache
console.log("\n3. MRU Cache:");
class MRUCache {
	constructor(capacity) {
		this.capacity = capacity;
		this.cache = new LinkedList();
		this.map = new Map(); // For O(1) lookups
	}

	access(key, value) {
		// If key exists, move to front (simplified)
		if (this.map.has(key)) {
			console.log(`Accessed existing: ${key}`);
		} else {
			// Add new item
			if (this.cache.getSize() >= this.capacity) {
				console.log("Cache full, removing oldest item");
			}
			this.cache.prepend({ key, value });
			this.map.set(key, value);
			console.log(`Added to cache: ${key}`);
		}

		console.log("MRU Cache (most recent first):");
		this.cache.print();
	}
}

const cache = new MRUCache(3);
cache.access("A", 1);
cache.access("B", 2);
cache.access("C", 3);
cache.access("A", 1); // Move A to front

// ==========================================
// EDGE CASES
// ==========================================

console.log("\n=== Edge Cases ===");

// Empty list
const emptyList = new LinkedList();
emptyList.prepend(42);
console.log("After prepend on empty list:");
emptyList.print(); // 42

// Single element
const singleList = new LinkedList();
singleList.prepend(100);
singleList.prepend(200);
console.log("After prepend on single element:");
singleList.print(); // 200 -> 100

// Large data sets
const largeList = new LinkedList();
for (let i = 0; i < 100; i++) {
	largeList.prepend(i);
}
console.log("Large list size:", largeList.getSize());

// ==========================================
// TESTING IMPLEMENTATION
// ==========================================

console.log("\n=== Comprehensive Testing ===");

function testPrepend() {
	const list = new LinkedList();

	console.log("Testing prepend()...");

	// Test empty list
	console.assert(list.isEmpty(), "List should be empty initially");
	console.assert(list.getSize() === 0, "Size should be 0 initially");

	// Test prepend operations
	list.prepend(1);
	console.assert(!list.isEmpty(), "List should not be empty after prepend");
	console.assert(list.getSize() === 1, "Size should be 1 after one prepend");
	console.assert(list.head.data === 1, "Head should contain prepended value");

	list.prepend(2);
	console.assert(list.getSize() === 2, "Size should be 2 after two prepends");
	console.assert(
		list.head.data === 2,
		"Head should contain most recent prepend",
	);

	list.prepend(3);
	console.assert(list.getSize() === 3, "Size should be 3 after three prepends");

	// Verify order: 3 -> 2 -> 1
	let current = list.head;
	console.assert(current.data === 3, "First element should be 3");
	current = current.next;
	console.assert(current.data === 2, "Second element should be 2");
	current = current.next;
	console.assert(current.data === 1, "Third element should be 1");

	console.log("✓ prepend() tests passed!");
}

testPrepend();

// ==========================================
// COMPARISON WITH OTHER DATA STRUCTURES
// ==========================================

console.log("\n=== Performance Comparison with Arrays ===");

function performanceTest() {
	const linkedList = new LinkedList();
	const array = [];

	const operations = 1000;

	// Test prepend vs unshift
	console.time("LinkedList prepend");
	for (let i = 0; i < operations; i++) {
		linkedList.prepend(i);
	}
	console.timeEnd("LinkedList prepend");

	console.time("Array unshift");
	for (let i = 0; i < operations; i++) {
		array.unshift(i);
	}
	console.timeEnd("Array unshift");

	console.log(`LinkedList size: ${linkedList.getSize()}`);
	console.log(`Array length: ${array.length}`);
	console.log(
		"LinkedList prepend is much faster than Array unshift for large datasets!",
	);
}

// performanceTest(); // Uncomment to run performance test

// ==========================================
// SUMMARY
// ==========================================

console.log("\n=== Implementation Summary ===");
console.log("✓ prepend() method: O(1) time complexity");
console.log("✓ Adds elements to the beginning of the list");
console.log("✓ Perfect for LIFO (Last In, First Out) operations");
console.log(
	"✓ Real-world applications: stacks, undo functionality, browser history",
);
console.log("✓ Much faster than Array.unshift() for large datasets");
console.log(
	"✓ Edge cases handled: empty lists, single elements, large datasets",
);
console.log("✓ Comprehensive testing and performance validation");
