// M03V02.js - Basic Class Constructor and Methods Examples

// ==========================================
// BASIC CLASS WITH CONSTRUCTOR
// ==========================================

class Person {
	// Constructor - called when creating new instances
	constructor(name, age) {
		// Initialize instance properties
		this.name = name;
		this.age = age;
		console.log(`Person ${name} created, age: ${age}`);
	}

	// Instance method
	introduce() {
		return `Hi, I'm ${this.name} and I'm ${this.age} years old.`;
	}

	// Instance method that modifies state
	haveBirthday() {
		this.age += 1;
		return `Happy birthday! Now I'm ${this.age} years old.`;
	}

	// Instance method using other methods
	celebrateBirthday() {
		const birthdayMessage = this.haveBirthday();
		return `${this.introduce()} ${birthdayMessage}`;
	}
}

console.log("=== Basic Class Example ===");
const person1 = new Person("Alice", 25);
const person2 = new Person("Bob", 30);

console.log(person1.introduce());
console.log(person2.introduce());

console.log("\nAfter birthdays:");
console.log(person1.celebrateBirthday());
console.log(person2.haveBirthday());

// ==========================================
// CLASS WITH DIFFERENT TYPES OF METHODS
// ==========================================

class Calculator {
	constructor() {
		this.history = []; // Instance property to track calculations
	}

	// Regular instance method
	add(a, b) {
		const result = a + b;
		this.history.push(`${a} + ${b} = ${result}`);
		return result;
	}

	// Instance method with different logic
	multiply(a, b) {
		const result = a * b;
		this.history.push(`${a} × ${b} = ${result}`);
		return result;
	}

	// Getter method - accessed like a property
	get lastCalculation() {
		return this.history[this.history.length - 1] || "No calculations yet";
	}

	// Setter method - allows setting values with validation
	set precision(value) {
		if (value >= 0 && value <= 10) {
			this._precision = value;
		} else {
			throw new Error("Precision must be between 0 and 10");
		}
	}

	// Static method - called on the class, not instances
	static createScientific() {
		const calc = new Calculator();
		calc.isScientific = true;
		return calc;
	}

	// Method that returns formatted history
	getHistory() {
		return this.history.length > 0
			? this.history.join("\n")
			: "No calculation history";
	}
}

console.log("\n=== Calculator Class Example ===");
const calc = new Calculator();

console.log("Addition:", calc.add(5, 3));
console.log("Multiplication:", calc.multiply(4, 2));
console.log("Last calculation:", calc.lastCalculation);
console.log("\nCalculation history:");
console.log(calc.getHistory());

// Static method usage
const scientificCalc = Calculator.createScientific();
console.log("\nScientific calculator created:", scientificCalc.isScientific);

// ==========================================
// CLASS WITH PRIVATE FIELDS (ES2022+)
// ==========================================

class BankAccount {
	#balance = 0; // Private field
	#accountNumber; // Private field

	constructor(accountNumber, initialBalance = 0) {
		this.#accountNumber = accountNumber;
		this.#balance = initialBalance;
	}

	// Public method to deposit
	deposit(amount) {
		if (amount > 0) {
			this.#balance += amount;
			return `Deposited $${amount}. New balance: $${this.#balance}`;
		}
		return "Invalid deposit amount";
	}

	// Public method to withdraw
	withdraw(amount) {
		if (amount > 0 && amount <= this.#balance) {
			this.#balance -= amount;
			return `Withdrew $${amount}. New balance: $${this.#balance}`;
		}
		return "Invalid withdrawal amount or insufficient funds";
	}

	// Public getter for balance (read-only)
	get balance() {
		return this.#balance;
	}

	// Public getter for account number
	get accountNumber() {
		return this.#accountNumber;
	}

	// Private method (simulated with naming convention)
	_calculateInterest(rate) {
		return (this.#balance * rate) / 100;
	}

	// Public method using private method
	applyInterest(rate) {
		const interest = this._calculateInterest(rate);
		this.#balance += interest;
		return `Applied ${rate}% interest. Earned: $${interest.toFixed(
			2,
		)}. New balance: $${this.#balance.toFixed(2)}`;
	}
}

console.log("\n=== Bank Account with Private Fields ===");
const account = new BankAccount("123456789", 1000);

console.log("Account number:", account.accountNumber);
console.log("Initial balance:", account.balance);

console.log(account.deposit(500));
console.log(account.withdraw(200));
console.log(account.applyInterest(5));

// ==========================================
// INHERITANCE EXAMPLE
// ==========================================

class Animal {
	constructor(name, species) {
		this.name = name;
		this.species = species;
	}

	makeSound() {
		return `${this.name} makes a sound`;
	}

	eat() {
		return `${this.name} is eating`;
	}

	// Static method
	static getKingdom() {
		return "Animalia";
	}
}

class Dog extends Animal {
	constructor(name, breed) {
		// Call parent constructor
		super(name, "Dog");
		this.breed = breed;
	}

	// Override parent method
	makeSound() {
		return `${this.name} barks: Woof!`;
	}

	// Add new method
	fetch() {
		return `${this.name} is fetching the ball`;
	}

	// Use parent method
	play() {
		return `${this.makeSound()} ${this.fetch()}`;
	}
}

console.log("\n=== Inheritance Example ===");
const animal = new Animal("Generic Animal", "Unknown");
const dog = new Dog("Buddy", "Golden Retriever");

console.log("Animal:", animal.makeSound());
console.log("Dog:", dog.makeSound());
console.log("Dog playing:", dog.play());
console.log("Kingdom:", Animal.getKingdom());

// ==========================================
// METHOD BINDING EXAMPLES
// ==========================================

class Button {
	constructor(label) {
		this.label = label;
		this.clickCount = 0;
	}

	// Method that will be used as callback
	handleClick() {
		this.clickCount++;
		console.log(`${this.label} clicked ${this.clickCount} times`);
	}

	// Method demonstrating binding solutions
	setupEventListener() {
		// Problem: 'this' context is lost in setTimeout
		setTimeout(function () {
			console.log("Regular function - this.label:", this.label); // undefined
		}, 100);

		// Solution 1: Arrow function preserves 'this'
		setTimeout(() => {
			console.log("Arrow function - this.label:", this.label);
		}, 200);

		// Solution 2: Bind method
		setTimeout(
			function () {
				console.log("Bound function - this.label:", this.label);
			}.bind(this),
			300,
		);
	}
}

console.log("\n=== Method Binding Example ===");
const button = new Button("Submit");
button.setupEventListener();

// Wait a bit for timeouts to execute
setTimeout(() => {
	console.log("Method binding demonstration complete");
}, 500);

// ==========================================
// CLASS FIELDS SYNTAX (MODERN)
// ==========================================

class ModernClass {
	// Class fields - no need to declare in constructor
	instanceField = "I'm an instance field";
	instanceCounter = 0;

	// Static field
	static staticField = "I'm a static field";

	constructor(value) {
		this.instanceCounter = value;
	}

	// Arrow function method - automatically bound
	arrowMethod = () => {
		this.instanceCounter++;
		return `Counter: ${this.instanceCounter}, Field: ${this.instanceField}`;
	};

	// Regular method
	regularMethod() {
		return this.arrowMethod();
	}
}

console.log("\n=== Modern Class Fields ===");
const modern = new ModernClass(5);
console.log(modern.arrowMethod());
console.log(modern.regularMethod());
console.log("Static field:", ModernClass.staticField);

// Module video codes

/*
const createCounter = () => {
	let count = 0;

	return (amount) => {
		count += amount;
		return count;
	};
};

const counterInstance = createCounter();
console.log("Counter:", counterInstance(3)); // 3
console.log("Counter:", counterInstance(2)); // 5

*/

class Counter {
	constructor(count = 0) {
		this.count = count;
	}

	add(amount) {
		this.count += amount;
		return this.count;
	}

	print() {
		console.log(`Counter: ${this.count}`);
	}
}

const counter1 = new Counter();
counter1.add(3);
counter1.add(2);
counter1.print(); // 5

const counter2 = new Counter(10);
counter2.add(5);
counter2.print(); // 15
