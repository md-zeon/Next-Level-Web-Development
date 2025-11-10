# 5-9 Destructuring in TypeScript

## Destructuring in TypeScript

Destructuring is a JavaScript/TypeScript feature that allows you to unpack values from arrays and objects into distinct variables. This makes code more readable and provides a convenient way to extract data.

## Array Destructuring

Array destructuring allows you to unpack elements from arrays into individual variables.

### Basic Array Destructuring

```typescript
// Basic array destructuring
const numbers = [1, 2, 3, 4, 5];
const [first, second, third] = numbers;

console.log(first);  // 1
console.log(second); // 2
console.log(third);  // 3

// Skipping elements
const [, , thirdElement] = numbers;
console.log(thirdElement); // 3

// Using rest operator
const [head, ...tail] = numbers;
console.log(head); // 1
console.log(tail); // [2, 3, 4, 5]
```

### Array Destructuring with Types

```typescript
// TypeScript array destructuring with explicit types
const coordinates: [number, number, number] = [10, 20, 30];
const [x, y, z]: [number, number, number] = coordinates;

// Or let TypeScript infer the types
const [a, b, c] = coordinates; // TypeScript infers [number, number, number]

// Destructuring with different types
const mixed: [string, number, boolean] = ["hello", 42, true];
const [message, count, flag] = mixed;
```

### Default Values in Array Destructuring

```typescript
// Default values
const [a = 1, b = 2, c = 3] = [10]; // a = 10, b = 2, c = 3
const [x, y = 20] = [10]; // x = 10, y = 20

// With undefined values
const sparse = [1, , 3]; // [1, undefined, 3]
const [first, second = 2, third] = sparse;
// first = 1, second = 2, third = 3
```

## Object Destructuring

Object destructuring allows you to extract properties from objects and assign them to variables.

### Basic Object Destructuring

```typescript
// Basic object destructuring
const user = {
    name: "John",
    age: 25,
    email: "john@example.com",
    active: true
};

const { name, age, email } = user;
console.log(name);  // "John"
console.log(age);   // 25
console.log(email); // "john@example.com"

// Renaming variables
const { name: userName, age: userAge } = user;
console.log(userName); // "John"
console.log(userAge);  // 25
```

### Object Destructuring with Types

```typescript
// Interface for type safety
interface Person {
    name: string;
    age: number;
    email?: string;
}

const person: Person = {
    name: "Jane",
    age: 30,
    email: "jane@example.com"
};

// Destructuring with type annotation
const { name, age }: { name: string; age: number } = person;

// Or let TypeScript infer from the interface
const { name: pName, age: pAge } = person; // TypeScript knows the types
```

### Default Values in Object Destructuring

```typescript
// Default values
const config = { theme: "dark" };
const { theme, language = "en", notifications = true } = config;
// theme = "dark", language = "en", notifications = true

// With undefined properties
const partialUser = { name: "Bob" };
const { name, age = 18, email = "N/A" } = partialUser;
// name = "Bob", age = 18, email = "N/A"
```

### Nested Object Destructuring

```typescript
// Nested object destructuring
const employee = {
    name: "Alice",
    age: 28,
    address: {
        street: "123 Main St",
        city: "Anytown",
        country: "USA"
    },
    department: {
        name: "Engineering",
        manager: "John Doe"
    }
};

// Single level destructuring
const { name, address } = employee;

// Nested destructuring
const {
    name: empName,
    address: { city, country },
    department: { name: deptName }
} = employee;

console.log(city);     // "Anytown"
console.log(country);  // "USA"
console.log(deptName); // "Engineering"
```

## Advanced Destructuring Patterns

### Rest in Destructuring

```typescript
// Rest with objects
const user = {
    id: 1,
    name: "John",
    email: "john@example.com",
    password: "secret",
    createdAt: new Date()
};

const { password, createdAt, ...publicUser } = user;
console.log(publicUser); // { id: 1, name: "John", email: "john@example.com" }

// Rest with arrays
const numbers = [1, 2, 3, 4, 5, 6];
const [first, second, ...remaining] = numbers;
console.log(remaining); // [3, 4, 5, 6]
```

### Computed Property Names

```typescript
// Dynamic property destructuring
const propertyName = "email";
const user = { name: "John", email: "john@example.com" };

const { [propertyName]: userEmail } = user;
console.log(userEmail); // "john@example.com"
```

### Destructuring in Function Parameters

```typescript
// Array destructuring in function parameters
function processCoordinates([x, y, z]: [number, number, number]): void {
    console.log(`X: ${x}, Y: ${y}, Z: ${z}`);
}

const coords: [number, number, number] = [10, 20, 30];
processCoordinates(coords);

// Object destructuring in function parameters
function createUser({ name, age, email }: {
    name: string;
    age: number;
    email?: string;
}): Person {
    return { name, age, email };
}

const userData = { name: "Alice", age: 25, email: "alice@example.com" };
const newUser = createUser(userData);

// With default values
function configure({
    theme = "light",
    language = "en",
    notifications = true
}: {
    theme?: string;
    language?: string;
    notifications?: boolean;
} = {}): void {
    console.log(`Theme: ${theme}, Language: ${language}, Notifications: ${notifications}`);
}

configure(); // Uses all defaults
configure({ theme: "dark" }); // Overrides theme only
```

## TypeScript-Specific Destructuring Features

### Destructuring with Type Assertions

```typescript
// Type assertion with destructuring
const data: any = { name: "John", age: "25" };
const { name, age } = data as { name: string; age: string };

// Or more safely
interface ApiResponse {
    user: {
        name: string;
        age: number;
    };
}

const response = { user: { name: "John", age: 25 } } as ApiResponse;
const { user: { name: userName, age: userAge } } = response;
```

### Destructuring with Generics

```typescript
// Generic destructuring function
function extractFirst<T>(array: T[]): T | undefined {
    const [first] = array;
    return first;
}

const numbers = [1, 2, 3];
const strings = ["a", "b", "c"];

const firstNumber = extractFirst(numbers); // number | undefined
const firstString = extractFirst(strings); // string | undefined

// Generic object destructuring
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    const { [key]: value } = obj;
    return value;
}

const user = { name: "John", age: 25 };
const userName = getProperty(user, "name"); // "John"
```

### Destructuring with Union Types

```typescript
// Destructuring with discriminated unions
type Circle = { kind: "circle"; radius: number };
type Square = { kind: "square"; sideLength: number };
type Shape = Circle | Square;

function getArea(shape: Shape): number {
    if (shape.kind === "circle") {
        const { radius } = shape;
        return Math.PI * radius ** 2;
    } else {
        const { sideLength } = shape;
        return sideLength ** 2;
    }
}
```

## Common Use Cases

### Swapping Variables

```typescript
// Variable swapping
let a = 1;
let b = 2;
[a, b] = [b, a]; // a = 2, b = 1

// With more variables
let x = 10, y = 20, z = 30;
[z, y, x] = [x, y, z]; // x = 30, y = 20, z = 10
```

### Parsing Function Results

```typescript
// Parsing function that returns multiple values
function parseUrl(url: string): [string, string, number] {
    // Simplified parsing logic
    const [protocol, rest] = url.split("://");
    const [hostAndPath, portStr] = rest.split(":");
    const port = parseInt(portStr) || 80;
    return [protocol, hostAndPath, port];
}

const [protocol, host, port] = parseUrl("https://example.com:443");
// protocol = "https", host = "example.com", port = 443
```

### Configuration Objects

```typescript
// Clean configuration handling
interface ServerConfig {
    host?: string;
    port?: number;
    ssl?: boolean;
}

function startServer(config: ServerConfig = {}): void {
    const {
        host = "localhost",
        port = 3000,
        ssl = false
    } = config;

    console.log(`Starting server on ${host}:${port} (SSL: ${ssl})`);
}

startServer();
startServer({ port: 8080, ssl: true });
```

### React/JSX Patterns (if applicable)

```typescript
// Component props destructuring (conceptual)
interface ButtonProps {
    text: string;
    onClick: () => void;
    variant?: "primary" | "secondary";
    disabled?: boolean;
}

function Button({ text, onClick, variant = "primary", disabled = false }: ButtonProps) {
    return {
        text,
        onClick,
        variant,
        disabled
    };
}

// Usage
const buttonProps = {
    text: "Click me",
    onClick: () => console.log("Clicked!"),
    variant: "secondary" as const
};

const button = Button(buttonProps);
```

## Best Practices

### Use Descriptive Variable Names

```typescript
// Good: descriptive names
const { firstName, lastName, emailAddress } = user;

// Avoid: generic names
const { f, l, e } = user;
```

### Prefer Object Destructuring for Multiple Properties

```typescript
// Good: destructuring
function processUser(user: Person): void {
    const { name, age, email } = user;
    // Use name, age, email
}

// Avoid: multiple property access
function processUser(user: Person): void {
    const name = user.name;
    const age = user.age;
    const email = user.email;
    // Use name, age, email
}
```

### Use Default Values Wisely

```typescript
// Good: meaningful defaults
function createConfig(options: Partial<Config> = {}): Config {
    const { theme = "light", language = "en" } = options;
    return { theme, language };
}

// Avoid: confusing defaults
function createConfig(options: Partial<Config> = {}): Config {
    const { theme = "dark", language = "fr" } = options; // Why French?
    return { theme, language };
}
```

### Handle Nested Destructuring Carefully

```typescript
// Good: check for nested object existence
function getUserCity(user: Person): string {
    const { address } = user;
    if (!address) return "Unknown";
    const { city } = address;
    return city || "Unknown";
}

// Better: optional chaining with destructuring
function getUserCity(user: Person): string {
    const { address } = user;
    const { city } = address || {};
    return city || "Unknown";
}
```

## Performance Considerations

### Destructuring vs Manual Assignment

```typescript
// Destructuring (creates temporary objects in some cases)
const { a, b, c } = obj;

// Manual assignment (potentially faster for single properties)
const a = obj.a;
const b = obj.b;
const c = obj.c;
```

### Array Destructuring Performance

```typescript
// For small arrays, destructuring is fine
const [a, b, c] = smallArray;

// For large arrays, consider indexing
const a = largeArray[0];
const b = largeArray[1];
const c = largeArray[2];
```

## Practice Exercises

### Exercise 1: Array Destructuring

```typescript
// Create a function that takes an array of numbers
// Use destructuring to extract first, second, and remaining elements
// Return an object with these properties
```

### Exercise 2: Object Destructuring

```typescript
// Create a function that takes a user object
// Use destructuring to extract name, age, and email
// Provide default values for missing properties
// Return a formatted string
```

### Exercise 3: Nested Destructuring

```typescript
// Create a function that processes employee data
// Use nested destructuring for address and department
// Extract city from address and name from department
// Return formatted employee info
```

### Exercise 4: Function Parameters

```typescript
// Create a function that takes destructured parameters
// Parameters: config object with theme, language, notifications
// Use default values in destructuring
// Log the configuration
```

### Exercise 5: Advanced Patterns

```typescript
// Create a function that swaps two variables using destructuring
// Create a function that extracts specific properties from an object
// Use rest operator to collect remaining properties
// Return both extracted and remaining properties
```

## Common Pitfalls

### Destructuring undefined/null

```typescript
// This will throw an error
const { name } = undefined; // TypeError

// Safe destructuring
const obj = undefined;
const { name } = obj || {}; // name = undefined
```

### Array Destructuring Length Mismatch

```typescript
// Extra variables get undefined
const [a, b, c] = [1, 2]; // c = undefined

// Missing elements get undefined
const [x, y] = [1, 2, 3]; // Fine, 3 is ignored
```

### Object Destructuring with Non-existent Properties

```typescript
// Non-existent properties are undefined
const { name, age, email } = { name: "John", age: 25 };
// email = undefined
```

## Next Steps

Destructuring is a powerful feature that makes TypeScript code more readable and maintainable. Next, you'll learn about:

- Type guards and type narrowing
- Utility types
- Advanced TypeScript patterns
- Classes and inheritance

Remember: Destructuring extracts values from data structures - use it to make your code cleaner and more expressive!
