// 7-9 Abstraction: The 3rd Pillar of OOP

// === Basic Abstract Class Example ===

abstract class Animal {
	public name: string;

	constructor(name: string) {
		this.name = name;
	}

	// Abstract method - must be implemented by subclasses
	abstract makeSound(): void;

	// Abstract property - must be implemented by subclasses
	abstract readonly species: string;

	// Concrete method - common to all animals
	public introduce(): void {
		console.log(`Hi, I'm ${this.name}, a ${this.species}`);
	}

	public sleep(): void {
		console.log(`${this.name} is sleeping... Zzz...`);
	}

	// Protected method - can be used by subclasses
	protected getFullDescription(): string {
		return `${this.name} (${this.species})`;
	}
}

// This will cause a compilation error:
// const genericAnimal = new Animal("Fluffy"); // Cannot create an instance of abstract class

class Dog extends Animal {
	public readonly species: string = "Dog";
	public breed: string;

	constructor(name: string, breed: string) {
		super(name);
		this.breed = breed;
	}

	// Must implement abstract method
	makeSound(): void {
		console.log("Woof! Woof!");
	}

	// Additional method specific to Dog
	wagTail(): void {
		console.log(`${this.getFullDescription()} wags its tail happily!`);
	}

	// Override concrete method
	sleep(): void {
		console.log(`${this.name} curls up in its dog bed...`);
	}
}

class Cat extends Animal {
	public readonly species: string = "Cat";
	public furColor: string;

	constructor(name: string, furColor: string) {
		super(name);
		this.furColor = furColor;
	}

	makeSound(): void {
		console.log("Meow!");
	}

	// Additional method specific to Cat
	purr(): void {
		console.log(`${this.name} purrs contentedly`);
	}

	climbTree(): void {
		console.log(`${this.getFullDescription()} climbs the tree gracefully`);
	}
}

class Bird extends Animal {
	public readonly species: string = "Bird";
	public wingspan: number;
	public canFly: boolean;

	constructor(name: string, wingspan: number, canFly: boolean = true) {
		super(name);
		this.wingspan = wingspan;
		this.canFly = canFly;
	}

	makeSound(): void {
		console.log("Chirp! Tweet!");
	}

	fly(): void {
		if (this.canFly) {
			console.log(
				`${this.name} soars into the sky with a ${this.wingspan}cm wingspan`,
			);
		} else {
			console.log(`${this.name} cannot fly but flaps its wings`);
		}
	}
}

console.log("=== Basic Abstract Class Example ===");

const dog = new Dog("Buddy", "Golden Retriever");
const cat = new Cat("Whiskers", "Black");
const bird = new Bird("Tweety", 25);

console.log("Dog behavior:");
dog.introduce();
dog.makeSound();
dog.wagTail();
dog.sleep();

console.log("\nCat behavior:");
cat.introduce();
cat.makeSound();
cat.purr();
cat.climbTree();

console.log("\nBird behavior:");
bird.introduce();
bird.makeSound();
bird.fly();

// === Abstract Properties Example ===

abstract class Shape {
	// Abstract properties must be implemented by subclasses
	abstract readonly name: string;
	abstract area: number;

	// Abstract methods
	abstract calculateArea(): number;
	abstract getDescription(): string;

	// Concrete method using abstract properties
	public display(): void {
		console.log(`Shape: ${this.name}`);
		console.log(`Description: ${this.getDescription()}`);
		console.log(`Area: ${this.area.toFixed(2)}`);
	}
}

class Circle extends Shape {
	public readonly name: string = "Circle";
	public area: number = 0;

	constructor(private radius: number) {
		super();
		this.area = this.calculateArea();
	}

	calculateArea(): number {
		return Math.PI * this.radius ** 2;
	}

	getDescription(): string {
		return `A circle with radius ${this.radius}`;
	}
}

class Rectangle extends Shape {
	public readonly name: string = "Rectangle";
	public area: number = 0;

	constructor(private width: number, private height: number) {
		super();
		this.area = this.calculateArea();
	}

	calculateArea(): number {
		return this.width * this.height;
	}

	getDescription(): string {
		return `A rectangle ${this.width}x${this.height}`;
	}

	isSquare(): boolean {
		return this.width === this.height;
	}
}

class Triangle extends Shape {
	public readonly name: string = "Triangle";
	public area: number = 0;

	constructor(private base: number, private height: number) {
		super();
		this.area = this.calculateArea();
	}

	calculateArea(): number {
		return 0.5 * this.base * this.height;
	}

	getDescription(): string {
		return `A triangle with base ${this.base} and height ${this.height}`;
	}
}

console.log("\n=== Abstract Properties Example ===");

const shapes: Shape[] = [
	new Circle(5),
	new Rectangle(4, 6),
	new Rectangle(5, 5), // Square
	new Triangle(6, 4),
];

shapes.forEach((shape, index) => {
	console.log(`\nShape ${index + 1}:`);
	shape.display();

	// Type checking for specific shape types
	if (shape instanceof Rectangle) {
		console.log(`Is square: ${shape.isSquare()}`);
	}
});

// === Real-World Example: Payment Processing System ===

abstract class PaymentProcessor {
	protected readonly transactionId: string;

	constructor(protected amount: number, protected currency: string = "USD") {
		this.transactionId = this.generateTransactionId();
	}

	// Abstract methods that all payment processors must implement
	abstract validatePaymentDetails(): boolean;
	abstract processPayment(): Promise<PaymentResult>;

	// Abstract property
	abstract readonly paymentMethod: string;

	// Concrete methods with common functionality
	public getAmount(): number {
		return this.amount;
	}

	public getCurrency(): string {
		return this.currency;
	}

	public getTransactionId(): string {
		return this.transactionId;
	}

	public calculateProcessingFee(): number {
		// Common calculation for all payment types
		return this.amount * 0.03; // 3% processing fee
	}

	protected generateTransactionId(): string {
		return `TXN-${Date.now()}-${Math.random()
			.toString(36)
			.substr(2, 9)
			.toUpperCase()}`;
	}

	// Template method pattern
	public async executePayment(): Promise<PaymentResult> {
		if (!this.validatePaymentDetails()) {
			return {
				success: false,
				transactionId: this.transactionId,
				error: "Invalid payment details",
			};
		}

		try {
			const result = await this.processPayment();
			return {
				...result,
				transactionId: this.transactionId,
				processingFee: this.calculateProcessingFee(),
			};
		} catch (error) {
			return {
				success: false,
				transactionId: this.transactionId,
				error: error instanceof Error ? error.message : "Unknown error",
			};
		}
	}
}

interface PaymentResult {
	success: boolean;
	transactionId: string;
	processingFee?: number;
	error?: string;
	confirmationNumber?: string;
}

class CreditCardPayment extends PaymentProcessor {
	public readonly paymentMethod: string = "Credit Card";

	constructor(
		amount: number,
		private cardNumber: string,
		private expiryMonth: number,
		private expiryYear: number,
		private cvv: string,
	) {
		super(amount);
	}

	validatePaymentDetails(): boolean {
		// Basic validation
		const isCardValid =
			this.cardNumber.length >= 13 && this.cardNumber.length <= 19;
		const isExpiryValid =
			this.expiryYear > new Date().getFullYear() ||
			(this.expiryYear === new Date().getFullYear() &&
				this.expiryMonth >= new Date().getMonth() + 1);
		const isCvvValid = this.cvv.length >= 3 && this.cvv.length <= 4;

		return isCardValid && isExpiryValid && isCvvValid;
	}

	async processPayment(): Promise<PaymentResult> {
		// Simulate payment processing
		console.log(
			`Processing credit card payment of ${this.currency}$${this.amount}...`,
		);

		// Simulate API call delay
		await new Promise((resolve) => setTimeout(resolve, 2000));

		// Simulate 95% success rate
		const success = Math.random() > 0.05;

		return success
			? {
					success: true,
					confirmationNumber: `CC-${this.transactionId.slice(-8)}`,
					transactionId: this.transactionId,
			  }
			: {
					success: false,
					transactionId: this.transactionId,
					error: "Payment declined by card issuer",
			  };
	}
}

class PayPalPayment extends PaymentProcessor {
	public readonly paymentMethod: string = "PayPal";

	constructor(amount: number, private paypalEmail: string) {
		super(amount);
	}

	validatePaymentDetails(): boolean {
		// Basic email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(this.paypalEmail);
	}

	async processPayment(): Promise<PaymentResult> {
		console.log(
			`Processing PayPal payment of ${this.currency}$${this.amount} to ${this.paypalEmail}...`,
		);

		// Simulate API call delay
		await new Promise((resolve) => setTimeout(resolve, 1500));

		// Simulate 90% success rate
		const success = Math.random() > 0.1;

		return success
			? {
					success: true,
					confirmationNumber: `PP-${this.transactionId.slice(-8)}`,
					transactionId: this.transactionId,
			  }
			: {
					success: false,
					transactionId: this.transactionId,
					error: "PayPal payment failed",
			  };
	}
}

class CryptoPayment extends PaymentProcessor {
	public readonly paymentMethod: string = "Cryptocurrency";

	constructor(
		amount: number,
		private walletAddress: string,
		private cryptoType: string = "BTC",
	) {
		super(amount, "USD");
	}

	validatePaymentDetails(): boolean {
		// Basic wallet address validation (simplified)
		return this.walletAddress.length >= 26 && this.walletAddress.length <= 62;
	}

	async processPayment(): Promise<PaymentResult> {
		console.log(
			`Processing ${this.cryptoType} payment of ${this.currency}$${this.amount} to ${this.walletAddress}...`,
		);

		// Simulate blockchain confirmation delay
		await new Promise((resolve) => setTimeout(resolve, 3000));

		// Simulate 85% success rate
		const success = Math.random() > 0.15;

		return success
			? {
					success: true,
					confirmationNumber: `${this.cryptoType}-${this.transactionId.slice(
						-8,
					)}`,
					transactionId: this.transactionId,
			  }
			: {
					success: false,
					transactionId: this.transactionId,
					error: "Cryptocurrency transaction failed or timed out",
			  };
	}

	// Override for crypto - different fee structure
	calculateProcessingFee(): number {
		return this.amount * 0.02; // 2% for crypto
	}
}

console.log("\n=== Real-World Example: Payment Processing System ===");

// Create different payment types
const creditCardPayment = new CreditCardPayment(
	99.99,
	"4111111111111111",
	12,
	2025,
	"123",
);
const paypalPayment = new PayPalPayment(49.99, "customer@example.com");
const cryptoPayment = new CryptoPayment(
	199.99,
	"1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
	"BTC",
);

async function processPayments() {
	const payments = [creditCardPayment, paypalPayment, cryptoPayment];

	for (const payment of payments) {
		console.log(`\n--- Processing ${payment.paymentMethod} Payment ---`);
		console.log(`Amount: ${payment.getCurrency()}$${payment.getAmount()}`);
		console.log(`Transaction ID: ${payment.getTransactionId()}`);
		console.log(
			`Processing Fee: ${payment.getCurrency()}$${payment.calculateProcessingFee()}`,
		);

		const result = await payment.executePayment();

		if (result.success) {
			console.log(`✅ Payment successful!`);
			console.log(`Confirmation: ${result.confirmationNumber}`);
		} else {
			console.log(`❌ Payment failed: ${result.error}`);
		}
	}
}

// Execute payment processing
processPayments();

// === Data Storage Abstraction ===

abstract class DataStorage {
	constructor(protected connectionString: string) {}

	// Abstract methods for database operations
	abstract connect(): Promise<void>;
	abstract disconnect(): Promise<void>;
	abstract save(data: any): Promise<string>; // Returns ID
	abstract find(id: string): Promise<any>;
	abstract findAll(query?: any): Promise<any[]>;
	abstract update(id: string, data: any): Promise<boolean>;
	abstract delete(id: string): Promise<boolean>;

	// Abstract property
	abstract readonly storageType: string;

	// Concrete helper methods
	public async saveMultiple(items: any[]): Promise<string[]> {
		const ids: string[] = [];
		for (const item of items) {
			const id = await this.save(item);
			ids.push(id);
		}
		return ids;
	}

	public async exists(id: string): Promise<boolean> {
		try {
			await this.find(id);
			return true;
		} catch {
			return false;
		}
	}

	// Template method for transaction-like operations
	public async performOperation(operation: () => Promise<any>): Promise<any> {
		try {
			await this.connect();
			const result = await operation();
			await this.disconnect();
			return result;
		} catch (error) {
			await this.disconnect();
			throw error;
		}
	}
}

class MongoDBStorage extends DataStorage {
	public readonly storageType: string = "MongoDB";

	async connect(): Promise<void> {
		console.log(`Connecting to MongoDB at: ${this.connectionString}`);
		// Actual connection logic would go here
	}

	async disconnect(): Promise<void> {
		console.log("Disconnecting from MongoDB");
	}

	async save(data: any): Promise<string> {
		console.log(`Saving document to MongoDB:`, data);
		const id = Math.random().toString(36).substr(2, 9);
		// Simulate save operation
		return id;
	}

	async find(id: string): Promise<any> {
		console.log(`Finding document in MongoDB: ${id}`);
		return { _id: id, name: "Sample Document", storage: "MongoDB" };
	}

	async findAll(query?: any): Promise<any[]> {
		console.log(`Finding all documents in MongoDB:`, query);
		return [
			{ _id: "1", name: "Doc 1" },
			{ _id: "2", name: "Doc 2" },
			{ _id: "3", name: "Doc 3" },
		];
	}

	async update(id: string, data: any): Promise<boolean> {
		console.log(`Updating document ${id} in MongoDB:`, data);
		return true;
	}

	async delete(id: string): Promise<boolean> {
		console.log(`Deleting document ${id} from MongoDB`);
		return true;
	}
}

class PostgreSQLStorage extends DataStorage {
	public readonly storageType: string = "PostgreSQL";

	async connect(): Promise<void> {
		console.log(`Connecting to PostgreSQL at: ${this.connectionString}`);
	}

	async disconnect(): Promise<void> {
		console.log("Disconnecting from PostgreSQL");
	}

	async save(data: any): Promise<string> {
		console.log(`Saving record to PostgreSQL:`, data);
		const id = Math.floor(Math.random() * 10000).toString();
		return id;
	}

	async find(id: string): Promise<any> {
		console.log(`Finding record in PostgreSQL: ${id}`);
		return { id: parseInt(id), name: "Sample Record", storage: "PostgreSQL" };
	}

	async findAll(query?: any): Promise<any[]> {
		console.log(`Finding all records in PostgreSQL:`, query);
		return [
			{ id: 1, name: "Record 1" },
			{ id: 2, name: "Record 2" },
		];
	}

	async update(id: string, data: any): Promise<boolean> {
		console.log(`Updating record ${id} in PostgreSQL:`, data);
		return true;
	}

	async delete(id: string): Promise<boolean> {
		console.log(`Deleting record ${id} from PostgreSQL`);
		return true;
	}
}

console.log("\n=== Data Storage Abstraction Example ===");

async function demonstrateStorage() {
	const mongoStorage = new MongoDBStorage("mongodb://localhost:27017");
	const postgresStorage = new PostgreSQLStorage(
		"postgresql://user:pass@localhost:5432",
	);

	console.log(`\n--- MongoDB Operations ---`);
	await mongoStorage.performOperation(async () => {
		const id1 = await mongoStorage.save({
			name: "Test Document",
			content: "Hello MongoDB",
		});
		console.log(`Saved document with ID: ${id1}`);

		const doc = await mongoStorage.find(id1);
		console.log(`Retrieved document:`, doc);

		const all = await mongoStorage.findAll({ active: true });
		console.log(`Found ${all.length} documents`);
	});

	console.log(`\n--- PostgreSQL Operations ---`);
	await postgresStorage.performOperation(async () => {
		const id2 = await postgresStorage.save({
			name: "Test Record",
			email: "test@example.com",
		});
		console.log(`Saved record with ID: ${id2}`);

		const record = await postgresStorage.find(id2);
		console.log(`Retrieved record:`, record);

		const exists = await postgresStorage.exists("nonexistent");
		console.log(`Record exists: ${exists}`);
	});

	console.log(`\n--- Cross-Storage Compatibility ---`);
	// Both implement the same interface - can be used interchangeably!
	const storages: DataStorage[] = [mongoStorage, postgresStorage];

	for (const storage of storages) {
		console.log(`\n${storage.storageType} capabilities:`);
		console.log(`- Can save: ✅`);
		console.log(`- Can find: ✅`);
		console.log(`- Can find all: ✅`);
		console.log(`- Can update: ✅`);
		console.log(`- Can delete: ✅`);
		console.log(`- Connection management: ✅`);
	}
}

// Add a small delay to not conflict with payment processing
setTimeout(demonstrateStorage, 100);

// === Template Method Pattern ===

abstract class ReportGenerator {
	// Template method - defines the algorithm structure
	public async generateReport(): Promise<Report> {
		await this.initializeReport();
		const data = await this.gatherData();
		const processedData = await this.processData(data);
		const formattedReport = this.formatReport(processedData);
		await this.saveReport(formattedReport);

		return {
			content: formattedReport,
			generatedAt: new Date(),
			format: this.getReportFormat(),
		};
	}

	// Abstract methods that subclasses must implement
	protected abstract initializeReport(): Promise<void>;
	protected abstract gatherData(): Promise<any>;
	protected abstract processData(rawData: any): Promise<any>;

	// Abstract property
	protected abstract readonly reportType: string;

	// Concrete methods with default behavior
	protected formatReport(data: any): string {
		return `${this.reportType} Report\n${JSON.stringify(data, null, 2)}`;
	}

	protected async saveReport(content: string): Promise<void> {
		console.log(`Saving ${this.reportType} report...`);
		// Default save implementation - subclasses can override
		console.log(`Report saved successfully`);
	}

	protected getReportFormat(): string {
		return "text";
	}
}

interface Report {
	content: string;
	generatedAt: Date;
	format: string;
}

class SalesReportGenerator extends ReportGenerator {
	protected readonly reportType: string = "Sales";

	protected async initializeReport(): Promise<void> {
		console.log("Initializing sales report generator...");
		// Setup sales-specific configurations
	}

	protected async gatherData(): Promise<any> {
		console.log("Gathering sales data from database...");
		// Simulate fetching from database
		return {
			totalSales: 125000,
			totalOrders: 450,
			averageOrderValue: 278,
			topProducts: ["Laptop", "Phone", "Tablet"],
		};
	}

	protected async processData(rawData: any): Promise<any> {
		console.log("Processing sales data...");
		// Add calculated fields
		return {
			...rawData,
			growth: "+12.5%",
			projectedNextMonth: rawData.totalSales * 1.08,
		};
	}

	protected formatReport(data: any): string {
		return `📊 SALES REPORT 📊
Total Sales: $${data.totalSales}
Total Orders: ${data.totalOrders}
Average Order Value: $${data.averageOrderValue}
Growth: ${data.growth}
Projected Next Month: $${data.projectedNextMonth}
Top Products: ${data.topProducts.join(", ")}`;
	}
}

class InventoryReportGenerator extends ReportGenerator {
	protected readonly reportType: string = "Inventory";

	protected async initializeReport(): Promise<void> {
		console.log("Initializing inventory report generator...");
	}

	protected async gatherData(): Promise<any> {
		console.log("Gathering inventory data...");
		return {
			totalItems: 1250,
			inStock: 1150,
			lowStock: 8,
			outOfStock: 2,
			categories: {
				electronics: 450,
				clothing: 320,
				books: 280,
				other: 200,
			},
		};
	}

	protected async processData(rawData: any): Promise<any> {
		console.log("Processing inventory data...");
		return {
			...rawData,
			stockLevel: "Healthy",
			lowStockItems: ["Wire A", "Bolt B", "Screw C", "Nut D"],
			reorderRecommendation: rawData.lowStock > 5 ? "High" : "Normal",
		};
	}
}

console.log("\n=== Template Method Pattern Example ===");

async function generateReports() {
	const salesGenerator = new SalesReportGenerator();
	const inventoryGenerator = new InventoryReportGenerator();

	console.log("\n--- Generating Sales Report ---");
	const salesReport = await salesGenerator.generateReport();
	console.log("Sales Report Generated:");
	console.log(salesReport.content);
	console.log(`Format: ${salesReport.format}`);
	console.log(`Generated at: ${salesReport.generatedAt.toLocaleString()}`);

	console.log("\n--- Generating Inventory Report ---");
	const inventoryReport = await inventoryGenerator.generateReport();
	console.log("Inventory Report Generated:");
	console.log(inventoryReport.content);
	console.log(`Format: ${inventoryReport.format}`);
	console.log(`Generated at: ${inventoryReport.generatedAt.toLocaleString()}`);
}

// Add delay to ensure previous async operations complete
setTimeout(generateReports, 200);
