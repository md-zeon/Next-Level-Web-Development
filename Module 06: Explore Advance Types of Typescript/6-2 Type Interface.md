# 6-2 Type Interface

## What is an Interface?

An interface in TypeScript is a powerful way to define the structure of objects. It acts like a contract that specifies what properties and methods an object must have. Interfaces are purely compile-time constructs and are completely removed during compilation - they don't exist in the final JavaScript output.

## Why Use Interfaces?

Interfaces help you:
- Define object shapes and contracts
- Enable better code documentation and IntelliSense
- Catch errors at compile time
- Make code more maintainable and refactorable
- Implement duck typing in a type-safe way

## Basic Interface Syntax

### Simple Interface

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

let user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com"
};
```

### Interface with Methods

```typescript
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
}

let calc: Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};
```

## Optional Properties

You can make properties optional using the `?` operator:

```typescript
interface Person {
  name: string;
  age: number;
  email?: string;  // Optional property
  phone?: string;  // Optional property
}

let person1: Person = { name: "Alice", age: 30 };
let person2: Person = {
  name: "Bob",
  age: 25,
  email: "bob@example.com"
};
```

## Readonly Properties

Use `readonly` to prevent modification after initialization:

```typescript
interface Point {
  readonly x: number;
  readonly y: number;
}

let point: Point = { x: 10, y: 20 };
// point.x = 15; // Error: Cannot assign to 'x' because it is a read-only property
```

## Index Signatures

For objects with dynamic property names:

```typescript
interface Dictionary {
  [key: string]: string;
}

let dict: Dictionary = {
  "hello": "world",
  "foo": "bar"
};
```

### Index Signature with Specific Properties

```typescript
interface ErrorContainer {
  [prop: string]: string | number;
  code: number;    // Specific property
  message: string; // Specific property
}

let error: ErrorContainer = {
  code: 404,
  message: "Not Found",
  timestamp: 1234567890,
  details: "Page not found"
};
```

## Function Interfaces

### Call Signature

```typescript
interface SearchFunction {
  (query: string, limit?: number): string[];
}

let search: SearchFunction = (query, limit = 10) => {
  // Implementation
  return [`${query}_result_1`, `${query}_result_2`];
};
```

### Constructor Interface

```typescript
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}

interface ClockInterface {
  tick(): void;
  currentTime: Date;
}

function createClock(
  ctor: ClockConstructor,
  hour: number,
  minute: number
): ClockInterface {
  return new ctor(hour, minute);
}
```

## Extending Interfaces

Interfaces can extend other interfaces using the `extends` keyword:

```typescript
interface Animal {
  name: string;
  age: number;
}

interface Dog extends Animal {
  breed: string;
  bark(): void;
}

let dog: Dog = {
  name: "Buddy",
  age: 3,
  breed: "Golden Retriever",
  bark: () => console.log("Woof!")
};
```

### Multiple Inheritance

```typescript
interface CanFly {
  fly(): void;
}

interface CanSwim {
  swim(): void;
}

interface Duck extends CanFly, CanSwim {
  quack(): void;
}

let duck: Duck = {
  fly: () => console.log("Flying"),
  swim: () => console.log("Swimming"),
  quack: () => console.log("Quack!")
};
```

## Interface vs Type Alias

While interfaces and type aliases are similar, they have different use cases:

### When to Use Interface

```typescript
// Good for object contracts
interface User {
  name: string;
  email: string;
}

// Can be extended
interface Admin extends User {
  permissions: string[];
}

// Declaration merging (interfaces can be merged)
interface User {
  phone?: string; // Adds to existing interface
}
```

### When to Use Type Alias

```typescript
// Good for complex types
type UserID = string | number;
type Point = [number, number];
type Callback = (data: any) => void;

// Cannot be extended like interfaces
// Cannot be declaration merged
```

## Hybrid Types

Interfaces can describe objects that are also functions:

```typescript
interface Counter {
  (start: number): string;  // Call signature
  interval: number;         // Property
  reset(): void;           // Method
}

function createCounter(): Counter {
  let counter = <Counter>function (start: number) {
    return `Count starts at ${start}`;
  };

  counter.interval = 1000;
  counter.reset = function() {
    console.log("Counter reset");
  };

  return counter;
}
```

## Interface Declaration Merging

TypeScript allows interfaces with the same name to be merged:

```typescript
interface Box {
  height: number;
  width: number;
}

interface Box {
  scale: number;
}

let box: Box = {
  height: 5,
  width: 6,
  scale: 10
};
```

This is useful for extending third-party libraries.

## Generic Interfaces

Interfaces can be generic, allowing reusable type definitions:

```typescript
interface Container<T> {
  value: T;
  getValue(): T;
  setValue(value: T): void;
}

let stringContainer: Container<string> = {
  value: "Hello",
  getValue: () => this.value,
  setValue: (value) => { this.value = value; }
};

let numberContainer: Container<number> = {
  value: 42,
  getValue: () => this.value,
  setValue: (value) => { this.value = value; }
};
```

### Generic Constraints

```typescript
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength("Hello");     // OK
logLength([1, 2, 3]);   // OK
logLength(42);          // Error: number has no length property
```

## Interface Implementation

Classes can implement interfaces:

```typescript
interface Shape {
  area(): number;
  perimeter(): number;
}

class Rectangle implements Shape {
  constructor(private width: number, private height: number) {}

  area(): number {
    return this.width * this.height;
  }

  perimeter(): number {
    return 2 * (this.width + this.height);
  }
}

class Circle implements Shape {
  constructor(private radius: number) {}

  area(): number {
    return Math.PI * this.radius * this.radius;
  }

  perimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}
```

## Advanced Patterns

### Interface with Union Types

```typescript
interface SuccessResponse {
  success: true;
  data: any;
}

interface ErrorResponse {
  success: false;
  error: string;
}

type ApiResponse = SuccessResponse | ErrorResponse;

function handleResponse(response: ApiResponse) {
  if (response.success) {
    console.log("Data:", response.data);
  } else {
    console.log("Error:", response.error);
  }
}
```

### Discriminated Unions with Interfaces

```typescript
interface Square {
  kind: "square";
  size: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

interface Circle {
  kind: "circle";
  radius: number;
}

type Shape = Square | Rectangle | Circle;

function area(shape: Shape): number {
  switch (shape.kind) {
    case "square":
      return shape.size * shape.size;
    case "rectangle":
      return shape.width * shape.height;
    case "circle":
      return Math.PI * shape.radius * shape.radius;
  }
}
```

### Interface with Method Overloads

```typescript
interface Database {
  get(id: number): any;
  get(table: string, id: number): any;
  get(table: string, conditions: object): any[];
}

let db: Database = {
  get: (param1: any, param2?: any) => {
    if (typeof param1 === 'number') {
      return { id: param1 };
    }
    if (typeof param2 === 'number') {
      return { table: param1, id: param2 };
    }
    return [{ table: param1, conditions: param2 }];
  }
};
```

## Best Practices

### ✅ Do's

- Use interfaces for object contracts
- Prefer interfaces over type aliases for object shapes
- Use `readonly` for immutable properties
- Use optional properties sparingly
- Document interface purposes with comments

### ❌ Don'ts

- Don't use interfaces for primitive types
- Avoid deeply nested interfaces
- Don't make all properties optional
- Avoid interface pollution (too many interfaces)
- Don't use interfaces when type aliases are more appropriate

### Naming Conventions

```typescript
// Use PascalCase for interface names
interface UserProfile { ... }
interface ApiResponse { ... }

// Use descriptive names
interface UserData { ... }        // Good
interface Data { ... }           // Bad - too generic

// Use I prefix if required by team convention (not recommended in modern TS)
interface IUser { ... }          // Not recommended
```

## Common Patterns

### Builder Pattern

```typescript
interface Builder<T> {
  setName(name: string): this;
  setAge(age: number): this;
  build(): T;
}

class UserBuilder implements Builder<User> {
  private user: Partial<User> = {};

  setName(name: string): this {
    this.user.name = name;
    return this;
  }

  setAge(age: number): this {
    this.user.age = age;
    return this;
  }

  build(): User {
    if (!this.user.name || !this.user.age) {
      throw new Error("Missing required fields");
    }
    return this.user as User;
  }
}
```

### Repository Pattern

```typescript
interface Repository<T> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  save(entity: T): Promise<T>;
  delete(id: string): Promise<void>;
}

interface UserRepository extends Repository<User> {
  findByEmail(email: string): Promise<User | null>;
}
```

## Practice Exercises

### Exercise 1: Basic Interface

```typescript
// Create an interface for a Book with title, author, and optional isbn
// Create a function that accepts a Book and returns a formatted string
```

### Exercise 2: Extending Interfaces

```typescript
// Create a Vehicle interface with make, model, year
// Create a Car interface that extends Vehicle and adds doors property
// Create a Motorcycle interface that extends Vehicle and adds hasSidecar property
```

### Exercise 3: Generic Interface

```typescript
// Create a generic Stack interface with push, pop, and peek methods
// Implement it for both numbers and strings
```

### Exercise 4: API Response Interface

```typescript
// Create interfaces for API responses:
// - Success response with data property
// - Error response with error message
// Create a function that handles both types of responses
```

### Exercise 5: Class Implementation

```typescript
// Create an interface for a Logger with info, warn, and error methods
// Implement it in a ConsoleLogger class
// Implement it in a FileLogger class
```

## TypeScript Configuration

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

## Summary

Interfaces are fundamental to TypeScript's type system. They provide:

- **Type Safety**: Compile-time checking of object structures
- **Code Documentation**: Self-documenting code through type definitions
- **Maintainability**: Easy refactoring with interface changes
- **Flexibility**: Optional properties, generics, and extension capabilities

**Key Takeaways:**
- Interfaces define object contracts
- Use `extends` for inheritance
- Optional properties use `?`
- Readonly properties prevent modification
- Generic interfaces enable reusable types
- Classes can implement interfaces
- Prefer interfaces over type aliases for object shapes

Mastering interfaces will significantly improve your TypeScript code quality and maintainability!
