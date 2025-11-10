# 5-11 Union & Intersection Types

## Union and Intersection Types in TypeScript

Union and intersection types are powerful TypeScript features that allow you to combine existing types to create new ones. They provide flexibility while maintaining type safety.

## Union Types (|)

Union types allow a value to be one of several types. Use the `|` operator to define union types.

### Basic Union Types

```typescript
// Basic union type
type StringOrNumber = string | number;
type Status = "active" | "inactive" | "pending";

// Using union types
let value: StringOrNumber = "hello";
value = 42; // OK

let userStatus: Status = "active";
// userStatus = "deleted"; // Error: not assignable to Status

// Function with union parameter
function formatValue(value: string | number): string {
    if (typeof value === "string") {
        return `"${value}"`;
    }
    return value.toFixed(2);
}

console.log(formatValue("hello")); // "hello"
console.log(formatValue(3.14159)); // "3.14"
```

### Union Types with Objects

```typescript
// Union of object types
type Dog = {
    type: "dog";
    name: string;
    breed: string;
};

type Cat = {
    type: "cat";
    name: string;
    lives: number;
};

type Pet = Dog | Cat;

// Usage
const myDog: Pet = {
    type: "dog",
    name: "Buddy",
    breed: "Golden Retriever"
};

const myCat: Pet = {
    type: "cat",
    name: "Whiskers",
    lives: 9
};
```

### Common Union Type Patterns

```typescript
// Optional properties alternative
type User = {
    id: number;
    name: string;
    email?: string; // Optional property
};

// Or using union with undefined
type User2 = {
    id: number;
    name: string;
    email: string | undefined; // Explicit union
};

// Function overloads using unions
type Event = MouseEvent | KeyboardEvent;

function handleEvent(event: Event): void {
    if (event.type === "click") {
        // Handle mouse event
        console.log("Mouse clicked at:", (event as MouseEvent).clientX);
    } else if (event.type === "keydown") {
        // Handle keyboard event
        console.log("Key pressed:", (event as KeyboardEvent).key);
    }
}
```

## Intersection Types (&)

Intersection types combine multiple types into one. A value of an intersection type must satisfy all the combined types. Use the `&` operator.

### Basic Intersection Types

```typescript
// Basic intersection type
type Nameable = {
    name: string;
};

type Ageable = {
    age: number;
};

type Person = Nameable & Ageable;

// Person must have both name and age
const person: Person = {
    name: "John",
    age: 25
};

// Extending with intersection
type Employee = Person & {
    employeeId: number;
    department: string;
};

const employee: Employee = {
    name: "Jane",
    age: 30,
    employeeId: 12345,
    department: "Engineering"
};
```

### Intersection with Interfaces

```typescript
// Using interfaces with intersections
interface Printable {
    print(): void;
}

interface Loggable {
    log(message: string): void;
}

type PrintableAndLoggable = Printable & Loggable;

// Class implementing intersection
class Document implements PrintableAndLoggable {
    print(): void {
        console.log("Printing document...");
    }

    log(message: string): void {
        console.log(`Log: ${message}`);
    }
}

// Function requiring intersection
function processItem(item: Printable & Loggable): void {
    item.log("Processing started");
    item.print();
    item.log("Processing completed");
}
```

## Discriminated Unions

Discriminated unions (also called tagged unions) use a common property to distinguish between different types in a union.

### Basic Discriminated Unions

```typescript
// Discriminated union for shapes
type Circle = {
    kind: "circle";
    radius: number;
};

type Square = {
    kind: "square";
    sideLength: number;
};

type Triangle = {
    kind: "triangle";
    base: number;
    height: number;
};

type Shape = Circle | Square | Triangle;

// Type-safe function using discriminated union
function getArea(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLength ** 2;
        case "triangle":
            return (shape.base * shape.height) / 2;
        default:
            // TypeScript ensures exhaustiveness
            const _exhaustiveCheck: never = shape;
            throw new Error(`Unknown shape: ${_exhaustiveCheck}`);
    }
}

// Usage
const circle: Circle = { kind: "circle", radius: 5 };
const square: Square = { kind: "square", sideLength: 10 };

console.log(getArea(circle)); // 78.54
console.log(getArea(square)); // 100
```

### Advanced Discriminated Unions

```typescript
// API Response discriminated union
type SuccessResponse = {
    status: "success";
    data: any;
    timestamp: Date;
};

type ErrorResponse = {
    status: "error";
    error: string;
    code: number;
};

type ApiResponse = SuccessResponse | ErrorResponse;

// Type-safe response handler
function handleResponse(response: ApiResponse): void {
    if (response.status === "success") {
        // TypeScript knows this is SuccessResponse
        console.log("Data:", response.data);
        console.log("Timestamp:", response.timestamp);
    } else {
        // TypeScript knows this is ErrorResponse
        console.error(`Error ${response.code}: ${response.error}`);
    }
}

// Form state discriminated union
type LoadingState = {
    state: "loading";
};

type SuccessState = {
    state: "success";
    data: any;
};

type ErrorState = {
    state: "error";
    error: string;
};

type FormState = LoadingState | SuccessState | ErrorState;

function renderForm(state: FormState): void {
    switch (state.state) {
        case "loading":
            console.log("Loading...");
            break;
        case "success":
            console.log("Success:", state.data);
            break;
        case "error":
            console.log("Error:", state.error);
            break;
    }
}
```

## Type Guards with Unions

Type guards help TypeScript narrow down union types to specific types.

### Built-in Type Guards

```typescript
// typeof type guard
function processValue(value: string | number): string {
    if (typeof value === "string") {
        // TypeScript knows value is string
        return value.toUpperCase();
    }
    // TypeScript knows value is number
    return value.toFixed(2);
}

// instanceof type guard
class Dog {
    bark(): void {
        console.log("Woof!");
    }
}

class Cat {
    meow(): void {
        console.log("Meow!");
    }
}

type Animal = Dog | Cat;

function makeSound(animal: Animal): void {
    if (animal instanceof Dog) {
        animal.bark(); // TypeScript knows animal is Dog
    } else {
        animal.meow(); // TypeScript knows animal is Cat
    }
}
```

### Custom Type Guards

```typescript
// Custom type guard function
function isCircle(shape: Shape): shape is Circle {
    return shape.kind === "circle";
}

function isSquare(shape: Shape): shape is Square {
    return shape.kind === "square";
}

// Using custom type guards
function describeShape(shape: Shape): string {
    if (isCircle(shape)) {
        return `Circle with radius ${shape.radius}`;
    }
    if (isSquare(shape)) {
        return `Square with side ${shape.sideLength}`;
    }
    return `Triangle with base ${shape.base} and height ${shape.height}`;
}

// Property check type guard
function hasRadius(shape: Shape): shape is Circle {
    return "radius" in shape;
}

function getRadius(shape: Shape): number | undefined {
    if (hasRadius(shape)) {
        return shape.radius;
    }
    return undefined;
}
```

## Union vs Intersection: When to Use What

### When to Use Union Types (|)

```typescript
// ✅ Use unions when a value can be one of several types
type Status = "idle" | "loading" | "success" | "error";
type InputValue = string | number | boolean;
type ApiResult = UserData | ErrorMessage;

// ✅ Use unions for optional properties
type PartialUser = {
    id: number;
    name: string;
    email?: string;
};

// ✅ Use unions for function parameters that accept multiple types
function format(value: string | number | Date): string {
    // Handle different input types
}
```

### When to Use Intersection Types (&)

```typescript
// ✅ Use intersections when a value must satisfy multiple interfaces
type Employee = Person & Worker & Payable;

// ✅ Use intersections to extend existing types
type ExtendedUser = User & {
    permissions: string[];
    lastLogin: Date;
};

// ✅ Use intersections for mixin patterns
type LoggableAndSerializable = Loggable & Serializable;
```

## Advanced Patterns

### Union of Generic Types

```typescript
// Generic union types
type Result<T, E> = { success: true; data: T } | { success: false; error: E };

type ApiResult<T> = Result<T, string>;
type FileResult = Result<string, "NOT_FOUND" | "PERMISSION_DENIED">;

// Usage
function handleApiCall<T>(result: ApiResult<T>): T | never {
    if (result.success) {
        return result.data;
    }
    throw new Error(result.error);
}
```

### Intersection with Generic Constraints

```typescript
// Generic intersection constraints
function mergeObjects<T, U>(obj1: T, obj2: U): T & U {
    return { ...obj1, ...obj2 };
}

const merged = mergeObjects(
    { name: "John", age: 25 },
    { email: "john@example.com", active: true }
);
// Type: { name: string; age: number; } & { email: string; active: boolean; }
```

### Conditional Types with Unions

```typescript
// Conditional types with unions
type ExtractString<T> = T extends string ? T : never;
type OnlyStrings<T> = T extends string ? T : never;

// Usage
type StringUnion = ExtractString<"hello" | 42 | true>; // "hello"
type AllStrings = OnlyStrings<"a" | "b" | 1>; // "a" | "b"
```

## Common Use Cases

### API Response Handling

```typescript
// API response types
type ApiSuccess<T> = {
    status: "success";
    data: T;
    message?: string;
};

type ApiError = {
    status: "error";
    error: string;
    code: number;
};

type ApiResponse<T> = ApiSuccess<T> | ApiError;

// Type-safe API handler
async function handleApiResponse<T>(response: ApiResponse<T>): Promise<T> {
    if (response.status === "success") {
        return response.data;
    }
    throw new Error(`${response.code}: ${response.error}`);
}
```

### Form Validation

```typescript
// Form field types
type ValidField = {
    status: "valid";
    value: string;
};

type InvalidField = {
    status: "invalid";
    value: string;
    error: string;
};

type Field = ValidField | InvalidField;

// Form validation function
function validateEmail(email: string): Field {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (isValid) {
        return { status: "valid", value: email };
    }
    return { status: "invalid", value: email, error: "Invalid email format" };
}
```

### State Management

```typescript
// Application state types
type IdleState = { status: "idle" };
type LoadingState = { status: "loading" };
type SuccessState<T> = { status: "success"; data: T };
type ErrorState = { status: "error"; error: string };

type AsyncState<T> = IdleState | LoadingState | SuccessState<T> | ErrorState;

// Generic state handler
function handleAsyncState<T>(
    state: AsyncState<T>,
    handlers: {
        onIdle?: () => void;
        onLoading?: () => void;
        onSuccess?: (data: T) => void;
        onError?: (error: string) => void;
    }
): void {
    switch (state.status) {
        case "idle":
            handlers.onIdle?.();
            break;
        case "loading":
            handlers.onLoading?.();
            break;
        case "success":
            handlers.onSuccess?.(state.data);
            break;
        case "error":
            handlers.onError?.(state.error);
            break;
    }
}
```

## Best Practices

### Prefer Discriminated Unions

```typescript
// ✅ Good: Discriminated union
type Shape = Circle | Square | Triangle;

// ❌ Avoid: Non-discriminated union
type Shape2 = { radius: number } | { sideLength: number } | { base: number; height: number };
```

### Use Meaningful Discriminant Properties

```typescript
// ✅ Good: Clear discriminant
type Result = { success: true; data: any } | { success: false; error: string };

// ❌ Avoid: Unclear discriminant
type Result2 = { ok: true; data: any } | { ok: false; message: string };
```

### Keep Unions Simple

```typescript
// ✅ Good: Simple union
type Status = "pending" | "approved" | "rejected";

// ❌ Avoid: Complex union
type Status2 = "pending" | "approved" | "rejected" | "under_review" | "cancelled" | "expired";
```

### Use Type Guards for Complex Unions

```typescript
// ✅ Good: Type guard for complex logic
function isSuccessResponse(response: ApiResponse): response is ApiSuccess {
    return response.status === "success" && "data" in response;
}

// Usage
if (isSuccessResponse(response)) {
    console.log(response.data); // TypeScript knows response is ApiSuccess
}
```

## Practice Exercises

### Exercise 1: Basic Union Types

```typescript
// Create union types for:
// - A value that can be a string or number
// - A status that can be "loading", "success", or "error"
// - A function that accepts string | number and returns a string
```

### Exercise 2: Basic Intersection Types

```typescript
// Create intersection types for:
// - A Person that has both Nameable and Ageable properties
// - An Employee that extends Person with employee-specific properties
// - A class that implements multiple interfaces using intersection
```

### Exercise 3: Discriminated Unions

```typescript
// Create discriminated unions for:
// - Different shapes (circle, rectangle, triangle)
// - API responses (success with data, error with message)
// - Form states (idle, submitting, success, error)
```

### Exercise 4: Type Guards

```typescript
// Create type guards for:
// - Checking if a shape is a circle
// - Checking if an API response is successful
// - Checking if a value is a string using typeof
```

### Exercise 5: Advanced Patterns

```typescript
// Combine concepts:
// - Create a Result<T, E> type using discriminated union
// - Create a state machine using discriminated unions
// - Implement a type-safe event handler using unions
```

## Common Pitfalls

### Forgetting Exhaustive Checks

```typescript
// ❌ Missing case in switch
function getArea(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLength ** 2;
        // Missing "triangle" case - TypeScript won't catch this without never check
    }
}

// ✅ Proper exhaustive check
function getArea(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLength ** 2;
        case "triangle":
            return (shape.base * shape.height) / 2;
        default:
            const _exhaustive: never = shape;
            throw new Error(`Unknown shape: ${_exhaustive}`);
    }
}
```

### Incorrect Intersection Usage

```typescript
// ❌ Wrong: Using intersection when union is needed
type StringAndNumber = string & number; // This is never

// ✅ Correct: Use union for "or" relationships
type StringOrNumber = string | number;
```

### Type Guard Issues

```typescript
// ❌ Wrong: Type guard returns wrong type
function isString(value: unknown): value is number { // Should be string
    return typeof value === "string";
}

// ✅ Correct: Type guard matches implementation
function isString(value: unknown): value is string {
    return typeof value === "string";
}
```

## Next Steps

Union and intersection types are fundamental to TypeScript's type system. Next, you'll learn about:

- Generic types and constraints
- Utility types
- Advanced type patterns
- Type guards and narrowing

Remember: Unions allow "or" relationships (|), intersections require "and" relationships (&) - choose the right one for your use case!
