# Queue Implementation with Linked List

## Why Linked List for Queue?

While arrays can be used to implement queues, linked lists offer several advantages:

1. **Dynamic Size**: No need to pre-allocate memory or worry about resizing
2. **Efficient Operations**: Both enqueue and dequeue operations are O(1)
3. **No Memory Waste**: No unused space like in circular arrays
4. **Flexibility**: Easy to implement and modify

## Linked List Queue Structure

```
Front (Head) -> [data|next] -> [data|next] -> [data|next] -> null <- Rear (Tail)
```

- **Head**: Points to the front of the queue (where dequeue happens)
- **Tail**: Points to the rear of the queue (where enqueue happens)
- **Length**: Tracks the number of elements in the queue

## Implementation

### Node Class

```javascript
class Node {
	constructor(data) {
		this.data = data;
		this.next = null;
	}
}
```

### Queue Class

```javascript
class Queue {
	constructor() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}

	enqueue(data) {
		const newNode = new Node(data);
		if (this.isEmpty()) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			this.tail.next = newNode;
			this.tail = newNode;
		}
		this.length++;
		return this; // For method chaining
	}

	dequeue() {
		if (this.isEmpty()) {
			console.log("Queue is empty");
			return null;
		}
		const removedNode = this.head;
		this.head = this.head.next;
		this.length--;
		if (this.isEmpty()) {
			this.tail = null;
		}
		return removedNode.data;
	}

	front() {
		if (this.isEmpty()) {
			console.log("Queue is empty");
			return null;
		}
		return this.head.data;
	}

	rear() {
		if (this.isEmpty()) {
			console.log("Queue is empty");
			return null;
		}
		return this.tail.data;
	}

	isEmpty() {
		return this.length === 0;
	}

	size() {
		return this.length;
	}

	print() {
		const elements = [];
		let currentNode = this.head;
		while (currentNode) {
			elements.push(currentNode.data);
			currentNode = currentNode.next;
		}
		elements.push("null");
		console.log(elements.join(" -> "));
	}

	clear() {
		this.head = null;
		this.tail = null;
		this.length = 0;
		return this; // For method chaining
	}
}
```

## Operation Details

### Enqueue Operation

1. Create a new node with the given data
2. If queue is empty:
   - Set both head and tail to the new node
3. If queue is not empty:
   - Set tail.next to the new node
   - Update tail to point to the new node
4. Increment length

**Time Complexity**: O(1)

### Dequeue Operation

1. If queue is empty, return null
2. Store the head node for return
3. Update head to head.next
4. Decrement length
5. If queue becomes empty, set tail to null
6. Return the data from the removed node

**Time Complexity**: O(1)

### Front Operation

- Return head.data if queue is not empty
- Return null if queue is empty

**Time Complexity**: O(1)

### Rear Operation

- Return tail.data if queue is not empty
- Return null if queue is empty

**Time Complexity**: O(1)

## Visual Representation

### Initial State (Empty Queue)

```
Head: null
Tail: null
Length: 0
```

### After enqueue(10)

```
Head -> [10|null] <- Tail
Length: 1
```

### After enqueue(20)

```
Head -> [10| ] -> [20|null] <- Tail
Length: 2
```

### After enqueue(30)

```
Head -> [10| ] -> [20| ] -> [30|null] <- Tail
Length: 3
```

### After dequeue() returns 10

```
Head -> [20| ] -> [30|null] <- Tail
Length: 2
```

## Time Complexity Analysis

| Operation | Time Complexity | Explanation                          |
| --------- | --------------- | ------------------------------------ |
| enqueue() | O(1)            | Adding to tail is constant time      |
| dequeue() | O(1)            | Removing from head is constant time  |
| front()   | O(1)            | Accessing head data is constant time |
| rear()    | O(1)            | Accessing tail data is constant time |
| isEmpty() | O(1)            | Checking length is constant time     |
| size()    | O(1)            | Returning length is constant time    |

## Advantages over Array Implementation

1. **No Shifting**: Array dequeue requires O(n) shift operation
2. **Dynamic Memory**: Grows and shrinks as needed
3. **Memory Efficient**: No wasted space from removed elements
4. **Thread Safety**: Easier to make thread-safe in concurrent environments

## Example Usage

```javascript
const queue = new Queue();

// Enqueue elements
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
console.log("Queue size:", queue.size()); // 3
console.log("Front:", queue.front()); // 10
console.log("Rear:", queue.rear()); // 30

// Dequeue elements
console.log("Dequeued:", queue.dequeue()); // 10
console.log("New front:", queue.front()); // 20

// Check if empty
console.log("Is empty:", queue.isEmpty()); // false

// Clear queue
queue.clear();
console.log("Size after clear:", queue.size()); // 0
```

## Common Use Cases

1. **Task Scheduling**: Operating system process queues
2. **Breadth-First Search**: Graph traversal algorithm
3. **Print Job Management**: Printer spool queues
4. **Message Queues**: Asynchronous communication
5. **Event Handling**: GUI event queues

## Edge Cases to Handle

1. **Empty Queue Operations**:

   - dequeue() should return null or throw error
   - front() and rear() should return null

2. **Single Element Queue**:

   - After dequeue, both head and tail should be null

3. **Large Number of Operations**:
   - Memory management for long-running applications

## Comparison with Other Implementations

| Implementation | Enqueue | Dequeue | Memory Usage      |
| -------------- | ------- | ------- | ----------------- |
| Array (simple) | O(1)    | O(n)    | Fixed/wasted      |
| Circular Array | O(1)    | O(1)    | Fixed/wasted      |
| Linked List    | O(1)    | O(1)    | Dynamic/efficient |

## Best Practices

1. **Error Handling**: Always check for empty queue before operations
2. **Method Chaining**: Return `this` for fluent interface
3. **Clear Documentation**: Document behavior for empty queues
4. **Consistent Naming**: Use standard method names (enqueue/dequeue)
5. **Type Safety**: Consider adding type checking for data

## Implementation Variations

### 1. Doubly Linked List Queue

- Allows O(1) access to both ends
- More memory per node (prev and next pointers)
- Useful for deque implementations

### 2. Circular Linked List Queue

- Tail points back to head
- Can be useful for certain algorithms
- Slightly more complex to implement

### 3. Priority Queue with Linked List

- Each node has priority value
- Insertion based on priority, not just order
- Dequeue removes highest priority element

## Conclusion

Linked list implementation provides an efficient and flexible way to implement queues with O(1) time complexity for all major operations. It's particularly useful when you need dynamic sizing and don't want the overhead of array resizing or the memory waste of unused array slots. Understanding this implementation is crucial for building efficient data processing systems and algorithms.
