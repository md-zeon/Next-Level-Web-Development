# Linked List Implementation - append() and print()

## Introduction

After understanding the basic Node concept, we now implement the fundamental Linked List class with two essential methods: `append()` and `print()`. These methods form the foundation for all other linked list operations.

## Linked List Class Structure

```javascript
class LinkedList {
	constructor() {
		this.head = null; // Points to the first node
		this.size = 0; // Tracks the number of nodes
	}
}
```

## The append() Method

The `append()` method adds a new node at the end of the linked list.

### Algorithm:

1. Create a new node with the given data
2. If the list is empty (head is null), set head to the new node
3. If the list is not empty, traverse to the last node and set its next pointer to the new node
4. Increment the size counter

### Visual Process:

**Before append (empty list):**

```
Head: null
Size: 0
```

**After append(10):**

```
Head --> [10 | null]
Size: 1
```

**After append(20):**

```
Head --> [10 | *] --> [20 | null]
Size: 2
```

**After append(30):**

```
Head --> [10 | *] --> [20 | *] --> [30 | null]
Size: 3
```

### Implementation:

```javascript
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
```

## The print() Method

The `print()` method displays all elements in the linked list.

### Algorithm:

1. Start from the head node
2. Traverse through each node using the next pointer
3. Print each node's data
4. Stop when reaching a node with next = null

### Visual Process:

```
Head --> [10 | *] --> [20 | *] --> [30 | null]
         ↑
     Current
```

**Traversal steps:**

1. Print 10, move to next
2. Print 20, move to next
3. Print 30, next is null, stop

### Implementation:

```javascript
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
```

## Complete Linked List Implementation

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

	isEmpty() {
		return this.size === 0;
	}
}
```

## Detailed Examples

### Example 1: Building a List Step by Step

```javascript
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
```

### Example 2: Appending Different Data Types

```javascript
const mixedList = new LinkedList();

mixedList.append("Hello");
mixedList.append(42);
mixedList.append({ name: "Alice", age: 30 });
mixedList.append(true);

mixedList.print();
// Output: Hello -> 42 -> [object Object] -> true
```

### Example 3: Performance Consideration

```javascript
const bigList = new LinkedList();

// Appending 1000 elements
console.time("Append 1000 elements");
for (let i = 0; i < 1000; i++) {
	bigList.append(i);
}
console.timeEnd("Append 1000 elements");
// Time will vary, but demonstrates O(n) performance for append
```

## Time Complexity Analysis

### append() method:

- **Best Case:** O(1) - when list is empty
- **Worst Case:** O(n) - when traversing to the end of a list with n elements
- **Average Case:** O(n) - typically need to traverse half the list on average

### print() method:

- **Time Complexity:** O(n) - must visit each node once
- **Space Complexity:** O(1) - only uses a few variables regardless of list size

## Alternative Print Implementations

### Method 1: Recursive Print

```javascript
printRecursive() {
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
}
```

### Method 2: Print with Indices

```javascript
printWithIndices() {
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
}
```

### Method 3: Visual Print (ASCII Art)

```javascript
printVisual() {
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
}
```

## Edge Cases and Error Handling

### Empty List Operations

```javascript
const emptyList = new LinkedList();

emptyList.print(); // "List is empty"
console.log("Size:", emptyList.getSize()); // Size: 0
console.log("Is empty:", emptyList.isEmpty()); // Is empty: true
```

### Null Data Handling

```javascript
const listWithNull = new LinkedList();
listWithNull.append(null);
listWithNull.append(undefined);
listWithNull.print(); // null -> undefined
```

### Large Data Sets

```javascript
const largeList = new LinkedList();

// Handle potential stack overflow with very large lists
// Recursive print might fail, iterative print is safer
for (let i = 0; i < 100000; i++) {
	largeList.append(i);
}
// largeList.print(); // This will work with iterative implementation
```

## Best Practices

### 1. Always Check for Empty List

```javascript
// Good practice
if (!this.head) {
	// Handle empty list case
}
```

### 2. Use Iterative Over Recursive for Large Lists

```javascript
// Prefer iterative traversal
let current = this.head;
while (current) {
	// Process node
	current = current.next;
}
```

### 3. Maintain Size Counter

```javascript
// Keep size updated for O(1) size queries
this.size++;
```

### 4. Provide Clear Feedback

```javascript
console.log(`Appended ${data} to the list`);
// Or return success/failure status
```

## Common Mistakes

### 1. Forgetting to Update Size

```javascript
// Wrong - size not updated
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
    // Forgot: this.size++;
}
```

### 2. Incorrect Traversal

```javascript
// Wrong - infinite loop if circular
print() {
    let current = this.head;
    while (current) {
        console.log(current.data);
        // Forgot to move to next: current = current.next;
    }
}
```

### 3. Not Handling Empty List

```javascript
// Wrong - error if head is null
print() {
    let current = this.head;
    while (current.next) { // Wrong condition
        console.log(current.data);
        current = current.next;
    }
}
```

## Testing the Implementation

```javascript
// Comprehensive test
function testLinkedList() {
	const list = new LinkedList();

	// Test empty list
	console.log("=== Testing Empty List ===");
	list.print();
	console.log("Size:", list.getSize());

	// Test append operations
	console.log("\n=== Testing Append ===");
	list.append(1);
	list.append(2);
	list.append(3);
	list.print();
	console.log("Size:", list.getSize());

	// Test print variations
	console.log("\n=== Testing Print Variations ===");
	list.printWithIndices();
	list.printVisual();

	console.log("\n=== Test Complete ===");
}

testLinkedList();
```

## Conclusion

The `append()` and `print()` methods are the foundation of linked list operations. Understanding these methods thoroughly is crucial for implementing more complex operations like `prepend()`, `insert()`, and `remove()`. The iterative approach ensures efficiency and prevents stack overflow issues with large lists.
