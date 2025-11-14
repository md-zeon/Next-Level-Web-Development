"use strict";
// 7-6 Getter and Setter in TypeScript
Object.defineProperty(exports, "__esModule", { value: true });
// Basic Getters and Setters with Validation
class TemperatureConverter {
    _celsius = 0;
    // Getter
    get celsius() {
        return this._celsius;
    }
    // Setter with validation
    set celsius(value) {
        if (value < -273.15) {
            throw new Error("Temperature cannot be below absolute zero (-273.15°C)");
        }
        this._celsius = value;
    }
    // Computed getter for Fahrenheit
    get fahrenheit() {
        return (this._celsius * 9 / 5) + 32;
    }
    // Setter for Fahrenheit (converts to Celsius internally)
    set fahrenheit(value) {
        this.celsius = (value - 32) * 5 / 9; // Uses the celsius setter with validation
    }
    // Computed getter for Kelvin
    get kelvin() {
        return this._celsius + 273.15;
    }
    // Setter for Kelvin
    set kelvin(value) {
        this.celsius = value - 273.15; // Uses the celsius setter
    }
}
// Testing temperature converter
console.log("=== Temperature Converter Demo ===");
const temp = new TemperatureConverter();
temp.celsius = 25;
console.log(`25°C = ${temp.fahrenheit}°F = ${temp.kelvin}K`);
temp.fahrenheit = 77;
console.log(`77°F = ${temp.celsius}°C = ${temp.kelvin}K`);
temp.kelvin = 300;
console.log(`300K = ${temp.celsius}°C = ${temp.fahrenheit}°F`);
// Person class with validation
class Person {
    _name;
    _age = 0;
    constructor(name, age) {
        this._name = name;
        this.age = age; // Use setter for validation
    }
    get name() {
        return this._name;
    }
    set name(value) {
        if (!value || value.trim().length === 0) {
            throw new Error("Name cannot be empty");
        }
        this._name = value.trim();
    }
    get age() {
        return this._age;
    }
    set age(value) {
        if (value < 0 || value > 150) {
            throw new Error("Age must be between 0 and 150");
        }
        this._age = value;
    }
    // Computed property
    get isAdult() {
        return this._age >= 18;
    }
    get displayInfo() {
        return `${this._name}, ${this._age} years old${this.isAdult ? " (Adult)" : " (Minor)"}`;
    }
}
// Testing Person class
console.log("\n=== Person Class Demo ===");
const person = new Person("Alice", 30);
console.log(person.displayInfo);
person.age = 16;
console.log(person.displayInfo);
try {
    person.age = 200; // This will throw an error
}
catch (error) {
    console.log("Error:", error instanceof Error ? error.message : "Unknown error");
}
// Read-Only Properties (Getter only)
class Circle {
    _radius;
    constructor(_radius) {
        this._radius = _radius;
        if (_radius <= 0) {
            throw new Error("Radius must be positive");
        }
    }
    // Read-only property
    get radius() {
        return this._radius;
    }
    // Computed read-only properties
    get area() {
        return Math.PI * this._radius * this._radius;
    }
    get circumference() {
        return 2 * Math.PI * this._radius;
    }
    get diameter() {
        return 2 * this._radius;
    }
}
// Testing Circle class
console.log("\n=== Circle Demo ===");
const circle = new Circle(5);
console.log(`Radius: ${circle.radius}`);
console.log(`Area: ${circle.area.toFixed(2)}`);
console.log(`Circumference: ${circle.circumference.toFixed(2)}`);
console.log(`Diameter: ${circle.diameter}`);
// circle.radius = 10; // Error: no setter, read-only
// Advanced Bank Account with validation and logging
class BankAccount {
    _balance = 0;
    _accountNumber;
    _transactions = [];
    constructor(accountNumber, initialBalance = 0) {
        this._accountNumber = accountNumber;
        this.balance = initialBalance; // Use setter for validation
    }
    get balance() {
        return this._balance;
    }
    // Setter with comprehensive validation and logging
    set balance(amount) {
        if (amount < -1000) {
            throw new Error("Balance cannot go below -$1000 overdraft limit");
        }
        if (amount > 10000000) {
            throw new Error("Balance cannot exceed $10,000,000 (bank limit)");
        }
        const oldBalance = this._balance;
        this._balance = amount;
        this._transactions.push(`${new Date().toISOString()}: Balance changed from $${oldBalance} to $${amount}`);
    }
    get accountNumber() {
        return this._accountNumber;
    }
    // Read-only transaction history
    get transactionHistory() {
        return [...this._transactions]; // Return copy to prevent modification
    }
    // Computed property for account status
    get accountStatus() {
        if (this._balance >= 10000)
            return "Premium";
        if (this._balance >= 1000)
            return "Gold";
        if (this._balance >= 0)
            return "Standard";
        return "Overdrawn";
    }
    deposit(amount) {
        if (amount <= 0) {
            throw new Error("Deposit amount must be positive");
        }
        this.balance += amount; // Uses setter with validation
    }
    withdraw(amount) {
        if (amount <= 0) {
            throw new Error("Withdrawal amount must be positive");
        }
        if (amount > this._balance + 1000) {
            throw new Error("Insufficient funds (including overdraft limit)");
        }
        this.balance -= amount; // Uses setter with validation
    }
    getLastTransaction() {
        return this._transactions[this._transactions.length - 1] || null;
    }
}
// Testing Bank Account
console.log("\n=== Bank Account Demo ===");
const account = new BankAccount("ACC001", 5000);
console.log(`Account: ${account.accountNumber}`);
console.log(`Initial Balance: $${account.balance}`);
console.log(`Status: ${account.accountStatus}`);
account.deposit(2000);
console.log(`After deposit: $${account.balance}, Status: ${account.accountStatus}`);
account.withdraw(1500);
console.log(`After withdrawal: $${account.balance}, Status: ${account.accountStatus}`);
console.log(`Recent transaction: ${account.getLastTransaction()}`);
console.log(`All transactions: ${account.transactionHistory.length} total`);
// Inheritance with Getters/Setters
class PremiumAccount extends BankAccount {
    _interestRate = 0.05; // 5% monthly interest
    constructor(accountNumber, initialBalance, interestRate = 0.05) {
        super(accountNumber, initialBalance);
        this.interestRate = interestRate; // Use setter
    }
    get interestRate() {
        return this._interestRate;
    }
    set interestRate(value) {
        if (value < 0 || value > 0.1) {
            throw new Error("Interest rate must be between 0% and 10%");
        }
        this._interestRate = value;
    }
    // Override balance setter to add interest logic
    set balance(amount) {
        if (amount > super.balance && super.balance >= 0) {
            // Deposit into positive balance - add interest
            const interestAmount = (amount - super.balance) * this._interestRate;
            super.balance = amount + interestAmount;
        }
        else {
            super.balance = amount;
        }
    }
    // Specific method for premium accounts
    calculateMonthlyInterest() {
        const principal = this.balance > 0 ? this.balance : 0;
        return principal * this._interestRate;
    }
    applyMonthlyInterest() {
        const interest = this.calculateMonthlyInterest();
        this.deposit(interest);
    }
}
// Testing Premium Account
console.log("\n=== Premium Account Demo ===");
const premium = new PremiumAccount("PREM001", 10000, 0.03);
console.log(`Premium Account: ${premium.accountNumber}`);
console.log(`Initial Balance: $${premium.balance}`);
console.log(`Interest Rate: ${(premium.interestRate * 100).toFixed(1)}%`);
premium.deposit(5000);
console.log(`After deposit with interest: $${premium.balance}`);
console.log(`Monthly interest would be: $${premium.calculateMonthlyInterest()}`);
premium.applyMonthlyInterest();
console.log(`After applying monthly interest: $${premium.balance}`);
// Advanced Patterns - Lazy Loading
class ExpensiveDataLoader {
    _data = null;
    // Lazy loading getter
    get data() {
        if (this._data === null) {
            console.log("Loading expensive data...");
            // Simulate expensive computation
            this._data = [];
            for (let i = 0; i < 5; i++) {
                this._data.push(Math.random() * 100);
            }
        }
        return this._data;
    }
    // Force reload
    reloadData() {
        this._data = null;
    }
}
// Testing lazy loading
console.log("\n=== Lazy Loading Demo ===");
const loader = new ExpensiveDataLoader();
console.log("Data length:", loader.data.length); // Triggers loading
console.log("First access:", loader.data.slice(0, 2)); // Already loaded
loader.reloadData();
console.log("After reload (will load again):", loader.data.length);
// Advanced Patterns - Optional Value with Type Guards
class OptionalValue {
    _value;
    constructor(_value) {
        this._value = _value;
    }
    get value() {
        if (this._value === undefined) {
            throw new Error("Value not set - use hasValue to check first");
        }
        return this._value;
    }
    get hasValue() {
        return this._value !== undefined;
    }
    set value(newValue) {
        this._value = newValue;
    }
    clear() {
        this._value = undefined;
    }
    // Safe get method
    getValueOrDefault(defaultValue) {
        return this._value !== undefined ? this._value : defaultValue;
    }
}
// Testing OptionalValue
console.log("\n=== Optional Value Demo ===");
const optionalNum = new OptionalValue();
console.log("Has value:", optionalNum.hasValue);
console.log("Default:", optionalNum.getValueOrDefault(42));
optionalNum.value = 100;
console.log("Has value after set:", optionalNum.hasValue);
console.log("Value:", optionalNum.value);
optionalNum.clear();
console.log("Has value after clear:", optionalNum.hasValue);
// Demonstrate error handling
try {
    const val = optionalNum.value; // Will throw
}
catch (error) {
    console.log("Error:", error instanceof Error ? error.message : "Unknown error");
}
console.log("Using safe method:", optionalNum.getValueOrDefault(0));
// Performance monitoring example
class PerformanceMonitor {
    _startTime = null;
    _measurements = [];
    start() {
        this._startTime = Date.now();
    }
    stop() {
        if (this._startTime === null) {
            throw new Error("Timer not started");
        }
        const duration = Date.now() - this._startTime;
        this._measurements.push(duration);
        this._startTime = null;
    }
    // Computed getter for average time
    get averageTime() {
        if (this._measurements.length === 0)
            return 0;
        return this._measurements.reduce((a, b) => a + b, 0) / this._measurements.length;
    }
    // Read-only property for measurement count
    get measurementCount() {
        return this._measurements.length;
    }
    // Read-only access to measurements
    get measurements() {
        return [...this._measurements];
    }
    // Computed getter for last measurement
    get lastMeasurement() {
        return this._measurements[this._measurements.length - 1] || null;
    }
    // Reset measurements
    reset() {
        this._measurements = [];
        this._startTime = null;
    }
}
// Performance monitor demo
console.log("\n=== Performance Monitor Demo ===");
const monitor = new PerformanceMonitor();
monitor.start();
// Simulate some work
setTimeout(() => {
    monitor.stop();
    console.log(`Measurement: ${monitor.lastMeasurement}ms`);
    console.log(`Count: ${monitor.measurementCount}`);
    console.log(`Average: ${monitor.averageTime}ms`);
}, 100);
// Wait a bit, then show we can continue demo synchronously
console.log("Monitor measurements so far:", monitor.measurementCount);
//# sourceMappingURL=M07V06.js.map