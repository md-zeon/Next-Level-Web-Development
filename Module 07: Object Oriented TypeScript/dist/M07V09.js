"use strict";
// 7-9 Abstraction: The 3rd Pillar of OOP
Object.defineProperty(exports, "__esModule", { value: true });
// === Basic Abstract Class Example ===
class Animal {
    name;
    constructor(name) {
        this.name = name;
    }
    // Concrete method - common to all animals
    introduce() {
        console.log(`Hi, I'm ${this.name}, a ${this.species}`);
    }
    sleep() {
        console.log(`${this.name} is sleeping... Zzz...`);
    }
    // Protected method - can be used by subclasses
    getFullDescription() {
        return `${this.name} (${this.species})`;
    }
}
// This will cause a compilation error:
// const genericAnimal = new Animal("Fluffy"); // Cannot create an instance of abstract class
class Dog extends Animal {
    species = "Dog";
    breed;
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }
    // Must implement abstract method
    makeSound() {
        console.log("Woof! Woof!");
    }
    // Additional method specific to Dog
    wagTail() {
        console.log(`${this.getFullDescription()} wags its tail happily!`);
    }
    // Override concrete method
    sleep() {
        console.log(`${this.name} curls up in its dog bed...`);
    }
}
class Cat extends Animal {
    species = "Cat";
    furColor;
    constructor(name, furColor) {
        super(name);
        this.furColor = furColor;
    }
    makeSound() {
        console.log("Meow!");
    }
    // Additional method specific to Cat
    purr() {
        console.log(`${this.name} purrs contentedly`);
    }
    climbTree() {
        console.log(`${this.getFullDescription()} climbs the tree gracefully`);
    }
}
class Bird extends Animal {
    species = "Bird";
    wingspan;
    canFly;
    constructor(name, wingspan, canFly = true) {
        super(name);
        this.wingspan = wingspan;
        this.canFly = canFly;
    }
    makeSound() {
        console.log("Chirp! Tweet!");
    }
    fly() {
        if (this.canFly) {
            console.log(`${this.name} soars into the sky with a ${this.wingspan}cm wingspan`);
        }
        else {
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
class Shape {
    // Concrete method using abstract properties
    display() {
        console.log(`Shape: ${this.name}`);
        console.log(`Description: ${this.getDescription()}`);
        console.log(`Area: ${this.area.toFixed(2)}`);
    }
}
class Circle extends Shape {
    radius;
    name = "Circle";
    area = 0;
    constructor(radius) {
        super();
        this.radius = radius;
        this.area = this.calculateArea();
    }
    calculateArea() {
        return Math.PI * this.radius ** 2;
    }
    getDescription() {
        return `A circle with radius ${this.radius}`;
    }
}
class Rectangle extends Shape {
    width;
    height;
    name = "Rectangle";
    area = 0;
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
        this.area = this.calculateArea();
    }
    calculateArea() {
        return this.width * this.height;
    }
    getDescription() {
        return `A rectangle ${this.width}x${this.height}`;
    }
    isSquare() {
        return this.width === this.height;
    }
}
class Triangle extends Shape {
    base;
    height;
    name = "Triangle";
    area = 0;
    constructor(base, height) {
        super();
        this.base = base;
        this.height = height;
        this.area = this.calculateArea();
    }
    calculateArea() {
        return 0.5 * this.base * this.height;
    }
    getDescription() {
        return `A triangle with base ${this.base} and height ${this.height}`;
    }
}
console.log("\n=== Abstract Properties Example ===");
const shapes = [
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
class PaymentProcessor {
    amount;
    currency;
    transactionId;
    constructor(amount, currency = "USD") {
        this.amount = amount;
        this.currency = currency;
        this.transactionId = this.generateTransactionId();
    }
    // Concrete methods with common functionality
    getAmount() {
        return this.amount;
    }
    getCurrency() {
        return this.currency;
    }
    getTransactionId() {
        return this.transactionId;
    }
    calculateProcessingFee() {
        // Common calculation for all payment types
        return this.amount * 0.03; // 3% processing fee
    }
    generateTransactionId() {
        return `TXN-${Date.now()}-${Math.random()
            .toString(36)
            .substr(2, 9)
            .toUpperCase()}`;
    }
    // Template method pattern
    async executePayment() {
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
        }
        catch (error) {
            return {
                success: false,
                transactionId: this.transactionId,
                error: error instanceof Error ? error.message : "Unknown error",
            };
        }
    }
}
class CreditCardPayment extends PaymentProcessor {
    cardNumber;
    expiryMonth;
    expiryYear;
    cvv;
    paymentMethod = "Credit Card";
    constructor(amount, cardNumber, expiryMonth, expiryYear, cvv) {
        super(amount);
        this.cardNumber = cardNumber;
        this.expiryMonth = expiryMonth;
        this.expiryYear = expiryYear;
        this.cvv = cvv;
    }
    validatePaymentDetails() {
        // Basic validation
        const isCardValid = this.cardNumber.length >= 13 && this.cardNumber.length <= 19;
        const isExpiryValid = this.expiryYear > new Date().getFullYear() ||
            (this.expiryYear === new Date().getFullYear() &&
                this.expiryMonth >= new Date().getMonth() + 1);
        const isCvvValid = this.cvv.length >= 3 && this.cvv.length <= 4;
        return isCardValid && isExpiryValid && isCvvValid;
    }
    async processPayment() {
        // Simulate payment processing
        console.log(`Processing credit card payment of ${this.currency}$${this.amount}...`);
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
    paypalEmail;
    paymentMethod = "PayPal";
    constructor(amount, paypalEmail) {
        super(amount);
        this.paypalEmail = paypalEmail;
    }
    validatePaymentDetails() {
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.paypalEmail);
    }
    async processPayment() {
        console.log(`Processing PayPal payment of ${this.currency}$${this.amount} to ${this.paypalEmail}...`);
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
    walletAddress;
    cryptoType;
    paymentMethod = "Cryptocurrency";
    constructor(amount, walletAddress, cryptoType = "BTC") {
        super(amount, "USD");
        this.walletAddress = walletAddress;
        this.cryptoType = cryptoType;
    }
    validatePaymentDetails() {
        // Basic wallet address validation (simplified)
        return this.walletAddress.length >= 26 && this.walletAddress.length <= 62;
    }
    async processPayment() {
        console.log(`Processing ${this.cryptoType} payment of ${this.currency}$${this.amount} to ${this.walletAddress}...`);
        // Simulate blockchain confirmation delay
        await new Promise((resolve) => setTimeout(resolve, 3000));
        // Simulate 85% success rate
        const success = Math.random() > 0.15;
        return success
            ? {
                success: true,
                confirmationNumber: `${this.cryptoType}-${this.transactionId.slice(-8)}`,
                transactionId: this.transactionId,
            }
            : {
                success: false,
                transactionId: this.transactionId,
                error: "Cryptocurrency transaction failed or timed out",
            };
    }
    // Override for crypto - different fee structure
    calculateProcessingFee() {
        return this.amount * 0.02; // 2% for crypto
    }
}
console.log("\n=== Real-World Example: Payment Processing System ===");
// Create different payment types
const creditCardPayment = new CreditCardPayment(99.99, "4111111111111111", 12, 2025, "123");
const paypalPayment = new PayPalPayment(49.99, "customer@example.com");
const cryptoPayment = new CryptoPayment(199.99, "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2", "BTC");
async function processPayments() {
    const payments = [creditCardPayment, paypalPayment, cryptoPayment];
    for (const payment of payments) {
        console.log(`\n--- Processing ${payment.paymentMethod} Payment ---`);
        console.log(`Amount: ${payment.getCurrency()}$${payment.getAmount()}`);
        console.log(`Transaction ID: ${payment.getTransactionId()}`);
        console.log(`Processing Fee: ${payment.getCurrency()}$${payment.calculateProcessingFee()}`);
        const result = await payment.executePayment();
        if (result.success) {
            console.log(`✅ Payment successful!`);
            console.log(`Confirmation: ${result.confirmationNumber}`);
        }
        else {
            console.log(`❌ Payment failed: ${result.error}`);
        }
    }
}
// Execute payment processing
processPayments();
// === Data Storage Abstraction ===
class DataStorage {
    connectionString;
    constructor(connectionString) {
        this.connectionString = connectionString;
    }
    // Concrete helper methods
    async saveMultiple(items) {
        const ids = [];
        for (const item of items) {
            const id = await this.save(item);
            ids.push(id);
        }
        return ids;
    }
    async exists(id) {
        try {
            await this.find(id);
            return true;
        }
        catch {
            return false;
        }
    }
    // Template method for transaction-like operations
    async performOperation(operation) {
        try {
            await this.connect();
            const result = await operation();
            await this.disconnect();
            return result;
        }
        catch (error) {
            await this.disconnect();
            throw error;
        }
    }
}
class MongoDBStorage extends DataStorage {
    storageType = "MongoDB";
    async connect() {
        console.log(`Connecting to MongoDB at: ${this.connectionString}`);
        // Actual connection logic would go here
    }
    async disconnect() {
        console.log("Disconnecting from MongoDB");
    }
    async save(data) {
        console.log(`Saving document to MongoDB:`, data);
        const id = Math.random().toString(36).substr(2, 9);
        // Simulate save operation
        return id;
    }
    async find(id) {
        console.log(`Finding document in MongoDB: ${id}`);
        return { _id: id, name: "Sample Document", storage: "MongoDB" };
    }
    async findAll(query) {
        console.log(`Finding all documents in MongoDB:`, query);
        return [
            { _id: "1", name: "Doc 1" },
            { _id: "2", name: "Doc 2" },
            { _id: "3", name: "Doc 3" },
        ];
    }
    async update(id, data) {
        console.log(`Updating document ${id} in MongoDB:`, data);
        return true;
    }
    async delete(id) {
        console.log(`Deleting document ${id} from MongoDB`);
        return true;
    }
}
class PostgreSQLStorage extends DataStorage {
    storageType = "PostgreSQL";
    async connect() {
        console.log(`Connecting to PostgreSQL at: ${this.connectionString}`);
    }
    async disconnect() {
        console.log("Disconnecting from PostgreSQL");
    }
    async save(data) {
        console.log(`Saving record to PostgreSQL:`, data);
        const id = Math.floor(Math.random() * 10000).toString();
        return id;
    }
    async find(id) {
        console.log(`Finding record in PostgreSQL: ${id}`);
        return { id: parseInt(id), name: "Sample Record", storage: "PostgreSQL" };
    }
    async findAll(query) {
        console.log(`Finding all records in PostgreSQL:`, query);
        return [
            { id: 1, name: "Record 1" },
            { id: 2, name: "Record 2" },
        ];
    }
    async update(id, data) {
        console.log(`Updating record ${id} in PostgreSQL:`, data);
        return true;
    }
    async delete(id) {
        console.log(`Deleting record ${id} from PostgreSQL`);
        return true;
    }
}
console.log("\n=== Data Storage Abstraction Example ===");
async function demonstrateStorage() {
    const mongoStorage = new MongoDBStorage("mongodb://localhost:27017");
    const postgresStorage = new PostgreSQLStorage("postgresql://user:pass@localhost:5432");
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
    const storages = [mongoStorage, postgresStorage];
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
class ReportGenerator {
    // Template method - defines the algorithm structure
    async generateReport() {
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
    // Concrete methods with default behavior
    formatReport(data) {
        return `${this.reportType} Report\n${JSON.stringify(data, null, 2)}`;
    }
    async saveReport(content) {
        console.log(`Saving ${this.reportType} report...`);
        // Default save implementation - subclasses can override
        console.log(`Report saved successfully`);
    }
    getReportFormat() {
        return "text";
    }
}
class SalesReportGenerator extends ReportGenerator {
    reportType = "Sales";
    async initializeReport() {
        console.log("Initializing sales report generator...");
        // Setup sales-specific configurations
    }
    async gatherData() {
        console.log("Gathering sales data from database...");
        // Simulate fetching from database
        return {
            totalSales: 125000,
            totalOrders: 450,
            averageOrderValue: 278,
            topProducts: ["Laptop", "Phone", "Tablet"],
        };
    }
    async processData(rawData) {
        console.log("Processing sales data...");
        // Add calculated fields
        return {
            ...rawData,
            growth: "+12.5%",
            projectedNextMonth: rawData.totalSales * 1.08,
        };
    }
    formatReport(data) {
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
    reportType = "Inventory";
    async initializeReport() {
        console.log("Initializing inventory report generator...");
    }
    async gatherData() {
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
    async processData(rawData) {
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
//# sourceMappingURL=M07V09.js.map