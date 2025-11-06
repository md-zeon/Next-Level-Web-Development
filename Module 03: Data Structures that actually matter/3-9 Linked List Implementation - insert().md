# Linked List Implementation - insert()

## Introduction

The `insert()` method adds a new node at a specific position in the linked list. This operation requires traversing to the desired position and then inserting the new node between existing nodes.

## Algorithm

1. Check if the position is valid (between 0 and current size)
2. If position is 0, use prepend logic
3. Otherwise, traverse to the node before the insertion point
4. Create a new node with the given data
5. Set the new node's next to the current node's next
6. Set the current node's next to the new node
7. Increment the size counter

## Visual Process

**Before insert(25, 2) at position 2:**

```
Head --> [10 | *] --> [20 | *] --> [40 | *] --> null
         Node 0       Node 1       Node 2
```

**After insert(25, 2):**

```
Head --> [10 | *] --> [20 | *] --> [25 | *] --> [40 | *] --> null
         Node 0       Node 1       Node 2       Node 3
```

## Implementation

```javascript
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

	insert(data, position) {
		if (position < 0 || position > this.size) {
			console.log("Invalid position");
			return false;
		}

		const newNode = new Node(data);

		if (position === 0) {
			newNode.next = this.head;
			this.head = newNode;
		} else {
			let current = this.head;
			let previous = null;
			let index = 0;

			while (index < position) {
				previous = current;
				current = current.next;
				index++;
			}

			newNode.next = current;
			previous.next = newNode;
		}

		this.size++;
		console.log(`Inserted ${data} at position ${position}`);
		return true;
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

	prepend(data) {
		const newNode = new Node(data);
		newNode.next = this.head;
		this.head = newNode;
		this.size++;
		console.log(`Prepended ${data} to the list`);
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

### Example 1: Basic insert() Usage

```javascript
const list = new LinkedList();

// Build initial list
list.append(10);
list.append(20);
list.append(40);
console.log("Initial list:");
list.print(); // 10 -> 20 -> 40

// Insert at different positions
list.insert(15, 1); // Insert 15 at position 1
list.print(); // 10 -> 15 -> 20 -> 40

list.insert(5, 0); // Insert 5 at position 0 (beginning)
list.print(); // 5 -> 10 -> 15 -> 20 -> 40

list.insert(50, 5); // Insert 50 at position 5 (end)
list.print(); // 5 -> 10 -> 15 -> 20 -> 40 -> 50
```

### Example 2: Insert at Invalid Positions

```javascript
const list = new LinkedList();
list.append(1);
list.append(2);
list.append(3);

console.log("Current list:");
list.print(); // 1 -> 2 -> 3

// Try invalid positions
list.insert(99, -1); // Invalid: negative position
list.insert(99, 10); // Invalid: position > size
list.insert(99, 4); // Invalid: position > size

console.log("List unchanged after invalid inserts:");
list.print(); // 1 -> 2 -> 3
```

### Example 3: Insert in Empty List

```javascript
const emptyList = new LinkedList();

console.log("Empty list:");
emptyList.print(); // List is empty

emptyList.insert(42, 0); // Valid: position 0 in empty list
console.log("After insert at position 0:");
emptyList.print(); // 42

emptyList.insert(99, 1); // Invalid: position 1 > size 1
```

## Time Complexity Analysis

### insert() method:

- **Best Case:** O(1) - inserting at position 0 (beginning)
- **Worst Case:** O(n) - inserting at position n (end) or middle positions
- **Average Case:** O(n) - typically need to traverse half the list

### Comparison with other operations:

- **insert(position 0):** O(1) - same as prepend()
- **insert(position size):** O(n) - same as append()
- **insert(middle):** O(n) - requires traversal

## Performance Demonstration

```javascript
const list = new LinkedList();

// Build a list with 1000 elements
for (let i = 0; i < 1000; i++) {
	list.append(i);
}

console.log("List size:", list.getSize());

// Insert at different positions
console.time("Insert at beginning (position 0)");
list.insert(-1, 0);
console.timeEnd("Insert at beginning (position 0)");

console.time("Insert in middle (position 500)");
list.insert(-2, 500);
console.timeEnd("Insert in middle (position 500)");

console.time("Insert at end (position 1002)");
list.insert(-3, 1002);
console.timeEnd("Insert at end (position 1002)");
```

## Edge Cases

### Position 0 (Beginning)

```javascript
const list = new LinkedList();
list.append(20);
list.append(30);

list.insert(10, 0);
console.log("After insert at position 0:");
list.print(); // 10 -> 20 -> 30
```

### Position = Size (End)

```javascript
const list = new LinkedList();
list.append(10);
list.append(20);

list.insert(30, 2); // Position equals current size
console.log("After insert at position = size:");
list.print(); // 10 -> 20 -> 30
```

### Single Element List

```javascript
const list = new LinkedList();
list.append(100);

list.insert(50, 0); // Insert before
list.print(); // 50 -> 100

list.insert(150, 2); // Insert after
list.print(); // 50 -> 100 -> 150
```

## Real-World Applications

### 1. Ordered List Maintenance

```javascript
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
```

### 2. Playlist Management

```javascript
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
```

### 3. Priority Queue Implementation

```javascript
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
```

## Best Practices

### 1. Always Validate Position

```javascript
// Good practice - validate before insertion
if (position < 0 || position > this.size) {
	console.log("Invalid position");
	return false;
}
```

### 2. Handle Position 0 as Special Case

```javascript
// Efficient handling of position 0
if (position === 0) {
	newNode.next = this.head;
	this.head = newNode;
	// No traversal needed
}
```

### 3. Use Appropriate Data Structures

```javascript
// For frequent insertions at arbitrary positions, consider:
// - Linked List: Good for insertions, poor for random access
// - Array: Poor for insertions, good for random access
// - Choose based on your access patterns
```

## Common Mistakes

### 1. Off-by-One Errors

```javascript
// Wrong - off by one in traversal
insert(data, position) {
    let current = this.head;
    let index = 0;

    while (index <= position) { // Wrong: should be < position
        current = current.next;
        index++;
    }
    // This will insert at wrong position
}
```

### 2. Not Updating Size

```javascript
// Wrong - forgot to increment size
insert(data, position) {
    // ... insertion logic ...
    // Forgot: this.size++;
}
```

### 3. Incorrect Link Updates

```javascript
// Wrong - incorrect order of link updates
insert(data, position) {
    // ... find previous and current ...
    previous.next = newNode; // Wrong order
    newNode.next = current;  // Now current is lost!
}
```

## Testing insert() Implementation

```javascript
function testInsert() {
	const list = new LinkedList();

	console.log("=== Testing insert() ===");

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

	console.log("✓ insert() tests passed!");
}

testInsert();
```

## Comparison with Array insert()

| Operation           | LinkedList insert() | Array splice() | Performance       |
| ------------------- | ------------------- | -------------- | ----------------- |
| Insert at beginning | O(1)                | O(n)           | LinkedList faster |
| Insert in middle    | O(n)                | O(n)           | Similar           |
| Insert at end       | O(n)                | O(1)           | Array faster      |
| Random access       | O(n)                | O(1)           | Array faster      |

## Conclusion

The `insert()` method provides flexible insertion at any position in a linked list. While it requires O(n) time in the worst case due to traversal, it's efficient for insertions at the beginning and provides the flexibility needed for ordered data structures. Understanding when to use `insert()` versus `prepend()` or `append()` is crucial for optimal linked list performance.
