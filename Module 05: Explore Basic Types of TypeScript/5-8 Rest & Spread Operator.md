# 5-8 Rest & Spread Operator

## Rest and Spread Operators in TypeScript

The rest (`...`) and spread (`...`) operators provide powerful ways to work with arrays, objects, and function parameters. Despite using the same syntax, they serve different purposes.

## Spread Operator

The spread operator allows you to expand elements from arrays, objects, or other iterables.

### Spread with Arrays

```typescript
// Creating new arrays
const numbers = [1, 2, 3];
const moreNumbers = [...numbers, 4, 5, 6]; // [1, 2, 3, 4, 5, 6]

// Copying arrays (shallow copy)
const original = [1, 2, 3];
const copy = [...original]; // [1, 2, 3]

// Merging arrays
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const merged = [...array1, ...array2]; // [1, 2, 3, 4, 5, 6]

// Inserting elements
const base = [1, 2, 3];
const withInsertions = [0, ...base, 4]; // [0, 1, 2, 3, 4]
```

### Spread with Objects

```typescript
// Creating new objects
const user = { name: "John", age: 25 };
const userWithEmail = { ...user, email: "john@example.com" };
// { name: "John", age: 25, email: "john@example.com" }

// Copying objects (shallow copy)
const original = { a: 1, b: 2, c: 3 };
const copy = { ...original }; // { a: 1, b: 2, c: 3 }

// Merging objects
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 }; // { a: 1, b: 2, c: 3, d: 4 }

// Overriding properties
const baseConfig = { theme: "light", language: "en" };
const userConfig = { ...baseConfig, theme: "dark" };
// { theme: "dark", language: "en" }
```

### Spread with Function Calls

```typescript
// Spreading array elements as function arguments
function add(a: number, b: number, c: number): number {
    return a + b + c;
}

const numbers = [1, 2, 3];
const result = add(...numbers); // 6

// Math functions
const values = [1, 2, 3, 4, 5];
const max = Math.max(...values); // 5
const min = Math.min(...values); // 1

// Constructor calls
const dateFields = [2023, 11, 25]; // year, month (0-based), day
const date = new Date(...dateFields);
```

## Rest Parameters

Rest parameters allow functions to accept an indefinite number of arguments as an array.

### Basic Rest Parameters

```typescript
// Function with rest parameters
function sumAll(...numbers: number[]): number {
    return numbers.reduce((sum, num) => sum + num, 0);
}

sumAll(1, 2, 3); // 6
sumAll(1, 2, 3, 4, 5); // 15

// Rest with required parameters
function formatMessage(prefix: string, ...messages: string[]): string {
    return `${prefix}: ${messages.join(" ")}`;
}

formatMessage("INFO", "User", "logged", "in"); // "INFO: User logged in"
```

### Rest Parameters Type Safety

```typescript
// TypeScript ensures type safety
function processItems<T>(...items: T[]): T[] {
    return items.map(item => {
        // Process each item
        return item;
    });
}

processItems<string>("a", "b", "c"); // OK
processItems<number>(1, 2, 3); // OK
// processItems<string>(1, 2, 3); // Error: numbers not assignable to string
```

## Rest in Destructuring

Rest can be used in destructuring assignments to collect remaining elements.

### Array Destructuring with Rest

```typescript
// Basic array destructuring with rest
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(second); // 2
console.log(rest); // [3, 4, 5]

// Skipping elements
const [, , third, ...remaining] = [1, 2, 3, 4, 5, 6];
console.log(third); // 3
console.log(remaining); // [4, 5, 6]

// Function parameters with destructuring
function processArray([first, second, ...rest]: number[]): void {
    console.log(`First: ${first}, Second: ${second}, Rest: ${rest}`);
}

processArray([1, 2, 3, 4, 5]); // First: 1, Second: 2, Rest: 3,4,5
```

### Object Destructuring with Rest

```typescript
// Basic object destructuring with rest
const { name, age, ...otherProps } = {
    name: "John",
    age: 25,
    email: "john@example.com",
    active: true
};

console.log(name); // "John"
console.log(age); // 25
console.log(otherProps); // { email: "john@example.com", active: true }

// Selective extraction
const user = {
    id: 1,
    name: "Jane",
    email: "jane@example.com",
    password: "secret",
    createdAt: new Date()
};

const { password, createdAt, ...publicUser } = user;
console.log(publicUser); // { id: 1, name: "Jane", email: "jane@example.com" }
```

## Advanced Patterns

### Spread for Immutability

```typescript
// Immutable array operations
const original = [1, 2, 3, 4, 5];

// Add element (immutable)
const added = [...original, 6]; // [1, 2, 3, 4, 5, 6]

// Remove element (immutable)
const removed = original.filter(num => num !== 3); // [1, 2, 4, 5]

// Update element (immutable)
const updated = original.map(num => num === 3 ? 30 : num); // [1, 2, 30, 4, 5]

// Immutable object updates
const user = { name: "John", age: 25, address: { city: "NYC" } };

// Shallow update
const updatedUser = { ...user, age: 26 };

// Deep update (nested objects need special handling)
const updatedAddress = { ...user.address, city: "LA" };
const userWithNewAddress = { ...user, address: updatedAddress };
```

### Rest for Function Overloading

```typescript
// Using rest for flexible function signatures
function createLogger(level: string, ...messages: string[]): void {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${level.toUpperCase()}:`, ...messages);
}

createLogger("info", "User", "logged", "in");
createLogger("error", "Database", "connection", "failed");
```

### Spread with Tuples

```typescript
// Spread with tuple types
type Point3D = [number, number, number];
type Point2D = [number, number];

const point3D: Point3D = [1, 2, 3];
const point2D: Point2D = point3D.slice(0, 2) as Point2D; // [1, 2]

// Using spread for tuple conversion
function to2D([x, y]: Point3D): Point2D {
    return [x, y];
}

function extend2DTo3D([x, y]: Point2D, z: number = 0): Point3D {
    return [x, y, z];
}
```

## TypeScript-Specific Considerations

### Spread with Generic Types

```typescript
// Spread preserves generic type information
function mergeArrays<T>(arr1: T[], arr2: T[]): T[] {
    return [...arr1, ...arr2];
}

const numbers = mergeArrays([1, 2], [3, 4]); // number[]
const strings = mergeArrays(["a", "b"], ["c", "d"]); // string[]

// Spread with readonly arrays
function toMutable<T>(arr: readonly T[]): T[] {
    return [...arr];
}

const readonlyArr: readonly number[] = [1, 2, 3];
const mutableArr = toMutable(readonlyArr); // number[]
```

### Rest Parameters with Generics

```typescript
// Generic rest parameters
function firstElement<T>(...elements: T[]): T | undefined {
    return elements[0];
}

firstElement(1, 2, 3); // 1 (number)
firstElement("a", "b", "c"); // "a" (string)

// Rest with constrained generics
function filterByType<T, U extends T>(
    items: T[],
    predicate: (item: T) => item is U
): U[] {
    return items.filter(predicate);
}
```

### Spread and Type Inference

```typescript
// TypeScript infers types from spread operations
const base = { a: 1, b: 2 };
const extended = { ...base, c: 3 };
// TypeScript infers: { a: number, b: number, c: number }

// Spread with const assertion
const config = { theme: "light" as const, language: "en" };
const userConfig = { ...config, theme: "dark" as const };
// TypeScript knows theme can be "light" | "dark"
```

## Common Use Cases

### Array Manipulation

```typescript
// Remove duplicates
const arrayWithDuplicates = [1, 2, 2, 3, 4, 4, 5];
const unique = [...new Set(arrayWithDuplicates)]; // [1, 2, 3, 4, 5]

// Chunk array
function chunk<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
```

### Object Composition

```typescript
// Mixin pattern
function createMixin<T extends object, U extends object>(
    base: T,
    mixin: U
): T & U {
    return { ...base, ...mixin };
}

const logger = {
    log: (message: string) => console.log(message)
};

const validator = {
    validate: (data: any) => data !== null
};

const enhancedObject = createMixin(logger, validator);
// enhancedObject has both log and validate methods
```

### Function Composition with Spread

```typescript
// Pipeline pattern
function pipe<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
    return (arg: T) => fns.reduce((acc, fn) => fn(acc), arg);
}

const addOne = (x: number) => x + 1;
const double = (x: number) => x * 2;
const square = (x: number) => x * x;

const pipeline = pipe(addOne, double, square);
pipeline(2); // ((2 + 1) * 2) ^ 2 = 36
```

## Performance Considerations

### Spread vs Other Methods

```typescript
// Spread for small arrays/objects (usually fine)
const smallArray = [1, 2, 3];
const copy1 = [...smallArray];

// For large arrays, consider alternatives
const largeArray = Array.from({ length: 100000 }, (_, i) => i);

// Spread (creates new array)
const spreadCopy = [...largeArray];

// Slice (also creates new array, but potentially faster)
const sliceCopy = largeArray.slice();

// For objects, spread is usually the best choice
const obj = { a: 1, b: 2, c: 3 };
const objCopy = { ...obj };
```

## Practice Exercises

### Exercise 1: Array Operations

```typescript
// Using spread operator:
// 1. Create a function that merges multiple arrays
// 2. Create a function that inserts an element at a specific position
// 3. Create a function that removes elements by index range
```

### Exercise 2: Object Manipulation

```typescript
// Using spread operator:
// 1. Create a function that merges multiple objects
// 2. Create a function that updates nested object properties immutably
// 3. Create a function that picks specific properties from an object
```

### Exercise 3: Rest Parameters

```typescript
// Using rest parameters:
// 1. Create a function that accepts variable number of strings and joins them
// 2. Create a function that finds the maximum of variable number of numbers
// 3. Create a generic function that accepts variable number of items and returns the first one
```

### Exercise 4: Destructuring with Rest

```typescript
// Using rest in destructuring:
// 1. Create a function that splits an array into head and tail
// 2. Create a function that extracts user info while excluding sensitive data
// 3. Create a function that processes coordinates with rest for additional dimensions
```

### Exercise 5: Advanced Patterns

```typescript
// Combine spread and rest:
// 1. Create a curry function that uses rest parameters
// 2. Create a function that partially applies arguments using spread
// 3. Create a memoization function that works with variable arguments
```

## Best Practices

### When to Use Spread

- ✅ Creating shallow copies of arrays/objects
- ✅ Merging arrays or objects
- ✅ Passing array elements as function arguments
- ✅ Converting iterables to arrays

### When to Use Rest

- ✅ Functions with variable number of arguments
- ✅ Destructuring remaining elements
- ✅ Creating flexible APIs

### Performance Tips

- For large arrays (>1000 elements), consider alternatives to spread
- Use spread sparingly in performance-critical code
- Prefer `Object.assign()` for simple object merging in older environments

### Type Safety

- Spread operations preserve type information
- Rest parameters maintain type safety
- Use `as const` with spread for literal type preservation

## Next Steps

Mastering rest and spread operators unlocks powerful patterns in TypeScript. Next, you'll learn about:

- Classes and inheritance
- Advanced type patterns
- Utility types
- Type guards and assertions

Remember: Spread expands elements, rest collects them - same syntax, different purposes!
