// ==========================================
// STACK IMPLEMENTATIONS IN JAVASCRIPT
// ==========================================

// ==========================================
// ARRAY-BASED STACK IMPLEMENTATION
// ==========================================

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
		console.log("Stack (top to bottom):", this.items.slice().reverse().join(" -> "));
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

// ==========================================
// LINKED LIST-BASED STACK IMPLEMENTATION
// ==========================================

class StackNode {
	constructor(data) {
		this.data = data;
		this.next = null;
	}
}

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

// ==========================================
// ADVANCED STACK IMPLEMENTATIONS
// ==========================================

// ==========================================
// MIN STACK - Tracks minimum element in O(1) time
// ==========================================

class MinStack {
	constructor() {
		this.items = [];
		this.minStack = []; // Parallel stack to track minimums
	}

	push(element) {
		this.items.push(element);
		// Push to minStack: either the element or the current min
		const currentMin = this.minStack.length > 0 ? this.minStack[this.minStack.length - 1] : element;
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
		console.log("Stack (top to bottom):", this.items.slice().reverse().join(" -> "));
		console.log("Current minimum:", this.getMin());
	}

	clear() {
		this.items = [];
		this.minStack = [];
		return this;
	}
}

// ==========================================
// MAX STACK - Tracks maximum element in O(1) time
// ==========================================

class MaxStack {
	constructor() {
		this.items = [];
		this.maxStack = []; // Parallel stack to track maximums
	}

	push(element) {
		this.items.push(element);
		// Push to maxStack: either the element or the current max
		const currentMax = this.maxStack.length > 0 ? this.maxStack[this.maxStack.length - 1] : element;
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
		console.log("Stack (top to bottom):", this.items.slice().reverse().join(" -> "));
		console.log("Current maximum:", this.getMax());
	}

	clear() {
		this.items = [];
		this.maxStack = [];
		return this;
	}
}

// ==========================================
// STACK UTILITY FUNCTIONS
// ==========================================

/**
 * Reverses a string using a stack
 * @param {string} str - The string to reverse
 * @returns {string} - The reversed string
 */
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

/**
 * Checks if parentheses are balanced
 * @param {string} expression - The expression to check
 * @returns {boolean} - True if balanced, false otherwise
 */
function isBalancedParentheses(expression) {
	const stack = new ArrayStack();
	const pairs = {
		')': '(',
		'}': '{',
		']': '['
	};

	for (let char of expression) {
		if (char === '(' || char === '{' || char === '[') {
			stack.push(char);
		} else if (char === ')' || char === '}' || char === ']') {
			if (stack.isEmpty() || stack.pop() !== pairs[char]) {
				return false;
			}
		}
	}
	return stack.isEmpty();
}

/**
 * Evaluates a postfix expression
 * @param {string} expression - Space-separated postfix expression
 * @returns {number} - The result of the evaluation
 */
function evaluatePostfix(expression) {
	const stack = new ArrayStack();
	const tokens = expression.split(' ');

	for (let token of tokens) {
		if (!isNaN(token)) {
			stack.push(parseFloat(token));
		} else {
			const b = stack.pop();
			const a = stack.pop();

			switch (token) {
				case '+':
					stack.push(a + b);
					break;
				case '-':
					stack.push(a - b);
					break;
				case '*':
					stack.push(a * b);
					break;
				case '/':
					stack.push(a / b);
					break;
				case '^':
					stack.push(Math.pow(a, b));
					break;
			}
		}
	}
	return stack.pop();
}

// ==========================================
// EXAMPLE USAGE
// ==========================================

console.log("=== Array-Based Stack Examples ===");
const arrayStack = new ArrayStack();
arrayStack.push(10).push(20).push(30);
console.log("Stack after pushing 10, 20, 30:");
arrayStack.print(); // Stack (top to bottom): 30 -> 20 -> 10

console.log("Peek:", arrayStack.peek()); // 30
console.log("Pop:", arrayStack.pop()); // 30
console.log("Stack after pop:");
arrayStack.print(); // Stack (top to bottom): 20 -> 10

console.log("\n=== Linked List-Based Stack Examples ===");
const linkedStack = new LinkedListStack();
linkedStack.push(100).push(200).push(300);
console.log("Stack after pushing 100, 200, 300:");
linkedStack.print(); // Stack (top to bottom): 300 -> 200 -> 100

console.log("Peek:", linkedStack.peek()); // 300
console.log("Pop:", linkedStack.pop()); // 300
console.log("Stack after pop:");
linkedStack.print(); // Stack (top to bottom): 200 -> 100

console.log("\n=== Min Stack Examples ===");
const minStack = new MinStack();
minStack.push(5).push(2).push(8).push(1).push(6);
console.log("Min Stack after pushing 5, 2, 8, 1, 6:");
minStack.print(); // Shows stack and current min (1)

console.log("Pop:", minStack.pop()); // 6
console.log("Current min after pop:", minStack.getMin()); // 1

console.log("\n=== Max Stack Examples ===");
const maxStack = new MaxStack();
maxStack.push(5).push(2).push(8).push(1).push(6);
console.log("Max Stack after pushing 5, 2, 8, 1, 6:");
maxStack.print(); // Shows stack and current max (8)

console.log("Pop:", maxStack.pop()); // 6
console.log("Current max after pop:", maxStack.getMax()); // 8

console.log("\n=== Utility Functions Examples ===");
console.log("Reverse 'HELLO':", reverseString("HELLO")); // OLLEH
console.log("Balanced parentheses '({[]})':", isBalancedParentheses("({[]})")); // true
console.log("Balanced parentheses '({[})':", isBalancedParentheses("({[})")); // false
console.log("Evaluate postfix '3 4 + 2 *':", evaluatePostfix("3 4 + 2 *")); // 14
