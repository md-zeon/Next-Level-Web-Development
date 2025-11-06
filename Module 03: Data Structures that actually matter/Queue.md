# Queue Data Structure

## What is a Queue?

A **Queue** is a linear data structure that follows the **First In, First Out (FIFO)** principle. This means that the first element added to the queue will be the first one to be removed. Think of it like a line at a ticket counter - the person who arrives first gets served first.

## Real-World Examples

- **Print Queue**: Documents are printed in the order they were sent to the printer
- **Task Scheduling**: Operating systems use queues to manage processes waiting for CPU time
- **Breadth-First Search**: In graph algorithms, queues are used to explore nodes level by level
- **Customer Service**: Call centers handle calls in the order they were received
- **Message Queues**: In distributed systems, messages are processed in the order they arrive

## Basic Operations

### Core Operations

1. **enqueue(element)**: Add an element to the rear (end) of the queue
2. **dequeue()**: Remove and return the element from the front of the queue
3. **front()**: Return the element at the front without removing it
4. **rear()**: Return the element at the rear without removing it

### Utility Operations

1. **isEmpty()**: Check if the queue is empty
2. **size()**: Return the number of elements in the queue
3. **print()**: Display all elements in the queue
4. **clear()**: Remove all elements from the queue

## Queue Implementations

### 1. Array-based Queue

**Pros:**

- Simple implementation
- Fast access to elements
- Memory efficient for small queues

**Cons:**

- Fixed size (if using arrays)
- Shifting elements during dequeue is O(n)

```javascript
class ArrayQueue {
	constructor() {
		this.items = [];
	}

	enqueue(element) {
		this.items.push(element);
	}

	dequeue() {
		return this.items.shift();
	}

	front() {
		return this.items[0];
	}

	rear() {
		return this.items[this.items.length - 1];
	}

	isEmpty() {
		return this.items.length === 0;
	}

	size() {
		return this.items.length;
	}
}
```

### 2. Circular Queue (Array-based)

**Pros:**

- Efficient use of space
- No element shifting required
- Fixed capacity prevents memory issues

**Cons:**

- More complex implementation
- Fixed maximum size

```javascript
class CircularQueue {
	constructor(capacity) {
		this.capacity = capacity;
		this.items = new Array(capacity);
		this.frontIndex = -1;
		this.rearIndex = -1;
		this.size = 0;
	}

	enqueue(element) {
		if (this.isFull()) return false;
		this.rearIndex = (this.rearIndex + 1) % this.capacity;
		this.items[this.rearIndex] = element;
		this.size++;
		if (this.frontIndex === -1) this.frontIndex = this.rearIndex;
		return true;
	}

	dequeue() {
		if (this.isEmpty()) return null;
		const item = this.items[this.frontIndex];
		this.frontIndex = (this.frontIndex + 1) % this.capacity;
		this.size--;
		if (this.size === 0) {
			this.frontIndex = -1;
			this.rearIndex = -1;
		}
		return item;
	}
}
```

### 3. Linked List-based Queue

**Pros:**

- Dynamic size
- No wasted space
- Efficient enqueue and dequeue operations

**Cons:**

- Extra memory for storing pointers
- No random access

```javascript
class Node {
	constructor(data) {
		this.data = data;
		this.next = null;
	}
}

class LinkedListQueue {
	constructor() {
		this.front = null;
		this.rear = null;
		this.length = 0;
	}

	enqueue(data) {
		const newNode = new Node(data);
		if (this.isEmpty()) {
			this.front = newNode;
			this.rear = newNode;
		} else {
			this.rear.next = newNode;
			this.rear = newNode;
		}
		this.length++;
	}

	dequeue() {
		if (this.isEmpty()) return null;
		const dequeuedNode = this.front;
		this.front = this.front.next;
		if (this.front === null) this.rear = null;
		this.length--;
		return dequeuedNode.data;
	}
}
```

## Deque (Double-Ended Queue)

A **Deque** (pronounced "deck") is a generalized queue that allows insertion and deletion from both ends. It combines the functionality of both stacks and queues.

### Deque Operations

- **addFront(element)**: Add element to the front
- **addRear(element)**: Add element to the rear
- **removeFront()**: Remove from the front
- **removeRear()**: Remove from the rear
- **front()**: Peek at the front element
- **rear()**: Peek at the rear element

### Deque Implementations

#### Array-based Deque

```javascript
class ArrayDeque {
	constructor() {
		this.items = [];
	}

	addFront(element) {
		this.items.unshift(element);
	}

	addRear(element) {
		this.items.push(element);
	}

	removeFront() {
		return this.items.shift();
	}

	removeRear() {
		return this.items.pop();
	}

	front() {
		return this.items[0];
	}

	rear() {
		return this.items[this.items.length - 1];
	}

	isEmpty() {
		return this.items.length === 0;
	}

	size() {
		return this.items.length;
	}
}
```

#### Doubly Linked List-based Deque

```javascript
class DoublyNode {
	constructor(data) {
		this.data = data;
		this.next = null;
		this.prev = null;
	}
}

class DoublyLinkedDeque {
	constructor() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}

	addFront(data) {
		const newNode = new DoublyNode(data);
		if (this.isEmpty()) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			newNode.next = this.head;
			this.head.prev = newNode;
			this.head = newNode;
		}
		this.length++;
	}

	addRear(data) {
		const newNode = new DoublyNode(data);
		if (this.isEmpty()) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			this.tail.next = newNode;
			newNode.prev = this.tail;
			this.tail = newNode;
		}
		this.length++;
	}

	removeFront() {
		if (this.isEmpty()) return null;
		const removed = this.head.data;
		this.head = this.head.next;
		if (this.head) {
			this.head.prev = null;
		} else {
			this.tail = null;
		}
		this.length--;
		return removed;
	}

	removeRear() {
		if (this.isEmpty()) return null;
		const removed = this.tail.data;
		this.tail = this.tail.prev;
		if (this.tail) {
			this.tail.next = null;
		} else {
			this.head = null;
		}
		this.length--;
		return removed;
	}
}
```

## Time Complexity

| Operation           | Array Queue | Circular Queue | Linked List Queue | Array Deque | Linked Deque |
| ------------------- | ----------- | -------------- | ----------------- | ----------- | ------------ |
| enqueue/addRear     | O(1)        | O(1)           | O(1)              | O(1)        | O(1)         |
| dequeue/removeFront | O(n)        | O(1)           | O(1)              | O(n)        | O(1)         |
| addFront            | N/A         | N/A            | N/A               | O(n)        | O(1)         |
| removeRear          | N/A         | N/A            | N/A               | O(1)        | O(1)         |
| front/rear          | O(1)        | O(1)           | O(1)              | O(1)        | O(1)         |
| isEmpty/size        | O(1)        | O(1)           | O(1)              | O(1)        | O(1)         |

## Applications

### Queues

1. **CPU Scheduling**: Round-robin scheduling algorithm
2. **Disk Scheduling**: FCFS (First Come First Served) algorithm
3. **Breadth-First Search (BFS)**: Graph traversal algorithm
4. **Print Spooling**: Managing print jobs
5. **Asynchronous Data Transfer**: Buffering data between processes

### Deques

1. **Sliding Window Problems**: Maintaining a window of elements
2. **Palindrome Checking**: Comparing characters from both ends
3. **Undo Mechanisms**: Storing operations that can be undone/redone
4. **Job Scheduling**: Priority-based task management
5. **Browser History**: Forward and backward navigation

## Advantages and Disadvantages

### Advantages

- Simple and intuitive data structure
- Efficient for FIFO operations
- Easy to implement
- Useful for synchronization in multi-threaded environments

### Disadvantages

- Limited access (only front and rear)
- Not suitable for random access
- Some implementations have fixed capacity
- Can be inefficient for certain operations depending on implementation

## Common Interview Questions

1. **Implement a Queue using Stacks**
2. **Implement a Stack using Queues**
3. **Find the maximum in a sliding window**
4. **Implement a circular queue**
5. **Design a data structure that supports insert, delete, and get random in O(1)**
6. **Implement a queue with a maximum size**
7. **Reverse a queue using recursion**
8. **Interleave the first half of the queue with second half**

## Practice Problems

1. **Queue using Two Stacks**: Implement a queue using two stacks with efficient operations
2. **Sliding Window Maximum**: Given an array and window size k, find the maximum in each window
3. **First Unique Character**: Use a queue to find the first non-repeating character in a stream
4. **Rotting Oranges**: Use BFS with a queue to simulate the rotting process
5. **Task Scheduler**: Use a queue to schedule CPU tasks with cooling intervals

## Conclusion

Queues are fundamental data structures that are essential for many algorithms and real-world applications. Understanding different implementations and their trade-offs helps in choosing the right queue for specific use cases. The choice between array-based, circular, or linked list implementations depends on the specific requirements of space, time, and functionality needed.

For more advanced use cases, deques provide additional flexibility with operations on both ends, making them suitable for more complex scenarios like sliding window problems and undo mechanisms.
