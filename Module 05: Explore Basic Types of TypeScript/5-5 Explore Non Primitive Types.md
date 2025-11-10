# 5-5 Explore Non-Primitive Types

## What are Non-Primitive Types?

Non-primitive types (also called reference types) are mutable and passed by reference. They can contain multiple values and are more complex than primitive types.

## 1. Arrays

Arrays are ordered collections of elements of the same type.

### Basic Array Types

```typescript
// Array type annotation - method 1
let numbers: number[] = [1, 2, 3, 4, 5];

// Array type annotation - method 2 (generic syntax)
let strings: Array<string> = ["hello", "world"];

// Mixed types using union
let mixed: (string | number)[] = ["hello", 42, "world"];

// Readonly arrays (immutable)
let readonlyArray: readonly number[] = [1, 2, 3];
// readonlyArray.push(4); // Error!
```

### Array Methods and Operations

```typescript
let fruits: string[] = ["apple", "banana", "orange"];

// Adding elements
fruits.push("grape"); // ["apple", "banana", "orange", "grape"]
fruits.unshift("mango"); // ["mango", "apple", "banana", "orange", "grape"]

// Removing elements
let lastFruit = fruits.pop(); // "grape"
let firstFruit = fruits.shift(); // "mango"

// Finding elements
let index = fruits.indexOf("banana"); // 1
let hasOrange = fruits.includes("orange"); // true

// Transforming arrays
let upperFruits = fruits.map(fruit => fruit.toUpperCase());
let longFruits = fruits.filter(fruit => fruit.length > 5);
let fruitString = fruits.join(", "); // "apple, banana, orange"

// Reducing arrays
let totalLength = fruits.reduce((sum, fruit) => sum + fruit.length, 0);
```

### Multidimensional Arrays

```typescript
// 2D array (matrix)
let matrix: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

// Access elements
let element = matrix[1][2]; // 6

// 3D array
let cube: number[][][] = [
    [[1, 2], [3, 4]],
    [[5, 6], [7, 8]]
];
```

## 2. Tuples

Tuples are arrays with fixed length and known types for each element.

```typescript
// Basic tuple
let person: [string, number] = ["John", 25];

// Tuple with optional elements
let optionalTuple: [string, number?] = ["John"];

// Tuple with rest elements
let restTuple: [string, ...number[]] = ["coordinates", 10, 20, 30];

// Named tuple (for better readability)
let user: [name: string, age: number, isActive: boolean] = ["Alice", 30, true];

// Destructuring tuples
let [userName, userAge, isActive] = user;
console.log(userName); // "Alice"
console.log(userAge); // 30
```

### Tuple Methods

```typescript
let coordinates: [number, number] = [10, 20];

// Access by index
let x = coordinates[0]; // 10
let y = coordinates[1]; // 20

// Tuple length
console.log(coordinates.length); // 2

// Spread operator with tuples
let newCoords = [...coordinates, 30]; // [10, 20, 30]
```

## 3. Objects

Objects are collections of key-value pairs.

### Basic Object Types

```typescript
// Inline type annotation
let user: { name: string; age: number; email?: string } = {
    name: "John",
    age: 25,
    email: "john@example.com"
};

// Interface (recommended for complex objects)
interface User {
    name: string;
    age: number;
    email?: string;
    readonly id: number;
}

let user2: User = {
    name: "Jane",
    age: 30,
    id: 1
};

// Index signature for dynamic properties
interface Dictionary {
    [key: string]: string;
}

let dict: Dictionary = {
    "hello": "world",
    "foo": "bar"
};
```

### Object Methods and Operations

```typescript
// Accessing properties
console.log(user.name); // "John"
console.log(user["age"]); // 25

// Adding/modifying properties
user.email = "newemail@example.com";

// Optional properties
if (user.email) {
    console.log(user.email.toUpperCase());
}

// Object destructuring
let { name, age } = user;
console.log(`${name} is ${age} years old`);

// Object spread
let updatedUser = { ...user, lastLogin: new Date() };

// Object methods
console.log(Object.keys(user)); // ["name", "age", "email"]
console.log(Object.values(user)); // ["John", 25, "newemail@example.com"]
console.log(Object.entries(user)); // [["name", "John"], ["age", 25], ...]
```

## 4. Functions

Functions are first-class citizens in TypeScript.

### Function Type Annotations

```typescript
// Function declaration with types
function greet(name: string): string {
    return `Hello, ${name}!`;
}

// Arrow function with types
const add = (a: number, b: number): number => a + b;

// Optional parameters
function createUser(name: string, age?: number): User {
    return { name, age: age ?? 18, id: Date.now() };
}

// Default parameters
function multiply(a: number, b: number = 2): number {
    return a * b;
}

// Rest parameters
function sumAll(...numbers: number[]): number {
    return numbers.reduce((sum, num) => sum + num, 0);
}

// Function overloads
function format(value: string): string;
function format(value: number): string;
function format(value: string | number): string {
    if (typeof value === "string") {
        return value.toUpperCase();
    }
    return value.toFixed(2);
}
```

### Function Types

```typescript
// Function type alias
type MathOperation = (a: number, b: number) => number;

const add: MathOperation = (a, b) => a + b;
const subtract: MathOperation = (a, b) => a - b;

// Interface with call signature
interface Comparator {
    (a: number, b: number): boolean;
}

const greaterThan: Comparator = (a, b) => a > b;
```

## 5. Enums

Enums allow defining named constants.

```typescript
// Numeric enum (default)
enum Direction {
    Up,      // 0
    Down,    // 1
    Left,    // 2
    Right    // 3
}

// String enum
enum Status {
    Active = "ACTIVE",
    Inactive = "INACTIVE",
    Pending = "PENDING"
}

// Heterogeneous enum
enum Mixed {
    Yes = 1,
    No = 0,
    Maybe = "MAYBE"
}

// Reverse mapping (only for numeric enums)
console.log(Direction.Up); // 0
console.log(Direction[0]); // "Up"

// Using enums
let currentDirection: Direction = Direction.Up;
let userStatus: Status = Status.Active;
```

## 6. Special Types

### Any

```typescript
// Any type (avoid when possible)
let anything: any = "hello";
anything = 42; // OK
anything = { key: "value" }; // OK

// Use case: working with existing JavaScript
declare const legacyLibrary: any;
legacyLibrary.doSomething();
```

### Unknown

```typescript
// Unknown type (safer than any)
let unknownValue: unknown = "hello";

// Type checking required before use
if (typeof unknownValue === "string") {
    console.log(unknownValue.toUpperCase()); // OK
}

// Type assertion (use carefully)
let strValue = unknownValue as string;
```

### Never

```typescript
// Never type (function never returns)
function throwError(message: string): never {
    throw new Error(message);
}

// Infinite loop
function infiniteLoop(): never {
    while (true) {
        // ...
    }
}

// Exhaustive checks
type Shape = "circle" | "square" | "triangle";

function getArea(shape: Shape): number {
    switch (shape) {
        case "circle": return Math.PI * 2;
        case "square": return 4;
        case "triangle": return 1.732;
        default:
            const exhaustiveCheck: never = shape;
            throw new Error(`Unhandled shape: ${exhaustiveCheck}`);
    }
}
```

### Void

```typescript
// Void type (function returns undefined)
function logMessage(message: string): void {
    console.log(message);
}

// Void variables (rare)
let result: void = undefined; // Only undefined is assignable to void
```

## 7. Union and Intersection Types

### Union Types

```typescript
// Union type (OR)
type StringOrNumber = string | number;
let value: StringOrNumber = "hello";
value = 42; // OK

// Function with union parameters
function formatValue(value: string | number): string {
    if (typeof value === "string") {
        return value.toUpperCase();
    }
    return value.toFixed(2);
}

// Discriminated unions
interface Circle {
    kind: "circle";
    radius: number;
}

interface Square {
    kind: "square";
    sideLength: number;
}

type Shape = Circle | Square;

function getArea(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLength ** 2;
    }
}
```

### Intersection Types

```typescript
// Intersection type (AND)
interface Printable {
    print(): void;
}

interface Loggable {
    log(): void;
}

type PrintableAndLoggable = Printable & Loggable;

// Class implementing intersection
class Document implements PrintableAndLoggable {
    print() {
        console.log("Printing document...");
    }

    log() {
        console.log("Logging document...");
    }
}
```

## Practice Exercises

### Exercise 1: Arrays

```typescript
// Create an array of numbers and:
// 1. Add elements to the beginning and end
// 2. Remove elements from beginning and end
// 3. Filter for even numbers
// 4. Calculate the sum of all elements
```

### Exercise 2: Tuples

```typescript
// Create a tuple representing a coordinate [x, y, z]
// Write a function that calculates distance from origin
// Use destructuring to access individual coordinates
```

### Exercise 3: Objects and Interfaces

```typescript
// Define an interface for a Product
// Create objects that implement the interface
// Write functions to filter and sort products
```

### Exercise 4: Functions

```typescript
// Create overloaded functions for different data types
// Implement function types for callbacks
// Use rest parameters and default values
```

## Type Guards and Type Narrowing

```typescript
// Type guard functions
function isString(value: unknown): value is string {
    return typeof value === "string";
}

function isNumber(value: unknown): value is number {
    return typeof value === "number";
}

// Using type guards
function processValue(value: unknown): string {
    if (isString(value)) {
        return value.toUpperCase(); // TypeScript knows value is string
    }
    if (isNumber(value)) {
        return value.toFixed(2); // TypeScript knows value is number
    }
    return "Unknown type";
}

// instanceof for classes
class Animal { }
class Dog extends Animal { }

function checkAnimal(animal: Animal): string {
    if (animal instanceof Dog) {
        return "It's a dog!";
    }
    return "It's some other animal";
}
```

## Next Steps

Non-primitive types form the foundation for complex TypeScript applications. Next, you'll learn about:

- Advanced types and utility types
- Generics
- Classes and inheritance
- Modules and namespaces

Remember: Non-primitive types are mutable and passed by reference, which can lead to unexpected behavior if not handled carefully!
