// 7-10 Encapsulation: The Fourth Pillar of OOP

// === Access Modifiers Demo ===

console.log("=== Access Modifiers Demo ===");

// Public - accessible everywhere
class PublicExample {
	public name: string;
	public age: number;

	constructor(name: string, age: number) {
		this.name = name;
		this.age = age;
	}

	public greet(): void {
		console.log(`Hello, I'm ${this.name} and I'm ${this.age} years old.`);
	}
}

const publicExample = new PublicExample("John", 30);
console.log(publicExample.name); // ✅ Accessible
publicExample.greet(); // ✅ Accessible

// Private - only accessible within the class
class PrivateExample {
	private balance: number;

	constructor(initialBalance: number) {
		this.balance = initialBalance;
	}

	public deposit(amount: number): void {
		if (amount > 0) {
			this.balance += amount; // ✅ Can access private property internally
		}
	}

	public getBalance(): number {
		return this.balance; // ✅ Can access private property internally
	}

	// Private method
	private validateAmount(amount: number): boolean {
		return amount > 0 && amount < 10000;
	}
}

const privateExample = new PrivateExample(1000);
privateExample.deposit(500);
console.log(`Balance: $${privateExample.getBalance()}`); // ✅ Via public method
// console.log(privateExample.balance); // ❌ Error: Property 'balance' is private

// Protected - accessible within class and subclasses
class ProtectedExample {
	protected title: string;
	protected author: string;

	constructor(title: string, author: string) {
		this.title = title;
		this.author = author;
	}

	protected getSummary(): string {
		return `${this.title} by ${this.author}`;
	}
}

class ExtendedBook extends ProtectedExample {
	public publish(): void {
		// Can access protected properties and methods
		console.log(`Publishing: ${this.getSummary()}`); // ✅ Access protected method
		this.title = `Best-Selling: ${this.title}`; // ✅ Access protected property
	}
}

const book = new ExtendedBook("TypeScript Guide", "Expert Author");
book.publish(); // ✅ Access via public method
// console.log(book.title); // ❌ Error: Property 'title' is protected

console.log();

// === Getters and Setters ===

console.log("=== Getters and Setters ===");

// Basic getters and setters
class Person {
	private _name: string;
	private _age: number;

	constructor(name: string, age: number) {
		this._name = name;
		this._age = age;
	}

	// Getter transforms data when accessed
	get name(): string {
		return this._name.toUpperCase();
	}

	// Setter validates data when set
	set name(value: string) {
		if (!value.trim()) {
			throw new Error("Name cannot be empty");
		}
		this._name = value.trim();
	}

	get age(): number {
		return this._age;
	}

	set age(value: number) {
		if (value < 0 || value > 150) {
			throw new Error("Age must be between 0 and 150");
		}
		this._age = value;
	}

	get info(): string {
		return `${this.name} is ${this.age} years old`;
	}
}

const person = new Person("alice", 25);
console.log(person.info); // "ALICE is 25 years old" (name transformed via getter)

person.name = "  Bob  "; // Setter trims whitespace
person.age = 30;
console.log(person.info); // "BOB is 30 years old"

// Validation in action
try {
	person.age = 200; // Invalid age
} catch (error) {
	console.log(
		"Error:",
		error instanceof Error ? error.message : "Unknown error",
	); // "Age must be between 0 and 150"
}

// Computed properties with getters
class Rectangle {
	private _width: number;
	private _height: number;

	constructor(width: number, height: number) {
		this._width = width;
		this._height = height;
	}

	get width(): number {
		return this._width;
	}

	set width(value: number) {
		if (value <= 0) {
			throw new Error("Width must be positive");
		}
		this._width = value;
	}

	get height(): number {
		return this._height;
	}

	set height(value: number) {
		if (value <= 0) {
			throw new Error("Height must be positive");
		}
		this._height = value;
	}

	// Read-only computed properties (no setters)
	get area(): number {
		return this._width * this._height;
	}

	get perimeter(): number {
		return 2 * (this._width + this._height);
	}

	get isSquare(): boolean {
		return this._width === this._height;
	}
}

const rect = new Rectangle(10, 5);
console.log(`Rectangle: ${rect.width} x ${rect.height}`);
console.log(`Area: ${rect.area}`);
console.log(`Perimeter: ${rect.perimeter}`);
console.log(`Is square: ${rect.isSquare}`);

rect.width = 8;
console.log(`Updated area: ${rect.area}`); // Automatically recalculated

console.log();

// === Real-World Encapsulation: Bank Account ===

console.log("=== Real-World Encapsulation: Bank Account ===");

class BankAccount {
	private _balance: number;
	private _accountNumber: string;
	private _transactions: { amount: number; type: string; timestamp: Date }[] =
		[];
	private _isFrozen: boolean = false;

	constructor(accountNumber: string, initialBalance: number = 0) {
		this._accountNumber = accountNumber;
		this._balance = initialBalance;

		if (initialBalance > 0) {
			this.logTransaction(initialBalance, "Initial Deposit");
		}
	}

	// Getters
	get balance(): number {
		return this._balance;
	}

	get accountNumber(): string {
		return this._accountNumber;
	}

	get isFrozen(): boolean {
		return this._isFrozen;
	}

	get transactionHistory(): readonly {
		amount: number;
		type: string;
		timestamp: Date;
	}[] {
		// Return a read-only copy to prevent external modification
		return [...this._transactions];
	}

	// Public methods with encapsulated logic
	deposit(amount: number): void {
		if (this._isFrozen) {
			throw new Error("Account is frozen - cannot deposit");
		}

		if (amount <= 0) {
			throw new Error("Deposit amount must be positive");
		}

		if (amount > 10000) {
			throw new Error("Deposit amount cannot exceed $10,000 per transaction");
		}

		this._balance += amount;
		this.logTransaction(amount, "Deposit");
	}

	withdraw(amount: number): void {
		if (this._isFrozen) {
			throw new Error("Account is frozen - cannot withdraw");
		}

		if (amount <= 0) {
			throw new Error("Withdrawal amount must be positive");
		}

		if (amount > this._balance) {
			throw new Error("Insufficient funds");
		}

		this._balance -= amount;
		this.logTransaction(-amount, "Withdrawal");
	}

	transfer(amount: number, targetAccount: BankAccount): void {
		this.withdraw(amount);
		targetAccount.deposit(amount);
		console.log(`$${amount} transferred successfully`);
	}

	freeze(): void {
		this._isFrozen = true;
		console.log(`Account ${this._accountNumber} has been frozen`);
	}

	unfreeze(): void {
		this._isFrozen = false;
		console.log(`Account ${this._accountNumber} has been unfrozen`);
	}

	private logTransaction(amount: number, type: string): void {
		this._transactions.push({
			amount,
			type,
			timestamp: new Date(),
		});
	}

	getAccountSummary(): string {
		const summary = `
Account Number: ${this._accountNumber}
Current Balance: $${this._balance.toFixed(2)}
Status: ${this._isFrozen ? "Frozen" : "Active"}
Total Transactions: ${this._transactions.length}
`.trim();

		return summary;
	}
}

const account1 = new BankAccount("1234-5678", 1000);
const account2 = new BankAccount("8765-4321", 500);

console.log("Account 1 Summary:");
console.log(account1.getAccountSummary());

console.log("\nAccount 2 Summary:");
console.log(account2.getAccountSummary());

// Test encapsulation - external code cannot manipulate private state directly
account1.deposit(500);
account2.withdraw(100);

// Transfer between accounts
account1.transfer(200, account2);

console.log("\nAfter transactions:");
console.log(`Account 1 balance: $${account1.balance}`);
console.log(`Account 2 balance: $${account2.balance}`);

// Transaction history (read-only access)
console.log("\nAccount 1 transaction history:");
account1.transactionHistory.forEach((tx, index) => {
	console.log(
		`${index + 1}. $${tx.amount} - ${
			tx.type
		} at ${tx.timestamp.toLocaleString()}`,
	);
});

// Attempt to modify transaction history (should fail)
// account1.transactionHistory.push({ amount: 999, type: "Hacked", timestamp: new Date() });

// Demonstrate account freezing
account2.freeze();
try {
	account2.deposit(100); // Should fail
} catch (error) {
	console.log(
		`\nFreeze protection: ${
			error instanceof Error ? error.message : "Unknown error"
		}`,
	);
}

console.log();

// === Real-World Encapsulation: Shopping Cart ===

console.log("=== Real-World Encapsulation: Shopping Cart ===");

interface ProductItem {
	id: string;
	name: string;
	price: number;
}

class ShoppingCart {
	private _items: Map<string, { item: ProductItem; quantity: number }> =
		new Map();
	private _discountCode?: string | undefined;
	private _taxRate: number = 0.08; // 8% tax

	// Getters
	get itemCount(): number {
		let total = 0;
		for (const entry of this._items.values()) {
			total += entry.quantity;
		}
		return total;
	}

	get subtotal(): number {
		let total = 0;
		for (const entry of this._items.values()) {
			total += entry.item.price * entry.quantity;
		}
		return total;
	}

	get tax(): number {
		return this.subtotal * this._taxRate;
	}

	get discount(): number {
		if (!this._discountCode) return 0;

		// Simulate discount calculation
		if (this._discountCode === "SAVE10") return this.subtotal * 0.1;
		if (this._discountCode === "SAVE20") return this.subtotal * 0.2;
		return 0;
	}

	get total(): number {
		return this.subtotal + this.tax - this.discount;
	}

	get items(): ProductItem[] {
		const result: ProductItem[] = [];
		for (const entry of this._items.values()) {
			// Create new objects to prevent external modification
			for (let i = 0; i < entry.quantity; i++) {
				result.push({
					id: entry.item.id,
					name: entry.item.name,
					price: entry.item.price,
				});
			}
		}
		return result;
	}

	// Public methods
	addItem(product: ProductItem, quantity: number = 1): void {
		if (quantity <= 0) {
			throw new Error("Quantity must be positive");
		}

		if (this._items.has(product.id)) {
			this._items.get(product.id)!.quantity += quantity;
		} else {
			this._items.set(product.id, { item: product, quantity });
		}

		console.log(`Added ${quantity} x ${product.name} to cart`);
	}

	removeItem(productId: string, quantity?: number): void {
		if (!this._items.has(productId)) {
			throw new Error("Item not found in cart");
		}

		const entry = this._items.get(productId)!;

		if (quantity === undefined || quantity >= entry.quantity) {
			this._items.delete(productId);
			console.log(`Removed all ${entry.item.name} from cart`);
		} else {
			entry.quantity -= quantity;
			console.log(`Removed ${quantity} x ${entry.item.name} from cart`);
		}
	}

	clear(): void {
		this._items.clear();
		this._discountCode = undefined;
		console.log("Cart cleared");
	}

	applyDiscount(code: string): boolean {
		// Validate discount code
		const validCodes = ["SAVE10", "SAVE20", "FREESHIP"];

		if (!validCodes.includes(code)) {
			throw new Error("Invalid discount code");
		}

		this._discountCode = code;
		console.log(`Applied discount code: ${code}`);
		return true;
	}

	private validateCheckout(): void {
		if (this._items.size === 0) {
			throw new Error("Cart is empty");
		}

		if (this.total < 0) {
			throw new Error("Invalid cart total");
		}
	}

	checkout(): { orderTotal: number; items: ProductItem[] } {
		this.validateCheckout();

		const result = {
			orderTotal: this.total,
			items: this.items, // Returns safe copy via getter
		};

		// Simulate order processing
		console.log(`Processing order for $${this.total.toFixed(2)}...`);
		console.log("Order completed successfully!");

		this.clear(); // Clear cart after checkout

		return result;
	}

	getCartSummary(): string {
		let summary = "\n=== Shopping Cart Summary ===\n";

		if (this._items.size === 0) {
			summary += "Cart is empty\n";
		} else {
			for (const entry of this._items.values()) {
				summary += `${entry.quantity}x ${entry.item.name} - $${(
					entry.item.price * entry.quantity
				).toFixed(2)}\n`;
			}
			summary += `---\n`;
			summary += `Subtotal: $${this.subtotal.toFixed(2)}\n`;
			summary += `Tax: $${this.tax.toFixed(2)}\n`;
			if (this.discount > 0) {
				summary += `Discount (${this._discountCode}): -$${this.discount.toFixed(
					2,
				)}\n`;
			}
			summary += `Total: $${this.total.toFixed(2)}\n`;
		}

		return summary;
	}
}

// Demo products
const products: ProductItem[] = [
	{ id: "p1", name: "Laptop", price: 999.99 },
	{ id: "p2", name: "Mouse", price: 29.99 },
	{ id: "p3", name: "Keyboard", price: 79.99 },
	{ id: "p4", name: "Monitor", price: 299.99 },
];

const cart = new ShoppingCart();

// Add items to cart
cart.addItem(products[0]!); // Laptop
cart.addItem(products[1]!, 2); // 2 Mice
cart.addItem(products[2]!); // Keyboard

console.log(cart.getCartSummary());

// Apply discount
cart.applyDiscount("SAVE10");
console.log(cart.getCartSummary());

// Checkout
const order = cart.checkout();
console.log(`Final order total: $${order.orderTotal.toFixed(2)}`);
console.log(`Ordered ${order.items.length} items`);

// Cart is now empty after checkout
console.log(cart.getCartSummary());

console.log();

// === Advanced Encapsulation Pattern: Builder Pattern ===

console.log("=== Advanced Encapsulation Pattern: Builder Pattern ===");

class PizzaBuilder {
	private _size: string = "medium";
	private _crust: string = "regular";
	private _toppings: string[] = [];
	private _extraCheese: boolean = false;
	private _price: number = 0;

	// Private pricing data - encapsulated
	private static PRICES = {
		sizes: { small: 8, medium: 12, large: 16, xlarge: 20 },
		crusts: { thin: 2, regular: 0, thick: 3, stuffed: 5 },
		toppings: { pepperoni: 2, mushrooms: 1, onions: 1, peppers: 1, sausage: 3 },
		extraCheese: 4,
	};

	size(size: "small" | "medium" | "large" | "xlarge"): PizzaBuilder {
		this._size = size;
		return this;
	}

	crust(crust: "thin" | "regular" | "thick" | "stuffed"): PizzaBuilder {
		this._crust = crust;
		return this;
	}

	addTopping(topping: string): PizzaBuilder {
		if (!this._toppings.includes(topping)) {
			this._toppings.push(topping);
		}
		return this;
	}

	addExtraCheese(): PizzaBuilder {
		this._extraCheese = true;
		return this;
	}

	private calculatePrice(): number {
		let price =
			PizzaBuilder.PRICES.sizes[
				this._size as keyof typeof PizzaBuilder.PRICES.sizes
			];

		// Add crust cost
		price +=
			PizzaBuilder.PRICES.crusts[
				this._crust as keyof typeof PizzaBuilder.PRICES.crusts
			];

		// Add topping costs
		for (const topping of this._toppings) {
			if (
				PizzaBuilder.PRICES.toppings[
					topping as keyof typeof PizzaBuilder.PRICES.toppings
				]
			) {
				price +=
					PizzaBuilder.PRICES.toppings[
						topping as keyof typeof PizzaBuilder.PRICES.toppings
					];
			}
		}

		// Add extra cheese
		if (this._extraCheese) {
			price += PizzaBuilder.PRICES.extraCheese;
		}

		return price;
	}

	build(): Pizza {
		this._price = this.calculatePrice();

		const pizza = new Pizza(
			this._size,
			this._crust,
			[...this._toppings], // Defensive copy
			this._extraCheese,
			this._price,
		);

		// Reset builder for reuse (optional)
		this.reset();

		return pizza;
	}

	private reset(): void {
		this._size = "medium";
		this._crust = "regular";
		this._toppings = [];
		this._extraCheese = false;
		this._price = 0;
	}
}

// Pizza class with encapsulated state
class Pizza {
	constructor(
		private readonly _size: string,
		private readonly _crust: string,
		private readonly _toppings: string[],
		private readonly _extraCheese: boolean,
		private readonly _price: number,
	) {}

	get size(): string {
		return this._size;
	}

	get crust(): string {
		return this._crust;
	}

	get toppings(): readonly string[] {
		return [...this._toppings]; // Return defensive copy
	}

	get hasExtraCheese(): boolean {
		return this._extraCheese;
	}

	get price(): number {
		return this._price;
	}

	get description(): string {
		let desc = `${this._size} pizza with ${this._crust} crust`;

		if (this._toppings.length > 0) {
			desc += `, topped with ${this._toppings.join(", ")}`;
		}

		if (this._extraCheese) {
			desc += ", extra cheese";
		}

		return desc;
	}

	// Method to "serve" the pizza
	serve(): string {
		return `🍕 Serving: ${this.description} for $${this._price}`;
	}
}

// Build pizzas using encapsulated builder
const smallPizza = new PizzaBuilder()
	.size("small")
	.crust("thin")
	.addTopping("pepperoni")
	.addTopping("mushrooms")
	.build();

const largePizza = new PizzaBuilder()
	.size("large")
	.crust("stuffed")
	.addTopping("pepperoni")
	.addTopping("sausage")
	.addTopping("onions")
	.addTopping("peppers")
	.addExtraCheese()
	.build();

console.log(smallPizza.serve());
console.log(largePizza.serve());

// Encapsulation prevents invalid access
const pizza = smallPizza;
// console.log(pizza._price); // ❌ Private property
// pizza._toppings.push("hacked topping"); // ❌ Readonly array, but defensive copy prevents issues

console.log(`Pizza description: ${pizza.description}`);
console.log(`Pizza toppings: ${pizza.toppings.join(", ")}`);

// Reusing the builder
const anotherPizza = new PizzaBuilder()
	.size("medium")
	.addTopping("mushrooms")
	.build();

console.log(anotherPizza.serve());

console.log();

// === Singleton Pattern with Encapsulation ===

console.log("=== Singleton Pattern with Encapsulation ===");

class GameSettings {
	private static _instance: GameSettings;

	private _soundEnabled: boolean = true;
	private _musicVolume: number = 70;
	private _effectsVolume: number = 80;
	private _difficulty: "easy" | "medium" | "hard" = "medium";
	private _players: Map<string, any> = new Map();

	// Private constructor
	private constructor() {
		console.log("Game settings initialized");
	}

	// Get singleton instance
	static getInstance(): GameSettings {
		if (!GameSettings._instance) {
			GameSettings._instance = new GameSettings();
		}
		return GameSettings._instance;
	}

	// Getters
	get soundEnabled(): boolean {
		return this._soundEnabled;
	}

	get musicVolume(): number {
		return this._musicVolume;
	}

	set musicVolume(volume: number) {
		if (volume < 0 || volume > 100) {
			throw new Error("Volume must be between 0 and 100");
		}
		this._musicVolume = volume;
	}

	get effectsVolume(): number {
		return this._effectsVolume;
	}

	set effectsVolume(volume: number) {
		if (volume < 0 || volume > 100) {
			throw new Error("Volume must be between 0 and 100");
		}
		this._effectsVolume = volume;
	}

	get difficulty(): "easy" | "medium" | "hard" {
		return this._difficulty;
	}

	set difficulty(level: "easy" | "medium" | "hard") {
		this._difficulty = level;
	}

	// Public methods
	toggleSound(): void {
		this._soundEnabled = !this._soundEnabled;
		console.log(`Sound ${this._soundEnabled ? "enabled" : "disabled"}`);
	}

	savePlayerData(playerId: string, data: any): void {
		this._players.set(playerId, { ...data, savedAt: new Date() });
		console.log(`Player ${playerId} data saved`);
	}

	loadPlayerData(playerId: string): any {
		const data = this._players.get(playerId);
		if (!data) {
			throw new Error(`Player ${playerId} not found`);
		}
		return { ...data }; // Return copy to prevent external modification
	}

	getAllSettings(): object {
		return {
			soundEnabled: this._soundEnabled,
			musicVolume: this._musicVolume,
			effectsVolume: this._effectsVolume,
			difficulty: this._difficulty,
			playerCount: this._players.size,
		};
	}

	resetToDefaults(): void {
		this._soundEnabled = true;
		this._musicVolume = 70;
		this._effectsVolume = 80;
		this._difficulty = "medium";
		this._players.clear();
		console.log("Settings reset to defaults");
	}
}

// Use singleton settings
const settings = GameSettings.getInstance();

// Can't create another instance
// const anotherSettings = new GameSettings(); // ❌ Error: constructor is private

// Configure settings
settings.musicVolume = 85;
settings.effectsVolume = 90;
settings.difficulty = "hard";

console.log("Game Settings:");
console.log(JSON.stringify(settings.getAllSettings(), null, 2));

// Save and load player data
settings.savePlayerData("player1", { level: 10, score: 1500 });
const playerData = settings.loadPlayerData("player1");
console.log(`Player score: ${playerData.score}`);

// Demonstrate singleton behavior
const settings2 = GameSettings.getInstance();
console.log(`Same instance: ${settings === settings2}`); // true

settings2.musicVolume = 50;
console.log(`Music volume after change: ${settings.musicVolume}`); // 50 (same object)

console.log("\n--- Encapsulation Examples Complete ---");
console.log("All four pillars of OOP demonstrated in TypeScript:");
console.log("1. 🏗️  Encapsulation (data hiding & access control)");
console.log(
	"2. 🔄 Polymorphism (multiple forms - via inheritance & interfaces)",
);
console.log("3. 📦 Abstraction (hiding complexity - via abstract classes)");
console.log("4. 🧬 Inheritance (code reuse - extends keyword)");
console.log(
	"\nThese principles work together to create maintainable, scalable software!",
);
