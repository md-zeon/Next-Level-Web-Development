# 7-4 Type Guards using instanceof Operator

## Introduction to instanceof

The `instanceof` operator is a powerful type guard in TypeScript that checks if an object is an instance of a specific constructor function or class. It's particularly useful when working with inheritance hierarchies and class-based objects.

### Syntax

```typescript
object instanceof Constructor
```

### Keywords
- **instanceof**: Returns `true` if the object was created by the specified constructor or any of its subclasses
- **Type narrowing**: TypeScript automatically narrows the type within conditional blocks

## How instanceof Works

The `instanceof` operator traverses the prototype chain to determine if an object was created by the specified constructor:

```typescript
class Animal {
  name: string;
  constructor(name: string) { this.name = name; }
}

class Dog extends Animal {
  breed: string;
  constructor(name: string, breed: string) {
    super(name);
    this.breed = breed;
  }
}

const animal = new Animal("Generic Animal");
const dog = new Dog("Buddy", "Golden Retriever");

console.log(animal instanceof Animal); // true
console.log(animal instanceof Dog);    // false

console.log(dog instanceof Animal);    // true (Dog inherits from Animal)
console.log(dog instanceof Dog);       // true
```

## instanceof with Type Guards

When used in conditional statements, `instanceof` acts as a type guard:

```typescript
function handleVehicle(vehicle: Vehicle): void {
  if (vehicle instanceof Car) {
    // TypeScript knows vehicle is Car here
    console.log(`Car: ${vehicle.brand} ${vehicle.model} has ${vehicle.numDoors} doors`);
  } else if (vehicle instanceof Motorcycle) {
    // TypeScript knows vehicle is Motorcycle here
    console.log(`Motorcycle: ${vehicle.brand} ${vehicle.model}, Engine size: ${vehicle.engineSize}cc`);
  } else {
    console.log(`Vehicle: ${vehicle.brand} ${vehicle.model}`);
  }
}
```

## Inheritance and instanceof

`instanceof` works with inheritance hierarchies, checking the entire prototype chain:

```typescript
class Shape {
  area(): number { return 0; }
}

class Circle extends Shape {
  radius: number;
  constructor(radius: number) {
    super();
    this.radius = radius;
  }

  area(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  width: number;
  height: number;
  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
  }

  area(): number {
    return this.width * this.height;
  }

  isSquare(): boolean {
    return this.width === this.height;
  }
}

const circle = new Circle(5);
const rectangle = new Rectangle(4, 6);
const square = new Rectangle(5, 5);

console.log(circle instanceof Shape);      // true
console.log(circle instanceof Circle);     // true
console.log(circle instanceof Rectangle);  // false

console.log(rectangle instanceof Shape);   // true
console.log(rectangle instanceof Rectangle); // true

if (rectangle instanceof Rectangle) {
  console.log(`Area: ${rectangle.area()}`);
  console.log(`Is square: ${rectangle.isSquare()}`);
}
```

## instanceof with Built-in Classes

`instanceof` works with JavaScript built-in classes:

```typescript
function processData(data: unknown): void {
  if (data instanceof Array) {
    console.log(`Array with ${data.length} elements`);
  } else if (data instanceof Date) {
    console.log(`Date: ${data.toISOString()}`);
  } else if (data instanceof RegExp) {
    console.log(`Regular expression: ${data.source}`);
  } else if (data instanceof Map) {
    console.log(`Map with ${data.size} entries`);
  } else if (data instanceof Set) {
    console.log(`Set with ${data.size} elements`);
  } else if (data instanceof HTMLElement) {
    console.log(`DOM element: ${data.tagName}`);
  } else {
    console.log("Other type of data");
  }
}
```

## instanceof vs typeof vs in

### Comparison of Type Guards

```typescript
interface User {
  name: string;
  email: string;
}

class UserClass {
  constructor(public name: string, public email: string) {}
}

const userObj: User = { name: "John", email: "john@example.com" };
const userClass = new UserClass("Jane", "jane@example.com");

console.log(typeof userObj);           // "object"
console.log(typeof userClass);         // "object"

console.log("name" in userObj);        // true
console.log("name" in userClass);      // true

console.log(userObj instanceof UserClass); // false (userObj is not a class instance)
console.log(userClass instanceof UserClass); // true

console.log(userObj.constructor.name); // "Object"
console.log(userClass.constructor.name); // "UserClass"
```

### When to Use Each

- **`typeof`**: Best for primitive types ("string", "number", "boolean", etc.)
- **`in`**: Best for checking property existence in objects
- **`instanceof`**: Best for checking class instances and inheritance hierarchies

## Custom Classes and instanceof

Creating custom classes for type checking:

```typescript
class Product {
  constructor(public name: string, public price: number) {}
}

class Food extends Product {
  constructor(name: string, price: number, public expirationDate: Date) {
    super(name, price);
  }

  isExpired(): boolean {
    return this.expirationDate < new Date();
  }
}

class Electronic extends Product {
  constructor(name: string, price: number, public warrantyYears: number) {
    super(name, price);
  }

  getWarrantyEnd(): Date {
    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + this.warrantyYears);
    return endDate;
  }
}

function displayProductInfo(product: Product): void {
  console.log(`Product: ${product.name}, Price: $${product.price}`);

  if (product instanceof Food) {
    console.log(`Expires: ${product.expirationDate.toDateString()}`);
    console.log(`Is expired: ${product.isExpired()}`);
  } else if (product instanceof Electronic) {
    console.log(`Warranty ends: ${product.getWarrantyEnd().toDateString()}`);
  }
}
```

## instanceof with Abstract Classes

TypeScript doesn't have runtime abstract classes, but you can use instanceof with concrete implementations:

```typescript
abstract class Vehicle {
  abstract move(): void;
  abstract getFuelType(): string;
}

class ElectricCar extends Vehicle {
  move(): void { console.log("Electric car moving silently"); }
  getFuelType(): string { return "Electricity"; }
}

class GasolineCar extends Vehicle {
  move(): void { console.log("Gasoline car moving with engine sound"); }
  getFuelType(): string { return "Gasoline"; }
}

function testDrive(vehicle: Vehicle): void {
  if (vehicle instanceof ElectricCar) {
    console.log("Testing electric vehicle");
  } else if (vehicle instanceof GasolineCar) {
    console.log("Testing gasoline vehicle");
  }

  vehicle.move();
  console.log(`Fuel type: ${vehicle.getFuelType()}`);
}
```

## Limitations and Best Practices

### Limitations
1. `instanceof` only works with constructor functions and classes
2. Doesn't work across different execution contexts (frames, workers)
3. Can be unreliable if constructor prototypes are modified
4. Doesn't work with primitive types

### Best Practices
1. Use `instanceof` for class instance checking
2. Combine with other type guards when needed
3. Be aware of inheritance hierarchies
4. Use for built-in classes (Array, Date, etc.) when appropriate
5. Consider custom type guards for complex logic

## Conclusion

The `instanceof` operator is essential for type checking in object-oriented TypeScript code. It provides runtime type information about object instances and works seamlessly with inheritance hierarchies. Understanding when and how to use `instanceof` along with `typeof` and `in` gives you comprehensive type checking capabilities in TypeScript.</content>
