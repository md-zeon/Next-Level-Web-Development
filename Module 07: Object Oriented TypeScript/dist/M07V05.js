"use strict";
// 7-5 Access Modifiers in TypeScript
Object.defineProperty(exports, "__esModule", { value: true });
// Basic Access Modifier Usage
class BankAccount {
    accountNumber;
    balance;
    accountType;
    constructor(accountNumber, initialBalance, accountType) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
        this.accountType = accountType;
    }
    // Public method to safely access private balance
    getBalance() {
        return this.balance;
    }
    // Public method to modify balance safely
    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
        }
    }
    // Private method for internal calculations
    calculateInterest() {
        return this.balance * 0.02;
    }
    // Protected method that subclasses can override or extend
    validateTransaction(amount) {
        return amount <= this.balance;
    }
    showBalance() {
        console.log(`Account ${this.accountNumber} (${this.accountType}): $${this.balance}`);
    }
}
// Testing bank account
const account = new BankAccount("123456", 1000, "Savings");
console.log("=== Bank Account Demo ===");
console.log(`Account Number: ${account.accountNumber}`); // Accessible (public)
console.log(`Balance: $${account.getBalance()}`); // Accessible via method
account.deposit(500);
console.log(`After deposit: $${account.getBalance()}`);
account.showBalance();
// Inheritance and Access Modifiers
class SavingsAccount extends BankAccount {
    interestRate;
    constructor(accountNumber, initialBalance, interestRate) {
        super(accountNumber, initialBalance, "Savings");
        this.interestRate = interestRate;
    }
    // Can access protected members from parent class
    withdraw(amount) {
        if (this.validateTransaction(amount)) { // Accessing protected method
            // Simulate withdrawal by negating deposit
            console.log(`Withdrew $${amount} from savings account`);
        }
        else {
            console.log("Insufficient funds in savings account");
        }
    }
    // Override protected method
    validateTransaction(amount) {
        // Custom validation for savings account
        const currentBalance = this.getBalance();
        return amount <= currentBalance && amount > 0 && amount <= currentBalance - 100; // Minimum balance requirement
    }
    applyInterest() {
        const interest = this.getBalance() * this.interestRate;
        console.log(`Applied $${interest.toFixed(2)} interest at ${this.interestRate * 100}% rate`);
    }
    // Private method specific to savings account
    getMinimumBalance() {
        return 100;
    }
}
// Testing inheritance
const savings = new SavingsAccount("789012", 2000, 0.03);
console.log("\n=== Savings Account Demo ===");
console.log(`Account Number: ${savings.accountNumber}`); // Inherited public property
console.log(`Balance: $${savings.getBalance()}`); // Inherited public method
savings.withdraw(500); // Works - accesses protected method
savings.withdraw(2000); // Should fail due to minimum balance
savings.applyInterest();
// Getter and Setter Methods
class Rectangle {
    _width;
    _height;
    constructor(width, height) {
        this._width = width;
        this._height = height;
    }
    // Public getter for private property
    get width() {
        return this._width;
    }
    // Public setter for private property with validation
    set width(value) {
        if (value > 0) {
            this._width = value;
            console.log(`Width updated to ${value}`);
        }
        else {
            console.log("Width must be positive");
        }
    }
    get height() {
        return this._height;
    }
    set height(value) {
        if (value > 0) {
            this._height = value;
            console.log(`Height updated to ${value}`);
        }
        else {
            console.log("Height must be positive");
        }
    }
    get area() {
        return this._width * this._height;
    }
    get perimeter() {
        return 2 * (this._width + this._height);
    }
    // Protected method for subclasses to extend
    describe() {
        return `Rectangle: ${this._width} x ${this._height}`;
    }
}
// Testing getters and setters
console.log("\n=== Rectangle Demo ===");
const rect = new Rectangle(10, 20);
console.log(`Initial area: ${rect.area}`); // 200
console.log(`Initial perimeter: ${rect.perimeter}`); // 60
rect.width = 15; // Valid
rect.height = 25; // Valid
console.log(`Updated area: ${rect.area}`); // 375
rect.width = -5; // Invalid
rect.height = 0; // Invalid
console.log(`Final area: ${rect.area}`); // Still 375
// Readonly with access modifiers
class User {
    id;
    _name;
    _email;
    constructor(id, name, email) {
        this.id = id; // Set once in constructor, then readonly
        this._name = name;
        this._email = email;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        if (value.trim()) {
            this._name = value;
        }
    }
    // Protected getter for subclasses
    get email() {
        return this._email;
    }
    getUserInfo() {
        return `User ${this.id}: ${this._name}`;
    }
}
class AdminUser extends User {
    adminLevel;
    constructor(id, name, email, adminLevel) {
        super(id, name, email);
        this.adminLevel = adminLevel;
    }
    getAdminInfo() {
        // Can access protected email via protected getter
        return `${this.getUserInfo()} (${this.email}) - Admin Level ${this.adminLevel}`;
    }
}
// Testing readonly and protected
console.log("\n=== User and Admin Demo ===");
const user = new User(1, "John Doe", "john@example.com");
console.log(user.getUserInfo());
console.log(`User name: ${user.name}`);
user.name = "Johnny";
// console.log(user.id = 2); // Error: readonly property
const admin = new AdminUser(2, "Admin User", "admin@example.com", 5);
console.log(admin.getAdminInfo());
// Error demonstration (commented out to prevent compilation errors)
// console.log(account.balance); // Error: private property
// console.log(account.accountType); // Error: protected property
// console.log(savings.interestRate); // Error: private property in subclass
// console.log(savings.accountType); // Error: protected property not accessible from outside
//# sourceMappingURL=M07V05.js.map