# 5-4 Explore Primitive Types

## What are Primitive Types?

Primitive types are the basic data types that are immutable and passed by value in TypeScript/JavaScript. They represent simple values and are the building blocks for more complex data structures.

## 1. String

Strings represent text data. In TypeScript, you can use single quotes, double quotes, or template literals.

### Basic Usage

```typescript
// String type annotation
let firstName: string = "John";
let lastName: string = "Doe";

// Template literals (backticks)
let fullName: string = `${firstName} ${lastName}`;
console.log(fullName); // Output: John Doe

// String methods
let message: string = "Hello, TypeScript!";
console.log(message.length); // 18
console.log(message.toUpperCase()); // HELLO, TYPESCRIPT!
console.log(message.substring(0, 5)); // Hello
```

### String Union Types

```typescript
let status: "active" | "inactive" | "pending" = "active";
```

## 2. Number

All numbers in TypeScript are floating-point numbers. There's no separate integer type.

### Basic Usage

```typescript
// Number type annotation
let age: number = 25;
let height: number = 5.9;
let negative: number = -10;

// Mathematical operations
let sum: number = 10 + 5; // 15
let product: number = 10 * 5; // 50
let quotient: number = 10 / 3; // 3.333...
let remainder: number = 10 % 3; // 1

// Special number values
let infinity: number = Infinity;
let notANumber: number = NaN;

// Binary, octal, and hexadecimal literals
let binary: number = 0b1010; // 10 in decimal
let octal: number = 0o755; // 493 in decimal
let hexadecimal: number = 0xff; // 255 in decimal
```

### Number Methods

```typescript
let num: number = 3.14159;
console.log(num.toFixed(2)); // "3.14"
console.log(num.toPrecision(3)); // "3.14"
console.log(Number.isInteger(num)); // false
console.log(Number.isNaN(num)); // false
```

## 3. Boolean

Booleans represent true/false values.

### Basic Usage

```typescript
// Boolean type annotation
let isLoggedIn: boolean = true;
let hasPermission: boolean = false;

// Boolean expressions
let isAdult: boolean = age >= 18;
let isValid: boolean = firstName.length > 0 && age > 0;

// Boolean methods
console.log(isLoggedIn.toString()); // "true"
console.log(Boolean(0)); // false
console.log(Boolean(1)); // true
console.log(Boolean("")); // false
console.log(Boolean("hello")); // true
```

## 4. Null and Undefined

These represent the absence of value, but they're treated differently in TypeScript.

### Basic Usage

```typescript
// Null and undefined
let emptyValue: null = null;
let notDefined: undefined = undefined;

// Variables that might be null or undefined
let userInput: string | null = null;
let optionalData: string | undefined = undefined;

// Strict null checks (enabled by default in strict mode)
function processInput(input: string | null): string {
	if (input === null) {
		return "No input provided";
	}
	return input.toUpperCase();
}
```

### Nullish Coalescing Operator

```typescript
// Nullish coalescing (??) - only treats null/undefined as falsy
let defaultName: string = userInput ?? "Anonymous";
let defaultAge: number = age ?? 18;
```

### Optional Chaining

```typescript
// Optional chaining (?.) - safely access properties
let user = {
	name: "John",
	address: {
		city: "New York",
	},
};

// Safe property access
let city: string | undefined = user?.address?.city;
let zipCode: string | undefined = user?.address?.zipCode; // undefined
```

## 5. Symbol

Symbols are unique and immutable primitive values, often used as object property keys.

### Basic Usage

```typescript
// Creating symbols
let id1: symbol = Symbol("id");
let id2: symbol = Symbol("id");

// Symbols are unique
console.log(id1 === id2); // false

// Symbol as object key
let user = {
	name: "John",
	[id1]: "unique identifier",
};

console.log(user[id1]); // "unique identifier"

// Well-known symbols
console.log(Symbol.iterator); // Symbol(Symbol.iterator)
console.log(Symbol.toStringTag); // Symbol(Symbol.toStringTag)
```

## 6. BigInt

BigInt allows you to work with arbitrarily large integers beyond the safe integer limit of regular numbers.

### Basic Usage

```typescript
// BigInt literals (append 'n')
let bigNumber: bigint = 123456789012345678901234567890n;

// BigInt constructor
let anotherBig: bigint = BigInt("123456789012345678901234567890");

// Operations with BigInt
let sum: bigint = bigNumber + anotherBig;
let product: bigint = bigNumber * 2n;

// Cannot mix BigInt with regular numbers
// let mixed = bigNumber + 1; // Error!

// Convert between BigInt and number
let numFromBig: number = Number(bigNumber);
let bigFromNum: bigint = BigInt(123);
```

## Type Inference

TypeScript can often infer types automatically:

```typescript
// TypeScript infers these types
let name = "John"; // string
let count = 42; // number
let isActive = true; // boolean
let data = null; // any (in non-strict mode) or null
let value = undefined; // any (in non-strict mode) or undefined
```

## Type Assertions

Sometimes you need to tell TypeScript about a type it can't infer:

```typescript
// Type assertion (angle bracket syntax)
let inputValue: unknown = "hello";
let strLength: number = (<string>inputValue).length;

// Type assertion (as syntax - preferred)
let strLength2: number = (inputValue as string).length;
```

## Practice Exercises

### Exercise 1: String Operations

```typescript
// Create variables for your name and age
// Use template literals to create a greeting message
// Convert the message to uppercase and find its length
```

### Exercise 2: Number Calculations

```typescript
// Calculate the area of a circle (πr²)
// Use Math.PI and Math.pow()
// Format the result to 2 decimal places
```

### Exercise 3: Boolean Logic

```typescript
// Create variables for user permissions
// Check if user can access admin panel
// Use logical operators (&&, ||, !)
```

### Exercise 4: Null Safety

```typescript
// Create a function that processes user data
// Handle cases where data might be null or undefined
// Use nullish coalescing and optional chaining
```

## Common TypeScript Compiler Options for Primitives

```json
{
	"compilerOptions": {
		"strict": true, // Enable strict type checking
		"strictNullChecks": true, // Enable strict null checks
		"noImplicitAny": true, // Disallow implicit 'any' type
		"exactOptionalPropertyTypes": true // Exact optional property types
	}
}
```

## Next Steps

Understanding primitive types is fundamental to TypeScript. Next, you'll learn about:

- Arrays and tuples
- Objects and interfaces
- Functions with type annotations
- Union and intersection types

Remember: Primitive types are immutable and passed by value, while objects are mutable and passed by reference!
