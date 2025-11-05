# Stack Implementation

## What is a Stack?

A Stack is a linear data structure that follows the **LIFO (Last In, First Out)** principle. This means the last element added to the stack is the first one to be removed.

Think of it like a stack of plates:

- You add plates to the top
- You remove plates from the top
- The plate you put on last is the first one you can take off

## Core Stack Operations

### 1. Push

- **Description**: Adds an element to the top of the stack
- **Time Complexity**: O(1)
- **Parameters**: The element to add

### 2. Pop

- **Description**: Removes and returns the top element from the stack
- **Time Complexity**: O(1)
- **Returns**: The removed element (or null/undefined if stack is empty)

### 3. Peek/Top

- **Description**: Returns the top element without removing it
- **Time Complexity**: O(1)
- **Returns**: The top element (or null/undefined if stack is empty)

### 4. isEmpty

- **Description**: Checks if the stack is empty
- **Time Complexity**: O(1)
- **Returns**: Boolean (true if empty, false otherwise)

### 5. Size/Length

- **Description**: Returns the number of elements in the stack
- **Time Complexity**: O(1)
- **Returns**: Integer representing the stack size

## Stack Implementation Approaches

### 1. Array-Based Implementation

**Pros:**

- Simple to implement
- Efficient for most operations
- Good cache performance

**Cons:**

- Fixed size (if using static arrays)
- Potential wasted space

**JavaScript Implementation:**

```javascript
class ArrayStack {
	constructor() {
		this.items = [];
	}

	push(element) {
		this.items.push(element);
	}

	pop() {
		return this.items.pop();
	}

	peek() {
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

### 2. Linked List-Based Implementation

**Pros:**

- Dynamic size
- No wasted space
- Efficient memory usage

**Cons:**

- Slightly more complex implementation
- Extra memory for node pointers

**JavaScript Implementation:**

```javascript
class Node {
	constructor(data) {
		this.data = data;
		this.next = null;
	}
}

class LinkedListStack {
	constructor() {
		this.top = null;
		this.size = 0;
	}

	push(element) {
		const newNode = new Node(element);
		newNode.next = this.top;
		this.top = newNode;
		this.size++;
	}

	pop() {
		if (this.isEmpty()) return null;

		const poppedData = this.top.data;
		this.top = this.top.next;
		this.size--;
		return poppedData;
	}

	peek() {
		return this.isEmpty() ? null : this.top.data;
	}

	isEmpty() {
		return this.size === 0;
	}

	getSize() {
		return this.size;
	}
}
```

## Time Complexity Analysis

| Operation | Array-Based | Linked List-Based |
| --------- | ----------- | ----------------- |
| Push      | O(1)        | O(1)              |
| Pop       | O(1)        | O(1)              |
| Peek      | O(1)        | O(1)              |
| isEmpty   | O(1)        | O(1)              |
| Size      | O(1)        | O(1)              |

## Real-World Use Cases

### 1. Function Call Stack

- Programming languages use stacks to manage function calls
- Each function call pushes a stack frame
- Return pops the stack frame

### 2. Undo/Redo Operations

- Text editors use stacks for undo operations
- Each action is pushed to undo stack
- Undo pops from undo stack and pushes to redo stack

### 3. Browser History

- Back button functionality
- Each visited page is pushed to stack
- Back button pops from stack

### 4. Expression Evaluation

- Converting infix to postfix notation
- Evaluating postfix expressions
- Parentheses matching

### 5. Depth-First Search (DFS)

- Graph traversal algorithm
- Uses stack to keep track of nodes to visit

### 6. Syntax Parsing

- Compilers use stacks for parsing expressions
- Managing nested structures (XML, JSON parsing)

## Common Stack Problems

### 1. Balanced Parentheses

Check if parentheses, brackets, and braces are properly balanced.

### 2. Reverse a String

Use stack to reverse the order of characters.

### 3. Evaluate Postfix Expression

Convert and evaluate mathematical expressions.

### 4. Next Greater Element

Find the next greater element for each element in an array.

### 5. Sort Stack

Sort a stack using only stack operations.

## Stack vs Other Data Structures

### Stack vs Queue

- **Stack**: LIFO (Last In, First Out)
- **Queue**: FIFO (First In, First Out)

### Stack vs Array

- **Stack**: Limited operations (push/pop/peek)
- **Array**: Full random access, insert/delete at any position

### Stack vs Linked List

- **Stack**: Restricts operations to one end
- **Linked List**: Operations allowed at any position

## Implementation Considerations

### 1. Error Handling

- Handle empty stack operations gracefully
- Provide meaningful error messages

### 2. Type Safety

- Consider generic implementations for type safety
- Validate input types when necessary

### 3. Memory Management

- Be aware of memory usage patterns
- Consider garbage collection implications

### 4. Thread Safety

- Implement synchronization for multi-threaded environments
- Consider immutable stack implementations

## Advanced Stack Concepts

### 1. Min Stack

Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

### 2. Stack with Max API

Similar to Min Stack but tracks maximum values.

### 3. Two Stacks in One Array

Implement two stacks using a single array efficiently.

### 4. Stack Permutations

Determine if one stack permutation can be obtained from another.

## Best Practices

1. **Choose the right implementation**: Array-based for simplicity, linked list for dynamic sizing
2. **Handle edge cases**: Empty stack, full stack (if applicable)
3. **Document your code**: Clear method descriptions and examples
4. **Test thoroughly**: Unit tests for all operations and edge cases
5. **Consider performance**: Profile for your specific use case
6. **Think about memory**: Choose implementation based on memory constraints

## Conclusion

Stacks are fundamental data structures with wide applications in computer science. Understanding their implementation and use cases is crucial for efficient problem-solving and system design. The choice between array-based and linked list-based implementations depends on your specific requirements and constraints.
