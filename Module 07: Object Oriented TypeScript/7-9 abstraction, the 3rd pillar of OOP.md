# 7-9 Abstraction: The 3rd Pillar of OOP

## Introduction to Abstraction

Abstraction is a fundamental principle of object-oriented programming that focuses on hiding implementation details and exposing only the essential features of an object. It allows us to create complex systems while managing complexity by providing a clear separation between what something does and how it does it.

### What is Abstraction?

Abstraction involves:
- **Hiding complexity**: Internal implementation details are hidden from the user
- **Showing essentials**: Only relevant information is exposed to the outside world
- **Providing interfaces**: Clear contracts for how to interact with objects
- **Enabling modularity**: Components can be developed and maintained independently

## Abstract Classes in TypeScript

TypeScript provides abstract classes as a way to implement abstraction. Abstract classes cannot be instantiated directly and serve as blueprints for other classes.

### Syntax

```typescript
abstract class AbstractClassName {
  // Properties and methods...

  // Abstract method - must be implemented by subclasses
  abstract methodName(): void;

  // Concrete method - has implementation
  concreteMethod(): void {
    // Implementation here
  }
}
```

### Example: Basic Abstract Class

```typescript
abstract class Animal {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  // Abstract method - must be implemented by subclasses
  abstract makeSound(): void;

  // Concrete method - common to all animals
  public introduce(): void {
    console.log(`Hi, I'm ${this.name}`);
  }

  public sleep(): void {
    console.log(`${this.name} is sleeping...`);
  }
}

// Cannot instantiate abstract class
// const animal = new Animal("Generic"); // Error!

class Dog extends Animal {
  public breed: string;

  constructor(name: string, breed: string) {
    super(name);
    this.breed = breed;
  }

  // Must implement the abstract method
  makeSound(): void {
    console.log("Woof! Woof!");
  }

  // Can add additional methods
  wagTail(): void {
    console.log(`${this.name} wags its tail`);
  }
}

const dog = new Dog("Buddy", "Golden Retriever");
dog.introduce(); // "Hi, I'm Buddy"
dog.makeSound(); // "Woof! Woof!"
dog.sleep();     // "Buddy is sleeping..."
dog.wagTail();   // "Buddy wags its tail"
```

## Abstract Properties

Abstract classes can also have abstract properties that must be implemented by subclasses:

```typescript
abstract class Shape {
  abstract name: string;

  abstract calculateArea(): number;

  public describe(): void {
    console.log(`This is a ${this.name}`);
  }
}

class Circle extends Shape {
  public name: string = "Circle";
  public radius: number;

  constructor(radius: number) {
    super();
    this.radius = radius;
  }

  calculateArea(): number {
    return Math.PI * this.radius ** 2;
  }
}
```

## Access Modifiers with Abstract Classes

Abstract classes support all access modifiers:

```typescript
abstract class Vehicle {
  public brand: string;
  protected model: string;
  private vin: string;

  protected constructor(brand: string, model: string, vin: string) {
    this.brand = brand;
    this.model = model;
    this.vin = vin;
  }

  abstract startEngine(): void;
  abstract stopEngine(): void;

  public drive(): void {
    console.log(`Driving ${this.brand} ${this.model}`);
  }

  protected getVIN(): string {
    return this.vin; // Can access private properties
  }
}
```

## Real-World Abstraction Examples

### Example 1: Payment Processing System

```typescript
abstract class PaymentProcessor {
  constructor(protected amount: number) {}

  // Abstract methods that all payment types must implement
  abstract validatePayment(): boolean;
  abstract processPayment(): Promise<boolean>;

  // Common functionality
  public getAmount(): number {
    return this.amount;
  }

  public calculateTax(taxRate: number): number {
    return this.amount * taxRate;
  }
}

class CreditCardPayment extends PaymentProcessor {
  constructor(amount: number, private cardNumber: string, private cvv: string) {
    super(amount);
  }

  validatePayment(): boolean {
    // Validate card number and CVV
    return this.cardNumber.length >= 13 && this.cvv.length >= 3;
  }

  async processPayment(): Promise<boolean> {
    // Process credit card payment with external API
    console.log(`Processing credit card payment of $${this.amount}`);
    // Simulate API call
    return true;
  }
}

class PayPalPayment extends PaymentProcessor {
  constructor(amount: number, private paypalEmail: string) {
    super(amount);
  }

  validatePayment(): boolean {
    // Validate PayPal email
    return this.paypalEmail.includes("@");
  }

  async processPayment(): Promise<boolean> {
    console.log(`Processing PayPal payment of $${this.amount} to ${this.paypalEmail}`);
    // Simulate API call
    return true;
  }
}
```

### Example 2: Data Storage Abstraction

```typescript
abstract class DataStorage {
  constructor(protected connectionString: string) {}

  abstract connect(): Promise<void>;
  abstract disconnect(): Promise<void>;
  abstract save(data: any): Promise<void>;
  abstract find(id: any): Promise<any>;
  abstract findAll(): Promise<any[]>;

  public async saveMultiple(items: any[]): Promise<void> {
    for (const item of items) {
      await this.save(item);
    }
  }
}

class DatabaseStorage extends DataStorage {
  async connect(): Promise<void> {
    console.log(`Connecting to database with: ${this.connectionString}`);
  }

  async disconnect(): Promise<void> {
    console.log("Disconnecting from database");
  }

  async save(data: any): Promise<void> {
    console.log(`Saving to database:`, data);
  }

  async find(id: any): Promise<any> {
    console.log(`Finding in database by ID: ${id}`);
    return { id, name: "Sample Data" };
  }

  async findAll(): Promise<any[]> {
    console.log("Finding all records in database");
    return [{ id: 1, name: "Item 1" }, { id: 2, name: "Item 2" }];
  }
}

class FileStorage extends DataStorage {
  private fs: any;

  async connect(): Promise<void> {
    console.log(`Connecting to file system: ${this.connectionString}`);
    // Initialize file system access
  }

  async disconnect(): Promise<void> {
    console.log("Disconnecting from file system");
  }

  async save(data: any): Promise<void> {
    console.log(`Saving to file:`, data);
  }

  async find(id: any): Promise<any> {
    console.log(`Finding in file by ID: ${id}`);
    return { id, name: "File Data" };
  }

  async findAll(): Promise<any[]> {
    console.log("Finding all files");
    return [{ id: 1, name: "File 1" }, { id: 2, name: "File 2" }];
  }
}
```

## Interfaces vs Abstract Classes

While interfaces and abstract classes both provide abstraction, they serve different purposes:

### Interfaces
- **No implementation**: All methods are abstract (implicitly)
- **Multiple implementation**: A class can implement multiple interfaces
- **No constructors**: Cannot have constructors
- **Properties**: Can have readonly properties (TypeScript)
- **Use when**: You want to define contracts without caring about implementation hierarchy

### Abstract Classes
- **Partial implementation**: Can have both abstract and concrete methods
- **Inheritance**: Single inheritance (one abstract class per derived class)
- **Constructors**: Can have constructors
- **Fields**: Can have instance fields
- **Use when**: You want to provide common functionality while forcing certain methods to be implemented

```typescript
// Interface example
interface Printable {
  print(): void;
}

interface Serializable {
  toJSON(): string;
}

class Document implements Printable, Serializable {
  print(): void { /* implementation */ }
  toJSON(): string { /* implementation */ }
}

// Abstract class example
abstract class FileHandler {
  constructor(protected filename: string) {}

  abstract read(): string;

  write(content: string): void {
    // Common implementation
    console.log(`Writing to ${this.filename}: ${content}`);
  }
}

class TextFileHandler extends FileHandler {
  read(): string {
    // Specific implementation
    return "File content";
  }
}
```

## Benefits of Abstraction

1. **Reduced Complexity**: Users don't need to understand internal details
2. **Improved Flexibility**: Implementation can change without affecting users
3. **Better Maintainability**: Changes are localized to specific implementations
4. **Enhanced Testability**: Abstract interfaces make mocking easier
5. **Code Reusability**: Common functionality can be shared
6. **Loose Coupling**: Components are less dependent on each other

## Best Practices

### 1. **Design Clear Interfaces**
- Abstract methods should have clear, descriptive names
- Use meaningful parameter names and return types
- Document the purpose and behavior of each method

### 2. **Keep Abstract Methods Simple**
- Avoid complex abstract method signatures
- Focus on the essential behavior that must be implemented
- Consider splitting complex operations into smaller methods

### 3. **Provide Useful Concrete Methods**
- Implement common functionality in the abstract class
- Use protected methods for implementation details subclasses can use
- Avoid making methods that could be useful concrete methods abstract

### 4. **Use Meaningful Names**
- Abstract class names should indicate they're incomplete
- Use prefixes like "Abstract" or "Base" when appropriate
- Method names should clearly indicate what must be implemented

### 5. **Balance Abstraction and Implementation**
- Don't force subclasses to implement too many methods
- Provide sensible defaults when possible
- Avoid over-abstraction that creates unnecessary complexity

## Common Patterns with Abstraction

### Template Method Pattern

```typescript
abstract class DataProcessor {
  // Template method defining the algorithm structure
  public processData(): void {
    this.validateInput();
    const processed = this.transformData();
    this.saveResult(processed);
    this.cleanup();
  }

  // Abstract methods that subclasses must implement
  protected abstract validateInput(): void;
  protected abstract transformData(): any;
  protected abstract saveResult(result: any): void;

  // Concrete implementation that can be overridden
  protected cleanup(): void {
    console.log("Cleaning up resources");
  }
}

class JSONDataProcessor extends DataProcessor {
  protected validateInput(): void {
    console.log("Validating JSON input");
  }

  protected transformData(): any {
    console.log("Transforming JSON data");
    return { processed: true };
  }

  protected saveResult(result: any): void {
    console.log("Saving JSON result:", result);
  }
}
```

### Factory Method Pattern with Abstraction

```typescript
abstract class DocumentCreator {
  // Factory method
  public createDocument(): Document {
    const doc = this.createDocumentInstance();
    doc.initialize();
    return doc;
  }

  protected abstract createDocumentInstance(): Document;
}

class PDFDocumentCreator extends DocumentCreator {
  protected createDocumentInstance(): Document {
    return new PDFDocument();
  }
}
```

## Conclusion

Abstraction is crucial for building maintainable, flexible, and scalable software systems. Abstract classes in TypeScript provide a powerful way to implement abstraction by defining common behavior and forcing subclasses to implement specific methods. By properly using abstraction, you can create clean APIs, hide implementation details, and build systems that are easier to understand, test, and maintain.</content>
