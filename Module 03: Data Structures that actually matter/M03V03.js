// M03V03.js - Stack Implementation Examples

// ==========================================
// ARRAY-BASED STACK IMPLEMENTATION
// ==========================================

class ArrayStack {
	constructor() {
		this.items = [];
	}

	// Add element to top of stack => O(1)
	push(element) {
		this.items.push(element);
		console.log(`Pushed: ${element}`);
	}

	// Remove and return top element => O(1)
	pop() {
		if (this.isEmpty()) {
			console.log("Stack is empty - cannot pop");
			return null;
		}
		const popped = this.items.pop();
		console.log(`Popped: ${popped}`);
		return popped;
	}

	// Return top element without removing it => O(1)
	peek() {
		if (this.isEmpty()) {
			console.log("Stack is empty - cannot peek");
			return null;
		}
		return this.items[this.items.length - 1];
	}

	// Check if stack is empty => O(1)
	isEmpty() {
		return this.items.length === 0;
	}

	// Return size of stack => O(1)
	size() {
		return this.items.length;
	}

	// Clear the stack => O(1)
	clear() {
		this.items = [];
		console.log("Stack cleared");
	}

	// Print stack contents => O(n)
	print() {
		console.log(
			"Stack contents (top to bottom):",
			this.items.slice().reverse(),
		);
	}
}

console.log("=== Array-Based Stack Demo ===");
const arrayStack = new ArrayStack();

arrayStack.push(10);
arrayStack.push(20);
arrayStack.push(30);
arrayStack.print();

console.log("Peek:", arrayStack.peek());
console.log("Size:", arrayStack.size());

arrayStack.pop();
arrayStack.print();

arrayStack.pop();
arrayStack.pop();
arrayStack.pop(); // Try to pop from empty stack

// ==========================================
// LINKED LIST-BASED STACK IMPLEMENTATION
// ==========================================

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
		console.log(`Pushed: ${element}`);
	}

	pop() {
		if (this.isEmpty()) {
			console.log("Stack is empty - cannot pop");
			return null;
		}
		const poppedData = this.top.data;
		this.top = this.top.next;
		this.size--;
		console.log(`Popped: ${poppedData}`);
		return poppedData;
	}

	peek() {
		if (this.isEmpty()) {
			console.log("Stack is empty - cannot peek");
			return null;
		}
		return this.top.data;
	}

	isEmpty() {
		return this.size === 0;
	}

	getSize() {
		return this.size;
	}

	clear() {
		this.top = null;
		this.size = 0;
		console.log("Stack cleared");
	}

	print() {
		const elements = [];
		let current = this.top;
		while (current) {
			elements.push(current.data);
			current = current.next;
		}
		console.log("Stack contents (top to bottom):", elements);
	}
}

console.log("\n=== Linked List-Based Stack Demo ===");
const linkedStack = new LinkedListStack();

linkedStack.push("A");
linkedStack.push("B");
linkedStack.push("C");
linkedStack.print();

console.log("Peek:", linkedStack.peek());
console.log("Size:", linkedStack.getSize());

linkedStack.pop();
linkedStack.print();

// ==========================================
// REAL-WORLD EXAMPLES
// ==========================================

// 1. Reverse a String using Stack
function reverseString(str) {
	const stack = new ArrayStack();
	let reversed = "";

	// Push all characters to stack
	for (let char of str) {
		stack.push(char);
	}

	// Pop all characters to get reverse
	while (!stack.isEmpty()) {
		reversed += stack.pop();
	}

	return reversed;
}

console.log("\n=== Real-World Examples ===");
console.log("Reverse String:");
console.log("Original: 'Hello World'");
console.log("Reversed:", reverseString("Hello World"));

// 2. Balanced Parentheses Checker
function isBalanced(expression) {
	const stack = new ArrayStack();
	const brackets = {
		"(": ")",
		"[": "]",
		"{": "}",
	};

	for (let char of expression) {
		if (brackets[char]) {
			// Opening bracket
			stack.push(char);
		} else if (char === ")" || char === "]" || char === "}") {
			// Closing bracket
			if (stack.isEmpty()) return false;

			const top = stack.pop();
			if (brackets[top] !== char) return false;
		}
	}

	return stack.isEmpty();
}

console.log("\nBalanced Parentheses:");
console.log("'{[()]}' is balanced:", isBalanced("{[()]}"));
console.log("'{(})' is balanced:", isBalanced("{(})"));
console.log("'([{}])' is balanced:", isBalanced("([{}])"));
console.log("'{[(])}' is balanced:", isBalanced("{[(])}"));

// 3. Browser History Simulation
class BrowserHistory {
	constructor() {
		this.backStack = new ArrayStack();
		this.forwardStack = new ArrayStack();
		this.currentPage = null;
	}

	visit(page) {
		if (this.currentPage) {
			this.backStack.push(this.currentPage);
		}
		this.currentPage = page;
		// Clear forward stack when visiting new page
		this.forwardStack.clear();
		console.log(`Visited: ${page}`);
	}

	goBack() {
		if (!this.backStack.isEmpty()) {
			this.forwardStack.push(this.currentPage);
			this.currentPage = this.backStack.pop();
			console.log(`Went back to: ${this.currentPage}`);
			return this.currentPage;
		}
		console.log("Cannot go back - no history");
		return null;
	}

	goForward() {
		if (!this.forwardStack.isEmpty()) {
			this.backStack.push(this.currentPage);
			this.currentPage = this.forwardStack.pop();
			console.log(`Went forward to: ${this.currentPage}`);
			return this.currentPage;
		}
		console.log("Cannot go forward - no forward history");
		return null;
	}

	getCurrentPage() {
		return this.currentPage;
	}
}

console.log("\nBrowser History Simulation:");
const browser = new BrowserHistory();
browser.visit("google.com");
browser.visit("github.com");
browser.visit("stackoverflow.com");

browser.goBack();
browser.goBack();
browser.goForward();
browser.visit("reddit.com");
browser.goBack();

// ==========================================
// ADVANCED STACK: MIN STACK
// ==========================================

class MinStack {
	constructor() {
		this.mainStack = new ArrayStack();
		this.minStack = new ArrayStack();
	}

	push(element) {
		this.mainStack.push(element);

		// Push to min stack if it's empty or element is smaller/equal to current min
		if (this.minStack.isEmpty() || element <= this.minStack.peek()) {
			this.minStack.push(element);
		}
	}

	pop() {
		const popped = this.mainStack.pop();
		if (popped === this.minStack.peek()) {
			this.minStack.pop();
		}
		return popped;
	}

	peek() {
		return this.mainStack.peek();
	}

	getMin() {
		if (this.minStack.isEmpty()) {
			console.log("Stack is empty - no minimum");
			return null;
		}
		return this.minStack.peek();
	}

	isEmpty() {
		return this.mainStack.isEmpty();
	}

	size() {
		return this.mainStack.size();
	}
}

console.log("\n=== Min Stack Demo ===");
const minStack = new MinStack();

minStack.push(5);
console.log("Pushed 5, Min:", minStack.getMin());

minStack.push(3);
console.log("Pushed 3, Min:", minStack.getMin());

minStack.push(7);
console.log("Pushed 7, Min:", minStack.getMin());

minStack.push(2);
console.log("Pushed 2, Min:", minStack.getMin());

minStack.pop();
console.log("Popped, Min:", minStack.getMin());

minStack.pop();
console.log("Popped, Min:", minStack.getMin());

// ==========================================
// STACK SORTING (Sort stack using only stack operations)
// ==========================================

function sortStack(inputStack) {
	const tempStack = new ArrayStack();

	while (!inputStack.isEmpty()) {
		const temp = inputStack.pop();

		// Move elements from tempStack back to inputStack if they're smaller than temp
		while (!tempStack.isEmpty() && tempStack.peek() < temp) {
			inputStack.push(tempStack.pop());
		}

		// Place temp in correct position
		tempStack.push(temp);
	}

	// Move all elements back to inputStack (now sorted)
	while (!tempStack.isEmpty()) {
		inputStack.push(tempStack.pop());
	}

	return inputStack;
}

console.log("\n=== Stack Sorting Demo ===");
const unsortedStack = new ArrayStack();
unsortedStack.push(34);
unsortedStack.push(3);
unsortedStack.push(31);
unsortedStack.push(98);
unsortedStack.push(92);
unsortedStack.push(23);

console.log("Unsorted stack:");
unsortedStack.print();

const sortedStack = sortStack(unsortedStack);
console.log("Sorted stack:");
sortedStack.print();

// ==========================================
// PERFORMANCE COMPARISON
// ==========================================

console.log("\n=== Performance Comparison ===");

function performanceTest(stack, operations) {
	const start = Date.now();

	// Perform operations
	for (let i = 0; i < operations; i++) {
		stack.push(i);
	}

	for (let i = 0; i < operations / 2; i++) {
		stack.pop();
	}

	const end = Date.now();
	return end - start;
}

const testSize = 10000;

const arrayStackPerf = new ArrayStack();
const linkedStackPerf = new LinkedListStack();

console.log(`Performance test with ${testSize} operations:`);
console.log(`Array Stack: ${performanceTest(arrayStackPerf, testSize)}ms`);
console.log(
	`Linked List Stack: ${performanceTest(linkedStackPerf, testSize)}ms`,
);

// ==========================================
// STACK-BASED EVALUATOR (Simple postfix calculator)
// ==========================================

function evaluatePostfix(expression) {
	const stack = new ArrayStack();
	const tokens = expression.split(" ");

	for (let token of tokens) {
		if (!isNaN(token)) {
			// Number
			stack.push(parseFloat(token));
		} else {
			// Operator
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
				default:
					throw new Error(`Unknown operator: ${token}`);
			}
		}
	}

	return stack.pop();
}

console.log("\n=== Postfix Expression Evaluator ===");
console.log("Expression: '3 4 + 2 *'");
console.log("Result:", evaluatePostfix("3 4 + 2 *"));

console.log("Expression: '5 1 2 + 4 * + 3 -'");
console.log("Result:", evaluatePostfix("5 1 2 + 4 * + 3 -"));

// ==========================================
// SUMMARY
// ==========================================

console.log("\n=== Stack Implementation Summary ===");
console.log("✓ Array-based Stack: Simple, efficient, good for most use cases");
console.log("✓ Linked List-based Stack: Dynamic sizing, no wasted space");
console.log(
	"✓ Real-world applications: String reversal, parentheses checking, browser history",
);
console.log(
	"✓ Advanced features: Min Stack, stack sorting, postfix evaluation",
);
console.log(
	"✓ Performance: Both implementations offer O(1) for core operations",
);

// Module Video codes

class Stack {
	constructor() {
		this.items = [];
	}

	// Add element to top of stack => O(1)
	push(value) {
		this.items.push(value);
	}

	// Remove and return top element => O(1)
	pop() {
		if (this.isEmpty()) {
			return null;
		}

		return this.items.pop();
	}

	// Return top element without removing it => O(1)
	peek() {
		if (this.isEmpty()) {
			return null;
		}
		return this.items[this.size() - 1];
	}

	// Return size of stack => O(1)
	size() {
		return this.items.length;
	}

	// Check if stack is empty => O(1)
	isEmpty() {
		return this.size() === 0;
	}

	// Print stack contents => O(n)
	print() {
		console.log(this.items.slice().reverse().join(" => "));
	}
}

const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
stack.print(); // 3 => 2 => 1
console.log("Size:", stack.size()); // 3

console.log("Popped:", stack.pop()); // 3
console.log("Peek:", stack.peek()); // 2
console.log("Is Empty:", stack.isEmpty()); // false
stack.print(); // 2 => 1
console.log("Size:", stack.size()); // 2
console.log("Popped:", stack.pop()); // 2
console.log("Popped:", stack.pop()); // 1
console.log("Is Empty:", stack.isEmpty()); // true
stack.print(); // (prints nothing)
console.log("Popped:", stack.pop()); // null
