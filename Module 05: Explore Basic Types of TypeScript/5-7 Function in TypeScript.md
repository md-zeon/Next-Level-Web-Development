# 5-7 Function in TypeScript

## Functions in TypeScript

Functions are the building blocks of TypeScript applications. TypeScript adds type safety to function parameters and return values.

### Basic Function Syntax

```typescript
// Function declaration
function greet(name: string): string {
    return `Hello, ${name}!`;
}

// Function expression
const greet2 = function(name: string): string {
    return `Hello, ${name}!`;
};

// Arrow function
const greet3 = (name: string): string => {
    return `Hello, ${name}!`;
};

// Short arrow function
const greet4 = (name: string): string => `Hello, ${name}!`;
```

## Function Parameters

### Required Parameters

```typescript
function add(a: number, b: number): number {
    return a + b;
}

add(5, 10); // OK
// add(5); // Error: Expected 2 arguments, but got 1
```

### Optional Parameters

```typescript
function greet(name: string, greeting?: string): string {
    if (greeting) {
        return `${greeting}, ${name}!`;
    }
    return `Hello, ${name}!`;
}

greet("John"); // "Hello, John!"
greet("John", "Hi"); // "Hi, John!"
```

### Default Parameters

```typescript
function createUser(name: string, age: number = 18, active: boolean = true): object {
    return { name, age, active };
}

createUser("John"); // { name: "John", age: 18, active: true }
createUser("Jane", 25); // { name: "Jane", age: 25, active: true }
createUser("Bob", 30, false); // { name: "Bob", age: 30, active: false }
```

### Rest Parameters

```typescript
function sumAll(...numbers: number[]): number {
    return numbers.reduce((sum, num) => sum + num, 0);
}

sumAll(1, 2, 3); // 6
sumAll(1, 2, 3, 4, 5); // 15

// Rest with required parameters
function formatName(firstName: string, ...lastNames: string[]): string {
    return `${firstName} ${lastNames.join(" ")}`;
}

formatName("John", "Doe"); // "John Doe"
formatName("John", "William", "Doe"); // "John William Doe"
```

## Return Types

### Explicit Return Types

```typescript
function getUser(): { id: number; name: string } {
    return { id: 1, name: "John" };
}

function isAdult(age: number): boolean {
    return age >= 18;
}

function logMessage(message: string): void {
    console.log(message);
    // No return statement needed for void
}
```

### Inferred Return Types

```typescript
// TypeScript infers the return type
function add(a: number, b: number) {
    return a + b; // TypeScript knows this returns number
}

function getNothing() {
    // No return statement - TypeScript infers void
}
```

### Never Return Type

```typescript
// Function that never returns (throws error or infinite loop)
function throwError(message: string): never {
    throw new Error(message);
}

function infiniteLoop(): never {
    while (true) {
        // Infinite loop
    }
}

// Exhaustive checks
type Shape = "circle" | "square";

function getArea(shape: Shape): number {
    switch (shape) {
        case "circle":
            return Math.PI * 2;
        case "square":
            return 4;
        default:
            // This ensures all cases are handled
            const exhaustive: never = shape;
            throw new Error(`Unknown shape: ${exhaustive}`);
    }
}
```

## Function Types

### Function Type Expressions

```typescript
// Function type alias
type MathOperation = (a: number, b: number) => number;

const add: MathOperation = (a, b) => a + b;
const subtract: MathOperation = (a, b) => a - b;
const multiply: MathOperation = (a, b) => a * b;

// Interface with call signature
interface Comparator {
    (a: number, b: number): boolean;
}

const greaterThan: Comparator = (a, b) => a > b;
const lessThan: Comparator = (a, b) => a < b;
```

### Function Type in Parameters

```typescript
function processNumbers(
    numbers: number[],
    operation: (a: number, b: number) => number
): number[] {
    const result: number[] = [];
    for (let i = 0; i < numbers.length - 1; i++) {
        result.push(operation(numbers[i], numbers[i + 1]));
    }
    return result;
}

const numbers = [1, 2, 3, 4];
const sums = processNumbers(numbers, (a, b) => a + b); // [3, 5, 7]
const products = processNumbers(numbers, (a, b) => a * b); // [2, 6, 12]
```

## Function Overloads

```typescript
// Function overloads
function format(value: string): string;
function format(value: number): string;
function format(value: boolean): string;
function format(value: string | number | boolean): string {
    if (typeof value === "string") {
        return `"${value}"`;
    }
    if (typeof value === "number") {
        return value.toFixed(2);
    }
    return value ? "true" : "false";
}

format("hello"); // '"hello"'
format(3.14159); // "3.14"
format(true); // "true"
```

## Generic Functions

```typescript
// Generic function
function identity<T>(value: T): T {
    return value;
}

identity<string>("hello"); // string
identity<number>(42); // number
identity([1, 2, 3]); // number[] (inferred)

// Generic with constraints
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const user = { name: "John", age: 25 };
getProperty(user, "name"); // "John"
// getProperty(user, "email"); // Error: "email" not in user

// Generic with multiple type parameters
function merge<T, U>(obj1: T, obj2: U): T & U {
    return { ...obj1, ...obj2 };
}

const result = merge({ name: "John" }, { age: 25 });
// result: { name: "John", age: 25 }
```

## Higher-Order Functions

```typescript
// Function that returns a function
function createMultiplier(factor: number): (value: number) => number {
    return (value: number) => value * factor;
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

double(5); // 10
triple(5); // 15

// Function that takes a function as parameter
function executeOperation(
    a: number,
    b: number,
    operation: (x: number, y: number) => number
): number {
    return operation(a, b);
}

executeOperation(10, 5, (x, y) => x + y); // 15
executeOperation(10, 5, (x, y) => x - y); // 5
```

## Advanced Function Patterns

### Currying

```typescript
// Curried function
function curryAdd(a: number): (b: number) => number {
    return (b: number) => a + b;
}

const add5 = curryAdd(5);
add5(10); // 15

// Generic currying
function curry<T1, T2, TResult>(
    fn: (a: T1, b: T2) => TResult
): (a: T1) => (b: T2) => TResult {
    return (a: T1) => (b: T2) => fn(a, b);
}

const curriedAdd = curry((a: number, b: number) => a + b);
const add10 = curriedAdd(10);
add10(5); // 15
```

### Function Composition

```typescript
// Function composition
function compose<A, B, C>(
    f: (x: B) => C,
    g: (x: A) => B
): (x: A) => C {
    return (x: A) => f(g(x));
}

const toUpper = (s: string) => s.toUpperCase();
const exclaim = (s: string) => `${s}!`;
const shout = compose(exclaim, toUpper);

shout("hello"); // "HELLO!"
```

### Method Chaining with Functions

```typescript
class Calculator {
    private value: number;

    constructor(initialValue: number = 0) {
        this.value = initialValue;
    }

    add(n: number): this {
        this.value += n;
        return this;
    }

    multiply(n: number): this {
        this.value *= n;
        return this;
    }

    subtract(n: number): this {
        this.value -= n;
        return this;
    }

    getResult(): number {
        return this.value;
    }
}

const result = new Calculator(10)
    .add(5)
    .multiply(2)
    .subtract(3)
    .getResult(); // 27
```

## Function Best Practices

### Use Descriptive Names

```typescript
// Bad
function f(a: number, b: number): number {
    return a + b;
}

// Good
function calculateSum(firstNumber: number, secondNumber: number): number {
    return firstNumber + secondNumber;
}
```

### Prefer Interfaces for Complex Function Types

```typescript
// Instead of complex inline types
const complexFunction: (
    data: { id: number; name: string },
    callback: (result: string) => void,
    options?: { timeout: number }
) => Promise<void> = async (data, callback, options) => {
    // implementation
};

// Use interfaces
interface FunctionData {
    id: number;
    name: string;
}

interface FunctionOptions {
    timeout?: number;
}

type ComplexFunction = (
    data: FunctionData,
    callback: (result: string) => void,
    options?: FunctionOptions
) => Promise<void>;
```

### Use Type Guards for Union Types

```typescript
function isString(value: unknown): value is string {
    return typeof value === "string";
}

function processValue(value: string | number): string {
    if (isString(value)) {
        return value.toUpperCase(); // TypeScript knows value is string
    }
    return value.toFixed(2); // TypeScript knows value is number
}
```

## Practice Exercises

### Exercise 1: Basic Functions

```typescript
// Create a function that:
// - Takes a name (string) and age (number)
// - Returns a greeting message
// - Age parameter should be optional with default value
```

### Exercise 2: Function Types

```typescript
// Define a function type for mathematical operations
// Create functions for add, subtract, multiply, divide
// Create a calculator function that takes two numbers and an operation
```

### Exercise 3: Generic Functions

```typescript
// Create a generic function to find the first element in an array
// Create a generic function to reverse an array
// Create a generic function to filter an array based on a predicate
```

### Exercise 4: Function Overloads

```typescript
// Create overloaded functions for:
// - Formatting dates (Date object or string)
// - Converting values (number to string or string to number)
// - Processing data (array or single item)
```

### Exercise 5: Higher-Order Functions

```typescript
// Create a function that returns a function
// Implement function composition
// Create a memoization function for expensive operations
```

## Common Function Patterns

### Callback Pattern

```typescript
type Callback<T> = (error: Error | null, result?: T) => void;

function fetchData<T>(url: string, callback: Callback<T>): void {
    // Simulate async operation
    setTimeout(() => {
        if (Math.random() > 0.8) {
            callback(new Error("Network error"));
        } else {
            callback(null, { data: "Success" } as T);
        }
    }, 1000);
}

fetchData("/api/data", (error, result) => {
    if (error) {
        console.error("Error:", error.message);
    } else {
        console.log("Data:", result);
    }
});
```

### Factory Pattern

```typescript
interface Animal {
    name: string;
    speak(): string;
}

class Dog implements Animal {
    constructor(public name: string) {}
    speak(): string {
        return "Woof!";
    }
}

class Cat implements Animal {
    constructor(public name: string) {}
    speak(): string {
        return "Meow!";
    }
}

type AnimalType = "dog" | "cat";

function createAnimal(type: AnimalType, name: string): Animal {
    switch (type) {
        case "dog":
            return new Dog(name);
        case "cat":
            return new Cat(name);
        default:
            throw new Error(`Unknown animal type: ${type}`);
    }
}

const dog = createAnimal("dog", "Buddy");
const cat = createAnimal("cat", "Whiskers");
```

## Next Steps

Mastering functions in TypeScript is essential for writing maintainable code. Next, you'll learn about:

- Classes and object-oriented programming
- Modules and namespaces
- Advanced types and utility types
- Decorators and metadata

Remember: Functions are first-class citizens in TypeScript - they can be assigned to variables, passed as arguments, and returned from other functions!
