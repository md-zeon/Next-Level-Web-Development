# Linked List Implementation - prepend()

## Introduction

The `prepend()` method adds a new node at the beginning of the linked list. This operation is more efficient than `append()` because it doesn't require traversing to the end of the list.

## Algorithm

1. Create a new node with the given data
2. Set the new node's next pointer to the current head
3. Update the head to point to the new node
4. Increment the size counter

## Visual Process

**Before prepend (empty list):**

```
Head: null
Size: 0
```

**After prepend(10):**

```
Head --> [10 | null]
Size: 1
```

**Before prepend(20) on existing list:**

```
Head --> [10 | null]
```

**After prepend(20):**

```
Head --> [20 | *] --> [10 | null]
Size: 2
```

**After prepend(30):**

```
Head --> [30 | *] --> [20 | *] --> [10 | null]
Size: 3
```

## Implementation

```javascript
prepend(data) {
    const newNode = new Node(data);

    // Set new node's next to current head
    newNode.next = this.head;

    // Update head to point to new node
    this.head = newNode;

    this.size++;
    console.log(`Prepended ${data} to the list`);
}
```

## Complete Example

```javascript
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

	prepend(data) {
		const newNode = new Node(data);
		newNode.next = this.head;
		this.head = newNode;
		this.size++;
		console.log(`Prepended ${data} to the list`);
	}

	append(data) {
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
		console.log(`Appended ${data} to the list`);
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
```

## Detailed Examples

### Example 1: Basic prepend() Usage

```javascript
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
```

### Example 2: Comparing prepend() vs append()

```javascript
const prependList = new LinkedList();
const appendList = new LinkedList();

console.log("=== prepend() vs append() Comparison ===");

// Using prepend (elements appear in reverse order)
prependList.prepend(1);
prependList.prepend(2);
prependList.prepend(3);
console.log("Prepend list:", prependList.print()); // 3 -> 2 -> 1

// Using append (elements appear in insertion order)
appendList.append(1);
appendList.append(2);
appendList.append(3);
console.log("Append list:", appendList.print()); // 1 -> 2 -> 3
```

### Example 3: Building a Stack-like Structure

```javascript
class StackUsingLinkedList {
	constructor() {
		this.list = new LinkedList();
	}

	push(data) {
		this.list.prepend(data);
	}

	pop() {
		if (this.list.head) {
			const data = this.list.head.data;
			this.list.head = this.list.head.next;
			this.list.size--;
			return data;
		}
		return null;
	}

	peek() {
		return this.list.head ? this.list.head.data : null;
	}

	print() {
		this.list.print();
	}
}

const stack = new StackUsingLinkedList();
stack.push(10);
stack.push(20);
stack.push(30);
console.log("Stack after pushes:");
stack.print(); // 30 -> 20 -> 10

console.log("Pop:", stack.pop()); // Pop: 30
console.log("Stack after pop:");
stack.print(); // 20 -> 10
```

## Time Complexity Analysis

### prepend() method:

- **Time Complexity:** O(1) - constant time operation
- **Space Complexity:** O(1) - only creates one new node

### Comparison with append():

- **prepend():** O(1) - no traversal needed
- **append():** O(n) - requires traversal to the end

## Performance Demonstration

```javascript
const list = new LinkedList();

console.log("Performance comparison:");
console.time("Prepend 1000 elements");
for (let i = 0; i < 1000; i++) {
	list.prepend(i);
}
console.timeEnd("Prepend 1000 elements");

console.log("Size:", list.getSize());
list.print(); // Will show elements in reverse order: 999 -> 998 -> ... -> 0
```

## Edge Cases

### Empty List

```javascript
const emptyList = new LinkedList();
emptyList.prepend(42);
console.log("After prepend on empty list:");
emptyList.print(); // 42
console.log("Size:", emptyList.getSize()); // Size: 1
```

### Single Element List

```javascript
const singleList = new LinkedList();
singleList.append(100);
singleList.prepend(200);
console.log("After prepend on single element list:");
singleList.print(); // 200 -> 100
```

### Large Data Sets

```javascript
const largeList = new LinkedList();

// Prepend is efficient even with large lists
for (let i = 0; i < 10000; i++) {
	largeList.prepend(i);
}
// This is much faster than appending 10,000 elements
console.log("Large list size:", largeList.getSize());
```

## Real-World Applications

### 1. Undo Functionality

```javascript
class TextEditor {
	constructor() {
		this.history = new LinkedList();
	}

	type(text) {
		this.history.prepend(text);
		console.log(`Typed: ${text}`);
	}

	undo() {
		if (this.history.head) {
			const lastAction = this.history.head.data;
			this.history.head = this.history.head.next;
			console.log(`Undid: ${lastAction}`);
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

editor.undo(); // Undid: !
editor.showHistory(); // World -> Hello
```

### 2. Browser History (Simplified)

```javascript
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
```

### 3. Most Recently Used (MRU) Cache

```javascript
class MRUCache {
	constructor(capacity) {
		this.capacity = capacity;
		this.cache = new LinkedList();
		this.map = new Map(); // For O(1) lookups
	}

	access(key, value) {
		// If key exists, move to front
		if (this.map.has(key)) {
			// Remove from current position (simplified - would need remove method)
			console.log(`Accessed existing: ${key}`);
		} else {
			// Add new item
			if (this.cache.getSize() >= this.capacity) {
				// Remove least recently used (would be at end)
				console.log("Cache full, removing oldest item");
			}
			this.cache.prepend({ key, value });
			this.map.set(key, value);
			console.log(`Added to cache: ${key}`);
		}

		console.log("MRU Cache:");
		this.cache.print();
	}
}

const cache = new MRUCache(3);
cache.access("A", 1);
cache.access("B", 2);
cache.access("C", 3);
cache.access("A", 1); // Move A to front
```

## Best Practices

### 1. Use prepend() for LIFO Operations

```javascript
// Good for stack-like behavior
class Stack {
	constructor() {
		this.items = new LinkedList();
	}

	push(data) {
		this.items.prepend(data);
	}

	pop() {
		if (!this.items.head) return null;
		const data = this.items.head.data;
		this.items.head = this.items.head.next;
		return data;
	}
}
```

### 2. Combine with append() Strategically

```javascript
// Use prepend for frequent front operations
// Use append for maintaining insertion order
const list = new LinkedList();

// Add to front frequently
list.prepend("Most Recent");
list.prepend("Second Most Recent");

// Add to end occasionally
list.append("Oldest");
```

### 3. Consider Performance Implications

```javascript
// Prefer prepend for:
// - Stack implementations
// - MRU caches
// - Undo/redo functionality
// - Any LIFO (Last In, First Out) scenario
```

## Common Mistakes

### 1. Forgetting to Update Head

```javascript
// Wrong - doesn't update head
prepend(data) {
    const newNode = new Node(data);
    newNode.next = this.head;
    // Forgot: this.head = newNode;
    this.size++;
}
```

### 2. Incorrect Order of Operations

```javascript
// Wrong - breaks the chain
prepend(data) {
    const newNode = new Node(data);
    this.head = newNode; // Wrong order
    newNode.next = this.head; // Now points to itself!
}
```

### 3. Not Handling Size Updates

```javascript
// Wrong - size not maintained
prepend(data) {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
    // Forgot: this.size++;
}
```

## Testing prepend() Implementation

```javascript
function testPrepend() {
	const list = new LinkedList();

	console.log("=== Testing prepend() ===");

	// Test empty list
	list.prepend(1);
	console.log("After prepend(1):");
	list.print();
	console.log("Size:", list.getSize());

	// Test multiple prepends
	list.prepend(2);
	list.prepend(3);
	list.prepend(4);
	console.log("After multiple prepends:");
	list.print();
	console.log("Size:", list.getSize());

	// Test with different data types
	list.prepend("Hello");
	list.prepend({ name: "Object" });
	console.log("After mixed types:");
	list.print();

	console.log("✓ prepend() tests passed");
}

testPrepend();
```

## Comparison with Other Data Structures

| Operation        | LinkedList prepend()      | Array unshift()      | Performance           |
| ---------------- | ------------------------- | -------------------- | --------------------- |
| Time Complexity  | O(1)                      | O(n)                 | LinkedList faster     |
| Space Complexity | O(1)                      | O(1)                 | Same                  |
| Use Case         | Frequent front insertions | Random access needed | Choose based on needs |

## Conclusion

The `prepend()` method is a fundamental operation that adds elements to the beginning of a linked list in constant time. It's more efficient than `append()` for front insertions and is essential for implementing stack-like behavior, undo functionality, and MRU caches. Understanding when to use `prepend()` versus `append()` is crucial for optimal linked list performance.
