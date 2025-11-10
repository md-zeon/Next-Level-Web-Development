# 5-6 Object, Literal & Optional Type

## Object Types in TypeScript

Object types define the shape of objects, including their properties and methods.

### Basic Object Type Syntax

```typescript
// Inline object type
let user: {
	name: string;
	age: number;
	email: string;
} = {
	name: "John",
	age: 25,
	email: "john@example.com",
};

// Interface (recommended for reusability)
interface User {
	name: string;
	age: number;
	email: string;
}

let user2: User = {
	name: "Jane",
	age: 30,
	email: "jane@example.com",
};
```

### Object Type Properties

```typescript
interface Product {
	readonly id: number; // Read-only property
	name: string; // Required property
	price: number; // Required property
	description?: string; // Optional property
	category: "electronics" | "clothing" | "books"; // Union type
}

// Usage
let product: Product = {
	id: 1,
	name: "Laptop",
	price: 999,
	category: "electronics",
	// description is optional
};

// product.id = 2; // Error: readonly property
```

## Optional Properties

Optional properties are denoted with `?` and can be omitted when creating objects.

### Basic Optional Properties

```typescript
interface Person {
	name: string;
	age?: number; // Optional property
	email?: string; // Optional property
}

// All these are valid
let person1: Person = { name: "John" };
let person2: Person = { name: "Jane", age: 25 };
let person3: Person = { name: "Bob", age: 30, email: "bob@example.com" };
```

### Optional Property Access

```typescript
function greet(person: Person): string {
	let greeting = `Hello, ${person.name}!`;

	// Safe optional property access
	if (person.age) {
		greeting += ` You are ${person.age} years old.`;
	}

	if (person.email) {
		greeting += ` Your email is ${person.email}.`;
	}

	return greeting;
}

// Using optional chaining (?.)
function getUserInfo(person: Person): string {
	return `Name: ${person.name}, Age: ${person.age ?? "Not specified"}`;
}
```

## Literal Types

Literal types allow you to specify exact values that a variable can hold.

### String Literal Types

```typescript
// String literal type
type Direction = "north" | "south" | "east" | "west";

let myDirection: Direction = "north";
// myDirection = "up"; // Error: not assignable to Direction

// Function parameter with literal type
function move(direction: Direction): void {
	console.log(`Moving ${direction}`);
}

move("north"); // OK
// move("diagonal"); // Error
```

### Numeric Literal Types

```typescript
// Numeric literal type
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

let roll: DiceRoll = 4;
// roll = 7; // Error

// HTTP status codes
type HttpStatus = 200 | 404 | 500;

function handleResponse(status: HttpStatus): void {
	switch (status) {
		case 200:
			console.log("Success!");
			break;
		case 404:
			console.log("Not found!");
			break;
		case 500:
			console.log("Server error!");
			break;
	}
}
```

### Boolean Literal Types

```typescript
// Boolean literal type
type IsActive = true | false;

let userActive: IsActive = true;
// userActive = null; // Error

// More practical example
type ButtonState = "enabled" | "disabled" | "loading";

let button: ButtonState = "enabled";
```

## Combining Object Types with Literals

### Literal Types in Objects

```typescript
interface ApiResponse {
	status: "success" | "error";
	data?: any;
	message?: string;
}

let successResponse: ApiResponse = {
	status: "success",
	data: { userId: 123 },
};

let errorResponse: ApiResponse = {
	status: "error",
	message: "User not found",
};
```

### Discriminated Unions with Literal Types

```typescript
// Discriminated union using literal types
interface Circle {
	kind: "circle";
	radius: number;
}

interface Square {
	kind: "square";
	sideLength: number;
}

interface Triangle {
	kind: "triangle";
	base: number;
	height: number;
}

type Shape = Circle | Square | Triangle;

// Type-safe function based on discriminated union
function getArea(shape: Shape): number {
	switch (shape.kind) {
		case "circle":
			return Math.PI * shape.radius ** 2;
		case "square":
			return shape.sideLength ** 2;
		case "triangle":
			return (shape.base * shape.height) / 2;
		default:
			// TypeScript ensures all cases are handled
			const _exhaustiveCheck: never = shape;
			throw new Error(`Unknown shape: ${_exhaustiveCheck}`);
	}
}
```

## Optional Types and Operators

### Optional Chaining (?.)

```typescript
interface UserProfile {
	name: string;
	address?: {
		street: string;
		city: string;
		coordinates?: {
			lat: number;
			lng: number;
		};
	};
}

let user: UserProfile = {
	name: "John",
	address: {
		street: "123 Main St",
		city: "Anytown",
	},
};

// Safe property access with optional chaining
let city = user.address?.city; // "Anytown"
let lat = user.address?.coordinates?.lat; // undefined (safe)

// Without optional chaining (would throw error)
// let badCity = user.address.city; // Error if address is undefined
```

### Nullish Coalescing (??)

```typescript
// Nullish coalescing operator
function getDisplayName(user: UserProfile): string {
	// Only treats null/undefined as falsy
	return user.address?.city ?? "Unknown City";
}

// Difference from || operator
let count = 0;
let defaultCount1 = count || 10; // 10 (0 is falsy)
let defaultCount2 = count ?? 10; // 0 (0 is not null/undefined)
```

### Optional Property with Default Values

```typescript
interface Config {
	theme?: "light" | "dark";
	language?: string;
	notifications?: boolean;
}

function createConfig(options: Partial<Config> = {}): Config {
	return {
		theme: options.theme ?? "light",
		language: options.language ?? "en",
		notifications: options.notifications ?? true,
	};
}

let config = createConfig({ theme: "dark" });
// Result: { theme: "dark", language: "en", notifications: true }
```

## Advanced Object Patterns

### Index Signatures

```typescript
// Index signature for dynamic properties
interface Dictionary {
	[key: string]: string;
}

let dict: Dictionary = {
	hello: "world",
	foo: "bar",
};

// Numeric index signature
interface NumberArray {
	[index: number]: number;
}

let arr: NumberArray = [1, 2, 3];
let value = arr[0]; // 1
```

### Mapped Types

```typescript
// Make all properties optional
type PartialUser = {
	[K in keyof User]?: User[K];
};

// Make all properties readonly
type ReadonlyUser = {
	readonly [K in keyof User]: User[K];
};

// Built-in mapped types
type Partial<T> = {
	[P in keyof T]?: T[P];
};

type Readonly<T> = {
	readonly [P in keyof T]: T[P];
};
```

### Utility Types for Objects

```typescript
interface User {
	id: number;
	name: string;
	email: string;
	createdAt: Date;
}

// Pick specific properties
type UserSummary = Pick<User, "id" | "name">;

// Omit specific properties
type UserWithoutId = Omit<User, "id">;

// Make all properties optional
type PartialUser = Partial<User>;

// Make all properties required (removes optionals)
type RequiredUser = Required<User>;

// Extract property types
type UserName = User["name"]; // string
type UserKeys = keyof User; // "id" | "name" | "email" | "createdAt"
```

## Literal Type Inference

```typescript
// TypeScript infers literal types when possible
let direction = "north"; // type: "north" (not string)

// But variables declared with let can be reassigned
direction = "south"; // OK, still "north" | "south"

// Use const for stricter literal types
const strictDirection = "north"; // type: "north"

// const assertion for object literals
const config = {
	theme: "dark",
	version: 1,
} as const;
// config.theme is "dark", not string
// config.version is 1, not number
```

## Practice Exercises

### Exercise 1: Object Types

```typescript
// Define an interface for a Car with:
// - required: make, model, year
// - optional: color, mileage
// Create objects with different combinations of properties
```

### Exercise 2: Literal Types

```typescript
// Create a function that accepts only specific string literals
// Use discriminated unions for different shapes
// Implement type-safe area calculation
```

### Exercise 3: Optional Properties

```typescript
// Create a configuration object with optional properties
// Use optional chaining and nullish coalescing
// Implement default values for missing properties
```

### Exercise 4: Advanced Patterns

```typescript
// Use Pick and Omit utility types
// Create index signatures for dynamic objects
// Implement mapped types for transformations
```

## Best Practices

### When to Use Interfaces vs Type Aliases

```typescript
// Use interfaces for object shapes that will be extended
interface Animal {
	name: string;
}

interface Dog extends Animal {
	breed: string;
}

// Use type aliases for unions, primitives, and complex types
type AnimalType = "dog" | "cat" | "bird";
type Coordinates = [number, number];
type Callback = (data: any) => void;
```

### Optional Properties Guidelines

- Use optional properties sparingly
- Prefer union types with `undefined` for clarity
- Consider using utility types like `Partial<T>` for flexibility

### Literal Types Usage

- Use literal types for constrained values (status, direction, etc.)
- Combine with discriminated unions for type safety
- Use `as const` for immutable object literals

## Common Patterns

### Builder Pattern with Optional Properties

```typescript
interface QueryBuilder {
	select?: string[];
	where?: Record<string, any>;
	orderBy?: string;
	limit?: number;
}

class SQLBuilder {
	private query: QueryBuilder = {};

	select(fields: string[]): this {
		this.query.select = fields;
		return this;
	}

	where(conditions: Record<string, any>): this {
		this.query.where = conditions;
		return this;
	}

	orderBy(field: string): this {
		this.query.orderBy = field;
		return this;
	}

	limit(count: number): this {
		this.query.limit = count;
		return this;
	}

	build(): string {
		// Build SQL query from this.query
		return "SELECT ...";
	}
}

// Usage
const sql = new SQLBuilder()
	.select(["name", "email"])
	.where({ active: true })
	.orderBy("name")
	.limit(10)
	.build();
```

## Next Steps

Understanding object types, literal types, and optional properties is crucial for building robust TypeScript applications. Next, you'll learn about:

- Union and intersection types
- Generics
- Advanced utility types
- Type guards and assertions

Remember: Literal types provide compile-time safety by restricting values to specific constants, while optional properties make your types more flexible!
