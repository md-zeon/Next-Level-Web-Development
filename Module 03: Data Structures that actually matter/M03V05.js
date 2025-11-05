// M03V05.js - Linked List Visual Representation Examples

// ==========================================
// NODE CLASSES
// ==========================================

class Node {
	constructor(data) {
		this.data = data;
		this.next = null;
	}
}

class DoublyNode {
	constructor(data) {
		this.data = data;
		this.next = null;
		this.prev = null;
	}
}

// ==========================================
// VISUAL REPRESENTATION FUNCTIONS
// ==========================================

function visualizeSinglyLinkedList(head) {
	if (!head) {
		return "Empty List";
	}

	let result = "Head --> ";
	let current = head;

	while (current) {
		result += `[${current.data} | ${current.next ? "*" : "null"}]`;
		if (current.next) {
			result += " --> ";
		}
		current = current.next;
	}

	return result;
}

function visualizeDoublyLinkedList(head) {
	if (!head) {
		return "Empty List";
	}

	let result = "null <-- ";
	let current = head;

	while (current) {
		result += `[${current.data} | ${current.prev ? "*" : "null"} | ${
			current.next ? "*" : "null"
		}]`;
		if (current.next) {
			result += " <--> ";
		}
		current = current.next;
	}

	result += " --> null";
	return result;
}

function visualizeCircularLinkedList(head) {
	if (!head) {
		return "Empty List";
	}

	let result = "Head --> ";
	let current = head;
	let first = true;

	do {
		result += `[${current.data} | *]`;
		if (current.next !== head) {
			result += " --> ";
		}
		current = current.next;
		first = false;
	} while (current !== head && !first);

	result += "\n         ↑";
	result += "\n         └─────────────────┘";

	return result;
}

// ==========================================
// SINGLY LINKED LIST IMPLEMENTATION
// ==========================================

class SinglyLinkedList {
	constructor() {
		this.head = null;
		this.size = 0;
	}

	// Insert at beginning
	insertAtBeginning(data) {
		const newNode = new Node(data);
		newNode.next = this.head;
		this.head = newNode;
		this.size++;
		console.log(`Inserted ${data} at beginning`);
		console.log(visualizeSinglyLinkedList(this.head));
	}

	// Insert at end
	insertAtEnd(data) {
		const newNode = new Node(data);

		if (!this.head) {
			this.head = newNode;
		} else {
			let current = this.head;
			while (current.next) {
				current = current.next;
			}
			current.next = newNode;
		}

		this.size++;
		console.log(`Inserted ${data} at end`);
		console.log(visualizeSinglyLinkedList(this.head));
	}

	// Insert at specific position
	insertAtPosition(data, position) {
		if (position < 0 || position > this.size) {
			console.log("Invalid position");
			return;
		}

		const newNode = new Node(data);

		if (position === 0) {
			newNode.next = this.head;
			this.head = newNode;
		} else {
			let current = this.head;
			let prev = null;
			let index = 0;

			while (index < position) {
				prev = current;
				current = current.next;
				index++;
			}

			newNode.next = current;
			prev.next = newNode;
		}

		this.size++;
		console.log(`Inserted ${data} at position ${position}`);
		console.log(visualizeSinglyLinkedList(this.head));
	}

	// Delete from beginning
	deleteFromBeginning() {
		if (!this.head) {
			console.log("List is empty");
			return null;
		}

		const deletedData = this.head.data;
		this.head = this.head.next;
		this.size--;
		console.log(`Deleted ${deletedData} from beginning`);
		console.log(visualizeSinglyLinkedList(this.head));
		return deletedData;
	}

	// Delete from end
	deleteFromEnd() {
		if (!this.head) {
			console.log("List is empty");
			return null;
		}

		if (!this.head.next) {
			const deletedData = this.head.data;
			this.head = null;
			this.size--;
			console.log(`Deleted ${deletedData} from end`);
			console.log(visualizeSinglyLinkedList(this.head));
			return deletedData;
		}

		let current = this.head;
		let prev = null;

		while (current.next) {
			prev = current;
			current = current.next;
		}

		const deletedData = current.data;
		prev.next = null;
		this.size--;
		console.log(`Deleted ${deletedData} from end`);
		console.log(visualizeSinglyLinkedList(this.head));
		return deletedData;
	}

	// Search for a value
	search(data) {
		let current = this.head;
		let position = 0;

		while (current) {
			if (current.data === data) {
				console.log(`Found ${data} at position ${position}`);
				return position;
			}
			current = current.next;
			position++;
		}

		console.log(`${data} not found in the list`);
		return -1;
	}

	// Get size
	getSize() {
		return this.size;
	}

	// Check if empty
	isEmpty() {
		return this.size === 0;
	}

	// Print list
	print() {
		console.log(visualizeSinglyLinkedList(this.head));
	}

	// Reverse the list
	reverse() {
		let prev = null;
		let current = this.head;
		let next = null;

		while (current) {
			next = current.next;
			current.next = prev;
			prev = current;
			current = next;
		}

		this.head = prev;
		console.log("List reversed");
		console.log(visualizeSinglyLinkedList(this.head));
	}
}

console.log("=== Singly Linked List Demo ===");
const singlyList = new SinglyLinkedList();

singlyList.insertAtBeginning(30);
singlyList.insertAtBeginning(20);
singlyList.insertAtBeginning(10);

singlyList.insertAtEnd(40);
singlyList.insertAtEnd(50);

singlyList.insertAtPosition(25, 2);

singlyList.search(25);
singlyList.search(100);

singlyList.deleteFromBeginning();
singlyList.deleteFromEnd();

singlyList.reverse();

// ==========================================
// DOUBLY LINKED LIST IMPLEMENTATION
// ==========================================

class DoublyLinkedList {
	constructor() {
		this.head = null;
		this.tail = null;
		this.size = 0;
	}

	// Insert at beginning
	insertAtBeginning(data) {
		const newNode = new DoublyNode(data);

		if (!this.head) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			newNode.next = this.head;
			this.head.prev = newNode;
			this.head = newNode;
		}

		this.size++;
		console.log(`Inserted ${data} at beginning (Doubly)`);
		console.log(visualizeDoublyLinkedList(this.head));
	}

	// Insert at end
	insertAtEnd(data) {
		const newNode = new DoublyNode(data);

		if (!this.tail) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			newNode.prev = this.tail;
			this.tail.next = newNode;
			this.tail = newNode;
		}

		this.size++;
		console.log(`Inserted ${data} at end (Doubly)`);
		console.log(visualizeDoublyLinkedList(this.head));
	}

	// Delete from beginning
	deleteFromBeginning() {
		if (!this.head) {
			console.log("List is empty");
			return null;
		}

		const deletedData = this.head.data;

		if (this.head === this.tail) {
			this.head = null;
			this.tail = null;
		} else {
			this.head = this.head.next;
			this.head.prev = null;
		}

		this.size--;
		console.log(`Deleted ${deletedData} from beginning (Doubly)`);
		console.log(visualizeDoublyLinkedList(this.head));
		return deletedData;
	}

	// Delete from end
	deleteFromEnd() {
		if (!this.tail) {
			console.log("List is empty");
			return null;
		}

		const deletedData = this.tail.data;

		if (this.head === this.tail) {
			this.head = null;
			this.tail = null;
		} else {
			this.tail = this.tail.prev;
			this.tail.next = null;
		}

		this.size--;
		console.log(`Deleted ${deletedData} from end (Doubly)`);
		console.log(visualizeDoublyLinkedList(this.head));
		return deletedData;
	}

	// Get size
	getSize() {
		return this.size;
	}

	// Print list
	print() {
		console.log(visualizeDoublyLinkedList(this.head));
	}
}

console.log("\n=== Doubly Linked List Demo ===");
const doublyList = new DoublyLinkedList();

doublyList.insertAtBeginning(30);
doublyList.insertAtBeginning(20);
doublyList.insertAtBeginning(10);

doublyList.insertAtEnd(40);
doublyList.insertAtEnd(50);

doublyList.deleteFromBeginning();
doublyList.deleteFromEnd();

// ==========================================
// CIRCULAR LINKED LIST IMPLEMENTATION
// ==========================================

class CircularLinkedList {
	constructor() {
		this.head = null;
		this.size = 0;
	}

	// Insert at beginning
	insertAtBeginning(data) {
		const newNode = new Node(data);

		if (!this.head) {
			this.head = newNode;
			newNode.next = this.head; // Point to itself
		} else {
			let current = this.head;
			while (current.next !== this.head) {
				current = current.next;
			}
			newNode.next = this.head;
			current.next = newNode;
			this.head = newNode;
		}

		this.size++;
		console.log(`Inserted ${data} at beginning (Circular)`);
		console.log(visualizeCircularLinkedList(this.head));
	}

	// Insert at end
	insertAtEnd(data) {
		const newNode = new Node(data);

		if (!this.head) {
			this.head = newNode;
			newNode.next = this.head;
		} else {
			let current = this.head;
			while (current.next !== this.head) {
				current = current.next;
			}
			current.next = newNode;
			newNode.next = this.head;
		}

		this.size++;
		console.log(`Inserted ${data} at end (Circular)`);
		console.log(visualizeCircularLinkedList(this.head));
	}

	// Delete from beginning
	deleteFromBeginning() {
		if (!this.head) {
			console.log("List is empty");
			return null;
		}

		const deletedData = this.head.data;

		if (this.head.next === this.head) {
			this.head = null;
		} else {
			let current = this.head;
			while (current.next !== this.head) {
				current = current.next;
			}
			current.next = this.head.next;
			this.head = this.head.next;
		}

		this.size--;
		console.log(`Deleted ${deletedData} from beginning (Circular)`);
		console.log(visualizeCircularLinkedList(this.head));
		return deletedData;
	}

	// Get size
	getSize() {
		return this.size;
	}

	// Print list
	print() {
		console.log(visualizeCircularLinkedList(this.head));
	}
}

console.log("\n=== Circular Linked List Demo ===");
const circularList = new CircularLinkedList();

circularList.insertAtBeginning(30);
circularList.insertAtBeginning(20);
circularList.insertAtBeginning(10);

circularList.insertAtEnd(40);
circularList.insertAtEnd(50);

circularList.deleteFromBeginning();

// ==========================================
// COMMON LINKED LIST PROBLEMS & SOLUTIONS
// ==========================================

// 1. Find Middle Element using Slow-Fast Pointers
function findMiddle(head) {
	if (!head) return null;

	let slow = head;
	let fast = head;

	while (fast && fast.next) {
		slow = slow.next;
		fast = fast.next.next;
	}

	return slow.data;
}

// 2. Detect Cycle using Floyd's Algorithm
function hasCycle(head) {
	if (!head || !head.next) return false;

	let slow = head;
	let fast = head;

	while (fast && fast.next) {
		slow = slow.next;
		fast = fast.next.next;

		if (slow === fast) {
			return true;
		}
	}

	return false;
}

// 3. Remove Duplicates from Sorted Linked List
function removeDuplicates(head) {
	if (!head) return head;

	let current = head;

	while (current && current.next) {
		if (current.data === current.next.data) {
			current.next = current.next.next;
		} else {
			current = current.next;
		}
	}

	return head;
}

// 4. Merge Two Sorted Linked Lists
function mergeSortedLists(list1, list2) {
	if (!list1) return list2;
	if (!list2) return list1;

	let result = null;

	if (list1.data <= list2.data) {
		result = list1;
		result.next = mergeSortedLists(list1.next, list2);
	} else {
		result = list2;
		result.next = mergeSortedLists(list1, list2.next);
	}

	return result;
}

// ==========================================
// REAL-WORLD EXAMPLES
// ==========================================

// 1. Music Playlist
class MusicPlaylist {
	constructor() {
		this.songs = new SinglyLinkedList();
		this.currentSong = null;
	}

	addSong(songName, artist) {
		const song = { name: songName, artist: artist };
		this.songs.insertAtEnd(song);
		console.log(`Added "${songName}" by ${artist} to playlist`);
	}

	playNext() {
		if (!this.currentSong) {
			this.currentSong = this.songs.head;
		} else {
			this.currentSong = this.currentSong.next;
		}

		if (this.currentSong) {
			console.log(
				`Now playing: "${this.currentSong.data.name}" by ${this.currentSong.data.artist}`,
			);
		} else {
			console.log("End of playlist");
		}
	}

	removeSong(songName) {
		// This would require implementing delete by value in the linked list
		console.log(`Removed "${songName}" from playlist`);
	}
}

console.log("\n=== Music Playlist Example ===");
const playlist = new MusicPlaylist();
playlist.addSong("Bohemian Rhapsody", "Queen");
playlist.addSong("Stairway to Heaven", "Led Zeppelin");
playlist.addSong("Hotel California", "Eagles");

playlist.playNext();
playlist.playNext();
playlist.playNext();
playlist.playNext();

// 2. Browser History using Doubly Linked List
class BrowserHistory {
	constructor() {
		this.history = new DoublyLinkedList();
		this.current = null;
	}

	visit(url) {
		// Clear forward history when visiting new page
		if (this.current && this.current.next) {
			// In a real implementation, we'd need to clear from current.next onwards
			console.log("Clearing forward history");
		}

		this.history.insertAtEnd(url);
		this.current = this.history.tail; // This is simplified
		console.log(`Visited: ${url}`);
	}

	goBack() {
		if (this.current && this.current.prev) {
			this.current = this.current.prev;
			console.log(`Went back to: ${this.current.data}`);
			return this.current.data;
		}
		console.log("Cannot go back further");
		return null;
	}

	goForward() {
		if (this.current && this.current.next) {
			this.current = this.current.next;
			console.log(`Went forward to: ${this.current.data}`);
			return this.current.data;
		}
		console.log("Cannot go forward further");
		return null;
	}
}

console.log("\n=== Browser History Example ===");
const browser = new BrowserHistory();
browser.visit("google.com");
browser.visit("github.com");
browser.visit("stackoverflow.com");

browser.goBack();
browser.goBack();
browser.goForward();

// ==========================================
// DEMONSTRATION OF COMMON PROBLEMS
// ==========================================

console.log("\n=== Common Linked List Problems ===");

// Create a test list for middle element
const testList = new SinglyLinkedList();
testList.insertAtEnd(10);
testList.insertAtEnd(20);
testList.insertAtEnd(30);
testList.insertAtEnd(40);
testList.insertAtEnd(50);

console.log("Test list for middle element:");
testList.print();
console.log("Middle element:", findMiddle(testList.head));

// Create sorted list with duplicates
const sortedList = new SinglyLinkedList();
sortedList.insertAtEnd(10);
sortedList.insertAtEnd(20);
sortedList.insertAtEnd(20);
sortedList.insertAtEnd(30);
sortedList.insertAtEnd(30);
sortedList.insertAtEnd(40);

console.log("\nSorted list with duplicates:");
sortedList.print();
console.log("After removing duplicates:");
removeDuplicates(sortedList.head);
sortedList.print();

// ==========================================
// PERFORMANCE COMPARISON
// ==========================================

console.log("\n=== Performance Comparison ===");

function performanceTest(list, operations) {
	const start = Date.now();

	// Insert operations
	for (let i = 0; i < operations; i++) {
		list.insertAtEnd ? list.insertAtEnd(i) : list.push(i);
	}

	// Search operations
	for (let i = 0; i < operations / 10; i++) {
		list.search ? list.search(i) : null;
	}

	const end = Date.now();
	return end - start;
}

const testSize = 1000;

const linkedList = new SinglyLinkedList();
const array = [];

console.log(`Performance test with ${testSize} operations:`);
console.log(`Linked List: ${performanceTest(linkedList, testSize)}ms`);
console.log(`Array: ${performanceTest(array, testSize)}ms`);

// ==========================================
// SUMMARY
// ==========================================

console.log("\n=== Linked List Implementation Summary ===");
console.log(
	"✓ Singly Linked List: Basic implementation with next pointers only",
);
console.log(
	"✓ Doubly Linked List: Bidirectional traversal with prev/next pointers",
);
console.log("✓ Circular Linked List: Last node points back to first node");
console.log("✓ Visual representations: ASCII art showing node connections");
console.log(
	"✓ Real-world applications: Music playlists, browser history, undo operations",
);
console.log(
	"✓ Common problems: Finding middle, cycle detection, merging sorted lists",
);
console.log(
	"✓ Performance: O(1) insertions/deletions at ends, O(n) search/access",
);
