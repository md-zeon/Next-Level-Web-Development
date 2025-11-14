// 7-8 Polymorphism in TypeScript: The 2nd Pillar of OOP

// Base Shape class for method overriding polymorphism
class Shape {
	name: string;

	constructor(name: string) {
		this.name = name;
	}

	// Default implementations to be overridden
	area(): number {
		return 0;
	}

	perimeter(): number {
		return 0;
	}

	describe(): string {
		return `This is a ${this.name}`;
	}
}

// Rectangle class overriding parent methods
class Rectangle extends Shape {
	width: number;
	height: number;

	constructor(width: number, height: number) {
		super("Rectangle");
		this.width = width;
		this.height = height;
	}

	// Override area method
	area(): number {
		return this.width * this.height;
	}

	// Override perimeter method
	perimeter(): number {
		return 2 * (this.width + this.height);
	}

	// Override describe method with additional information
	describe(): string {
		return `${super.describe()} with area ${this.area()} and perimeter ${this.perimeter()}`;
	}

	// Additional method specific to Rectangle
	scale(factor: number): Rectangle {
		return new Rectangle(this.width * factor, this.height * factor);
	}
}

// Circle class overriding parent methods
class Circle extends Shape {
	radius: number;

	constructor(radius: number) {
		super("Circle");
		this.radius = radius;
	}

	// Override area method
	area(): number {
		return Math.PI * this.radius * this.radius;
	}

	// Override perimeter method
	perimeter(): number {
		return 2 * Math.PI * this.radius;
	}

	// Override describe method
	describe(): string {
		return `${super.describe()} with radius ${this.radius}`;
	}

	// Additional method specific to Circle
	diameter(): number {
		return this.radius * 2;
	}
}

// Triangle class for additional override examples
class Triangle extends Shape {
	base: number;
	height: number;
	sideA: number;
	sideC: number;

	constructor(base: number, height: number, sideA: number, sideC: number) {
		super("Triangle");
		this.base = base;
		this.height = height;
		this.sideA = sideA;
		this.sideC = sideC;
	}

	// Override area method using triangle formula
	area(): number {
		return (this.base * this.height) / 2;
	}

	// Override perimeter method (approximate - doesn't include sideB)
	perimeter(): number {
		return this.base + this.sideA + this.sideC;
	}
}

// Polymorphism in action - function that works with different shape types
function printShapeInfo(shape: Shape): void {
	console.log("--- Shape Info ---");
	console.log(shape.describe());
	console.log(`Area: ${shape.area().toFixed(2)}`);
	console.log(`Perimeter: ${shape.perimeter().toFixed(2)}`);
}

// Testing polymorphism with different shapes
console.log("=== Basic Polymorphism Demo ===");
const shapes: Shape[] = [
	new Rectangle(10, 5),
	new Circle(7),
	new Triangle(6, 8, 5, 5),
	new Rectangle(3, 4),
	new Circle(2),
	new Triangle(10, 15, 8, 9),
];

shapes.forEach(printShapeInfo);

// Abstract class example
abstract class Vehicle {
	protected type: string;

	constructor(type: string) {
		this.type = type;
	}

	// Abstract method - must be implemented by subclasses
	abstract move(): void;

	// Regular method
	start(): void {
		console.log(`${this.type} engine started`);
	}

	// Regular method that calls abstract method
	drive(): void {
		console.log(`Starting ${this.type} journey...`);
		this.start();
		this.move();
		console.log(`${this.type} journey completed.`);
	}

	// Get type safely
	getType(): string {
		return this.type;
	}
}

// Car class extending abstract Vehicle
class Car extends Vehicle {
	private fuelType: string;

	constructor(fuelType: string = "gasoline") {
		super("Car");
		this.fuelType = fuelType;
	}

	// Implement abstract move method
	move(): void {
		console.log(`Car is driving smoothly on the road using ${this.fuelType}`);
	}

	// Override non-abstract method
	start(): void {
		console.log(`Car engine started with a powerful ${this.fuelType} roar`);
	}

	// Car-specific method
	honk(): void {
		console.log("Honk! Honk! Car is honking");
	}
}

// Boat class extending abstract Vehicle
class Boat extends Vehicle {
	private boatType: string;

	constructor(boatType: string = "motorboat") {
		super("Boat");
		this.boatType = boatType;
	}

	// Implement abstract move method
	move(): void {
		console.log(`${this.boatType} is sailing gracefully on the water`);
	}

	// Boat-specific method
	whistle(): void {
		console.log("Whistle! Boat is signaling");
	}
}

// Airplane class extending abstract Vehicle
class Airplane extends Vehicle {
	private airline: string;

	constructor(airline: string = "Generic Airlines") {
		super("Airplane");
		this.airline = airline;
	}

	// Implement abstract move method
	move(): void {
		console.log(`${this.airline} airplane is soaring through the clouds`);
	}

	// Airplane-specific method
	deployLandingGear(): void {
		console.log("Landing gear deployed safely");
	}
}

// Testing abstract class polymorphism
console.log("\n=== Abstract Class Polymorphism Demo ===");
const vehicles: Vehicle[] = [
	new Car("diesel"),
	new Boat("yacht"),
	new Airplane("SkyHigh Airlines"),
	new Car("electric"),
	new Boat("speedboat"),
];

vehicles.forEach((vehicle) => {
	console.log(`\n--- ${vehicle.getType()} Journey ---`);
	vehicle.drive();

	// Use specific methods if available (type guards)
	if (vehicle instanceof Car) {
		vehicle.honk();
	} else if (vehicle instanceof Boat) {
		vehicle.whistle();
	} else if (vehicle instanceof Airplane) {
		vehicle.deployLandingGear();
	}
});

// Interface for payment processing polymorphism
interface PaymentProcessor {
	processPayment(amount: number): boolean;
	getProcessorName(): string;
	refundPayment(amount: number): boolean;
}

// Credit Card processor implementation
class CreditCardProcessor implements PaymentProcessor {
	private cardNumber: string;

	constructor(cardNumber: string) {
		this.cardNumber = cardNumber;
	}

	processPayment(amount: number): boolean {
		console.log(
			`Processing ${amount} via Credit Card ending ${this.cardNumber.slice(
				-4,
			)}`,
		);
		// Simulate processing
		return Math.random() > 0.1; // 10% failure rate
	}

	refundPayment(amount: number): boolean {
		console.log(
			`Refunding ${amount} to Credit Card ending ${this.cardNumber.slice(-4)}`,
		);
		return true;
	}

	getProcessorName(): string {
		return "Credit Card";
	}
}

// PayPal processor implementation
class PayPalProcessor implements PaymentProcessor {
	private email: string;

	constructor(email: string) {
		this.email = email;
	}

	processPayment(amount: number): boolean {
		console.log(`Processing ${amount} via PayPal account ${this.email}`);
		return Math.random() > 0.05; // 5% failure rate
	}

	refundPayment(amount: number): boolean {
		console.log(`Refunding ${amount} to PayPal account ${this.email}`);
		return true;
	}

	getProcessorName(): string {
		return "PayPal";
	}
}

// Bank Transfer processor implementation
class BankTransferProcessor implements PaymentProcessor {
	private accountNumber: string;

	constructor(accountNumber: string) {
		this.accountNumber = accountNumber;
	}

	processPayment(amount: number): boolean {
		console.log(
			`Processing ${amount} via Bank Transfer to account ${this.accountNumber.slice(
				-4,
			)}`,
		);
		return Math.random() > 0.02; // 2% failure rate
	}

	refundPayment(amount: number): boolean {
		console.log(
			`Refunding ${amount} via Bank Transfer from account ${this.accountNumber.slice(
				-4,
			)}`,
		);
		return true;
	}

	getProcessorName(): string {
		return "Bank Transfer";
	}
}

// Polymorphic payment processing function
function makePayment(processor: PaymentProcessor, amount: number): void {
	console.log(
		`Attempting payment of $${amount} using ${processor.getProcessorName()}`,
	);
	const success = processor.processPayment(amount);
	if (success) {
		console.log(`✅ Payment successful using ${processor.getProcessorName()}`);
		// Simulate a refund for demonstration
		setTimeout(() => {
			processor.refundPayment(amount * 0.5); // Partial refund
		}, 100);
	} else {
		console.log(`❌ Payment failed using ${processor.getProcessorName()}`);
	}
}

// Testing payment processor polymorphism
console.log("\n=== Payment Processor Polymorphism Demo ===");
const processors: PaymentProcessor[] = [
	new CreditCardProcessor("1234-5678-9012-3456"),
	new PayPalProcessor("user@example.com"),
	new BankTransferProcessor("987654321"),
	new CreditCardProcessor("1111-2222-3333-4444"),
];

processors.forEach((processor, index) => {
	makePayment(processor, (index + 1) * 50);
});

// Generic Container interface for parametric polymorphism
interface Container<T> {
	add(item: T): void;
	remove(): T | undefined;
	size(): number;
	peek(): T | undefined;
	clear(): void;
}

// Stack implementation
class Stack<T> implements Container<T> {
	private items: T[] = [];

	add(item: T): void {
		this.items.push(item);
	}

	remove(): T | undefined {
		return this.items.pop();
	}

	size(): number {
		return this.items.length;
	}

	peek(): T | undefined {
		return this.items[this.items.length - 1];
	}

	clear(): void {
		this.items = [];
	}

	// Stack-specific method
	toArray(): T[] {
		return [...this.items];
	}
}

// Queue implementation
class Queue<T> implements Container<T> {
	private items: T[] = [];

	add(item: T): void {
		this.items.push(item);
	}

	remove(): T | undefined {
		return this.items.shift();
	}

	size(): number {
		return this.items.length;
	}

	peek(): T | undefined {
		return this.items[0];
	}

	clear(): void {
		this.items = [];
	}

	// Queue-specific method
	toArray(): T[] {
		return [...this.items];
	}
}

// Polymorphic container processor function
function processContainer<T>(container: Container<T>, items: T[]): void {
	console.log(`\n--- Processing ${container.constructor.name} ---`);

	// Add all items
	items.forEach((item) => container.add(item));
	console.log(
		`Added ${items.length} items. Container now has ${container.size()} items`,
	);

	// Process items (remove and display)
	console.log("Processing items:");
	while (container.size() > 0) {
		const item = container.remove();
		if (item !== undefined) {
			console.log(`  Removed: ${item}`);
		}
	}

	console.log("Container is now empty");
}

// Testing generic polymorphism
console.log("\n=== Generic Container Polymorphism Demo ===");
const numberStack = new Stack<number>();
const stringQueue = new Queue<string>();
const booleanStack = new Stack<boolean>();

processContainer(numberStack, [1, 2, 3, 4, 5, 6]);
processContainer(stringQueue, ["apple", "banana", "cherry", "date"]);
processContainer(booleanStack, [true, false, true, false, true]);

// Parametric polymorphism with union types
function printValue(value: string | number | boolean): void {
	if (typeof value === "string") {
		console.log(`String value: "${value}" (length: ${value.length})`);
	} else if (typeof value === "number") {
		console.log(`Number value: ${value} (squared: ${value * value})`);
	} else {
		console.log(`Boolean value: ${value} (negated: ${!value})`);
	}
}

function calculateArea(shape: Rectangle | Circle | Triangle): number {
	if (shape instanceof Rectangle) {
		return shape.width * shape.height;
	} else if (shape instanceof Circle) {
		return Math.PI * shape.radius * shape.radius;
	} else if (shape instanceof Triangle) {
		return (shape.base * shape.height) / 2;
	}
	return 0;
}

// Testing parametric polymorphism
console.log("\n=== Parametric Polymorphism Demo ===");
const mixedValues: (string | number | boolean)[] = [
	"Hello",
	42,
	true,
	"World",
	3.14,
	false,
	100,
];

mixedValues.forEach(printValue);

console.log("\nCalculating areas with parametric types:");
const testShapes = [
	new Rectangle(5, 10),
	new Circle(3),
	new Triangle(6, 8, 4, 5),
];

testShapes.forEach((shape, index) => {
	console.log(
		`${shape.constructor.name} ${index + 1} area: ${calculateArea(
			shape,
		).toFixed(2)}`,
	);
});

// Liskov Substitution Principle demonstration
console.log("\n=== Liskov Substitution Principle Demo ===");

// Bad design that violates LSP
console.log("--- Bad Design (Violates LSP) ---");
class BadBird {
	fly(): void {
		console.log("Bird is flying");
	}
}

class BadPenguin extends BadBird {
	fly(): void {
		throw new Error("Penguins can't fly!");
	}

	swim(): void {
		console.log("Penguin is swimming");
	}
}

function makeBadBirdFly(bird: BadBird): void {
	try {
		bird.fly();
		console.log("Flight successful");
	} catch (error) {
		console.log(
			"Flight failed:",
			error instanceof Error ? error.message : "Unknown error",
		);
	}
}

makeBadBirdFly(new BadBird()); // Works
makeBadBirdFly(new BadPenguin()); // Breaks LSP

// Good design following LSP
console.log("\n--- Good Design (Follows LSP) ---");
abstract class GoodBird {
	abstract move(): void; // Abstract method enforced by descendants has specific behavior
}

class FlyingBird extends GoodBird {
	move(): void {
		this.fly();
	}

	fly(): void {
		console.log("Flying through the air");
	}
}

class SwimmingBird extends GoodBird {
	move(): void {
		this.swim();
	}

	swim(): void {
		console.log("Swimming in water");
	}
}

class Eagle extends FlyingBird {
	// Inherits move() which calls fly()
	fly(): void {
		console.log("Eagle is soaring majestically");
	}
}

class Penguin extends SwimmingBird {
	// Inherits move() which calls swim()
	swim(): void {
		console.log("Penguin is swimming gracefully");
	}
}

// This function now works correctly with LSP
function moveBird(bird: GoodBird): void {
	bird.move(); // Will work correctly for all bird types
}

console.log("Making birds move (following LSP):");
moveBird(new Eagle());
moveBird(new Penguin());
moveBird(new FlyingBird());

// Strategy Pattern implementation
console.log("\n=== Strategy Pattern Polymorphism Demo ===");
interface SortingStrategy {
	sort(array: number[]): number[];
	getStrategyName(): string;
}

class BubbleSort implements SortingStrategy {
	sort(array: number[]): number[] {
		console.log("Using bubble sort algorithm");
		const sorted = [...array];
		const n = sorted.length;
		for (let i = 0; i < n - 1; i++) {
			for (let j = 0; j < n - i - 1; j++) {
        if (sorted[j]! > sorted[j + 1]!) {
          [sorted[j], sorted[j + 1]] = [sorted[j + 1]!, sorted[j]!];
        }
			}
		}
		return sorted;
	}

	getStrategyName(): string {
		return "Bubble Sort";
	}
}

class QuickSort implements SortingStrategy {
	sort(array: number[]): number[] {
		console.log("Using quick sort algorithm");
		const sorted = [...array];
		this.quickSortRecursive(sorted, 0, sorted.length - 1);
		return sorted;
	}

	private quickSortRecursive(arr: number[], low: number, high: number): void {
		if (low < high) {
			const pi = this.partition(arr, low, high);
			this.quickSortRecursive(arr, low, pi - 1);
			this.quickSortRecursive(arr, pi + 1, high);
		}
	}

  private partition(arr: number[], low: number, high: number): number {
    const pivot = arr[high]!;
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (arr[j]! < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j]!, arr[i]!];
      }
    }
    [arr[i + 1], arr[high]] = [arr[high]!, arr[i + 1]!];
    return i + 1;
  }

	getStrategyName(): string {
		return "Quick Sort";
	}
}

class MergeSort implements SortingStrategy {
	sort(array: number[]): number[] {
		console.log("Using merge sort algorithm");
		const sorted = [...array];
		this.mergeSortRecursive(sorted, 0, sorted.length - 1);
		return sorted;
	}

	private mergeSortRecursive(arr: number[], left: number, right: number): void {
		if (left < right) {
			const mid = Math.floor((left + right) / 2);
			this.mergeSortRecursive(arr, left, mid);
			this.mergeSortRecursive(arr, mid + 1, right);
			this.merge(arr, left, mid, right);
		}
	}

	private merge(arr: number[], left: number, mid: number, right: number): void {
		const n1 = mid - left + 1;
		const n2 = right - mid;

		const L = new Array(n1);
		const R = new Array(n2);

		for (let i = 0; i < n1; i++) L[i] = arr[left + i];
		for (let j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];

		let i = 0,
			j = 0,
			k = left;

		while (i < n1 && j < n2) {
			if (L[i] <= R[j]) {
				arr[k] = L[i];
				i++;
			} else {
				arr[k] = R[j];
				j++;
			}
			k++;
		}

		while (i < n1) {
			arr[k] = L[i];
			i++;
			k++;
		}

		while (j < n2) {
			arr[k] = R[j];
			j++;
			k++;
		}
	}

	getStrategyName(): string {
		return "Merge Sort";
	}
}

class Sorter {
	private strategy: SortingStrategy;

	constructor(strategy: SortingStrategy) {
		this.strategy = strategy;
	}

	setStrategy(strategy: SortingStrategy): void {
		console.log(`Switching sorting strategy to: ${strategy.getStrategyName()}`);
		this.strategy = strategy;
	}

	sortArray(array: number[]): number[] {
		console.log(`Sorting array with ${this.strategy.getStrategyName()}`);
		const result = this.strategy.sort(array);
		console.log(`Result: [${result.join(", ")}]`);
		return result;
	}
}

// Testing strategy pattern
const sorter = new Sorter(new BubbleSort());
const unsortedArray = [64, 34, 25, 12, 22, 11, 90];

console.log("Original array:", unsortedArray);
sorter.sortArray(unsortedArray);

console.log("\nSwitching to Quick Sort:");
sorter.setStrategy(new QuickSort());
sorter.sortArray([3, 1, 4, 1, 5, 9, 2, 6, 5, 3]);

console.log("\nSwitching to Merge Sort:");
sorter.setStrategy(new MergeSort());
sorter.sortArray([8, 4, 7, 1, 9, 2, 6, 3, 5]);

// Factory Pattern with Polymorphism
console.log("\n=== Factory Pattern Polymorphism Demo ===");
abstract class Employee {
	protected name: string;
	protected id: number;

	constructor(name: string, id: number) {
		this.name = name;
		this.id = id;
	}

	abstract getSalary(): number;
	abstract getRole(): string;
	abstract getResponsibilities(): string[];

	getInfo(): string {
		return `${this.getRole()}: ${this.name} (ID: ${
			this.id
		}) - Salary: $${this.getSalary()}`;
	}
}

class Developer extends Employee {
	constructor(name: string, id: number) {
		super(name, id);
	}

	getSalary(): number {
		return 80000;
	}

	getRole(): string {
		return "Software Developer";
	}

	getResponsibilities(): string[] {
		return [
			"Write clean, efficient code",
			"Debug and fix software issues",
			"Collaborate with team members",
			"Learn new technologies",
			"Participate in code reviews",
		];
	}
}

class Manager extends Employee {
	private teamSize: number;

	constructor(name: string, id: number, teamSize: number) {
		super(name, id);
		this.teamSize = teamSize;
	}

	getSalary(): number {
		return 100000 + this.teamSize * 2000; // Bonus based on team size
	}

	getRole(): string {
		return "Project Manager";
	}

	getResponsibilities(): string[] {
		return [
			"Lead project development",
			`Manage team of ${this.teamSize} members`,
			"Coordinate with stakeholders",
			"Set project milestones",
			"Handle resource allocation",
		];
	}
}

class Designer extends Employee {
	constructor(name: string, id: number) {
		super(name, id);
	}

	getSalary(): number {
		return 70000;
	}

	getRole(): string {
		return "UI/UX Designer";
	}

	getResponsibilities(): string[] {
		return [
			"Create user-friendly interfaces",
			"Design wireframes and mockups",
			"Conduct user research",
			"Collaborate with developers",
			"Ensure design consistency",
		];
	}
}

class EmployeeFactory {
	private static nextId = 1000;

	static createEmployee(type: string, name: string, ...args: any[]): Employee {
		const id = this.nextId++;

		switch (type.toLowerCase()) {
			case "developer":
				return new Developer(name, id);
			case "manager":
				const teamSize = args[0] || 5;
				return new Manager(name, id, teamSize);
			case "designer":
				return new Designer(name, id);
			default:
				throw new Error(`Unknown employee type: ${type}`);
		}
	}
}

// Polymorphic employee management
function printEmployeeDetails(employee: Employee): void {
	console.log("\n" + "=".repeat(50));
	console.log(employee.getInfo());
	console.log("Responsibilities:");
	employee.getResponsibilities().forEach((resp, index) => {
		console.log(`  ${index + 1}. ${resp}`);
	});
}

const employees: Employee[] = [
	EmployeeFactory.createEmployee("developer", "Alice Johnson"),
	EmployeeFactory.createEmployee("manager", "Bob Smith", 8),
	EmployeeFactory.createEmployee("designer", "Charlie Brown"),
	EmployeeFactory.createEmployee("developer", "Diana Prince"),
	EmployeeFactory.createEmployee("manager", "Edward Norton", 4),
];

console.log("Company Employee Directory:");
employees.forEach(printEmployeeDetails);

// Calculate total salary expense
const totalSalary = employees.reduce((sum, emp) => sum + emp.getSalary(), 0);
console.log(`\nTotal Company Salary Expense: $${totalSalary.toLocaleString()}`);

console.log("\n=== Polymorphism Implementation Complete ===");
console.log("All examples demonstrate different forms of polymorphism:");
console.log("- Method overriding (runtime polymorphism)");
console.log("- Abstract classes and interfaces");
console.log("- Generic programming");
console.log("- Strategy pattern");
console.log("- Factory pattern");
console.log("- Following Liskov Substitution Principle");
