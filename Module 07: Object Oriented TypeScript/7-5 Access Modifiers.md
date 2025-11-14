# 7-5 Access Modifiers in TypeScript

## Introduction to Access Modifiers

Access modifiers in TypeScript control the visibility and accessibility of class members (properties and methods). They are essential for encapsulation in object-oriented programming, allowing you to hide implementation details and protect sensitive data.

## Types of Access Modifiers

TypeScript provides three access modifiers:

### 1. `public`
- Default modifier if none is specified
- Accessible from anywhere: inside the class, outside the class, and by subclasses
- Members are part of the public API of the class

### 2. `private`
- Accessible only within the class where they are defined
- Not accessible from outside the class or subclasses
- Used for internal implementation details and sensitive data

### 3. `protected`
- Accessible within the class and its subclasses
- Not accessible from outside the class hierarchy
- Useful for members that need to be inherited but not exposed publicly

## Syntax and Usage

Access modifiers are placed before property or method declarations:

```typescript
class Example {
  public publicProperty: string;
  private privateProperty: string;
  protected protectedProperty: string;

  public publicMethod(): void {
    // Can access all properties
  }

  private privateMethod(): void {
    // Can access all properties
  }

  protected protectedMethod(): void {
    // Can access all properties
  }
}
```

## Examples

### Basic Access Modifier Usage

```typescript
class BankAccount {
  public accountNumber: string;
  private balance: number;
  protected accountType: string;

  constructor(accountNumber: string, initialBalance: number, accountType: string) {
    this.accountNumber = accountNumber;
    this.balance = initialBalance;
    this.accountType = accountType;
  }

  // Public method to safely access private balance
  public getBalance(): number {
    return this.balance;
  }

  // Public method to modify balance safely
  public deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
    }
  }

  // Private method for internal calculations
  private calculateInterest(): number {
    return this.balance * 0.02;
  }

  // Protected method that subclasses can override or extend
  protected validateTransaction(amount: number): boolean {
    return amount <= this.balance;
  }
}

const account = new BankAccount("123456", 1000, "Savings");
console.log(account.accountNumber); // Accessible (public)
console.log(account.getBalance()); // Accessible (via public method)
// console.log(account.balance); // Error: private property
// console.log(account.accountType); // Error: protected property
```

### Inheritance and Access Modifiers

```typescript
class SavingsAccount extends BankAccount {
  private interestRate: number;

  constructor(accountNumber: string, initialBalance: number, interestRate: number) {
    super(accountNumber, initialBalance, "Savings");
    this.interestRate = interestRate;
  }

  // Can access protected members from parent class
  public withdraw(amount: number): void {
    if (this.validateTransaction(amount)) { // Accessing protected method
      // Withdrawal logic here
      console.log(`Withdrew $${amount}`);
    } else {
      console.log("Insufficient funds");
    }
  }

  // Override protected method
  protected validateTransaction(amount: number): boolean {
    // Custom validation for savings account
    return amount <= this.getBalance() && amount > 0;
  }
}

const savings = new SavingsAccount("789012", 2000, 0.03);
savings.withdraw(500); // Works
// console.log(savings.interestRate); // Error: private property
// console.log(savings.accountType); // Error: protected property (not accessible from outside)
```

## Best Practices

1. **Use `private` for sensitive data**: Keep sensitive information private and provide public getter/setter methods if access is needed.

2. **Use `protected` for extensible behavior**: Protected members are ideal for functionality that subclasses might need to extend or override.

3. **Keep the public API minimal**: Expose only what's necessary for users of the class. This makes your code easier to maintain and evolve.

4. **Use `readonly` for immutable properties**: Combine with access modifiers for special cases:

```typescript
class User {
  public readonly id: number;
  private _name: string;

  constructor(id: number, name: string) {
    this.id = id; // Can set once in constructor, then readonly
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
}
```

## Common Patterns

### Getter and Setter Methods

```typescript
class Rectangle {
  private _width: number;
  private _height: number;

  constructor(width: number, height: number) {
    this._width = width;
    this._height = height;
  }

  // Public getter for private property
  public get width(): number {
    return this._width;
  }

  // Public setter for private property with validation
  public set width(value: number) {
    if (value > 0) {
      this._width = value;
    }
  }

  public get height(): number {
    return this._height;
  }

  public set height(value: number) {
    if (value > 0) {
      this._height = value;
    }
  }

  public get area(): number {
    return this._width * this._height;
  }
}

const rect = new Rectangle(10, 20);
console.log(rect.area); // 200
rect.width = 15; // Valid
rect.width = -5; // Ignored due to validation
console.log(rect.area); // 300
```

## Conclusion

Access modifiers are crucial for building robust and maintainable object-oriented code. They help enforce encapsulation, reduce coupling, and make your code more secure and predictable. Proper use of `public`, `private`, and `protected` will significantly improve the design and quality of your TypeScript classes.
