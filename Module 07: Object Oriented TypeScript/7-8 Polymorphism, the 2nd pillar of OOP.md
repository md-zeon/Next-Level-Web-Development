# 7-8 Polymorphism in TypeScript: The 2nd Pillar of OOP

## Introduction to Polymorphism

Polymorphism is the ability of objects of different classes to respond to the same method call, each in their own specific way. The word "polymorphism" comes from Greek, meaning "many forms." In OOP, it allows objects to be treated as instances of their parent class rather than their actual class.

## Types of Polymorphism in TypeScript

### 1. Runtime Polymorphism (Method Overriding)
- Achieved through inheritance and method overriding
- Method resolution happens at runtime based on the actual object type

### 2. Compile-time Polymorphism
- Method overloading (limited in TypeScript)
- Generic methods and classes

### 3. Ad-hoc Polymorphism
- Interface implementation
- Duck typing with structural typing

## Method Overriding (Runtime Polymorphism)

Method overriding occurs when a subclass provides a specific implementation of a method that is already defined in its parent class.

```typescript
class Shape {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  area(): number {
    return 0; // Default implementation
  }

  perimeter(): number {
    return 0; // Default implementation
  }

  describe(): string {
    return `This is a ${this.name}`;
  }
}

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
}

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
}
```

## Polymorphism in Action

Polymorphism allows us to write code that works with objects of different classes through a common interface:

```typescript
function printShapeInfo(shape: Shape): void {
  console.log(shape.describe());
  console.log(`Area: ${shape.area()}`);
  console.log(`Perimeter: ${shape.perimeter()}`);
}

const shapes: Shape[] = [
  new Rectangle(10, 5),
  new Circle(7),
  new Rectangle(3, 4),
  new Circle(2)
];

shapes.forEach(printShapeInfo);
// Each object responds differently to the same method calls
```

## Abstract Classes and Methods

Abstract classes cannot be instantiated and may contain abstract methods that must be implemented by concrete subclasses.

```typescript
abstract class Vehicle {
  abstract move(): void; // Abstract method - must be implemented by subclasses

  // Regular method
  start(): void {
    console.log("Engine started");
  }

  // Regular method that calls abstract method
  drive(): void {
    this.start();
    this.move();
  }
}

class Car extends Vehicle {
  move(): void {
    console.log("Car is driving on the road");
  }

  // Can override non-abstract methods too
  start(): void {
    console.log("Car engine started with a roar");
  }
}

class Boat extends Vehicle {
  move(): void {
    console.log("Boat is sailing on water");
  }
}

class Airplane extends Vehicle {
  move(): void {
    console.log("Airplane is flying in the sky");
  }
}

// Usage
const vehicles: Vehicle[] = [new Car(), new Boat(), new Airplane()];

vehicles.forEach(vehicle => {
  vehicle.drive();
  console.log("---");
});
// Output:
// Car engine started with a roar
// Car is driving on the road
// ---
// Engine started
// Boat is sailing on water
// ---
// Engine started
// Airplane is flying in the sky
// ---
```

## Interfaces for Polymorphism

Interfaces define contracts that classes must implement, enabling polymorphism through different implementations:

```typescript
interface PaymentProcessor {
  processPayment(amount: number): boolean;
  getProcessorName(): string;
}

class CreditCardProcessor implements PaymentProcessor {
  processPayment(amount: number): boolean {
    console.log(`Processing credit card payment of $${amount}`);
    return true;
  }

  getProcessorName(): string {
    return "Credit Card";
  }
}

class PayPalProcessor implements PaymentProcessor {
  processPayment(amount: number): boolean {
    console.log(`Processing PayPal payment of $${amount}`);
    return true;
  }

  getProcessorName(): string {
    return "PayPal";
  }
}

class BankTransferProcessor implements PaymentProcessor {
  processPayment(amount: number): boolean {
    console.log(`Processing bank transfer of $${amount}`);
    return true;
  }

  getProcessorName(): string {
    return "Bank Transfer";
  }
}

// Polymorphic function
function makePayment(processor: PaymentProcessor, amount: number): void {
  if (processor.processPayment(amount)) {
    console.log(`Payment successful using ${processor.getProcessorName()}`);
  } else {
    console.log(`Payment failed using ${processor.getProcessorName()}`);
  }
}

const processors: PaymentProcessor[] = [
  new CreditCardProcessor(),
  new PayPalProcessor(),
  new BankTransferProcessor()
];

processors.forEach(processor => makePayment(processor, 100));
```

## Generic Polymorphism

Generics allow writing polymorphic functions and classes that work with multiple types:

```typescript
interface Container<T> {
  add(item: T): void;
  remove(): T | undefined;
  size(): number;
}

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
}

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
}

// Polymorphic function that works with any Container
function processContainer<T>(container: Container<T>, items: T[]): void {
  items.forEach(item => container.add(item));
  console.log(`Container has ${container.size()} items`);

  while (container.size() > 0) {
    console.log(`Removed: ${container.remove()}`);
  }
}

// Usage
const numberStack = new Stack<number>();
const stringQueue = new Queue<string>();

processContainer(numberStack, [1, 2, 3, 4, 5]);
console.log("---");
processContainer(stringQueue, ["a", "b", "c"]);
```

## Parametric Polymorphism

Function overloading through union types (TypeScript doesn't support traditional method overloading):

```typescript
function printValue(value: string | number | boolean): void {
  if (typeof value === "string") {
    console.log(`String: "${value}"`);
  } else if (typeof value === "number") {
    console.log(`Number: ${value}`);
  } else {
    console.log(`Boolean: ${value}`);
  }
}

function calculateArea(shape: Rectangle | Circle): number {
  if (shape instanceof Rectangle) {
    return shape.width * shape.height;
  } else {
    return Math.PI * shape.radius * shape.radius;
  }
}
```

## The Liskov Substitution Principle (LSP)

Polymorphism should follow the Liskov Substitution Principle: objects of a superclass should be replaceable with objects of a subclass without affecting the correctness of the program.

```typescript
class Bird {
  fly(): void {
    console.log("Bird is flying");
  }
}

class Penguin extends Bird {
  fly(): void {
    throw new Error("Penguins can't fly!");
  }

  swim(): void {
    console.log("Penguin is swimming");
  }
}

// This violates LSP because you can't use Penguin everywhere you use Bird
function makeBirdFly(bird: Bird): void {
  bird.fly(); // This will throw an error if bird is a Penguin
}
```

Better design following LSP:

```typescript
abstract class Bird {
  abstract move(): void;
}

class FlyingBird extends Bird {
  move(): void {
    this.fly();
  }

  fly(): void {
    console.log("Flying");
  }
}

class SwimmingBird extends Bird {
  move(): void {
    this.swim();
  }

  swim(): void {
    console.log("Swimming");
  }
}

class Eagle extends FlyingBird {
  // Inherits move() which calls fly()
}

class Penguin extends SwimmingBird {
  // Inherits move() which calls swim()
}

// This now works correctly with LSP
function moveBird(bird: Bird): void {
  bird.move(); // Will fly for FlyingBird, swim for SwimmingBird
}
```

## Benefits of Polymorphism

1. **Extensibility**: Add new types without changing existing code
2. **Maintainability**: Reduce code duplication through inheritance
3. **Flexibility**: Write generic algorithms that work with multiple types
4. **Abstraction**: Hide implementation details behind interfaces
5. **Modularity**: Separate interface from implementation

## Common Patterns

### Strategy Pattern
Use polymorphism to implement different algorithms interchangeably:

```typescript
interface SortingStrategy {
  sort(array: number[]): number[];
}

class BubbleSort implements SortingStrategy {
  sort(array: number[]): number[] {
    // Bubble sort implementation
    return array.slice().sort();
  }
}

class QuickSort implements SortingStrategy {
  sort(array: number[]): number[] {
    // Quick sort implementation
    return array.slice().sort((a, b) => a - b);
  }
}

class Sorter {
  constructor(private strategy: SortingStrategy) {}

  setStrategy(strategy: SortingStrategy): void {
    this.strategy = strategy;
  }

  sortArray(array: number[]): number[] {
    return this.strategy.sort(array);
  }
}
```

### Factory Pattern with Polymorphism

```typescript
abstract class Employee {
  abstract getSalary(): number;
  abstract getRole(): string;
}

class Developer extends Employee {
  getSalary(): number { return 80000; }
  getRole(): string { return "Developer"; }
}

class Manager extends Employee {
  getSalary(): number { return 100000; }
  getRole(): string { return "Manager"; }
}

class EmployeeFactory {
  static createEmployee(type: string): Employee {
    switch (type) {
      case "developer": return new Developer();
      case "manager": return new Manager();
      default: throw new Error("Unknown employee type");
    }
  }
}
```

## Conclusion

Polymorphism is a powerful concept that allows for flexible, extensible, and maintainable code. By leveraging inheritance, abstract classes, interfaces, and generics, you can create systems that are both modular and adaptable. Understanding and applying polymorphism correctly leads to better software design and follows the principles of good object-oriented programming.
