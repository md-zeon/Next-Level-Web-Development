# Linked List Implementations in JavaScript

This document provides comprehensive implementations of all major linked list data structures in JavaScript, including detailed explanations, code examples, and usage demonstrations.

## Table of Contents

1. [Introduction to Linked Lists](#introduction-to-linked-lists)
2. [Singly Linked List](#singly-linked-list)
3. [Doubly Linked List](#doubly-linked-list)
4. [Circular Linked List](#circular-linked-list)
5. [Doubly Circular Linked List](#doubly-circular-linked-list)
6. [Time Complexity Comparison](#time-complexity-comparison)
7. [When to Use Each Type](#when-to-use-each-type)

## Introduction to Linked Lists

A Linked List is a linear data structure where elements are stored in individual nodes, and each node contains a reference (or link) to the next node in the sequence. Unlike arrays, linked lists do not require contiguous memory allocation.

### Node Structure

Each node in a linked list contains:

- **Data**: The actual value stored in the node
- **Pointer(s)**: Reference(s) to other nodes

## Singly Linked List

A singly linked list is the most basic type where each node has a reference to the next node only.

### Node Structure

```javascript
class Node {
	constructor(data) {
		this.data = data;
		this.next = null;
	}
}
```

### Operations

#### Append (Add to End)

```javascript
append(data) {
    const newNode = new Node(data);
    if (this.head === null) {
        this.head = newNode;
        this.tail = newNode;
    } else {
        this.tail.next = newNode;
        this.tail = newNode;
    }
    this.length++;
    return this;
}
```

#### Prepend (Add to Beginning)

```javascript
prepend(data) {
    const newNode = new Node(data);
    if (this.head === null) {
        this.head = newNode;
        this.tail = newNode;
    } else {
        newNode.next = this.head;
        this.head = newNode;
    }
    this.length++;
    return this;
}
```

#### Insert at Index

```javascript
insert(data, index) {
    if (index < 0 || index > this.length) {
        console.error("Index out of bounds");
        return;
    }
    const newNode = new Node(data);

    if (index === 0) {
        return this.prepend(data);
    }
    if (index === this.length) {
        return this.append(data);
    }

    const leadingNode = this._traverseToIndex(index - 1);
    const holdingNode = leadingNode.next;
    leadingNode.next = newNode;
    newNode.next = holdingNode;
    this.length++;
    return this;
}
```

#### Remove at Index

```javascript
remove(index) {
    if (index < 0 || index >= this.length) {
        console.error("Index out of bounds");
        return;
    }

    if (index === 0) {
        this.head = this.head.next;
        if (this.length === 1) {
            this.tail = null;
        }
        this.length--;
        return this;
    }

    const leadingNode = this._traverseToIndex(index - 1);
    const removedNode = leadingNode.next;
    leadingNode.next = removedNode.next;
    if (index === this.length - 1) {
        this.tail = leadingNode;
    }
    this.length--;
    return this;
}
```

### Example Usage

```javascript
const list = new LinkedList();
list.append(10).append(20).append(30);
list.print(); // 10 -> 20 -> 30 -> null

list.prepend(5);
list.print(); // 5 -> 10 -> 20 -> 30 -> null

list.insert(15, 2);
list.print(); // 5 -> 10 -> 15 -> 20 -> 30 -> null

list.remove(2);
list.print(); // 5 -> 10 -> 20 -> 30 -> null
```

## Doubly Linked List

A doubly linked list allows traversal in both directions with each node having references to both previous and next nodes.

### Node Structure

```javascript
class DoublyNode {
	constructor(data) {
		this.data = data;
		this.next = null;
		this.prev = null;
	}
}
```

### Key Operations

#### Append

```javascript
append(data) {
    const newNode = new DoublyNode(data);
    if (this.head === null) {
        this.head = newNode;
        this.tail = newNode;
    } else {
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
    }
    this.length++;
    return this;
}
```

#### Prepend

```javascript
prepend(data) {
    const newNode = new DoublyNode(data);
    if (this.head === null) {
        this.head = newNode;
        this.tail = newNode;
    } else {
        newNode.next = this.head;
        this.head.prev = newNode;
        this.head = newNode;
    }
    this.length++;
    return this;
}
```

#### Bidirectional Traversal

```javascript
print() {
    const elements = [];
    let currentNode = this.head;
    while (currentNode) {
        elements.push(currentNode.data);
        currentNode = currentNode.next;
    }
    elements.push("null");
    console.log(elements.join(" <-> "));
}

printReverse() {
    const elements = [];
    let currentNode = this.tail;
    while (currentNode) {
        elements.push(currentNode.data);
        currentNode = currentNode.prev;
    }
    elements.push("null");
    console.log(elements.join(" <-> "));
}
```

### Example Usage

```javascript
const doublyList = new DoublyLinkedList();
doublyList.append(10).append(20).append(30);
doublyList.print(); // 10 <-> 20 <-> 30 <-> null

doublyList.printReverse(); // 30 <-> 20 <-> 10 <-> null
```

## Circular Linked List

A circular linked list is a singly linked list where the last node points back to the first node, forming a circle.

### Key Features

- No null termination
- Can traverse infinitely
- Tail always points to head

### Operations

#### Append

```javascript
append(data) {
    const newNode = new Node(data);
    if (this.head === null) {
        this.head = newNode;
        this.tail = newNode;
        newNode.next = this.head;
    } else {
        this.tail.next = newNode;
        newNode.next = this.head;
        this.tail = newNode;
    }
    this.length++;
    return this;
}
```

#### Print (with circular indication)

```javascript
print() {
    if (this.head === null) {
        console.log("null");
        return;
    }
    const elements = [];
    let currentNode = this.head;
    let count = 0;
    do {
        elements.push(currentNode.data);
        currentNode = currentNode.next;
        count++;
    } while (currentNode !== this.head && count < this.length + 1);
    elements.push("(back to " + this.head.data + ")");
    console.log(elements.join(" -> "));
}
```

### Example Usage

```javascript
const circularList = new CircularLinkedList();
circularList.append(10).append(20).append(30);
circularList.print(); // 10 -> 20 -> 30 -> (back to 10)
```

## Doubly Circular Linked List

A doubly circular linked list combines the features of doubly linked lists and circular linked lists, allowing bidirectional traversal in a circular fashion.

### Node Structure

Uses `DoublyNode` with both `prev` and `next` pointers.

### Key Operations

#### Append

```javascript
append(data) {
    const newNode = new DoublyNode(data);
    if (this.head === null) {
        this.head = newNode;
        this.tail = newNode;
        newNode.next = this.head;
        newNode.prev = this.head;
    } else {
        this.tail.next = newNode;
        newNode.prev = this.tail;
        newNode.next = this.head;
        this.head.prev = newNode;
        this.tail = newNode;
    }
    this.length++;
    return this;
}
```

#### Bidirectional Circular Traversal

```javascript
print() {
    if (this.head === null) {
        console.log("null");
        return;
    }
    const elements = [];
    let currentNode = this.head;
    let count = 0;
    do {
        elements.push(currentNode.data);
        currentNode = currentNode.next;
        count++;
    } while (currentNode !== this.head && count < this.length + 1);
    elements.push("(back to " + this.head.data + ")");
    console.log(elements.join(" <-> "));
}

printReverse() {
    if (this.head === null) {
        console.log("null");
        return;
    }
    const elements = [];
    let currentNode = this.tail;
    let count = 0;
    do {
        elements.push(currentNode.data);
        currentNode = currentNode.prev;
        count++;
    } while (currentNode !== this.tail && count < this.length + 1);
    elements.push("(back to " + this.tail.data + ")");
    console.log(elements.join(" <-> "));
}
```

### Example Usage

```javascript
const doublyCircularList = new DoublyCircularLinkedList();
doublyCircularList.append(10).append(20).append(30);
doublyCircularList.print(); // 10 <-> 20 <-> 30 <-> (back to 10)

doublyCircularList.printReverse(); // 30 <-> 20 <-> 10 <-> (back to 30)
```

## Time Complexity Comparison

| Operation       | Singly Linked List | Doubly Linked List | Circular Linked List | Doubly Circular Linked List |
| --------------- | ------------------ | ------------------ | -------------------- | --------------------------- |
| Append          | O(1)               | O(1)               | O(1)                 | O(1)                        |
| Prepend         | O(1)               | O(1)               | O(1)                 | O(1)                        |
| Insert at Index | O(n)               | O(n)               | O(n)                 | O(n)                        |
| Remove at Index | O(n)               | O(n)               | O(n)                 | O(n)                        |
| Access by Index | O(n)               | O(n)               | O(n)                 | O(n)                        |
| Search          | O(n)               | O(n)               | O(n)                 | O(n)                        |

## When to Use Each Type

### Singly Linked List

- **Best for**: Simple implementations, forward-only traversal
- **Use when**: Memory is limited, only need unidirectional access
- **Common applications**: Stack implementation, simple queues

### Doubly Linked List

- **Best for**: Need bidirectional traversal
- **Use when**: Frequent insertions/deletions at both ends
- **Common applications**: Browser history, undo/redo functionality, music playlists

### Circular Linked List

- **Best for**: Round-robin scheduling, circular buffers
- **Use when**: Need to cycle through elements continuously
- **Common applications**: CPU scheduling, multiplayer games, circular buffers

### Doubly Circular Linked List

- **Best for**: Complex navigation systems, advanced data structures
- **Use when**: Need both directions and circular behavior
- **Common applications**: Advanced caches, complex navigation systems

## Implementation Notes

### Method Chaining

All implementations support method chaining for fluent interfaces:

```javascript
list.append(1).prepend(2).insert(3, 1).remove(0);
```

### Error Handling

All methods include bounds checking and appropriate error messages for invalid operations.

### Memory Management

- JavaScript's garbage collector handles memory cleanup
- No explicit memory deallocation needed
- Circular references are properly managed

### Performance Considerations

- Linked lists excel at insertions/deletions (O(1) at ends)
- Poor at random access (O(n) to reach index)
- Consider arrays for frequent random access needs

## Common Linked List Problems

1. **Reverse a Linked List**
2. **Detect a Cycle** (Floyd's algorithm)
3. **Find Middle Element** (slow/fast pointers)
4. **Remove Duplicates**
5. **Merge Two Sorted Lists**
6. **Find Intersection Point**

## Conclusion

This comprehensive implementation covers all major linked list variations. Each type has its strengths and use cases. Choose the appropriate linked list type based on your specific requirements for traversal direction, memory constraints, and operational needs.
