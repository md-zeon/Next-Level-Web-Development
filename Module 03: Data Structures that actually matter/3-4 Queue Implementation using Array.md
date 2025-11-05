# Queue Implementation using Array

## What is a Queue?

A Queue is a linear data structure that follows the **FIFO (First In, First Out)** principle. This means the first element added to the queue is the first one to be removed.

Think of it like a line of people waiting for a service:

- People join the line at the back (enqueue)
- People leave the line from the front (dequeue)
- The person who arrived first gets served first

## Core Queue Operations

### 1. Enqueue

- **Description**: Adds an element to the back/rear of the queue
- **Time Complexity**: O(1) amortized (O(n) worst case for simple array)
- **Parameters**: The element to add

### 2. Dequeue

- **Description**: Removes and returns the front element from the queue
- **Time Complexity**: O(1) amortized (O(n) worst case for simple array)
- **Returns**: The removed element (or null/undefined if queue is empty)

### 3. Front/Peek

- **Description**: Returns the front element without removing it
- **Time Complexity**: O(1)
- **Returns**: The front element (or null/undefined if queue is empty)

### 4. Rear/Back

- **Description**: Returns the rear element without removing it
- **Time Complexity**: O(1)
- **Returns**: The rear element (or null/undefined if queue is empty)

### 5. isEmpty

- **Description**: Checks if the queue is empty
- **Time Complexity**: O(1)
- **Returns**: Boolean (true if empty, false otherwise)

### 6. Size/Length

- **Description**: Returns the number of elements in the queue
- **Time Complexity**: O(1)
- **Returns**: Integer representing the queue size

## Simple Array-Based Implementation

### Basic Approach

```javascript
class ArrayQueue {
	constructor() {
		this.items = [];
	}

	enqueue(element) {
		this.items.push(element);
	}

	dequeue() {
		if (this.isEmpty()) return null;
		return this.items.shift();
	}

	front() {
		if (this.isEmpty()) return null;
		return this.items[0];
	}

	rear() {
		if (this.isEmpty()) return null;
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

### Problems with Simple Array Implementation

1. **Inefficient Dequeue**: `shift()` operation is O(n) because it requires shifting all elements
2. **Memory Waste**: Dequeued elements leave gaps that aren't reused
3. **Performance Degradation**: As queue size increases, dequeue operations become slower

## Circular Queue Implementation

A circular queue solves the problems of the simple array implementation by reusing empty spaces.

### How Circular Queue Works

- Uses a fixed-size array
- Maintains two pointers: `front` and `rear`
- When `rear` reaches the end, it wraps around to the beginning
- Elements can be added to spaces freed by dequeued elements

### Implementation

```javascript
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
			console.log("Queue is full");
			return false;
		}

		this.rear = (this.rear + 1) % this.capacity;
		this.items[this.rear] = element;
		this.size++;

		if (this.front === -1) {
			this.front = this.rear;
		}

		return true;
	}

	dequeue() {
		if (this.isEmpty()) {
			console.log("Queue is empty");
			return null;
		}

		const item = this.items[this.front];
		this.front = (this.front + 1) % this.capacity;
		this.size--;

		if (this.size === 0) {
			this.front = -1;
			this.rear = -1;
		}

		return item;
	}

	front() {
		if (this.isEmpty()) return null;
		return this.items[this.front];
	}

	rear() {
		if (this.isEmpty()) return null;
		return this.items[this.rear];
	}

	getSize() {
		return this.size;
	}
}
```

## Time Complexity Analysis

| Operation | Simple Array | Circular Queue |
| --------- | ------------ | -------------- |
| Enqueue   | O(1)         | O(1)           |
| Dequeue   | O(n)         | O(1)           |
| Front     | O(1)         | O(1)           |
| Rear      | O(1)         | O(1)           |
| isEmpty   | O(1)         | O(1)           |
| Size      | O(1)         | O(1)           |

## Real-World Use Cases

### 1. Task Scheduling

- Operating systems use queues to manage process scheduling
- Print job queues in printers
- CPU task scheduling

### 2. Breadth-First Search (BFS)

- Graph traversal algorithm
- Uses queue to keep track of nodes to visit next

### 3. Message Queues

- Asynchronous communication between systems
- Job queues in background processing
- Event-driven architectures

### 4. Customer Service Systems

- Call center queues
- Ticket booking systems
- Restaurant waitlist management

### 5. Data Buffers

- Network packet buffering
- Audio/video streaming buffers
- Keyboard input buffers

### 6. Resource Management

- Thread pools
- Connection pools
- Memory management queues

## Types of Queues

### 1. Simple Queue (FIFO)

Standard first-in-first-out queue.

### 2. Circular Queue

Fixed-size queue that wraps around.

### 3. Priority Queue

Elements are dequeued based on priority, not just order.

### 4. Deque (Double-Ended Queue)

Elements can be added/removed from both ends.

### 5. Blocking Queue

Queue that blocks when full (enqueue) or empty (dequeue).

## Common Queue Problems

### 1. Implement Queue using Stacks

Implement a queue using two stacks.

### 2. Generate Binary Numbers

Generate binary numbers from 1 to n using a queue.

### 3. Reverse First K Elements of Queue

Reverse the first k elements of a queue.

### 4. Interleave First Half of Queue with Second Half

Rearrange queue elements by interleaving two halves.

### 5. Find Maximum in Sliding Window

Use deque to find maximum in each sliding window of an array.

## Queue vs Other Data Structures

### Queue vs Stack

- **Queue**: FIFO (First In, First Out)
- **Stack**: LIFO (Last In, First Out)

### Queue vs Array

- **Queue**: Restricted operations (enqueue/dequeue from ends)
- **Array**: Full random access, insert/delete at any position

### Queue vs Linked List

- **Queue**: Can be implemented with arrays or linked lists
- **Linked List**: More flexible for insertions/deletions at any position

## Implementation Considerations

### 1. Fixed vs Dynamic Size

- **Fixed-size**: Predictable memory usage, may overflow
- **Dynamic-size**: Flexible, but may waste memory

### 2. Thread Safety

- Implement synchronization for multi-threaded environments
- Consider concurrent queue implementations

### 3. Memory Efficiency

- Circular queues reuse space efficiently
- Consider memory allocation strategies

### 4. Error Handling

- Handle full queue (enqueue)
- Handle empty queue (dequeue)
- Provide meaningful error messages

## Advanced Queue Concepts

### 1. Priority Queue

Elements are ordered by priority rather than insertion order.

### 2. Double-Ended Queue (Deque)

Allows insertion and deletion from both ends.

### 3. Blocking Queue

Blocks producer when full, consumer when empty.

### 4. Concurrent Queue

Thread-safe queue for multi-threaded applications.

### 5. Persistent Queue

Immutable queue that preserves previous versions.

## Best Practices

1. **Choose the right implementation**: Circular queue for bounded queues, dynamic arrays for unbounded
2. **Handle edge cases**: Empty queue, full queue, single element
3. **Consider thread safety**: Use appropriate synchronization mechanisms
4. **Document behavior**: Clear documentation of blocking vs non-blocking behavior
5. **Profile performance**: Test with expected load patterns
6. **Consider memory usage**: Choose implementation based on memory constraints

## Conclusion

Queues are fundamental data structures with wide applications in computer science and real-world systems. The array-based implementation provides a good balance of simplicity and performance for most use cases, while circular queues offer better efficiency for bounded scenarios. Understanding queue implementations is crucial for efficient algorithm design and system architecture.
