// M03V01.js - Stateless vs Stateful Examples

// ==========================================
// STATELESS EXAMPLES
// ==========================================

// Pure function - always returns same output for same input
function add(a, b) {
	return a + b;
}

console.log("Stateless - Pure function:");
console.log("add(2, 3) =", add(2, 3)); // Always 5
console.log("add(2, 3) =", add(2, 3)); // Still 5

// Another pure function
function calculateArea(width, height) {
	return width * height;
}

console.log("\ncalculateArea(5, 10) =", calculateArea(5, 10)); // Always 50

// Array methods used in stateless way
const numbers = [1, 2, 3, 4, 5];

console.log("\nStateless array operations:");
console.log("Original array:", numbers);
console.log(
	"map(x => x * 2):",
	numbers.map((x) => x * 2),
);
console.log(
	"filter(x => x > 3):",
	numbers.filter((x) => x > 3),
);
console.log(
	"reduce((sum, x) => sum + x, 0):",
	numbers.reduce((sum, x) => sum + x, 0),
);
console.log("Original array (unchanged):", numbers);

// ==========================================
// STATEFUL EXAMPLES
// ==========================================

// Stateful class - maintains internal state
class Counter {
	constructor() {
		this.count = 0;
	}

	increment() {
		this.count += 1;
		return this.count;
	}

	decrement() {
		this.count -= 1;
		return this.count;
	}

	getCount() {
		return this.count;
	}
}

console.log("\nStateful - Counter class:");
const counter = new Counter();
console.log("Initial count:", counter.getCount());
console.log("After increment:", counter.increment());
console.log("After increment:", counter.increment());
console.log("After decrement:", counter.decrement());
console.log("Final count:", counter.getCount());

// Another stateful example - function with side effects
let globalCounter = 0;

function incrementGlobal() {
	globalCounter += 1;
	return globalCounter;
}

console.log("\nStateful - Global counter with side effects:");
console.log("globalCounter before:", globalCounter);
console.log("incrementGlobal():", incrementGlobal());
console.log("incrementGlobal():", incrementGlobal());
console.log("globalCounter after:", globalCounter);

// ==========================================
// MIXED EXAMPLE - Stateful container with stateless operations
// ==========================================

class TodoList {
	constructor() {
		this.todos = [];
	}

	addTodo(text) {
		this.todos.push({ id: Date.now(), text, completed: false });
	}

	toggleTodo(id) {
		const todo = this.todos.find((t) => t.id === id);
		if (todo) {
			todo.completed = !todo.completed;
		}
	}

	getTodos() {
		return [...this.todos]; // Return copy to avoid external mutation
	}

	// Stateless operation on the data
	getCompletedTodos() {
		return this.todos.filter((todo) => todo.completed);
	}

	// Another stateless operation
	getActiveTodos() {
		return this.todos.filter((todo) => !todo.completed);
	}
}

console.log("\nMixed - Stateful TodoList with stateless operations:");
const todoList = new TodoList();
todoList.addTodo("Learn stateless vs stateful");
todoList.addTodo("Implement data structures");
todoList.addTodo("Write tests");

console.log("All todos:", todoList.getTodos());
console.log("Active todos:", todoList.getActiveTodos());

todoList.toggleTodo(todoList.todos[0].id);
console.log("After toggling first todo:");
console.log("All todos:", todoList.getTodos());
console.log("Completed todos:", todoList.getCompletedTodos());
console.log("Active todos:", todoList.getActiveTodos());

// ==========================================
// DEMONSTRATING THE DIFFERENCE
// ==========================================

console.log("\nDemonstrating the difference:");

// Stateless: Same input, same output
const input = [1, 2, 3, 4, 5];
console.log("Stateless - same input, same output:");
console.log(
	"input.map(x => x * 2):",
	input.map((x) => x * 2),
);
console.log(
	"input.map(x => x * 2) again:",
	input.map((x) => x * 2),
);

// Stateful: Behavior changes over time
console.log("\nStateful - behavior changes over time:");
const statefulCounter = new Counter();
console.log("Call 1:", statefulCounter.increment());
console.log("Call 2:", statefulCounter.increment());
console.log("Call 3:", statefulCounter.increment());
console.log("Each call returns different value despite same method call");

// Module video codes

//* Stateless vs Stateful

const counterFunc = (amount) => {
	let count = 0;

	count = count + amount;

	return count;
};

console.log(counterFunc(3)); // 3
console.log(counterFunc(2)); // 2

const counterObj = {
	count: 0,

	add(amount) {
		this.count += amount;
		return this.count;
	},

	print() {
		console.log(this.count);
	},
};

counterObj.add(3);
counterObj.print(); // 3
counterObj.add(2);
counterObj.print(); // 5
//* End of Module video codes
