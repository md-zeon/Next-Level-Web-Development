# 6-8 Explore Enum

## What is Enum?

Enums (short for enumerations) in TypeScript allow you to define a set of named constants. They provide a way to give more friendly names to sets of numeric or string values. Enums make your code more readable and less prone to errors by providing a predefined set of values.

## Why Use Enum?

Enums are useful when:

- You have a fixed set of related constants
- You want to make your code more type-safe
- You need to represent a set of options or states
- You want to avoid magic numbers or strings in your code
- You need to iterate over a collection of related values

## Types of Enums

TypeScript supports several types of enums:

### 1. Numeric Enums (Default)

```typescript
enum Direction {
    Up,      // 0
    Down,    // 1
    Left,    // 2
    Right,   // 3
}
```

### 2. String Enums

```typescript
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}
```

### 3. Heterogeneous Enums (Mixed)

```typescript
enum Mixed {
    No = 0,
    Yes = "YES",
}
```

### 4. Computed Enums

```typescript
enum FileAccess {
    None,
    Read = 1 << 1,
    Write = 1 << 2,
    ReadWrite = Read | Write,
}
```

## Basic Examples

### Example 1: Basic Numeric Enum

```typescript
enum Color {
    Red,    // 0
    Green,  // 1
    Blue,   // 2
}

let favoriteColor: Color = Color.Red;
console.log(favoriteColor); // 0
console.log(Color[favoriteColor]); // "Red"
```

### Example 2: Custom Numeric Values

```typescript
enum Status {
    Pending = 1,
    Approved = 2,
    Rejected = 3,
}

let userStatus: Status = Status.Approved;
console.log(userStatus); // 2
```

### Example 3: String Enum

```typescript
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}

let move: Direction = Direction.Up;
console.log(move); // "UP"
```

### Example 4: Reverse Mapping

```typescript
enum Color {
    Red = 1,
    Green = 2,
    Blue = 4,
}

console.log(Color.Red);     // 1
console.log(Color[1]);      // "Red"
console.log(Color["Red"]);  // 1
```

## Advanced Examples

### Example 5: Enum with Methods

```typescript
enum HttpStatus {
    OK = 200,
    NotFound = 404,
    InternalServerError = 500,
}

class HttpResponse {
    constructor(private status: HttpStatus) {}

    isSuccess(): boolean {
        return this.status === HttpStatus.OK;
    }

    getMessage(): string {
        switch (this.status) {
            case HttpStatus.OK:
                return "Success";
            case HttpStatus.NotFound:
                return "Not Found";
            case HttpStatus.InternalServerError:
                return "Internal Server Error";
            default:
                return "Unknown Status";
        }
    }
}

let response = new HttpResponse(HttpStatus.OK);
console.log(response.isSuccess()); // true
console.log(response.getMessage()); // "Success"
```

### Example 6: Enum as Union Type

```typescript
enum Shape {
    Circle = "circle",
    Square = "square",
    Triangle = "triangle",
}

function drawShape(shape: Shape): void {
    console.log(`Drawing a ${shape}`);
}

drawShape(Shape.Circle); // "Drawing a circle"
// drawShape("rectangle"); // Error: not assignable to Shape
```

### Example 7: Const Enum (Compile-time Optimization)

```typescript
const enum Direction {
    Up,
    Down,
    Left,
    Right,
}

// Compiled to direct values, no enum object created
let dir: Direction = Direction.Up;
console.log(dir); // 0
```

### Example 8: Ambient Enum (Declaration Only)

```typescript
declare enum ExternalEnum {
    Value1,
    Value2,
}

// Used when enum is defined elsewhere (e.g., in external library)
let value: ExternalEnum = ExternalEnum.Value1;
```

### Example 9: Iterating Over Enum

```typescript
enum Days {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
}

for (let day in Days) {
    if (!isNaN(Number(day))) {
        console.log(`Day ${day}: ${Days[day]}`);
    }
}

// Or using Object.keys
Object.keys(Days).forEach(key => {
    if (!isNaN(Number(key))) {
        console.log(`${Days[key]} is day ${key}`);
    }
});
```

### Example 10: Enum with Computed Values

```typescript
enum Permission {
    Read = 1,
    Write = 2,
    Execute = 4,
    Admin = Read | Write | Execute, // 7
}

let userPerm: Permission = Permission.Read | Permission.Write;
console.log(userPerm); // 3

function hasPermission(userPerms: Permission, requiredPerm: Permission): boolean {
    return (userPerms & requiredPerm) === requiredPerm;
}

console.log(hasPermission(userPerm, Permission.Read));  // true
console.log(hasPermission(userPerm, Permission.Execute)); // false
```

## Enum vs Other Approaches

### Enum vs Object

```typescript
// Enum approach
enum Status {
    Active = "active",
    Inactive = "inactive",
}

// Object approach
const StatusObj = {
    Active: "active" as const,
    Inactive: "inactive" as const,
} as const;

// Enum provides better type safety
let status1: Status = Status.Active; // Type-safe
// let status2: typeof StatusObj[keyof typeof StatusObj] = StatusObj.Active; // More verbose
```

### Enum vs Union Types

```typescript
// Enum
enum Color {
    Red = "red",
    Blue = "blue",
}

// Union type
type ColorUnion = "red" | "blue";

// Both provide type safety, but enum offers additional features like reverse mapping
```

## Best Practices

### ✅ Do's

- Use PascalCase for enum names and values
- Use string enums for better debugging and serialization
- Prefer const enums for performance when possible
- Use enums for fixed sets of related constants
- Document enum purposes and usage

### ❌ Don'ts

- Don't use enums for dynamic values
- Avoid numeric enums unless you need the numeric values
- Don't modify enum values at runtime
- Don't use enums when union types suffice
- Avoid heterogeneous enums unless necessary

### Safe Patterns

```typescript
// Pattern 1: String enums for API communication
enum ApiEndpoint {
    Users = "/api/users",
    Posts = "/api/posts",
    Comments = "/api/comments",
}

function fetchData(endpoint: ApiEndpoint): Promise<any> {
    return fetch(endpoint);
}

// Pattern 2: Numeric enums with flags
enum FilePermission {
    None = 0,
    Read = 1 << 0,
    Write = 1 << 1,
    Execute = 1 << 2,
}

type FilePermissions = number;

function hasPermission(permissions: FilePermissions, permission: FilePermission): boolean {
    return (permissions & permission) !== 0;
}

// Pattern 3: Enum with associated data
enum ResultType {
    Success,
    Error,
}

interface Result<T> {
    type: ResultType;
    data?: T;
    error?: string;
}

function createSuccess<T>(data: T): Result<T> {
    return { type: ResultType.Success, data };
}

function createError(error: string): Result<never> {
    return { type: ResultType.Error, error };
}
```

## Common Pitfalls

### Pitfall 1: Reverse Mapping with String Enums

```typescript
enum StringEnum {
    A = "a",
    B = "b",
}

// This doesn't work with string enums
// console.log(StringEnum["a"]); // undefined
console.log(StringEnum.A); // "a"
```

### Pitfall 2: Enum Values as Types

```typescript
enum Color {
    Red = "red",
    Blue = "blue",
}

let color: Color = "red"; // Error: "red" is not assignable to Color
let color2: Color = Color.Red; // OK
```

### Pitfall 3: Const Enum Limitations

```typescript
const enum ConstEnum {
    A,
    B,
}

// Cannot use in generic contexts
// function process<T extends ConstEnum>(value: T) {} // Error
```

## Practice Exercises

### Exercise 1: Basic Enum

```typescript
// Create an enum for days of the week
// Write a function that takes a day and returns whether it's a weekend
```

### Exercise 2: String Enum

```typescript
// Create a string enum for HTTP methods
// Write a function that validates if a method is allowed
```

### Exercise 3: Enum with Methods

```typescript
// Create an enum for order status
// Create a class that uses the enum and provides status-related methods
```

### Exercise 4: Bitwise Enum

```typescript
// Create an enum for user roles using bitwise operations
// Write functions to check and modify user permissions
```

### Exercise 5: Enum Iteration

```typescript
// Create an enum for months
// Write a function that returns all months as an array
// Write a function that gets the month name by number
```

## TypeScript Configuration

```json
{
    "compilerOptions": {
        "target": "ES2018",
        "module": "commonjs",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true
    }
}
```

## Summary

Enums in TypeScript provide a powerful way to define named constants and improve type safety. They offer better code organization, prevent magic values, and provide compile-time type checking.

**Key Takeaways:**

- Enums can be numeric (default), string, or mixed
- Numeric enums support reverse mapping
- String enums are better for debugging and serialization
- Const enums provide compile-time optimization
- Use enums for fixed sets of related values
- Prefer string enums over numeric for better maintainability
- Enums work well with switch statements and type guards

Enums are a fundamental feature that makes TypeScript code more robust and maintainable!
