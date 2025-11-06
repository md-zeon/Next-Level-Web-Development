# Stack Implementations in JavaScript

This document provides comprehensive implementations of stack data structures in JavaScript, including detailed explanations, code examples, and usage demonstrations.

## Table of Contents

1. [Introduction to Stacks](#introduction-to-stacks)
2. [Array-Based Stack](#array-based-stack)
3. [Linked List-Based Stack](#linked-list-based-stack)
4. [Advanced Stack Implementations](#advanced-stack-implementations)
5. [Stack Applications](#stack-applications)
6. [Time Complexity Comparison](#time-complexity-comparison)
7. [When to Use Stacks](#when-to-use-stacks)
8. [Implementation Notes](#implementation-notes)

## Introduction to Stacks

A Stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle. Elements are added and removed from the same end, called the "top" of the stack. Think of it like a stack of plates - you add plates to the top and remove from the top.

### Key Characteristics

- **LIFO (Last In, First Out)**: The last element added is the first one to be removed
- **Single Point of Access**: All operations occur at the top
- **No Random Access**: Elements cannot be accessed by index directly

### Basic Operations

- **Push**: Add an element to the top
- **Pop**: Remove and return the top element
- **Peek**: View the top element without removing it
- **isEmpty**: Check if stack is empty
- **Size**: Get number of elements

## Array-Based Stack

The most common implementation uses JavaScript arrays, leveraging built-in array methods for efficiency.

### Implementation

```javascript
class ArrayStack {
	constructor() {
		this.items = [];
	}

	/**
	 * Adds an element to the top of the stack
	 * @param {*} element - The element to add
	 * @returns {ArrayStack} - Returns the stack for method chaining
	 */
	push(element) {
		this.items.push(element);
		return this;
	}

	/**
	 * Removes and returns the top element from the stack
	 * @returns {*} - The removed element, or null if stack is empty
	 */
	pop() {
		if (this.isEmpty()) {
			console.log("Stack is empty. Cannot pop.");
			return null;
		}
		return this.items.pop();
	}

	/**
	 * Returns the top element without removing it
	 * @returns {*} - The top element, or null if stack is empty
	 */
	peek() {
		if (this.isEmpty()) {
			console.log("Stack is empty. Cannot peek.");
			return null;
		}
		return this.items[this.items.length - 1];
	}

	/**
	 * Checks if the stack is empty
	 * @returns {boolean} - True if empty, false otherwise
	 */
	isEmpty() {
		return this.items.length === 0;
	}

	/**
	 * Returns the number of elements in the stack
	 * @returns {number} - The size of the stack
	 */
	size() {
		return this.items.length;
	}

	/**
	 * Prints the stack contents
	 */
	print() {
		if (this.isEmpty()) {
			console.log("Stack is empty");
			return;
		}
		console.log(
			"Stack (top to bottom):",
			this.items.slice().reverse().join(" -> "),
		);
	}

	/**
	 * Clears all elements from the stack
	 * @returns {ArrayStack} - Returns the stack for method chaining
	 */
	clear() {
		this.items = [];
		return this;
	}
}
```

### Example Usage

```javascript
const stack = new ArrayStack();
stack.push(10).push(20).push(30);
stack.print(); // Stack (top to bottom): 30 -> 20 -> 10

console.log("Top element:", stack.peek()); // 30
console.log("Removed:", stack.pop()); // 30
stack.print(); // Stack (top to bottom): 20 -> 10
```

## Linked List-Based Stack

When you need to avoid array resizing overhead or want more control over memory, a linked list implementation is useful.

### Node Structure

```javascript
class StackNode {
	constructor(data) {
		this.data = data;
		this.next = null;
	}
}
```

### Implementation

```javascript
class LinkedListStack {
	constructor() {
		this.top = null;
		this.length = 0;
	}

	/**
	 * Adds an element to the top of the stack
	 * @param {*} element - The element to add
	 * @returns {LinkedListStack} - Returns the stack for method chaining
	 */
	push(element) {
		const newNode = new StackNode(element);
		newNode.next = this.top;
		this.top = newNode;
		this.length++;
		return this;
	}

	/**
	 * Removes and returns the top element from the stack
	 * @returns {*} - The removed element, or null if stack is empty
	 */
	pop() {
		if (this.isEmpty()) {
			console.log("Stack is empty. Cannot pop.");
			return null;
		}
		const poppedData = this.top.data;
		this.top = this.top.next;
		this.length--;
		return poppedData;
	}

	/**
	 * Returns the top element without removing it
	 * @returns {*} - The top element, or null if stack is empty
	 */
	peek() {
		if (this.isEmpty()) {
			console.log("Stack is empty. Cannot peek.");
			return null;
		}
		return this.top.data;
	}

	/**
	 * Checks if the stack is empty
	 * @returns {boolean} - True if empty, false otherwise
	 */
	isEmpty() {
		return this.length === 0;
	}

	/**
	 * Returns the number of elements in the stack
	 * @returns {number} - The size of the stack
	 */
	size() {
		return this.length;
	}

	/**
	 * Prints the stack contents
	 */
	print() {
		if (this.isEmpty()) {
			console.log("Stack is empty");
			return;
		}
		const elements = [];
		let current = this.top;
		while (current) {
			elements.push(current.data);
			current = current.next;
		}
		console.log("Stack (top to bottom):", elements.join(" -> "));
	}

	/**
	 * Clears all elements from the stack
	 * @returns {LinkedListStack} - Returns the stack for method chaining
	 */
	clear() {
		this.top = null;
		this.length = 0;
		return this;
	}
}
```

### Example Usage

```javascript
const linkedStack = new LinkedListStack();
linkedStack.push(100).push(200).push(300);
linkedStack.print(); // Stack (top to bottom): 300 -> 200 -> 100

console.log("Top element:", linkedStack.peek()); // 300
console.log("Removed:", linkedStack.pop()); // 300
linkedStack.print(); // Stack (top to bottom): 200 -> 100
```

## Advanced Stack Implementations

### Min Stack

A stack that can return the minimum element in O(1) time using a parallel stack to track minimums.

```javascript
class MinStack {
	constructor() {
		this.items = [];
		this.minStack = []; // Parallel stack to track minimums
	}

	push(element) {
		this.items.push(element);
		// Push to minStack: either the element or the current min
		const currentMin =
			this.minStack.length > 0
				? this.minStack[this.minStack.length - 1]
				: element;
		this.minStack.push(Math.min(element, currentMin));
		return this;
	}

	pop() {
		if (this.isEmpty()) {
			console.log("Stack is empty. Cannot pop.");
			return null;
		}
		this.minStack.pop();
		return this.items.pop();
	}

	peek() {
		if (this.isEmpty()) {
			console.log("Stack is empty. Cannot peek.");
			return null;
		}
		return this.items[this.items.length - 1];
	}

	/**
	 * Returns the minimum element in O(1) time
	 * @returns {*} - The minimum element, or null if stack is empty
	 */
	getMin() {
		if (this.isEmpty()) {
			console.log("Stack is empty. No minimum element.");
			return null;
		}
		return this.minStack[this.minStack.length - 1];
	}

	isEmpty() {
		return this.items.length === 0;
	}

	size() {
		return this.items.length;
	}

	print() {
		if (this.isEmpty()) {
			console.log("Stack is empty");
			return;
		}
		console.log(
			"Stack (top to bottom):",
			this.items.slice().reverse().join(" -> "),
		);
		console.log("Current minimum:", this.getMin());
	}

	clear() {
		this.items = [];
		this.minStack = [];
		return this;
	}
}
```

### Max Stack

Similar to MinStack but tracks the maximum element.

```javascript
class MaxStack {
	constructor() {
		this.items = [];
		this.maxStack = []; // Parallel stack to track maximums
	}

	push(element) {
		this.items.push(element);
		// Push to maxStack: either the element or the current max
		const currentMax =
			this.maxStack.length > 0
				? this.maxStack[this.maxStack.length - 1]
				: element;
		this.maxStack.push(Math.max(element, currentMax));
		return this;
	}

	pop() {
		if (this.isEmpty()) {
			console.log("Stack is empty. Cannot pop.");
			return null;
		}
		this.maxStack.pop();
		return this.items.pop();
	}

	peek() {
		if (this.isEmpty()) {
			console.log("Stack is empty. Cannot peek.");
			return null;
		}
		return this.items[this.items.length - 1];
	}

	/**
	 * Returns the maximum element in O(1) time
	 * @returns {*} - The maximum element, or null if stack is empty
	 */
	getMax() {
		if (this.isEmpty()) {
			console.log("Stack is empty. No maximum element.");
			return null;
		}
		return this.maxStack[this.maxStack.length - 1];
	}

	isEmpty() {
		return this.items.length === 0;
	}

	size() {
		return this.items.length;
	}

	print() {
		if (this.isEmpty()) {
			console.log("Stack is empty");
			return;
		}
		console.log(
			"Stack (top to bottom):",
			this.items.slice().reverse().join(" -> "),
		);
		console.log("Current maximum:", this.getMax());
	}

	clear() {
		this.items = [];
		this.maxStack = [];
		return this;
	}
}
```

## Stack Applications

### String Reversal

```javascript
function reverseString(str) {
	const stack = new ArrayStack();
	for (let char of str) {
		stack.push(char);
	}

	let reversed = "";
	while (!stack.isEmpty()) {
		reversed += stack.pop();
	}
	return reversed;
}

console.log(reverseString("HELLO")); // "OLLEH"
```

### Balanced Parentheses Check

```javascript
function isBalancedParentheses(expression) {
	const stack = new ArrayStack();
	const pairs = {
		")": "(",
		"}": "{",
		"]": "[",
	};

	for (let char of expression) {
		if (char === "(" || char === "{" || char === "[") {
			stack.push(char);
		} else if (char === ")" || char === "}" || char === "]") {
			if (stack.isEmpty() || stack.pop() !== pairs[char]) {
				return false;
			}
		}
	}
	return stack.isEmpty();
}

console.log(isBalancedParentheses("({[]})")); // true
console.log(isBalancedParentheses("({[})")); // false
```

### Postfix Expression Evaluation

```javascript
function evaluatePostfix(expression) {
	const stack = new ArrayStack();
	const tokens = expression.split(" ");

	for (let token of tokens) {
		if (!isNaN(token)) {
			stack.push(parseFloat(token));
		} else {
			const b = stack.pop();
			const a = stack.pop();

			switch (token) {
				case "+":
					stack.push(a + b);
					break;
				case "-":
					stack.push(a - b);
					break;
				case "*":
					stack.push(a * b);
					break;
				case "/":
					stack.push(a / b);
					break;
				case "^":
					stack.push(Math.pow(a, b));
					break;
			}
		}
	}
	return stack.pop();
}

console.log(evaluatePostfix("3 4 + 2 *")); // 14 (3+4=7, 7*2=14)
```

## Time Complexity Comparison

| Operation | Array-Based Stack | Linked List-Based Stack |
| --------- | ----------------- | ----------------------- |
| Push      | O(1)              | O(1)                    |
| Pop       | O(1)              | O(1)                    |
| Peek      | O(1)              | O(1)                    |
| isEmpty   | O(1)              | O(1)                    |
| Size      | O(1)              | O(1)                    |
| Clear     | O(1)              | O(1)                    |

## When to Use Stacks

### Array-Based Stack

- **Best for**: Most general use cases, simplicity
- **Use when**: Memory efficiency isn't critical, need fast random access to underlying data
- **Common applications**: Function call stack, expression evaluation, undo mechanisms

### Linked List-Based Stack

- **Best for**: Memory-constrained environments, predictable memory usage
- **Use when**: Need to avoid array resizing overhead, working with large datasets
- **Common applications**: Browser back button, text editor undo, recursive algorithm simulation

### Min/Max Stacks

- **Best for**: Need constant-time min/max queries
- **Use when**: Tracking minimum/maximum values is critical (stock prices, sliding windows)
- **Common applications**: Sliding window maximum, stock span problems, nearest greater element

## Implementation Notes

### Method Chaining

All implementations support method chaining for fluent interfaces:

```javascript
stack.push(1).push(2).push(3).pop();
```

### Error Handling

All methods include empty stack checks and appropriate error messages.

### Memory Management

- **Array-based**: JavaScript arrays automatically resize, may waste memory
- **Linked list-based**: Uses exactly the memory needed, no overhead
- **Min/Max stacks**: Use additional space (O(n)) for O(1) min/max queries

### Performance Considerations

- Stacks are excellent for LIFO operations
- Consider arrays for most use cases due to simplicity
- Use linked lists when memory predictability is important

## Common Stack Problems

1. **Valid Parentheses** - Check balanced brackets
2. **Reverse a String** - Using stack to reverse characters
3. **Evaluate Expression** - Postfix/prefix evaluation
4. **Next Greater Element** - Find next larger element
5. **Stack with getMin()** - Implement min stack
6. **Largest Rectangle in Histogram** - Using stack for optimization
7. **Simplify Path** - Unix path simplification
8. **Decode String** - String decoding with nested patterns

## Conclusion

Stacks are fundamental data structures with wide applications in programming. The choice between array-based and linked list-based implementations depends on specific requirements. Array-based stacks are generally preferred for their simplicity, while linked list-based stacks offer better memory predictability. Advanced variations like Min/Max stacks provide additional functionality for specific use cases.
