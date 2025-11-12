# 6-1 Type Assertion

## What is Type Assertion?

Type assertion in TypeScript is a way to tell the compiler that you know more about the type of a value than it does. It's like saying "trust me, I know this value is of this type" to the TypeScript compiler. Type assertions don't perform any runtime checks or conversions - they only affect the compile-time type checking.

## Why Use Type Assertion?

Type assertions are useful when:

- You have more specific type information than TypeScript can infer
- Working with values from external libraries or APIs
- Converting between related types
- Working with DOM elements
- Parsing JSON data

## Syntax

TypeScript provides two syntaxes for type assertions:

### 1. `as` Syntax (Recommended)

```typescript
let value: any = "hello world";
let strLength: number = (value as string).length;
```

### 2. Angle Bracket Syntax (Deprecated in TSX)

```typescript
let value: any = "hello world";
let strLength: number = (<string>value).length;
```

> **Note:** The `as` syntax is preferred because it works in both `.ts` and `.tsx` files, while angle brackets don't work in TSX files.

## Basic Examples

### Example 1: Basic Type Assertion

```typescript
let someValue: unknown = "Hello TypeScript";

// Type assertion to string
let str: string = someValue as string;
console.log(str.toUpperCase()); // "HELLO TYPESCRIPT"

// Type assertion to number
let num: number = someValue as any as number; // Double assertion
console.log(num); // NaN (runtime error)
```

### Example 2: Object Type Assertion

```typescript
interface Person {
	name: string;
	age: number;
}

let data: any = {
	name: "John Doe",
	age: 30,
	occupation: "Developer",
};

// Assert that data conforms to Person interface
let person: Person = data as Person;
console.log(person.name); // "John Doe"
console.log(person.age); // 30
```

### Example 3: DOM Element Assertion

```typescript
// In browser environment
// document.getElementById returns HTMLElement | null
let element = document.getElementById("myInput");

// Assert it's an HTMLInputElement
let inputElement = element as HTMLInputElement;
inputElement.value = "Hello World";

// Alternative: using non-null assertion with type assertion
let inputElement2 = document.getElementById("myInput")! as HTMLInputElement;
```

## Advanced Examples

### Example 4: JSON Parsing

```typescript
interface User {
	id: number;
	name: string;
	email: string;
}

let jsonString = '{"id": 1, "name": "John", "email": "john@example.com"}';

// JSON.parse returns any
let userData: any = JSON.parse(jsonString);

// Type assertion to User interface
let user: User = userData as User;
console.log(user.name); // "John"
```

### Example 5: Working with Unknown

```typescript
function processValue(value: unknown): string {
	// Type assertion to string
	return (value as string).toUpperCase();
}

console.log(processValue("hello")); // "HELLO"

// This would cause runtime error if value isn't actually a string
// console.log(processValue(123)); // Runtime error
```

### Example 6: Array Type Assertion

```typescript
let mixedArray: any[] = [1, "two", 3, "four"];

// Assert as string array (dangerous!)
let stringArray: string[] = mixedArray as string[];

// This would work at compile time but fail at runtime
// console.log(stringArray[0].toUpperCase()); // Runtime error: number has no toUpperCase
```

### Example 7: Function Return Types

```typescript
function fetchData(): Promise<any> {
	return fetch("/api/data").then((res) => res.json());
}

// Assert the return type
async function getUser(): Promise<User> {
	let data = await fetchData();
	return data as User;
}
```

## Type Assertion vs Type Casting

**Important:** Type assertion is not the same as type casting in other languages!

- **Type Assertion**: Compile-time only, no runtime conversion
- **Type Casting**: Runtime conversion (not available in TypeScript)

```typescript
let value: any = "123";

// Type assertion - no conversion
let str: string = value as string; // Still "123" as string

// What you might expect (but doesn't exist in TS)
// let num: number = cast<number>(value); // This doesn't exist
```

## Double Assertion (Dangerous)

Sometimes you need to bypass TypeScript's strict type checking:

```typescript
let value: any = "hello world";

// Double assertion to bypass type checking
let num: number = value as unknown as number;
console.log(num); // NaN at runtime
```

> **Warning:** Double assertions can lead to runtime errors. Use sparingly and only when you're absolutely certain about the types.

## Type Guards vs Type Assertions

Type guards are safer than type assertions:

```typescript
// Type guard function
function isString(value: unknown): value is string {
	return typeof value === "string";
}

// Using type guard (safer)
function processSafe(value: unknown): string {
	if (isString(value)) {
		// TypeScript knows value is string here
		return value.toUpperCase();
	}
	throw new Error("Value is not a string");
}

// Using type assertion (less safe)
function processUnsafe(value: unknown): string {
	return (value as string).toUpperCase(); // Could throw at runtime
}
```

## Common Use Cases

### 1. Working with Third-Party Libraries

```typescript
// Library returns any
declare function getConfig(): any;

let config = getConfig();

// Assert the structure you expect
interface AppConfig {
	apiUrl: string;
	timeout: number;
}

let appConfig: AppConfig = config as AppConfig;
```

### 2. Event Handlers

```typescript
// Event target is generic HTMLElement
function handleClick(event: Event): void {
	let target = event.target as HTMLButtonElement;
	console.log(target.textContent);
}
```

### 3. Canvas API

```typescript
let canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
```

### 4. Local Storage

```typescript
interface UserSettings {
	theme: "light" | "dark";
	language: string;
}

let settings: UserSettings = JSON.parse(
	localStorage.getItem("settings") || "{}",
) as UserSettings;
```

## Best Practices

### ✅ Do's

- Use `as` syntax instead of angle brackets
- Combine with type guards when possible
- Use for DOM element manipulation
- Use when you have external type knowledge
- Document why you're using assertion

### ❌ Don'ts

- Don't use to bypass type safety without good reason
- Avoid double assertions unless absolutely necessary
- Don't assert to unrelated types
- Don't use instead of proper typing
- Don't ignore TypeScript errors with assertions

### Safe Patterns

```typescript
// Pattern 1: Type guard + assertion
function safeProcess(value: unknown): string {
	if (typeof value === "string") {
		return value; // TypeScript knows it's string
	}
	if (isString(value)) {
		// Custom type guard
		return value;
	}
	return String(value); // Safe conversion
}

// Pattern 2: Assertion with validation
function validateAndAssert(value: unknown): User {
	if (!value || typeof value !== "object") {
		throw new Error("Invalid user data");
	}

	let user = value as User;

	if (!user.name || !user.email) {
		throw new Error("Missing required fields");
	}

	return user;
}
```

## Common Pitfalls

### Pitfall 1: Runtime vs Compile-time

```typescript
let value: any = 123;

// This compiles but fails at runtime
let str: string = value as string;
console.log(str.toUpperCase()); // Error: number has no toUpperCase
```

### Pitfall 2: Asserting Wrong Types

```typescript
interface Dog {
	bark(): void;
}

interface Cat {
	meow(): void;
}

let animal: any = { bark: () => console.log("woof") };

// Wrong assertion!
let cat: Cat = animal as Cat;
cat.meow(); // Runtime error: meow is not a function
```

### Pitfall 3: Null/Undefined Assertions

```typescript
function process(element: HTMLElement | null): void {
	// Dangerous: assumes element is not null
	let input = element as HTMLInputElement; // Could be null
	input.value = "hello"; // Runtime error if element is null
}

// Better approach
function processSafe(element: HTMLElement | null): void {
	if (!element) return;

	let input = element as HTMLInputElement;
	input.value = "hello";
}
```

## Practice Exercises

### Exercise 1: DOM Element Handling

```typescript
// Create a function that safely gets an input element's value
function getInputValue(id: string): string {
	// Use type assertion to get HTMLInputElement
	// Handle the case where element might not exist
}
```

### Exercise 2: API Response Handling

```typescript
interface ApiResponse {
	success: boolean;
	data: User[];
}

// Create a function that processes API response
function handleApiResponse(response: any): User[] {
	// Use type assertion to convert response to ApiResponse
	// Validate the response structure
	// Return the user data
}
```

### Exercise 3: Configuration Object

```typescript
interface Config {
	apiUrl: string;
	timeout: number;
	retries: number;
}

// Create a function that loads config from localStorage
function loadConfig(): Config {
	// Get from localStorage (returns string | null)
	// Parse JSON
	// Use type assertion
	// Provide defaults for missing properties
}
```

### Exercise 4: Event Handling

```typescript
// Create an event handler for form submission
function handleSubmit(event: Event): void {
	// Prevent default
	// Get form element using type assertion
	// Get form data
	// Process the data
}
```

## TypeScript Configuration

```json
{
	"compilerOptions": {
		"strict": true,
		"noImplicitAny": true,
		"strictNullChecks": true,
		"noUncheckedIndexedAccess": true
	}
}
```

## Summary

Type assertions are powerful tools in TypeScript that allow you to work with types that the compiler can't infer automatically. However, they come with responsibility - incorrect assertions can lead to runtime errors.

**Key Takeaways:**

- Type assertions are compile-time only
- Use `as` syntax for type assertions
- Combine with type guards for safety
- Common use cases: DOM manipulation, API responses, third-party libraries
- Always prefer proper typing over assertions when possible
- Document your assertions and validate at runtime when necessary

Remember: With great power comes great responsibility. Use type assertions wisely!
