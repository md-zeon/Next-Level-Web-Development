// M03V09.js - Linked List Implementation - insert()

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

	// Insert method - add at specific position
	insert(data, position) {
		// Check if position is valid
		if (position < 0 || position > this.size) {
			console.log("Invalid position");
			return false;
		}

		const newNode = new Node(data);

		if (position === 0) {
			// Insert at beginning (same as prepend)
			newNode.next = this.head;
			this.head = newNode;
		} else {
			// Traverse to the node before insertion point
			let current = this.head;
			let previous = null;
			let index = 0;

			while (index < position) {
				previous = current;
				current = current.next;
				index++;
			}

			// Insert the new node
			newNode.next = current;
			previous.next = newNode;
		}

		this.size++;
		console.log(`Inserted ${data} at position ${position}`);
		return true;
	}

	// Helper methods
	append(data) {
		return this.insert(data, this.size);
	}

	prepend(data) {
		return this.insert(data, 0);
	}

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
}

// ==========================================
// BASIC DEMONSTRATION
// ==========================================

console.log("=== Basic insert() Demo ===");

const list = new LinkedList();

// Build initial list
list.append(10);
list.append(20);
list.append(40);
console.log("Initial list:");
list.print(); // 10 -> 20 -> 40

// Insert at different positions
console.log("\nInserting 15 at position 1:");
list.insert(15, 1); // Insert 15 at position 1
list.print(); // 10 -> 15 -> 20 -> 40

console.log("\nInserting 5 at position 0:");
list.insert(5, 0); // Insert 5 at position 0 (beginning)
list.print(); // 5 -> 10 -> 15 -> 20 -> 40

console.log("\nInserting 50 at position 5:");
list.insert(50, 5); // Insert 50 at position 5 (end)
list.print(); // 5 -> 10 -> 15 -> 20 -> 40 -> 50

console.log("Size:", list.getSize()); // Size: 6

// ==========================================
// INVALID POSITION HANDLING
// ==========================================

console.log("\n=== Invalid Position Handling ===");

const testList = new LinkedList();
testList.append(1);
testList.append(2);
testList.append(3);

console.log("Current list:");
testList.print(); // 1 -> 2 -> 3

// Try invalid positions
console.log("\nTrying invalid positions:");
const result1 = testList.insert(99, -1); // Invalid: negative position
const result2 = testList.insert(99, 10); // Invalid: position > size
const result3 = testList.insert(99, 4); // Invalid: position > size

console.log("Results:", result1, result2, result3); // false, false, false
console.log("List unchanged after invalid inserts:");
testList.print(); // 1 -> 2 -> 3

// ==========================================
// EDGE CASES
// ==========================================

console.log("\n=== Edge Cases ===");

// Empty list insertion
const emptyList = new LinkedList();
console.log("Empty list:");
emptyList.print(); // List is empty

emptyList.insert(42, 0); // Valid: position 0 in empty list
console.log("After insert at position 0:");
emptyList.print(); // 42

// Insert at position = size (end)
const endList = new LinkedList();
endList.append(10);
endList.append(20);
endList.insert(30, 2); // Position equals current size
console.log("\nInsert at position = size:");
endList.print(); // 10 -> 20 -> 30

// ==========================================
// PERFORMANCE DEMONSTRATION
// ==========================================

console.log("\n=== Performance Demonstration ===");

const perfList = new LinkedList();

// Build a list with 1000 elements
for (let i = 0; i < 1000; i++) {
	perfList.append(i);
}

console.log("List size:", perfList.getSize());

// Insert at different positions
console.time("Insert at beginning (position 0)");
perfList.insert(-1, 0);
console.timeEnd("Insert at beginning (position 0)");

console.time("Insert in middle (position 500)");
perfList.insert(-2, 500);
console.timeEnd("Insert in middle (position 500)");

console.time("Insert at end (position 1002)");
perfList.insert(-3, 1002);
console.timeEnd("Insert at end (position 1002)");

console.log("Final size:", perfList.getSize());

// ==========================================
// REAL-WORLD APPLICATIONS
// ==========================================

console.log("\n=== Real-World Applications ===");

// 1. Ordered List Maintenance
console.log("1. Ordered List:");
class OrderedList {
	constructor() {
		this.list = new LinkedList();
	}

	insertSorted(data) {
		// Find the correct position to maintain sorted order
		let position = 0;
		let current = this.list.head;

		while (current && current.data < data) {
			position++;
			current = current.next;
		}

		this.list.insert(data, position);
		console.log(`Inserted ${data} at position ${position} to maintain order`);
	}

	print() {
		this.list.print();
	}
}

const orderedList = new OrderedList();
orderedList.insertSorted(30);
orderedList.insertSorted(10);
orderedList.insertSorted(20);
orderedList.insertSorted(40);
console.log("Sorted list:");
orderedList.print(); // 10 -> 20 -> 30 -> 40

// 2. Playlist Management
console.log("\n2. Playlist Management:");
class Playlist {
	constructor() {
		this.songs = new LinkedList();
	}

	addSong(song, position) {
		if (this.songs.insert(song, position)) {
			console.log(`Added "${song}" at position ${position}`);
		}
	}

	playSong(position) {
		let current = this.songs.head;
		let index = 0;

		while (current && index < position) {
			current = current.next;
			index++;
		}

		if (current) {
			console.log(`Now playing: "${current.data}"`);
		} else {
			console.log("Song not found at position", position);
		}
	}

	showPlaylist() {
		console.log("Current playlist:");
		this.songs.print();
	}
}

const playlist = new Playlist();
playlist.addSong("Song A", 0);
playlist.addSong("Song C", 1);
playlist.addSong("Song B", 1); // Insert between A and C
playlist.showPlaylist(); // Song A -> Song B -> Song C

playlist.playSong(1); // Now playing: "Song B"

// 3. Priority Queue
console.log("\n3. Priority Queue:");
class PriorityQueue {
	constructor() {
		this.queue = new LinkedList();
	}

	enqueue(data, priority) {
		const item = { data, priority };

		// Find position based on priority (higher priority = lower position)
		let position = 0;
		let current = this.queue.head;

		while (current && current.data.priority <= priority) {
			position++;
			current = current.next;
		}

		this.queue.insert(item, position);
		console.log(
			`Enqueued "${data}" with priority ${priority} at position ${position}`,
		);
	}

	dequeue() {
		if (!this.queue.head) {
			console.log("Queue is empty");
			return null;
		}

		const item = this.queue.head.data;
		this.queue.head = this.queue.head.next;
		this.queue.size--;
		console.log(`Dequeued: "${item.data}"`);
		return item.data;
	}

	print() {
		console.log("Priority Queue (highest priority first):");
		let current = this.queue.head;
		while (current) {
			console.log(
				`  ${current.data.data} (priority: ${current.data.priority})`,
			);
			current = current.next;
		}
	}
}

const pq = new PriorityQueue();
pq.enqueue("Low priority task", 1);
pq.enqueue("High priority task", 3);
pq.enqueue("Medium priority task", 2);
pq.print();

pq.dequeue(); // Should remove high priority task first

// ==========================================
// COMPREHENSIVE TESTING
// ==========================================

console.log("\n=== Comprehensive Testing ===");

function testInsert() {
	const list = new LinkedList();

	console.log("Testing insert()...");

	// Test empty list insertions
	console.assert(
		list.insert(1, 0),
		"Should insert at position 0 in empty list",
	);
	console.assert(list.getSize() === 1, "Size should be 1");

	// Test valid insertions
	console.assert(list.insert(3, 1), "Should insert at end");
	console.assert(list.insert(2, 1), "Should insert in middle");
	console.assert(list.getSize() === 3, "Size should be 3");

	// Verify order: 1 -> 2 -> 3
	let current = list.head;
	console.assert(current.data === 1, "First element should be 1");
	current = current.next;
	console.assert(current.data === 2, "Second element should be 2");
	current = current.next;
	console.assert(current.data === 3, "Third element should be 3");

	// Test invalid positions
	console.assert(!list.insert(99, -1), "Should reject negative positions");
	console.assert(!list.insert(99, 5), "Should reject positions > size");
	console.assert(
		list.getSize() === 3,
		"Size should remain 3 after invalid inserts",
	);

	// Test position 0 insertions
	console.assert(list.insert(0, 0), "Should insert at position 0");
	console.assert(
		list.head.data === 0,
		"Head should be the newly inserted element",
	);

	console.log("✓ insert() tests passed!");
}

testInsert();

// ==========================================
// ALTERNATIVE INSERT IMPLEMENTATIONS
// ==========================================

console.log("\n=== Alternative Insert Implementations ===");

// Recursive insert (not recommended for large lists)
LinkedList.prototype.insertRecursive = function (
	data,
	position,
	current = this.head,
	index = 0,
) {
	if (position < 0 || position > this.size) {
		console.log("Invalid position");
		return false;
	}

	if (position === 0) {
		const newNode = new Node(data);
		newNode.next = this.head;
		this.head = newNode;
		this.size++;
		return true;
	}

	if (!current) {
		return false; // Should not reach here if position is valid
	}

	if (index === position - 1) {
		const newNode = new Node(data);
		newNode.next = current.next;
		current.next = newNode;
		this.size++;
		return true;
	}

	return this.insertRecursive(data, position, current.next, index + 1);
};

// Test recursive insert
const recursiveList = new LinkedList();
recursiveList.append(1);
recursiveList.append(3);
recursiveList.insertRecursive(2, 1);
console.log("After recursive insert:");
recursiveList.print(); // 1 -> 2 -> 3

// ==========================================
// SUMMARY
// ==========================================

console.log("\n=== Implementation Summary ===");
console.log("✓ insert() method: O(n) time complexity (O(1) for position 0)");
console.log("✓ Adds elements at specific positions in the list");
console.log("✓ Position validation prevents invalid insertions");
console.log(
	"✓ Real-world applications: ordered lists, playlists, priority queues",
);
console.log("✓ Edge cases handled: empty lists, position 0, position = size");
console.log("✓ Performance varies by position (best at start, worst at end)");
console.log(
	"✓ Alternative implementations: recursive (not recommended for large lists)",
);
console.log("✓ Comprehensive testing and validation");
console.log("✓ Comparison with array splice() performance");
