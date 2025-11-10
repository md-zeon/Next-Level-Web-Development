# 5-13 Nullable, Unknown & Never Type

## Special Types in TypeScript

TypeScript provides three special types that help handle edge cases and provide additional type safety: nullable types, unknown, and never. These types are essential for writing robust and type-safe code.

## Nullable Types

Nullable types in TypeScript are created by using union types with `null` or `undefined`. They represent values that might not exist.

### Basic Nullable Types

```typescript
// Explicit nullable types
let userName: string | null = null;
let userAge: number | undefined = undefined;
let userEmail: string | null | undefined = null;

// Optional properties are automatically nullable
interface User {
    name: string;
    email?: string; // string | undefined
    phone?: string | null; // string | null | undefined
}

// Function parameters
function greetUser(name: string, email?: string): void {
    console.log(`Hello ${name}!`);
    if (email) {
        console.log(`Your email is ${email}`);
    }
}

// Return types
function findUser(id: number): User | null {
    // Simulate database lookup
    if (id === 1) {
        return { name: "John", email: "john@example.com" };
    }
    return null;
}
```

### Strict Null Checks

```typescript
// With strict null checks enabled (recommended)
// These will cause compilation errors:

// ❌ Error: Object is possibly 'null'
const user = findUser(999);
console.log(user.name); // TypeScript error

// ✅ Correct: Check for null first
const user = findUser(999);
if (user !== null) {
    console.log(user.name); // OK
}

// Or use optional chaining
const userName = findUser(999)?.name; // string | undefined
```

### Nullable Type Patterns

```typescript
// Common patterns for handling nullable types

// 1. Explicit checks
function processUser(user: User | null): string {
    if (user === null) {
        return "User not found";
    }
    return `Processing ${user.name}`;
}

// 2. Optional chaining
function getUserEmail(user: User | null): string | undefined {
    return user?.email;
}

// 3. Nullish coalescing
function getDisplayName(user: User | null): string {
    return user?.name ?? "Anonymous";
}

// 4. Type guards
function isUser(user: User | null): user is User {
    return user !== null;
}

function processUserSafe(user: User | null): string {
    if (isUser(user)) {
        return `Processing ${user.name}`;
    }
    return "User not found";
}
```

## Unknown Type

The `unknown` type represents values of any type, but unlike `any`, it requires type checking before use. It's safer than `any` because it forces you to verify the type before performing operations.

### Basic Unknown Usage

```typescript
// Unknown type
let userInput: unknown;

// Can assign any value
userInput = "hello";
userInput = 42;
userInput = { name: "John" };
userInput = null;
userInput = undefined;

// But cannot use without type checking
// ❌ Error: Object is of type 'unknown'
console.log(userInput.toUpperCase());

// ✅ Correct: Type check first
if (typeof userInput === "string") {
    console.log(userInput.toUpperCase()); // OK, TypeScript knows it's a string
}
```

### Type Guards with Unknown

```typescript
// Custom type guards for unknown
function isString(value: unknown): value is string {
    return typeof value === "string";
}

function isNumber(value: unknown): value is number {
    return typeof value === "number";
}

function isUser(value: unknown): value is User {
    return typeof value === "object" &&
           value !== null &&
           "name" in value &&
           typeof (value as any).name === "string";
}

// Using type guards
function processUnknown(value: unknown): string {
    if (isString(value)) {
        return `String: ${value.toUpperCase()}`;
    }
    if (isNumber(value)) {
        return `Number: ${value.toFixed(2)}`;
    }
    if (isUser(value)) {
        return `User: ${value.name}`;
    }
    return "Unknown type";
}
```

### Unknown vs Any

```typescript
// Unknown is safer than any
let anyValue: any;
let unknownValue: unknown;

// Any allows unsafe operations
anyValue.someMethod(); // No error at compile time
anyValue.toUpperCase(); // No error at compile time

// Unknown requires type checking
// unknownValue.someMethod(); // ❌ Error
// unknownValue.toUpperCase(); // ❌ Error

// After type checking, both work the same
if (typeof unknownValue === "string") {
    unknownValue.toUpperCase(); // ✅ OK
}

if (typeof anyValue === "string") {
    anyValue.toUpperCase(); // ✅ OK
}
```

### Practical Unknown Usage

```typescript
// API response handling
async function fetchUserData(): Promise<unknown> {
    const response = await fetch('/api/user');
    return response.json(); // Could be anything
}

async function processUserData(): Promise<void> {
    try {
        const data = await fetchUserData();

        // Type check before using
        if (isUser(data)) {
            console.log(`User: ${data.name}`);
            if (data.email) {
                console.log(`Email: ${data.email}`);
            }
        } else {
            console.log("Invalid user data");
        }
    } catch (error) {
        console.error("Failed to fetch user data");
    }
}

// JSON parsing
function parseJson(jsonString: string): unknown {
    try {
        return JSON.parse(jsonString);
    } catch {
        return null;
    }
}

const parsed = parseJson('{"name": "John", "age": 25}');
if (isUser(parsed)) {
    console.log(`Parsed user: ${parsed.name}`);
}
```

## Never Type

The `never` type represents values that never occur. It's used for functions that never return (throw errors or infinite loops) and for exhaustive type checking.

### Functions That Never Return

```typescript
// Function that throws an error
function throwError(message: string): never {
    throw new Error(message);
}

// Function with infinite loop
function infiniteLoop(): never {
    while (true) {
        console.log("This never ends...");
    }
}

// Function that terminates the program
function exitProgram(code: number): never {
    process.exit(code);
}
```

### Exhaustive Type Checking

```typescript
// Using never for exhaustive checks
type Shape = "circle" | "square" | "triangle";

function getArea(shape: Shape): number {
    switch (shape) {
        case "circle":
            return Math.PI * 2;
        case "square":
            return 4;
        case "triangle":
            return 1.732;
        default:
            // TypeScript knows this should never happen
            // If we add a new shape type, this will cause a compile error
            const exhaustiveCheck: never = shape;
            throw new Error(`Unknown shape: ${exhaustiveCheck}`);
    }
}

// With discriminated unions
type ApiResponse =
    | { status: "success"; data: any }
    | { status: "error"; error: string }
    | { status: "loading" };

function handleResponse(response: ApiResponse): void {
    switch (response.status) {
        case "success":
            console.log("Success:", response.data);
            break;
        case "error":
            console.error("Error:", response.error);
            break;
        case "loading":
            console.log("Loading...");
            break;
        default:
            // Ensures all cases are handled
            const exhaustive: never = response;
            throw new Error(`Unknown response: ${exhaustive}`);
    }
}
```

### Never in Type Unions

```typescript
// Never disappears in unions
type A = string | never;  // string
type B = number | never;  // number
type C = never | never;   // never

// Useful for conditional types
type Exclude<T, U> = T extends U ? never : T;

// Example usage
type NonString = Exclude<string | number | boolean, string>; // number | boolean
```

### Advanced Never Patterns

```typescript
// Assertion functions
function assertNever(value: never): never {
    throw new Error(`Unexpected value: ${value}`);
}

// Type-safe assertion
function assertIsShape(shape: Shape): asserts shape is Shape {
    if (!["circle", "square", "triangle"].includes(shape)) {
        throw new Error(`Invalid shape: ${shape}`);
    }
}

// Using assertion functions
function processShape(shape: string): void {
    assertIsShape(shape); // TypeScript now knows shape is Shape
    const area = getArea(shape); // No error
    console.log(`Area: ${area}`);
}
```

## Combining Special Types

### Nullable with Unknown

```typescript
// Function that might return any type or null
function parseValue(input: string): unknown | null {
    try {
        return JSON.parse(input);
    } catch {
        return null;
    }
}

// Safe processing
function processParsedValue(input: string): string {
    const parsed = parseValue(input);

    if (parsed === null) {
        return "Invalid JSON";
    }

    if (typeof parsed === "string") {
        return `String: ${parsed}`;
    }

    if (typeof parsed === "number") {
        return `Number: ${parsed}`;
    }

    return "Unknown type";
}
```

### Never with Conditional Types

```typescript
// Extracting types with never
type FunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

type NonFunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

interface Example {
    name: string;
    age: number;
    greet: () => void;
    calculate: (x: number) => number;
}

type FunctionProps = FunctionPropertyNames<Example>; // "greet" | "calculate"
type NonFunctionProps = NonFunctionPropertyNames<Example>; // "name" | "age"
```

## Common Use Cases

### Error Handling

```typescript
// Custom error types
class ValidationError extends Error {
    constructor(message: string, public field: string) {
        super(message);
        this.name = "ValidationError";
    }
}

class NetworkError extends Error {
    constructor(message: string, public statusCode: number) {
        super(message);
        this.name = "NetworkError";
    }
}

type AppError = ValidationError | NetworkError;

// Error handling function
function handleError(error: AppError): never {
    if (error instanceof ValidationError) {
        console.error(`Validation failed for ${error.field}: ${error.message}`);
    } else if (error instanceof NetworkError) {
        console.error(`Network error ${error.statusCode}: ${error.message}`);
    } else {
        // This should never happen if all error types are covered
        const exhaustive: never = error;
        console.error(`Unknown error: ${exhaustive}`);
    }
    throw error; // Function never returns normally
}
```

### Type-Safe Configuration

```typescript
// Configuration with unknown validation
interface DatabaseConfig {
    host: string;
    port: number;
    ssl: boolean;
}

function validateConfig(config: unknown): DatabaseConfig {
    if (typeof config !== "object" || config === null) {
        throw new Error("Config must be an object");
    }

    const c = config as Record<string, unknown>;

    if (typeof c.host !== "string") {
        throw new Error("Host must be a string");
    }

    if (typeof c.port !== "number") {
        throw new Error("Port must be a number");
    }

    if (typeof c.ssl !== "boolean") {
        throw new Error("SSL must be a boolean");
    }

    return {
        host: c.host,
        port: c.port,
        ssl: c.ssl
    };
}

// Usage
const rawConfig = JSON.parse(process.env.DATABASE_CONFIG || "{}");
const config = validateConfig(rawConfig);
```

### Utility Functions

```typescript
// Safe JSON parsing with unknown
function safeJsonParse<T = unknown>(jsonString: string): T | null {
    try {
        return JSON.parse(jsonString) as T;
    } catch {
        return null;
    }
}

// Type guard for arrays
function isArray(value: unknown): value is unknown[] {
    return Array.isArray(value);
}

// Type guard for objects
function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" &&
           value !== null &&
           !Array.isArray(value);
}
```

## Best Practices

### Use Nullable Types Explicitly

```typescript
// ✅ Good: Explicit nullable types
function findUser(id: number): User | null {
    // implementation
}

// ❌ Avoid: Implicit any for nullable values
function findUser(id: number): any {
    // implementation
}
```

### Prefer Unknown over Any

```typescript
// ✅ Good: Use unknown for truly unknown values
function processExternalData(data: unknown): void {
    if (typeof data === "object" && data !== null) {
        // Safe to use
    }
}

// ❌ Avoid: Using any removes type safety
function processExternalData(data: any): void {
    data.someMethod(); // No type checking
}
```

### Use Never for Exhaustive Checks

```typescript
// ✅ Good: Exhaustive checking with never
type Action = "create" | "update" | "delete";

function handleAction(action: Action): void {
    switch (action) {
        case "create": /* ... */ break;
        case "update": /* ... */ break;
        case "delete": /* ... */ break;
        default:
            const exhaustive: never = action;
            throw new Error(`Unknown action: ${exhaustive}`);
    }
}
```

### Enable Strict Null Checks

```typescript
// ✅ Always enable strict null checks in tsconfig.json
{
    "compilerOptions": {
        "strictNullChecks": true,
        "strict": true
    }
}
```

## Performance Considerations

### Type Checking Overhead

```typescript
// Unknown requires runtime type checks
function processUnknown(value: unknown): string {
    if (typeof value === "string") {
        return value.toUpperCase();
    }
    return "Not a string";
}

// Any skips compile-time checks but may cause runtime errors
function processAny(value: any): string {
    return value.toUpperCase(); // Potential runtime error
}
```

### Never Type Optimization

```typescript
// Functions returning never can be optimized by compilers
function assert(condition: boolean, message: string): asserts condition {
    if (!condition) {
        throw new Error(message);
    }
}

// Compiler can eliminate dead code after assertions
function divide(a: number, b: number): number {
    assert(b !== 0, "Division by zero");
    // Compiler knows b cannot be 0 here
    return a / b;
}
```

## Practice Exercises

### Exercise 1: Nullable Types

```typescript
// Create functions that:
// - Accept nullable parameters and handle them safely
// - Return nullable values with proper type annotations
// - Use optional chaining and nullish coalescing with nullable types
```

### Exercise 2: Unknown Type

```typescript
// Create functions that:
// - Accept unknown parameters and validate them
// - Parse JSON safely and validate the result
// - Create type guards for unknown values
```

### Exercise 3: Never Type

```typescript
// Create functions that:
// - Throw errors and return never
// - Use exhaustive checking in switch statements
// - Create assertion functions with never
```

### Exercise 4: Combining Types

```typescript
// Create a type-safe API client that:
// - Handles unknown response data
// - Uses nullable types for optional fields
// - Has exhaustive error handling
```

### Exercise 5: Advanced Patterns

```typescript
// Implement a validation library that:
// - Uses unknown for input validation
// - Returns detailed error types with never for exhaustiveness
// - Handles nullable configurations safely
```

## Common Pitfalls

### Nullable Confusion

```typescript
// ❌ Wrong: Treating undefined as null
function process(value: string | undefined): string {
    if (value === null) { // This never matches
        return "null";
    }
    return value || "undefined";
}

// ✅ Correct: Check for both null and undefined
function process(value: string | null | undefined): string {
    if (value == null) { // Checks for both null and undefined
        return "null or undefined";
    }
    return value;
}
```

### Unknown Type Misuse

```typescript
// ❌ Wrong: Using unknown when any would be acceptable
function log(value: unknown): void {
    console.log(value); // Requires no type checking
}

// ✅ Correct: Use unknown when type checking is needed
function process(value: unknown): void {
    if (typeof value === "object") {
        // Type checking required
    }
}
```

### Never Type Issues

```typescript
// ❌ Wrong: Function that can return
function fail(message: string): never {
    if (Math.random() > 0.5) {
        return; // This makes it not never
    }
    throw new Error(message);
}

// ✅ Correct: Truly never returns
function fail(message: string): never {
    throw new Error(message);
}
```

## Next Steps

Understanding nullable, unknown, and never types is crucial for writing type-safe TypeScript code. Next, you'll learn about:

- Utility types
- Advanced type patterns
- Generics in depth
- Declaration files

Remember: Nullable types handle absence (| null | undefined), unknown requires type checking before use, never represents impossible values - each serves a specific purpose in type safety!
